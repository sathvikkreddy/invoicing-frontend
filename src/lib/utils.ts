import { clsx, type ClassValue } from 'clsx'
import {
    createSearchParamsCache,
    parseAsArrayOf,
    parseAsInteger,
    parseAsString,
    parseAsStringEnum,
} from 'nuqs/server'
import { twMerge } from 'tailwind-merge'
import { getFiltersStateParser, getSortingStateParser } from './parsers'
import type { Company } from '~/types/strapi'
import type { ExtendedColumnFilter } from '~/types/data-table'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export type FilterOptions = {
    page?: string | number
    query?: string
    sort?: string | Array<{ id: string; desc: boolean }>
    perPage?: string | number
}

export const buildStrapiFilters = (
    options: FilterOptions = {},
    searchStrapiFields: string[]
): string => {
    // Set default values
    const defaults = {
        page: 1,
        perPage: 25,
        query: '',
        sort: [{ id: 'createdAt', desc: false }],
    }
    // Merge with provided options
    const {
        page = defaults.page,
        perPage = defaults.perPage,
        query = defaults.query,
        sort = defaults.sort,
    } = options

    // Build query parameters
    const params = new URLSearchParams()

    // Pagination
    params.append('pagination[page]', String(page))
    params.append('pagination[pageSize]', String(perPage))

    // Search/filtering
    if (query && query.trim() !== '') {
        for (let i = 0; i < searchStrapiFields.length; i++) {
            const field = searchStrapiFields[i]

            // Check if the field is nested (contains a dot)
            if (field?.includes('.')) {
                const [relation, attribute] = field.split('.')
                params.append(
                    `filters[$or][${i}][${relation}][${attribute}][$containsi]`,
                    query
                )
            } else {
                params.append(`filters[$or][${i}][${field}][$containsi]`, query)
            }
        }
    }

    // Sorting
    let sortArray: Array<{ id: string; desc: boolean }>

    if (typeof sort === 'string') {
        try {
            sortArray = JSON.parse(sort)
        } catch (e) {
            console.warn('Invalid sort parameter, using default sorting')
            sortArray = defaults.sort
        }
    } else {
        sortArray = sort
    }

    if (sortArray && sortArray.length > 0) {
        sortArray.forEach((sortItem, index) => {
            const direction = sortItem.desc ? 'desc' : 'asc'
            params.append(`sort[${index}]`, `${sortItem.id}:${direction}`)
        })
    }

    return params.toString()
}

export const searchParamsCache = createSearchParamsCache({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    sort: getSortingStateParser<Company>().withDefault([
        { id: 'createdAt', desc: true },
    ]),
    name: parseAsString.withDefault(''),
    // advanced filter
    filters: getFiltersStateParser().withDefault([]),
    joinOperator: parseAsStringEnum(['and', 'or']).withDefault('and'),
})

export function getValidFilters<TData>(
    filters: ExtendedColumnFilter<TData>[]
): ExtendedColumnFilter<TData>[] {
    return filters.filter(
        filter =>
            filter.operator === 'isEmpty' ||
            filter.operator === 'isNotEmpty' ||
            (Array.isArray(filter.value)
                ? filter.value.length > 0
                : filter.value !== '' &&
                  filter.value !== null &&
                  filter.value !== undefined)
    )
}

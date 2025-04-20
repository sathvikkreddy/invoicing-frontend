import { DataTableSkeleton } from '~/components/data-table/data-table-skeleton'
import { getCompanies } from './actions'
import React from 'react'
import CompaniesTable from './tables/companies-table'
import { CreateCompanyDialog } from './dialogs/create-company-dialog'
import { buildStrapiFilters } from '~/lib/utils'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

const Companies = async (props: { searchParams: SearchParams }) => {
    const searchParams = await props.searchParams
    const strapiFilterString = buildStrapiFilters(
        { ...searchParams, query: searchParams.name as string },
        ['name', 'gst_number']
    )
    console.log('strapiFilters: ', strapiFilterString)
    const companiesPromise = getCompanies({ queryString: strapiFilterString })
    return (
        <div>
            <div className='flex justify-between items-center p-2'>
                <div className='text-xl font-semibold'>Companies</div>
                <CreateCompanyDialog />
            </div>
            <React.Suspense
                fallback={
                    <DataTableSkeleton
                        columnCount={5}
                        filterCount={1}
                        cellWidths={['10rem', '8rem', '10rem', '10rem', '6rem']}
                        shrinkZero
                    />
                }
            >
                <CompaniesTable companiesPromise={companiesPromise} />
            </React.Suspense>
        </div>
    )
}

export default Companies

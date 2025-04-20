import { CreateInvoiceDialog } from './dialogs/create-invoice-dialog'
import { getCompanies } from '../companies/actions'
import { buildStrapiFilters } from '~/lib/utils'
import React from 'react'
import { DataTableSkeleton } from '~/components/data-table/data-table-skeleton'
import { getInvoices } from './actions'
import InvoicesTable from './tables/invoices-table'
import { format } from 'date-fns'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

const Invoices = async (props: { searchParams: SearchParams }) => {
    const searchParams = await props.searchParams
    const strapiFilterString = buildStrapiFilters(
        { ...searchParams, query: searchParams.invoice_number as string },
        ['invoice_number', 'bill_to_company.name']
    )
    let dateFilterString = ''
    if (searchParams.date && !Array.isArray(searchParams.date)) {
        const [fromDateRaw, toDateRaw] = searchParams.date.split(',')

        if (fromDateRaw && toDateRaw) {
            const fromDateFormatted = format(
                new Date(Number(fromDateRaw)),
                'yyyy-MM-dd'
            )
            const toDateFormatted = format(
                new Date(Number(toDateRaw)),
                'yyyy-MM-dd'
            )
            const params = new URLSearchParams()
            params.append('filters[$and][2][date][$gte]', fromDateFormatted)
            params.append('filters[$and][3][date][$lte]', toDateFormatted)

            dateFilterString = params.toString()
        }
    }
    const invoicesPromise = getInvoices({
        queryString: strapiFilterString + '&' + dateFilterString,
    })
    return (
        <>
            <div className='flex justify-between items-center p-2 pt-0'>
                <div className='text-xl font-semibold'>Invoices</div>
                <CreateInvoiceDialog />
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
                <InvoicesTable invoicesPromise={invoicesPromise} />
            </React.Suspense>
        </>
    )
}

export default Invoices

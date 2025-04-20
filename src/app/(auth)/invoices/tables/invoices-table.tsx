'use client'

import { useDataTable } from '~/hooks/use-data-table'
import { use, useEffect, useState } from 'react'
import { getInvoicesTableColumns } from './columns'
import type { Invoice, StrapiCollectionResponse } from '~/types/strapi'
import { DataTable } from '~/components/data-table/data-table'
import { DataTableToolbar } from '~/components/data-table/data-table-toolbar'
import { DataTableSortList } from '~/components/data-table/data-table-sort-list'
import type { DataTableRowAction } from '~/types/data-table'
import type { getInvoices } from '../actions'
import { UpdateInvoiceDialog } from '../dialogs/update-invoice-dialog'
import { Button } from '~/components/ui/button'
import { exportTableToCSV } from '~/lib/export-table'
import { Upload } from 'lucide-react'
import { redirect } from 'next/navigation'

interface InvoicesTableProps {
    invoicesPromise: Promise<Awaited<ReturnType<typeof getInvoices>>>
}

const InvoicesTable = ({ invoicesPromise }: InvoicesTableProps) => {
    const invoices = use(invoicesPromise)
    const [rowAction, setRowAction] =
        useState<DataTableRowAction<Invoice> | null>(null)
    const { table } = useDataTable<Invoice>({
        data: invoices?.data ?? [],
        columns: getInvoicesTableColumns({ setRowAction }),
        // Pass the total number of pages for the table
        pageCount: invoices?.meta.pagination.pageCount ?? 1,
        initialState: {
            sorting: [{ id: 'date', desc: true }],
            pagination: {
                pageIndex: invoices?.meta.pagination.page ?? 1,
                pageSize: invoices?.meta.pagination.pageSize ?? 25,
            },
            columnVisibility: {
                'bill_to_company.gst_number': false,
                address2: false,
                address3: false,
                createdAt: false,
            },
        },
        // Unique identifier for rows, can be used for unique row selection
        getRowId: row => row.id.toString(),
    })

    return (
        <>
            <DataTable table={table}>
                <DataTableToolbar table={table}>
                    <Button
                        variant='outline'
                        size='sm'
                        onClick={() =>
                            exportTableToCSV(table, {
                                filename: `Invoices`,
                            })
                        }
                    >
                        Export <Upload />
                    </Button>
                    <DataTableSortList table={table} />
                </DataTableToolbar>
            </DataTable>
            <UpdateInvoiceDialog
                open={rowAction?.variant === 'update'}
                onOpenChange={() => setRowAction(null)}
                invoice={rowAction?.row.original ?? null}
            />
        </>
    )
}

export default InvoicesTable

'use client'

import { useDataTable } from '~/hooks/use-data-table'
import type { getCompanies } from '../actions'
import { use, useState } from 'react'
import { getCompaniesTableColumns } from './columns'
import type { Company } from '~/types/strapi'
import { DataTable } from '~/components/data-table/data-table'
import { DataTableToolbar } from '~/components/data-table/data-table-toolbar'
import { DataTableSortList } from '~/components/data-table/data-table-sort-list'
import type { DataTableRowAction } from '~/types/data-table'
import { UpdateCompanyDialog } from '../dialogs/update-company-dialog'
import { DataTableFilterList } from '~/components/data-table/data-table-filter-list'

interface CompaniesTableProps {
    companiesPromise: Promise<Awaited<ReturnType<typeof getCompanies>>>
}

const CompaniesTable = ({ companiesPromise }: CompaniesTableProps) => {
    const companies = use(companiesPromise)
    const [rowAction, setRowAction] =
        useState<DataTableRowAction<Company> | null>(null)

    const { table } = useDataTable<Company>({
        data: companies?.data ?? [],
        columns: getCompaniesTableColumns({ setRowAction }),
        // Pass the total number of pages for the table
        pageCount: companies?.meta.pagination.pageCount ?? 1,
        initialState: {
            sorting: [{ id: 'createdAt', desc: true }],
            pagination: {
                pageIndex: companies?.meta.pagination.page ?? 1,
                pageSize: companies?.meta.pagination.pageSize ?? 25,
            },
            columnVisibility: {
                address2: false,
                createdAt: false,
                address3: false,
            },
        },
        // Unique identifier for rows, can be used for unique row selection
        getRowId: row => row.id.toString(),
    })

    return (
        <>
            <DataTable table={table}>
                <DataTableToolbar table={table}>
                    <DataTableFilterList
                        table={table}
                        shallow={false}
                        throttleMs={3000}
                    />
                    <DataTableSortList table={table} />
                </DataTableToolbar>
            </DataTable>
            <UpdateCompanyDialog
                open={rowAction?.variant === 'update'}
                onOpenChange={() => setRowAction(null)}
                company={rowAction?.row.original ?? null}
            />
        </>
    )
}

export default CompaniesTable

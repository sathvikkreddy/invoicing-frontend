'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { Ellipsis, MoreHorizontal } from 'lucide-react'

import { Button } from '~/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import type { Company, Invoice } from '~/types/strapi'

// export const companyColumns: ColumnDef<Company>[] = [
//     {
//         id: 'name',
//         accessorKey: 'name',
//         header: 'Name',
//     },
//     {
//         id: 'gst_number',
//         accessorKey: 'gst_number',
//         header: 'GST Number',
//     },
//     {
//         accessorKey: 'payment_terms',
//         header: 'Payment Terms',
//     },
//     {
//         id: 'actions',
//         cell: ({ row }) => {
//             const company = row.original

//             return (
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button variant='ghost' className='h-8 w-8 p-0'>
//                             <span className='sr-only'>Open menu</span>
//                             <MoreHorizontal className='h-4 w-4' />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align='end'>
//                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                         <DropdownMenuItem
//                             onClick={() =>
//                                 navigator.clipboard.writeText(
//                                     company.id.toString()
//                                 )
//                             }
//                         >
//                             Copy payment ID
//                         </DropdownMenuItem>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem>View customer</DropdownMenuItem>
//                         <DropdownMenuItem>
//                             View payment details
//                         </DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             )
//         },
//     },
//     // ...
// ]

import { Text } from 'lucide-react'
import { DataTableColumnHeader } from '~/components/data-table/data-table-column-header'
import type { Dispatch, SetStateAction } from 'react'
import type { DataTableRowAction } from '~/types/data-table'
import { format } from 'date-fns'
import Link from 'next/link'

export function getInvoicesTableColumns({
    setRowAction,
}: {
    setRowAction: Dispatch<SetStateAction<DataTableRowAction<Invoice> | null>>
}): ColumnDef<Invoice>[] {
    return [
        {
            id: 'date',
            accessorKey: 'date',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title='Date' />
            ),
            cell: ({ row }) => (
                <div>{format(row.original.date, 'dd-MM-yyyy')}</div>
            ),
            meta: {
                label: 'Date Range',
                placeholder: 'Search Date...',
                variant: 'dateRange',
                icon: Text,
            },
            enableColumnFilter: true,
        },
        {
            // Provide an unique id for the column
            // This id will be used as query key for the column filter
            id: 'invoice_number',
            accessorKey: 'invoice_number',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title='Invoice No.' />
            ),
            cell: ({ row }) => <div>{row.original.invoice_number}</div>,
            // Define the column meta options for sorting, filtering, and view options
            meta: {
                label: 'Invoice No.',
                placeholder: 'Search Invoice...',
                variant: 'text',
                icon: Text,
            },
            // By default, the column will not be filtered. Set to `true` to enable filtering.
            enableColumnFilter: true,
        },
        {
            id: 'bill_to_company.name',
            accessorKey: 'bill_to_company.name',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title='Bill to' />
            ),
            cell: ({ row }) => <div>{row.original.bill_to_company.name}</div>,
            meta: {
                label: 'Bill to',
                placeholder: 'Search Bill to...',
                variant: 'text',
                icon: Text,
            },
        },
        {
            id: 'bill_to_company.gst_number',
            accessorKey: 'bill_to_company.gst_number',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title='Bill to GST' />
            ),
            cell: ({ row }) => (
                <div>{row.original.bill_to_company.gst_number}</div>
            ),
            meta: {
                label: 'Bill to GST',
                placeholder: 'Search Bill to GST...',
                variant: 'text',
                icon: Text,
            },
        },
        {
            id: 'total_quantity',
            accessorKey: 'total_quantity',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title='Quantity' />
            ),
            cell: ({ row }) => <div>{row.original.total_quantity}</div>,
            meta: {
                label: 'Quantity',
                placeholder: 'Search Quantity...',
                variant: 'text',
                icon: Text,
            },
        },
        {
            id: 'cgst_amount',
            accessorKey: 'cgst_amount',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title='CGST' />
            ),
            cell: ({ row }) => <div>{row.original.cgst_amount}</div>,
            meta: {
                label: 'CGST',
                placeholder: 'Search CGST...',
                variant: 'text',
                icon: Text,
            },
        },
        {
            id: 'sgst_amount',
            accessorKey: 'sgst_amount',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title='SGST' />
            ),
            cell: ({ row }) => <div>{row.original.sgst_amount}</div>,
            meta: {
                label: 'SGST',
                placeholder: 'Search SGST...',
                variant: 'text',
                icon: Text,
            },
        },
        {
            id: 'igst_amount',
            accessorKey: 'igst_amount',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title='IGST' />
            ),
            cell: ({ row }) => <div>{row.original.igst_amount}</div>,
            meta: {
                label: 'IGST',
                placeholder: 'Search IGST...',
                variant: 'text',
                icon: Text,
            },
        },
        {
            id: 'invoice_amount',
            accessorKey: 'invoice_amount',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title='Amount' />
            ),
            cell: ({ row }) => <div>{row.original.invoice_amount}</div>,
            meta: {
                label: 'Amount',
                placeholder: 'Search Amount...',
                variant: 'text',
                icon: Text,
            },
        },
        {
            id: 'createdAt',
            accessorKey: 'createdAt',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title='Created At' />
            ),
            cell: ({ row }) => <div>{row.getValue('createdAt')}</div>,
            meta: {
                label: 'Created At',
                placeholder: 'Search Created At...',
                variant: 'date',
                icon: Text,
            },
            enableHiding: true,
        },
        {
            id: 'actions',
            cell: function Cell({ row }) {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                aria-label='Open menu'
                                variant='ghost'
                                className='flex size-8 p-0 data-[state=open]:bg-muted'
                            >
                                <Ellipsis
                                    className='size-4'
                                    aria-hidden='true'
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className='w-40'>
                            <DropdownMenuItem
                            // onSelect={() =>
                            //     setRowAction({ row, variant: 'view' })
                            // }
                            >
                                <Link
                                    href={`/invoices/${row.original.documentId}`}
                                    className='w-full'
                                >
                                    View
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() =>
                                    setRowAction({ row, variant: 'update' })
                                }
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                variant='destructive'
                                onSelect={() =>
                                    setRowAction({ row, variant: 'delete' })
                                }
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
            size: 40,
        },
    ]
}

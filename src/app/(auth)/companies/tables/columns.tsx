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
import type { Company } from '~/types/strapi'

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

export function getCompaniesTableColumns({
    setRowAction,
}: {
    setRowAction: Dispatch<SetStateAction<DataTableRowAction<Company> | null>>
}): ColumnDef<Company>[] {
    return [
        // {
        //     id: 'select',
        //     header: ({ table }) => (
        //         <Checkbox
        //             checked={
        //                 table.getIsAllPageRowsSelected() ||
        //                 (table.getIsSomePageRowsSelected() && 'indeterminate')
        //             }
        //             onCheckedChange={value =>
        //                 table.toggleAllPageRowsSelected(!!value)
        //             }
        //             aria-label='Select all'
        //             className='translate-y-0.5'
        //         />
        //     ),
        //     cell: ({ row }) => (
        //         <Checkbox
        //             checked={row.getIsSelected()}
        //             onCheckedChange={value => row.toggleSelected(!!value)}
        //             aria-label='Select row'
        //             className='translate-y-0.5'
        //         />
        //     ),
        //     enableSorting: false,
        //     enableHiding: false,
        //     size: 40,
        // },
        {
            // Provide an unique id for the column
            // This id will be used as query key for the column filter
            id: 'name',
            accessorKey: 'name',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title='Name' />
            ),
            cell: ({ row }) => <div>{row.original.name}</div>,
            // Define the column meta options for sorting, filtering, and view options
            meta: {
                label: 'Name',
                placeholder: 'Search Company...',
                variant: 'text',
                icon: Text,
            },
            // By default, the column will not be filtered. Set to `true` to enable filtering.
            enableColumnFilter: true,
        },
        {
            id: 'gst_number',
            accessorKey: 'gst_number',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title='GST Number' />
            ),
            cell: ({ row }) => <div>{row.getValue('gst_number')}</div>,
            meta: {
                label: 'GST Number',
                placeholder: 'Search GST Number...',
                variant: 'text',
                icon: Text,
            },
        },
        {
            id: 'address',
            accessorKey: 'address',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title='Address' />
            ),
            cell: ({ row }) => <div>{row.original.address.address_line_1}</div>,
            meta: {
                label: 'Address',
                placeholder: 'Search Address...',
                variant: 'text',
                icon: Text,
            },
        },
        {
            id: 'address_state',
            accessorKey: 'address_state',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title='State' />
            ),
            cell: ({ row }) => (
                <div>
                    {row.original.address.state +
                        ` (${row.original.address.state_code})`}
                </div>
            ),
            meta: {
                label: 'State',
                placeholder: 'Search State...',
                variant: 'text',
                icon: Text,
            },
        },
        {
            accessorKey: 'payment_terms',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title='Payment Terms' />
            ),
            cell: ({ row }) => <div>{row.getValue('payment_terms')}</div>,
            meta: {
                label: 'Payment Terms',
                placeholder: 'Search Payment Terms...',
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
                                onSelect={() =>
                                    setRowAction({ row, variant: 'update' })
                                }
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
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

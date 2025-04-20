import React from 'react'
import { Skeleton } from '~/components/ui/skeleton'

const InvoiceLoading = () => {
    return (
        <>
            <div className='flex justify-between items-center p-2'>
                <div className='text-xl font-semibold flex gap-2'>
                    Invoice: <Skeleton className='w-52 h-8' />
                </div>
            </div>
            <div className='mt-4 p-2'>
                <Skeleton className='w-full h-screen' />
            </div>
        </>
    )
}

export default InvoiceLoading

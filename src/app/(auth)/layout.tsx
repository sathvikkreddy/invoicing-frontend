import React, { type ReactNode } from 'react'
import { AppSidebar } from '~/components/sidebar/app-sidebar'
import {
    SidebarTrigger,
    SidebarInset,
    SidebarProvider,
} from '~/components/ui/sidebar'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import Link from 'next/link'
import { Toaster } from '~/components/ui/sonner'

const AuthLayout = ({ children }: { children: ReactNode }) => {
    const breadcrumbItems = [
        { label: 'Home', url: '/' },
        { label: 'Invoices', url: '/invoices' },
    ]
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className='h-screen'>
                {/* <header className='bg-sidebar sticky top-0 flex h-16 shrink-0 opacity-100 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
                    <div className='flex w-full justify-between px-4'>
                        <div className='flex items-center justify-start gap-2'>
                            <SidebarTrigger className='-ml-1' />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {breadcrumbItems.map(
                                        (breadcrumbItem, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className='flex items-center gap-2'
                                                >
                                                    {index !== 0 && (
                                                        <BreadcrumbSeparator className='hidden md:block' />
                                                    )}
                                                    <BreadcrumbItem>
                                                        {index !==
                                                        breadcrumbItems.length -
                                                            1 ? (
                                                            <BreadcrumbLink
                                                                asChild
                                                            >
                                                                <Link
                                                                    href={
                                                                        breadcrumbItem.url
                                                                    }
                                                                >
                                                                    {
                                                                        breadcrumbItem.label
                                                                    }
                                                                </Link>
                                                            </BreadcrumbLink>
                                                        ) : (
                                                            <BreadcrumbPage>
                                                                {
                                                                    breadcrumbItem.label
                                                                }
                                                            </BreadcrumbPage>
                                                        )}
                                                    </BreadcrumbItem>
                                                </div>
                                            )
                                        }
                                    )}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </div>
                </header> */}
                <main className='h-full p-4'>{children}</main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default AuthLayout

'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import api from '~/lib/axios'
import { auth } from '~/server/auth'
import {
    type AddInvoice,
    type Invoice,
    type StrapiCollectionResponse,
} from '~/types/strapi'

export const getInvoices = async (props?: { queryString?: string }) => {
    const session = await auth()
    const queryString = props?.queryString ?? ''
    if (session?.strapiToken) {
        try {
            const response = await api.get(
                `/api/invoices?populate=*&${queryString}`,
                {
                    headers: { Authorization: `Bearer ${session.strapiToken}` },
                }
            )
            return response.data as StrapiCollectionResponse<Invoice>
        } catch (error) {
            console.error('Error fetching users:', error)
            return null
        }
    }
    redirect('/unauthorized')
}

export const getInvoice = async (invoiceId: string) => {
    const session = await auth()
    if (session?.strapiToken) {
        try {
            const response = await api.get(
                `/api/invoices/${invoiceId}?populate[items]=*&populate[bill_to_company][populate]=address&populate[ship_to_company][populate]=address`,
                {
                    headers: { Authorization: `Bearer ${session.strapiToken}` },
                }
            )

            return response.data.data as Invoice
        } catch (error) {
            return null
        }
    }
    redirect('/')
}

export const getInvoicesByCompany = async (companyId: number) => {
    const slnp_jwt = localStorage.getItem('slnp_jwt')
    if (!slnp_jwt) return null

    try {
        const response = await api.get(
            `/api/invoices?filters[bill_to_company][id][$eq]=${companyId}&populate[items]=*&populate[bill_to_company][populate]=address&populate[ship_to_company][populate]=address`,
            {
                headers: { Authorization: `Bearer ${slnp_jwt}` },
            }
        )

        return response.data.data as Invoice[]
    } catch (error) {
        console.error('Error fetching invoices by company:', error)
        return null
    }
}

export const createInvoice = async (invoiceData: AddInvoice) => {
    const session = await auth()
    if (session?.strapiToken) {
        try {
            console.log({ data: invoiceData })
            const response = await api.post(
                '/api/invoices',
                { data: invoiceData },
                {
                    headers: { Authorization: `Bearer ${session.strapiToken}` },
                }
            )
            revalidatePath('/invoices')
            return response.data.data as Invoice
        } catch (error) {
            console.error('Error creating invoice:', error)
            return null
        }
    }
    redirect('/unauthorized')
}

export const getNextInvoiceNumber = async (prefix?: string) => {
    const session = await auth()
    if (session?.strapiToken) {
        try {
            const response = await api.get(`/api/invoice/next-number`, {
                headers: { Authorization: `Bearer ${session.strapiToken}` },
            })

            return response.data as { prefix: string; nextNumber: number }
        } catch (error) {
            console.error('Error fetching invoice:', error)
            return null
        }
    }
    redirect('/')
}

export const updateInvoice = async (
    id: string,
    invoiceData: Partial<AddInvoice>
) => {
    const session = await auth()
    if (session?.strapiToken) {
        console.log(JSON.stringify({ data: invoiceData }))
        try {
            const response = await api.put(
                `/api/invoices/${id}`,
                { data: invoiceData },
                {
                    headers: { Authorization: `Bearer ${session.strapiToken}` },
                }
            )
            revalidatePath('/invoices')
            return response.data.data as Invoice
        } catch (error) {
            console.error('Error creating invoice:', JSON.stringify(error))
            return null
        }
    }
    redirect('/unauthorized')
}

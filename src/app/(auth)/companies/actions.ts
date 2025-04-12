'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import api from '~/lib/axios'
import { buildStrapiFilters, type FilterOptions } from '~/lib/utils'
import { auth } from '~/server/auth'
import {
    type AddCompany,
    type Company,
    type StrapiResponse,
} from '~/types/strapi'

export const getCompanies = async (props?: { queryString?: string }) => {
    const queryString = props?.queryString ?? ''
    const session = await auth()
    if (session?.strapiToken) {
        try {
            // Make API request with filters
            const response = await api.get(
                `/api/companies?populate=*&${queryString}`,
                {
                    headers: { Authorization: `Bearer ${session.strapiToken}` },
                }
            )

            return response.data as StrapiResponse<Company>
        } catch (error) {
            console.error('Error fetching companies:', error)
            return null
        }
    }
    redirect('/unauthorized')
}

export const createCompany = async (companyData: AddCompany) => {
    const session = await auth()
    if (session?.strapiToken) {
        try {
            const response = await api.post(
                '/api/companies',
                { data: companyData },
                {
                    headers: { Authorization: `Bearer ${session.strapiToken}` },
                }
            )

            return response.data.data as Company
        } catch (error) {
            console.error('Error creating company:', error)
            return null
        }
    }
    redirect('/unauthorized')
}

export const updateCompany = async (
    id: string,
    companyData: Partial<AddCompany>
) => {
    const session = await auth()
    if (session?.strapiToken) {
        try {
            const response = await api.put(
                `/api/companies/${id}`,
                { data: companyData },
                {
                    headers: { Authorization: `Bearer ${session.strapiToken}` },
                }
            )
            revalidatePath('/companies')

            return response.data.data as Company
        } catch (error) {
            console.error(
                `Error updating company with id ${id}:`,
                JSON.stringify(error)
            )
            return null
        }
    }
    redirect('/unauthorized')
}

export const deleteCompany = async (id: number) => {
    const session = await auth()
    if (session?.strapiToken) {
        try {
            const response = await api.delete(`/api/companies/${id}`, {
                headers: { Authorization: `Bearer ${session.strapiToken}` },
            })

            return response.data.data as Company
        } catch (error) {
            console.error(`Error deleting company with id ${id}:`, error)
            return null
        }
    }
    redirect('/unauthorized')
}

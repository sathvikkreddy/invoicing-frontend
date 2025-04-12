'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'

import { Button } from '~/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import type { AddCompany, Company } from '~/types/strapi'
import { updateCompany } from '../actions'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~/components/ui/form'
import { useRouter } from 'next/navigation'

interface UpdateCompanyDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    company: Company | null
}

export function UpdateCompanyDialog({
    open,
    onOpenChange,
    company,
}: UpdateCompanyDialogProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<AddCompany>({
        defaultValues: {
            name: '',
            payment_terms: '',
            gst_number: '',
            address: {
                state: '',
                state_code: 36,
                address_line_1: '',
                address_line_2: '',
                address_line_3: '',
            },
        },
    })

    const { control, handleSubmit, reset } = form

    useEffect(() => {
        if (company) {
            const { id, ...addressWithoutId } = company.address
            reset({
                name: company.name,
                payment_terms: company.payment_terms ?? '',
                gst_number: company.gst_number,
                address: addressWithoutId,
            })
        }
    }, [company, reset])

    const router = useRouter()

    const onSubmit = async (data: AddCompany) => {
        if (!company) return

        setIsSubmitting(true)
        try {
            console.log(company.documentId, data)
            await updateCompany(company.documentId, data)
            onOpenChange(false)
            router.refresh()
        } catch (error) {
            console.error('Failed to update company:', JSON.stringify(error))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Update Company</DialogTitle>
                            <DialogDescription>
                                Update the company details. Click save when you
                                are done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className='flex justify-between my-2'>
                            <div className='flex flex-col gap-2'>
                                <FormField
                                    control={control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Acme Inc Pvt. Ltd.'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name='gst_number'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>GST Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='36ABFFS.....'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name='payment_terms'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Payment Terms</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='30 Days'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name='address.state'
                                    render={({ field }) => (
                                        <FormItem className='mt-auto'>
                                            <FormLabel>State</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Telangana'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <FormField
                                    control={control}
                                    name='address.address_line_1'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Sy. No 143, IDA...'
                                                    {...field}
                                                    value={field.value ?? ''}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name='address.address_line_2'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder='Suraram, Hyderabad...'
                                                    {...field}
                                                    value={field.value ?? ''}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name='address.address_line_3'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder='Pincode: 500054...'
                                                    {...field}
                                                    value={field.value ?? ''}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name='address.state_code'
                                    render={({ field }) => (
                                        <FormItem className='mt-auto'>
                                            <FormLabel>State Code</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='number'
                                                    placeholder='36'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type='button'
                                variant='outline'
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>
                            <Button type='submit' disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        Updating...
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

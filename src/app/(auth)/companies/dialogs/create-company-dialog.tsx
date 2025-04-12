'use client'

import { useState } from 'react'
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
    DialogTrigger,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import type { AddCompany } from '~/types/strapi'
import { createCompany } from '../actions'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~/components/ui/form'

export function CreateCompanyDialog() {
    const [open, setOpen] = useState(false)
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

    const onSubmit = async (data: AddCompany) => {
        setIsSubmitting(true)
        try {
            await createCompany(data)
            setOpen(false)
            reset()
        } catch (error) {
            console.error('Failed to create company:', JSON.stringify(error))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Company</Button>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Create Company</DialogTitle>
                            <DialogDescription>
                                Add a new company to your system. Fill out the
                                details below.
                            </DialogDescription>
                        </DialogHeader>
                        <div className='flex justify-between my-2'>
                            <div className='flex flex-col gap-2'>
                                <FormField
                                    control={control}
                                    name='name'
                                    rules={{ required: 'Required' }}
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
                                    rules={{ required: 'Required' }}
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
                                    rules={{ required: 'Required' }}
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
                                    rules={{ required: 'Required' }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Sy. No 143, IDA...'
                                                    {...field}
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
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name='address.state_code'
                                    rules={{
                                        required: 'Required',
                                        minLength: {
                                            value: 1,
                                            message: 'Min: 1',
                                        },
                                        maxLength: {
                                            value: 2,
                                            message: 'Max: 99',
                                        },
                                    }}
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
                                onClick={() => {
                                    reset()
                                    setOpen(false)
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type='submit' disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        Creating...
                                    </>
                                ) : (
                                    'Create'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

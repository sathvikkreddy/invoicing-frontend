import { getInvoice } from '../actions'
import { notFound } from 'next/navigation'
import axios from 'axios'
import type { Invoice, InvoiceItem } from '~/types/strapi'

const Invoice = async ({
    params,
}: {
    params: Promise<{ documentId: string }>
}) => {
    const { documentId } = await params
    const invoice = await getInvoice(documentId)
    if (!invoice) {
        notFound()
    }

    return (
        <>
            <div className='flex justify-between items-center p-2'>
                <div className='text-xl font-semibold'>
                    Invoice: {invoice.invoice_number}
                    {/* Invoice: {'SLNP/2025-26/1'} */}
                </div>
            </div>
            <div className='w-full grid grid-cols-12 p-2 border'>
                <div className='text-center text-2xl font-semibold col-span-12'>
                    SAI LAKSHMI NARASIMHA PACKAGINGS
                </div>
                <div className='text-center text-sm col-span-12'>
                    Email ID : slnpackagings@gmail.com
                </div>
                <div className='text-center text-sm col-span-12'>
                    Cell No.: 9000780007
                </div>
                <div className='text-center text-sm col-span-12'>
                    GSTIN : 36CVWPK4641J1ZX
                </div>
                <div className='flex justify-center items-center text-xl font-semibold col-span-11 row-span-2'>
                    TAX INVOICE
                </div>
                <div className='text-end text-sm col-span-1'>Original</div>
                <div className='text-end text-sm col-span-1'>Duplicate</div>
                <div className='text-center text-sm col-span-11'>
                    ( Under Rule 7 GST )
                </div>
                <div className='text-end text-sm col-span-1'>Original</div>
                <div className='col-span-6'>
                    <div className='text-xl font-semibold'>
                        Invoice No.: SLNP/2025-26/150
                    </div>
                    <div>State: Telangana</div>
                    <div>PO & Date:</div>
                    <div>Bill To:</div>
                    <div className='text-xl font-semibold'>
                        Name: {invoice.bill_to_company.name}
                    </div>
                    <div>
                        Address:{' '}
                        {invoice.bill_to_company.address.address_line_1}
                    </div>
                    <div>{invoice.bill_to_company.address.address_line_2}</div>
                    <div>{invoice.bill_to_company.address.address_line_3}</div>
                    <div className='text-xl font-semibold'>
                        GSTIN: {invoice.bill_to_company.gst_number}
                    </div>
                    <div>
                        State: {invoice.bill_to_company.address.state} (
                        {invoice.bill_to_company.address.state_code})
                    </div>
                </div>
                <div className='col-span-6'>
                    <div className='text-xl font-semibold'>
                        Invoice Date: {invoice.date}
                    </div>
                    <div>E-Way Bill No.: {invoice.eway_bill_number}</div>
                    <div>Vehicle No.: {invoice.vehicle_number}</div>
                    <div>Ship To:</div>
                    <div className='text-xl font-semibold'>
                        Name: {invoice.ship_to_company.name}
                    </div>
                    <div>
                        Address:{' '}
                        {invoice.ship_to_company.address.address_line_1}
                    </div>
                    <div>{invoice.ship_to_company.address.address_line_2}</div>
                    <div>{invoice.ship_to_company.address.address_line_3}</div>
                    <div className='text-xl font-semibold'>
                        GSTIN: {invoice.ship_to_company.gst_number}
                    </div>
                    <div>
                        State: {invoice.ship_to_company.address.state} (
                        {invoice.ship_to_company.address.state_code})
                    </div>
                </div>
                <div className='font-semibold'>S.No</div>
                <div className='font-semibold col-span-5'>
                    Product Description
                </div>
                <div className='font-semibold col-span-6 grid grid-cols-5'>
                    <div className='font-semibold'>HSN Code</div>
                    <div className='font-semibold'>Quantity</div>
                    <div className='font-semibold'>Units</div>
                    <div className='font-semibold'>Unit Price</div>
                    <div className='font-semibold text-end'>Price</div>
                </div>
                {invoice.items.map((invoiceItem, i) => {
                    return (
                        <InvoiceItemRow
                            key={invoiceItem.id}
                            invoiceItem={invoiceItem}
                            sNo={i + 1}
                        />
                    )
                })}
                <div className='text-end col-span-8'>
                    Total Quantity: {invoice.total_quantity}
                </div>
                <div className='col-start-10 col-span-2'>Amount:</div>
                <div className='text-end'>{invoice.total_amount}</div>
                <div className='col-span-6 row-span-2'>
                    Amount in words: Three Thousand
                </div>
                <div className='col-start-10 col-span-2'>Transport</div>
                <div className='text-end '>{invoice.transport_amount}</div>
                <div className='col-span-9 font-semibold'>Bank Details:</div>
                <div className='col-start-10 col-span-2'>Taxable Amount:</div>
                <div className='text-end '>{invoice.taxable_amount}</div>
                <div className='col-span-9'>Name: Union Bank Of India</div>
                <div className='col-start-10 col-span-2'>CGST:</div>
                <div className='text-end '>{invoice.cgst_amount}</div>
                <div className='col-span-9'>
                    Branch: HMT INDL.EST., Hyderabad, Telangana
                </div>
                <div className='col-start-10 col-span-2'>SGST:</div>
                <div className='text-end '>{invoice.sgst_amount}</div>
                <div className='col-span-9'>A/C No.: 0212 1110 0003 378</div>
                <div className='col-start-10 col-span-2'>IGST:</div>
                <div className='text-end '>{invoice.igst_amount}</div>
                <div className='col-span-9'>IFSC: UBIN0802123</div>
                <div className='col-start-10 col-span-2'>Invoice Amount:</div>
                <div className='text-end '>{invoice.invoice_amount}</div>
                <div className='col-span-6'>
                    <div>Note:</div>
                    <div>
                        Terms of Payment:{' '}
                        {invoice.bill_to_company.payment_terms}
                    </div>
                    <div>Goods once sold cannot be accepted in return</div>
                    <div>
                        Interest at 24% will be charged on bill if not paid with
                        due date
                    </div>
                </div>

                <div className='col-span-2 row-span-4'>Invoice Amount:</div>
                <div className='col-span-4 text-end'>
                    <div className='text-xs'>
                        Certified that the particulars given above are true and
                        correct
                    </div>
                    <div className='font-semibold'>
                        For SAI LAKHSMI NARASIMHA PACKAGINGS
                    </div>
                    <div className='h-16'>Sign</div>
                    <div>Authorized Signatory</div>
                </div>

                <div className='col-span-12 text-center'>
                    Subject to Hyderabad Jurisdiction Only
                </div>
            </div>
        </>
    )
}

export default Invoice

// deploymentID: AKfycbyTXD1c0FseTAq1YSE0wuy3jdhvBlDD-hDtbKGI3laGPR2CC1te-KmAUVrUohJ2KEk6
// web-app: https://script.google.com/macros/s/AKfycbyTXD1c0FseTAq1YSE0wuy3jdhvBlDD-hDtbKGI3laGPR2CC1te-KmAUVrUohJ2KEk6/exec

const postInvoiceToSheet = async (invoice: Invoice) => {
    const res = await axios.post(
        'https://script.google.com/macros/s/AKfycbyTXD1c0FseTAq1YSE0wuy3jdhvBlDD-hDtbKGI3laGPR2CC1te-KmAUVrUohJ2KEk6/exec',
        invoice,
        { headers: { 'Content-Type': 'application/json' } }
    )
    console.log(res)
    return res
}

const InvoiceItemRow = ({
    sNo,
    invoiceItem,
}: {
    sNo?: number
    invoiceItem?: InvoiceItem
}) => {
    return (
        <div className='col-span-12 grid grid-cols-12'>
            <div className='row-span-4'>{sNo}</div>
            <div className='col-span-5'>
                <div>{invoiceItem?.title}</div>
                <div>{invoiceItem?.description_line_1}</div>
                <div>{invoiceItem?.description_line_2}</div>
                <div>{invoiceItem?.description_line_3}</div>
            </div>
            <div className='row-span-4 col-span-6 grid grid-cols-5'>
                <div>{invoiceItem?.hsn_code}</div>
                <div>{invoiceItem?.quantity}</div>
                <div>{invoiceItem?.unit}</div>
                <div>{invoiceItem?.unit_price}</div>
                <div className='text-end'>{invoiceItem?.amount}</div>
            </div>
        </div>
    )
}

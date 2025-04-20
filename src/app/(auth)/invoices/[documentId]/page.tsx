import { getInvoice } from '../actions'
import { notFound } from 'next/navigation'
import axios from 'axios'

const Invoice = async ({
    params,
}: {
    params: Promise<{ documentId: string }>
}) => {
    const { documentId } = await params
    // await new Promise(res => {
    //     setTimeout(() => res(''), 10000)
    // })
    const invoice = await getInvoice(documentId)
    if (!invoice) {
        notFound()
    }
    // const res = await axios.post(
    //     'https://script.google.com/macros/s/AKfycbyTXD1c0FseTAq1YSE0wuy3jdhvBlDD-hDtbKGI3laGPR2CC1te-KmAUVrUohJ2KEk6/exec',
    //     invoice,
    //     { headers: { 'Content-Type': 'application/json' } }
    // )
    // console.log(res)
    return (
        <>
            <div className='flex justify-between items-center p-2'>
                <div className='text-xl font-semibold'>
                    Invoice: {invoice.invoice_number}
                </div>
            </div>
            <div className='mt-4 p-2'>
                <iframe
                    src='https://docs.google.com/spreadsheets/d/11Sage9UA1Q9-8JPfssS5Jw0bzr5CLqV0fuytTbF1fYw/edit?usp=sharing'
                    width='100%'
                    height='600'
                    className='border rounded'
                ></iframe>
            </div>
        </>
    )
}

export default Invoice

// deploymentID: AKfycbyTXD1c0FseTAq1YSE0wuy3jdhvBlDD-hDtbKGI3laGPR2CC1te-KmAUVrUohJ2KEk6
// web-app: https://script.google.com/macros/s/AKfycbyTXD1c0FseTAq1YSE0wuy3jdhvBlDD-hDtbKGI3laGPR2CC1te-KmAUVrUohJ2KEk6/exec

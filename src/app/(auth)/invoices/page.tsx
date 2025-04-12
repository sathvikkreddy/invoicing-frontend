import { AddInvoiceDialog } from './components/AddInvoiceDialog'
import { getCompanies } from '../companies/actions'

const Invoices = async () => {
    const companiesResponse = await getCompanies()
    return (
        <div>
            <AddInvoiceDialog companies={companiesResponse?.data ?? []} />
        </div>
    )
}

export default Invoices

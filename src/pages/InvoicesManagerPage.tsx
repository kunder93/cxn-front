import React from 'react'
import InvoicesTable from '../components/Invoices/InvoicesTable'
import { INVOICES_URL } from '../resources/server_urls'
import { useAxiosGetInvoices } from '../utility/CustomAxios'

const CompanyManagerPage: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error, loaded } = useAxiosGetInvoices(INVOICES_URL)
    console.log(error)
    return <div>{loaded && <InvoicesTable data={data.invoicesList} />}</div>
}

export default CompanyManagerPage
import React from 'react'

import InvoicesTable from '../components/Invoices/InvoicesTable'

import { useAxiosGetInvoices } from '../utility/CustomAxios'
import { INVOICES_URL } from '../resources/server_urls'

function CompanyManagerPage() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error, loaded } = useAxiosGetInvoices(INVOICES_URL)
    return <div>{loaded && <InvoicesTable data={data.invoicesList} />}</div>
}

export default CompanyManagerPage

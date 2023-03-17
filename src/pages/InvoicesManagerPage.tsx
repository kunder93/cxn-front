import React,{ useState }from 'react'
import { Button } from 'react-bootstrap'

import InvoicesTable from '../components/InvoicesTable'
import MyVerticallyCenteredModal from '../components/CreateInvoiceModal'
import {useAxiosGetInvoices} from '../utility/CustomAxios'
import {INVOICES_URL} from '../resources/server_urls'

  function CompanyManagerPage() {
    const [modalShow, setModalShow] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error, loaded } = useAxiosGetInvoices(
      INVOICES_URL)
      console.log("HOLIIII"+data.invoicesList)
    return (
        <div>
          {loaded? <InvoicesTable data={data.invoicesList}/> : ''}
          <Button variant="primary"  onClick = {()=> setModalShow(true)} >Create new Invoice</Button>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
    )
  }

export default CompanyManagerPage
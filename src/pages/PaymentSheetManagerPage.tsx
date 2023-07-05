import React,{ useState }from 'react'
import { Button } from 'react-bootstrap'

import {useAxiosGetPaymentSheets} from '../utility/CustomAxios'
import {PAYMENT_SHEET_URL} from '../resources/server_urls'
import PaymentSheetTable from '../components/PaymentSheet/PaymentSheetTable'
import CreatePaymentSheetModal from '../components/PaymentSheet/CreatePaymentSheetModal'

  function PaymentSheetManagerPage() {
    const [createPaymentSheetModalShow, setCreatePaymentSheetModalShow] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error, loaded } = useAxiosGetPaymentSheets(
      PAYMENT_SHEET_URL)
      console.log("HOLIIII"+data)
    return (
        <div>
          {loaded? <PaymentSheetTable data={data.paymentSheetsList}/> : ''}
          <Button variant="primary"  onClick = {()=> setCreatePaymentSheetModalShow(true)} >Crear hoja de pagos</Button>
          <CreatePaymentSheetModal
            show={createPaymentSheetModalShow}
            onHide={() => setCreatePaymentSheetModalShow(false)}
          />
        </div>
    )
  }

export default PaymentSheetManagerPage
import React, { useState, useEffect } from 'react'
import { Alert, Button, Container } from 'react-bootstrap'
import { useAxiosGetPaymentSheets } from '../utility/CustomAxios'
import { PAYMENT_SHEET_URL } from '../resources/server_urls'
import PaymentSheetTable from '../components/PaymentSheet/PaymentSheetTable'
import CreatePaymentSheetModal from '../components/PaymentSheet/CreatePaymentSheetModal'
import styled from 'styled-components'
import LoadingTableContainer from '../components/Common/LoadingTableSpinnerContainer'
import { IPaymentSheet } from 'components/Types/Types'

const ErrorMessage = styled(Alert)`
    margin-top: 20px;
`
const Title = styled.h1`
    text-align: left;
    margin-top: 10px;
    color: #333;
`
const NoCompaniesMessage = styled.p`
    text-align: center;
    margin-top: 20px;
`

const PaymentSheetManagerPage: React.FC = () => {
    const [createPaymentSheetModalShow, setCreatePaymentSheetModalShow] = useState(false)
    const { data, error, loaded } = useAxiosGetPaymentSheets(PAYMENT_SHEET_URL)
    const [paymentSheets, setPaymentSheets] = useState<IPaymentSheet[]>([])

    useEffect(() => {
        if (data?.paymentSheetsList) {
            setPaymentSheets(data.paymentSheetsList)
        }
    }, [data])

    const addRow = (newRow: IPaymentSheet) => {
        setPaymentSheets((prevSheets) => [...prevSheets, newRow])
    }

    const deleteRow = (paymentSheetIdentifier: number) => {
        setPaymentSheets((prevSheets) => prevSheets.filter((sheet) => sheet.paymentSheetIdentifier !== paymentSheetIdentifier))
    }

    if (error) {
        return <ErrorMessage variant="danger">Error: {error.message ?? 'Ocurrió un error al cargar las hojas de pago.'}</ErrorMessage>
    }

    if (!loaded) {
        return <LoadingTableContainer />
    }

    return (
        <Container>
            <Title>Gestión de hojas de pago / liquidación</Title>
            {paymentSheets.length ? (
                <PaymentSheetTable initialData={paymentSheets} deleteRow={deleteRow} />
            ) : (
                <NoCompaniesMessage>No hay hojas de pago disponibles</NoCompaniesMessage>
            )}
            <Button variant="primary" onClick={() => setCreatePaymentSheetModalShow(true)}>
                Crear hoja de pago
            </Button>
            <CreatePaymentSheetModal show={createPaymentSheetModalShow} onHide={() => setCreatePaymentSheetModalShow(false)} addRow={addRow} />
        </Container>
    )
}

export default PaymentSheetManagerPage

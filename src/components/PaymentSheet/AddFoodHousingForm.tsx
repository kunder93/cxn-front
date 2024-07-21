import axios, { AxiosError } from 'axios'
import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import BootstrapForm from 'react-bootstrap/Form'
import styled from 'styled-components'
import { PAYMENT_SHEET_URL } from '../../resources/server_urls'
import { IFoodHousing } from '../Types/Types'
import useNotification, { NotificationType } from '../../components/Common/hooks/useNotification'
import FloatingNotificationA from '../../components/Common/FloatingNotificationA'
import * as Yup from 'yup'

const StyledErrorMessage = styled(ErrorMessage)`
    color: red;
    font-weight: bold;
`

const FieldRow = styled(Row)`
    padding-bottom: 1em;
    align-items: center;
    label {
        font-weight: bold;
    }
`

const InputRow = styled(Row)`
    align-content: end;
`

interface AddFoodHousingFormProps {
    paymentSheetIdentifier: number
    addPaymentSheetFoodHousing: (paymentSheetId: number, foodHousingData: IFoodHousing) => void
}

const validationSchema = Yup.object({
    amountDays: Yup.number()
        .required('Es necesario poner una cantidad de días.')
        .positive('La cantidad de días debe ser un número positivo.')
        .min(1, 'No se aceptan cantidad de días menores a 1.')
        .max(30, 'La cantidad de días no puede ser mayor a 30'),

    dayPrice: Yup.number()
        .required('Es necesario poner un precio por día.')
        .positive('El precio por día debe ser un valor positivo.')
        .max(75, 'No se acepta más de 75 euros por día.')
})

export const AddFoodHousingForm: React.FC<AddFoodHousingFormProps> = ({ paymentSheetIdentifier, addPaymentSheetFoodHousing }) => {
    const initialValues: IFoodHousing = { amountDays: 0, dayPrice: 0, overnight: false }
    const { notification, showNotification, hideNotification } = useNotification()

    return (
        <Formik
            validateOnChange
            validateOnMount
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                const foodHousingData: IFoodHousing = { amountDays: values.amountDays, dayPrice: values.dayPrice, overnight: values.overnight }
                axios
                    .post(PAYMENT_SHEET_URL + '/' + paymentSheetIdentifier + '/addFoodHousing', foodHousingData)
                    .then(() => {
                        showNotification('Manutención - alojamiento añadido correctamente.', NotificationType.Success)
                        addPaymentSheetFoodHousing(paymentSheetIdentifier, foodHousingData)
                       
                    })
                    .catch((error) => {
                        const axiosError = error as AxiosError
                        showNotification(axiosError.message, NotificationType.Error)
                    })
                    .finally(() => {
                        actions.setSubmitting(false)
                    })
            }}
        >
            {({ isSubmitting, dirty, isValid }) => (
                <BootstrapForm as={Form}>
                    <Container as={BootstrapForm.Group}>
                        <FieldRow>
                            <Col md={3}>
                                <BootstrapForm.Label htmlFor="amountDays">Cantidad de dias:</BootstrapForm.Label>
                            </Col>
                            <Col md={9}>
                                <Field
                                    as={BootstrapForm.Control}
                                    id="amountDays"
                                    name="amountDays"
                                    step="1"
                                    type="number"
                                    placeholder="Cantidad de dias."
                                    min={'0'}
                                />
                            </Col>
                        </FieldRow>
                        <Row>
                            <Col md={3}></Col>
                            <Col md={9}>
                                <StyledErrorMessage name="amountDays" component={'p'}></StyledErrorMessage>
                            </Col>
                        </Row>
                        <FieldRow>
                            <Col md={3}>
                                <BootstrapForm.Label htmlFor="dayPrice">Precio por día: (€)</BootstrapForm.Label>
                            </Col>
                            <Col md={9}>
                                <Field
                                    as={BootstrapForm.Control}
                                    id="dayPrice"
                                    type="number"
                                    step="0.01"
                                    name="dayPrice"
                                    placeholder="Cantidad de cada día."
                                    min={'0'}
                                />
                            </Col>
                        </FieldRow>
                        <Row>
                            <Col md={3}></Col>
                            <Col md={9}>
                                <StyledErrorMessage name="dayPrice" component={'p'}></StyledErrorMessage>
                            </Col>
                        </Row>

                        <FieldRow>
                            <Col md={3}>
                                <BootstrapForm.Label htmlFor="overnight">Con pernocta? </BootstrapForm.Label>
                            </Col>
                            <Col md={9}>
                                <Field as={BootstrapForm.Check} id="overnight" name="overnight" />
                            </Col>
                        </FieldRow>
                        <Row>
                            <Col md={3}></Col>
                            <Col md={9}>
                                <StyledErrorMessage name="overnight" component={'p'}></StyledErrorMessage>
                            </Col>
                        </Row>
                        <InputRow>
                            <Button variant="success" disabled={isSubmitting || !isValid || !dirty} type="submit">
                                {isSubmitting ? (
                                    <>
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Añadiendo...
                                    </>
                                ) : (
                                    'Añadir comida - alojamiento'
                                )}
                            </Button>
                        </InputRow>
                    </Container>
                    <FloatingNotificationA notification={notification} hideNotification={hideNotification} />
                </BootstrapForm>
            )}
        </Formik>
    )
}

export default AddFoodHousingForm

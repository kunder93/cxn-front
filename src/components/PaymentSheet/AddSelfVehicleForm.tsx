/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios'
import React, { useEffect } from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { Alert, Button, Col, Collapse, Container, Row } from 'react-bootstrap'
import { ExclamationTriangle } from 'react-bootstrap-icons'
import BootstrapForm from 'react-bootstrap/Form'
import styled from 'styled-components'
import { PAYMENT_SHEET_URL } from '../../resources/server_urls'
import { FloatingNotificationContainer } from '../Common/FloatingNotificationContainer'
import { ISelfVehicle } from '../Types/Types'

const ErrorMessage = styled.div`
    color: red;
`

const ErrorAlert = styled(Alert)`
    color: red;
    font-size: 1em;
    background-color: white;
    margin: 3px;
    padding: 0.5em 1.5em;
    border: 1px solid palevioletred;
    border-radius: 10px;
`

const ErrorTriangle = styled(ExclamationTriangle)`
    height: 10%;
    width: 10%;
`

const FloatingNotification: React.FC<{ message: string; variant: string; onClose: () => void }> = ({ message, variant, onClose }) => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
        }, 5000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    const handleExited = () => {
        onClose()
    }

    return (
        <Collapse in={visible} onExited={handleExited}>
            <FloatingNotificationContainer>
                <Alert variant={variant} onClose={onClose} dismissible>
                    {message}
                </Alert>
            </FloatingNotificationContainer>
        </Collapse>
    )
}

export const AddSelfVehicleForm: React.FC<any> = (props: any) => {
    const initialValues: ISelfVehicle = { places: '', distance: 0.0, kmPrice: 0.0 }
    const [alertMessage, setAlertMessage] = useState('')
    const [submitSuccessNotification, setSubmitSuccessNotification] = useState(false)
    const [submitErrorNotification, setSubmitErrorNotification] = useState(false)
    const [isWellSubmited, setIsWellSubmited] = useState(false)
    const closeAlert = () => {
        setAlertMessage('')
    }
    function changeSuccessNotificationState(): void {
        setSubmitSuccessNotification(false)
    }
    function changeErrorNotificationState(): void {
        setSubmitErrorNotification(false)
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                const selfVehicleData = { places: values.places, distance: values.distance, kmPrice: values.kmPrice }
                axios
                    .post<any>(PAYMENT_SHEET_URL + '/' + props.data + '/addSelfVehicle', selfVehicleData)
                    .then((response) => {
                        console.log(response)
                        setSubmitSuccessNotification(true)
                        setIsWellSubmited(true)
                    })
                    .catch((error) => {
                        setSubmitErrorNotification(true)
                        if (error.response.data) {
                            // Request made and server responded
                            setAlertMessage(error.response.data.content)
                        } else if (error.request) {
                            // The request was made but no response was received
                            setAlertMessage('Error: no hay respuesta.')
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            setAlertMessage('Error: algo inesperado. Recarga o intentalo mas tarde.')
                        }
                    })
                //console.log('submited Login')
                actions.setSubmitting(false)
            }}
            //validationSchema={CreateCompanyValidationSchema}
            validateOnChange={true}
        >
            {({ errors, touched }) => (
                <BootstrapForm as={Form}>
                    <Container as={BootstrapForm.Group}>
                        <Row>
                            <Col>
                                <BootstrapForm.Label htmlFor="places">Lugares:</BootstrapForm.Label>
                                <Field as={BootstrapForm.Control} id="places" name="places" type="text" placeholder="Lugares visitados." />
                            </Col>
                        </Row>
                        <Row>
                            <Col>{errors.places && touched.places ? <ErrorMessage>{errors.places}</ErrorMessage> : ''}</Col>
                        </Row>
                        <Row>
                            <Col>
                                <BootstrapForm.Label htmlFor="distance">Distancia (kilometros):</BootstrapForm.Label>
                                <Field
                                    as={BootstrapForm.Control}
                                    id="distance"
                                    type="number"
                                    step="0.01"
                                    name="distance"
                                    placeholder="La distancia recorrida en Km"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>{errors.distance && touched.distance ? <ErrorMessage>{errors.distance}</ErrorMessage> : ''}</Col>
                        </Row>

                        <Row>
                            <Col>
                                <BootstrapForm.Label htmlFor="kmPrice">Precio por KM (Euros):</BootstrapForm.Label>
                                <Field
                                    as={BootstrapForm.Control}
                                    id="kmPrice"
                                    type="number"
                                    name="kmPrice"
                                    step="0.01"
                                    placeholder="Precio por kilometro en euros."
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>{errors.kmPrice && touched.kmPrice ? <ErrorMessage>{errors.kmPrice}</ErrorMessage> : ''}</Col>
                        </Row>
                        <Button disabled={isWellSubmited} type="submit">
                            Añadir vehiculo propio
                        </Button>
                    </Container>
                    {
                        <Container>
                            {alertMessage ? (
                                <>
                                    <ErrorAlert key={'danger'} variant={'danger'}>
                                        <ErrorTriangle></ErrorTriangle>
                                        {alertMessage}
                                        <Button variant="outline-danger" onClick={closeAlert}>
                                            Cerrar
                                        </Button>
                                    </ErrorAlert>
                                </>
                            ) : (
                                ''
                            )}
                        </Container>
                    }
                    {submitSuccessNotification && (
                        <FloatingNotification
                            message={'Vehiculo propio añadido.'}
                            variant={'success'}
                            onClose={changeSuccessNotificationState}
                        ></FloatingNotification>
                    )}
                    {submitErrorNotification && (
                        <FloatingNotification message={alertMessage} variant={'danger'} onClose={changeErrorNotificationState}></FloatingNotification>
                    )}
                </BootstrapForm>
            )}
        </Formik>
    )
}

export default AddSelfVehicleForm

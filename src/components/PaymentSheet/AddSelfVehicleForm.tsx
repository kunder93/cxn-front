import React from 'react'
import axios from 'axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps } from 'formik'
import { PAYMENT_SHEET_URL } from '../../resources/server_urls'
import { useState } from 'react'
import { Alert, Button, Col, Container, Row } from 'react-bootstrap'
import BootstrapForm from 'react-bootstrap/Form'
import styled from 'styled-components'
import { ExclamationTriangle } from 'react-bootstrap-icons'
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


export const AddSelfVehicleForm: React.FC<any> = (props:any) => {
    const initialValues: ISelfVehicle = { places: '', distance: 0, kmPrice: 0 }
    const [alertMessage, setAlertMessage] = useState('')
    const closeAlert = () => {
        setAlertMessage('')
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                const selfVehicleData = { places: values.places, distance: values.distance, kmPrice: values.kmPrice }
                axios
                    .post<any>(PAYMENT_SHEET_URL + "/" + props.data + "/addSelfVehicle", selfVehicleData)
                    .then((response) => {
                        console.log(response)
                    })
                    .catch((error) => {
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
                                <BootstrapForm.Label htmlFor="distance">Distancia:</BootstrapForm.Label>
                                <Field as={BootstrapForm.Control} id="distance" type="number" step="0.01" name="distance" placeholder="La distancia recorrida en Km" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>{errors.distance && touched.distance ? <ErrorMessage>{errors.distance}</ErrorMessage> : ''}</Col>
                        </Row>
                        
                        <Row>
                            <Col>
                                <BootstrapForm.Label htmlFor="kmPrice">Distancia:</BootstrapForm.Label>
                                <Field as={BootstrapForm.Control} id="kmPrice" type="number" name="kmPrice" step="0.01" placeholder="Precio por kilometro en euros." />
                            </Col>
                        </Row>
                        <Row>
                            <Col>{errors.kmPrice && touched.kmPrice ? <ErrorMessage>{errors.kmPrice}</ErrorMessage> : ''}</Col>
                        </Row>

                        <Button type="submit">Añadir vehiculo propio</Button>
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
                </BootstrapForm>
            )}
        </Formik>
    )
}

export default AddSelfVehicleForm

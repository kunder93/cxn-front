import React from 'react'
import axios from 'axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps } from 'formik'
import { COMPANIES_URL, SIGN_UP_URL } from '../resources/server_urls'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Alert, Button, Col, Container, Row } from 'react-bootstrap'
import { CreateCompanyValidationSchema } from '../pages/validation/FormValidationSchemas'
import BootstrapForm from 'react-bootstrap/Form'
import styled from 'styled-components'
import { ExclamationTriangle } from 'react-bootstrap-icons'
import { ICompany } from './Types/Types'

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

export interface LoginFormValues {
    nifCif: string
    name: string
    identityTaxNumber: string
    address: string
}

export const CreateCompanyForm: React.FC<any> = () => {
    const initialValues: LoginFormValues = { nifCif: '', name: '', identityTaxNumber: '', address: ''}
    const navigate = useNavigate()
    const [alertMessage, setAlertMessage] = useState('')
    const closeAlert = () => {
        setAlertMessage('')
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                const userData = { nifCif: values.nifCif, name: values.name, 
                                    identityTaxNumber: values.identityTaxNumber, address: values.address}
                axios
                    .post<ICompany>(COMPANIES_URL, userData)
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
            validationSchema={CreateCompanyValidationSchema}
            validateOnChange={true}
        >
            {({ errors, touched }) => (
                <BootstrapForm as={Form}>
                    <Container as={BootstrapForm.Group}>
                        <Row>
                            <Col>
                                <BootstrapForm.Label htmlFor="nifCif">Nif o Cif:</BootstrapForm.Label>
                                <Field as={BootstrapForm.Control} id="nifCif" name="nifCif" type="text" placeholder="El NIF o CIF" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>{errors.nifCif && touched.nifCif ? <ErrorMessage>{errors.nifCif}</ErrorMessage> : ''}</Col>
                        </Row>
                        <Row>
                            <Col>
                                <BootstrapForm.Label htmlFor="name">Nombre:</BootstrapForm.Label>
                                <Field as={BootstrapForm.Control} id="name" type="text" name="name" placeholder="El nombre" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>{errors.name && touched.name ? <ErrorMessage>{errors.name}</ErrorMessage> : ''}</Col>
                        </Row>
                        <Row>
                            <Col>
                                <BootstrapForm.Label htmlFor="identityTaxNumber">Nombre:</BootstrapForm.Label>
                                <Field as={BootstrapForm.Control} id="identityTaxNumber" name="identityTaxNumber" type="text" placeholder="Numero de identificacion fiscal" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>{errors.identityTaxNumber && touched.identityTaxNumber ? <ErrorMessage>{errors.identityTaxNumber}</ErrorMessage> : ''}</Col>
                        </Row>
                        <Row>
                            <Col>
                                <BootstrapForm.Label htmlFor="address">Direccion:</BootstrapForm.Label>
                                <Field as={BootstrapForm.Control} id="address" name="address" type="text" placeholder="La direccion" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>{errors.address && touched.address ? <ErrorMessage>{errors.address}</ErrorMessage> : ''}</Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button type="submit" disabled={errors.nifCif || errors.name || errors.identityTaxNumber || errors.address ? true : false}>
                                    Registrar
                                </Button>
                            </Col>
                        </Row>
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

export default CreateCompanyForm
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { Alert, Button, Col, Collapse, Container, Row } from 'react-bootstrap'
import { CreateCompanyValidationSchema } from '../../pages/validation/FormValidationSchemas'
import BootstrapForm from 'react-bootstrap/Form'
import { COMPANIES_URL } from '../../resources/server_urls'
import { CreateCompanyFormButtonsContainer } from './CompaniesStyles'
import { CreateCompanyFormValues, ICompany } from './Types'
import { FormErrorMessage } from '../Common/FormErrorMessage'
import { FloatingNotificationContainer } from '../Common/FloatingNotificationContainer'

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

const CreateCompanyForm = (props: any) => {
    const initialValues: CreateCompanyFormValues = { nif: '', name: '', address: '' }
    const [alertMessage, setAlertMessage] = useState('')
    const [submitSuccessNotification, setSubmitSuccessNotification] = useState(false)
    const [submitErrorNotification, setSubmitErrorNotification] = useState(false)
    const handleSubmit = async (values: CreateCompanyFormValues, actions: FormikHelpers<CreateCompanyFormValues>) => {
        try {
            const companyData = {
                nif: values.nif,
                name: values.name,
                address: values.address
            }

            await axios.post<ICompany>(COMPANIES_URL, companyData)
            props.updateCompaniesList(companyData)
            setSubmitSuccessNotification(true)
        } catch (error: any) {
            setSubmitErrorNotification(true)

            if (error.response?.data) {
                // Request made and server responded
                setAlertMessage(error.response.data.content)
            } else if (error.request) {
                // The request was made but no response was received
                setAlertMessage('Error: no hay respuesta.')
            } else {
                // Something happened in setting up the request that triggered an Error
                setAlertMessage('Error: algo inesperado. Recarga o intentalo mas tarde.')
            }
        }

        actions.resetForm()
        actions.setSubmitting(false)
    }

    function changeSuccessNotificationState(): void {
        setSubmitSuccessNotification(false)
    }
    function changeErrorNotificationState(): void {
        setSubmitErrorNotification(false)
    }
    return (
        <Container>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => handleSubmit(values, actions)}
                validationSchema={CreateCompanyValidationSchema}
                validateOnChange={true}
            >
                {({ errors, touched }) => (
                    <BootstrapForm as={Form}>
                        <Container as={BootstrapForm.Group}>
                            <Row>
                                <Col>
                                    <BootstrapForm.Label htmlFor="nif">NIF:</BootstrapForm.Label>
                                    <Field as={BootstrapForm.Control} id="nif" name="nif" type="text" placeholder="El NIF" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>{errors.nif && touched.nif ? <FormErrorMessage>{errors.nif}</FormErrorMessage> : ''}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <BootstrapForm.Label htmlFor="name">Nombre:</BootstrapForm.Label>
                                    <Field as={BootstrapForm.Control} id="name" type="text" name="name" placeholder="El nombre" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>{errors.name && touched.name ? <FormErrorMessage>{errors.name}</FormErrorMessage> : ''}</Col>
                            </Row>

                            <Row>
                                <Col>
                                    <BootstrapForm.Label htmlFor="address">Direccion:</BootstrapForm.Label>
                                    <Field as={BootstrapForm.Control} id="address" name="address" type="text" placeholder="La direccion" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>{errors.address && touched.address ? <FormErrorMessage>{errors.address}</FormErrorMessage> : ''}</Col>
                            </Row>
                            <Row>
                                <CreateCompanyFormButtonsContainer>
                                    <Button type="submit" disabled={errors.nif ?? errors.name ?? errors.address ? true : false}>
                                        Registrar empresa
                                    </Button>
                                </CreateCompanyFormButtonsContainer>
                            </Row>

                            {submitSuccessNotification && (
                                <FloatingNotification
                                    message={'COMPAÑIA REGISTRADA CON EXITO'}
                                    variant={'success'}
                                    onClose={changeSuccessNotificationState}
                                ></FloatingNotification>
                            )}
                            {submitErrorNotification && (
                                <FloatingNotification message={alertMessage} variant={'danger'} onClose={changeErrorNotificationState}></FloatingNotification>
                            )}
                        </Container>
                    </BootstrapForm>
                )}
            </Formik>
        </Container>
    )
}

export default CreateCompanyForm

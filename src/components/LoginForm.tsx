/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as React from 'react'
import axios from 'axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Formik, Form, Field } from 'formik'
import { LOGIN_URL } from '../resources/server_urls'
import { useAppDispatch } from '../store/hooks'
import { useNavigate } from 'react-router-dom'
import { setJwt } from '../store/slices/user'
import { useState } from 'react'
import { Alert, Button, Col, Container, Row } from 'react-bootstrap'
import { LogInValidationSchema } from '../pages/validation/FormValidationSchemas'
import BootstrapForm from 'react-bootstrap/Form'
import styled from 'styled-components'
import { ExclamationTriangle } from 'react-bootstrap-icons'

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
    email: string
    password: string
}

export const LoginForm: React.FC<any> = () => {
    const initialValues: LoginFormValues = { email: '', password: '' }
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [alertMessage, setAlertMessage] = useState('')
    const closeAlert = () => {
        setAlertMessage('')
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                const userData = { email: values.email, password: values.password }
                axios
                    .post(LOGIN_URL, userData)
                    .then((response) => {
                        dispatch(setJwt(response.data.jwt))
                        navigate('/')
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
            validationSchema={LogInValidationSchema}
            validateOnChange={true}
        >
            {({ errors, touched }) => (
                <BootstrapForm as={Form}>
                    <Container as={BootstrapForm.Group} >
                        <Row>
                            <Col>
                                <BootstrapForm.Label htmlFor="email">Email:</BootstrapForm.Label>
                                <Field as={BootstrapForm.Control}  id="email" name="email" type="text" placeholder="email" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>{errors.email && touched.email ? <ErrorMessage>{errors.email}</ErrorMessage> : ''}</Col>
                        </Row>
                        <Row>
                            <Col>
                                <BootstrapForm.Label htmlFor="password">Password:</BootstrapForm.Label>
                                <Field as={BootstrapForm.Control}  id="password" type="password" name="password" placeholder="password" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>{errors.password && touched.password ? <ErrorMessage>{errors.password}</ErrorMessage> : ''}</Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button type="submit" disabled={errors.email ?? errors.password ? true : false}>
                                    Acceder
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

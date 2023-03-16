import * as React from 'react'
import axios from 'axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps } from 'formik'
import { SIGN_UP_URL } from '../resources/server_urls'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Alert, Button, Col, Container, Row } from 'react-bootstrap'
import { SignUpValidationSchema } from '../pages/validation/FormValidationSchemas'
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
    name: string
    password: string
    first_surname: string
    second_surname: string
    gender: string
    birth_date: Date
}

export const SignUpForm: React.FC<any> = () => {
    const initialValues: LoginFormValues = { email: '', name: '', password: '', first_surname: '', second_surname: '', gender: 'male', birth_date: new Date() }
    const navigate = useNavigate()
    const [alertMessage, setAlertMessage] = useState('')
    const closeAlert = () => {
        setAlertMessage('')
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                const userData = { email: values.email, password: values.password, 
                                    name: values.name, firstSurname: values.first_surname, 
                                    secondSurname: values.second_surname , gender: values.gender,
                                    birthDate: values.birth_date}
                axios
                    .post(SIGN_UP_URL, userData)
                    .then((response) => {
                        navigate("/")
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
            validationSchema={SignUpValidationSchema}
            validateOnChange={true}
        >
            {({ errors, touched }) => (
                <BootstrapForm as={Form}>
                    <Container as={BootstrapForm.Group}>
                        <Row>
                            <Col>
                                <BootstrapForm.Label htmlFor="email">Email:</BootstrapForm.Label>
                                <Field as={BootstrapForm.Control} id="email" name="email" type="text" placeholder="email" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>{errors.email && touched.email ? <ErrorMessage>{errors.email}</ErrorMessage> : ''}</Col>
                        </Row>
                        <Row>
                            <Col>
                                <BootstrapForm.Label htmlFor="password">Password:</BootstrapForm.Label>
                                <Field as={BootstrapForm.Control} id="password" type="password" name="password" placeholder="password" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>{errors.password && touched.password ? <ErrorMessage>{errors.password}</ErrorMessage> : ''}</Col>
                        </Row>
                        <Row>
                            <Col>
                                <BootstrapForm.Label htmlFor="name">Nombre:</BootstrapForm.Label>
                                <Field as={BootstrapForm.Control} id="name" name="name" type="text" placeholder="Tu nombre" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>{errors.name && touched.name ? <ErrorMessage>{errors.name}</ErrorMessage> : ''}</Col>
                        </Row>
                        <Row>
                            <Col>
                                <BootstrapForm.Label htmlFor="first_surname">Primer apellido:</BootstrapForm.Label>
                                <Field as={BootstrapForm.Control} id="first_surname" name="first_surname" type="text" placeholder="Tu primer apellido" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>{errors.first_surname && touched.first_surname ? <ErrorMessage>{errors.first_surname}</ErrorMessage> : ''}</Col>
                        </Row>

                        <Row>
                            <Col>
                                <BootstrapForm.Label htmlFor="second_surname">Segundo apellido:</BootstrapForm.Label>
                                <Field as={BootstrapForm.Control} id="second_surname" name="second_surname" type="text" placeholder="Tu segundo apellido" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>{errors.second_surname && touched.second_surname ? <ErrorMessage>{errors.second_surname}</ErrorMessage> : ''}</Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <BootstrapForm.Label>Género:</BootstrapForm.Label>
                                <Field as={BootstrapForm.Select} name="gender">
                                    <option value="male">Hombre</option>
                                    <option value="female">Mujer</option>
                                    <option value="other">Otro</option>
                                </Field>
                                <BootstrapForm.Text className="text-muted">Selecciona tu género</BootstrapForm.Text>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <BootstrapForm.Label>Fecha de nacimiento:</BootstrapForm.Label>
                                <Field type="date" name="birth_date" max={Date.now()} />
                                {errors.birth_date && touched.birth_date ? <ErrorMessage>{"La fecha debe ser anterior a la de HOY."}</ErrorMessage> : ''}
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Button type="submit" disabled={errors.email || errors.password ? true : false}>
                                    Registrarse
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

export default SignUpForm

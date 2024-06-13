import React, { useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { LOGIN_URL } from '../resources/server_urls'
import { useAppDispatch } from '../store/hooks'
import { useNavigate } from 'react-router-dom'
import { setJwt } from '../store/slices/user'
import { Button, Col, Spinner } from 'react-bootstrap'
import { LogInValidationSchema } from '../pages/validation/FormValidationSchemas'
import BootstrapForm from 'react-bootstrap/Form'
import { ButtonRow, ErrorAlert, ErrorMessage, ErrorTriangle, FormStyledContainer, StyledRow } from './SignUpSingInCommonStyles'

// Form values interface
export interface LoginFormValues {
    email: string
    password: string
}

// Login response interface
export interface LoginAxiosResponse {
    jwt: string
}

// Login form component
const LoginForm: React.FC = () => {
    const initialValues: LoginFormValues = { email: '', password: '' }
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [alertMessage, setAlertMessage] = useState('')

    const closeAlert = () => setAlertMessage('')

    const handleSubmit = async (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
        try {
            const response: AxiosResponse<LoginAxiosResponse> = await axios.post(LOGIN_URL, values)
            dispatch(setJwt(response.data.jwt))
            navigate('/')
        } catch (error) {
            const axiosError = error as AxiosError<{ content: string }>
            setAlertMessage(axiosError.response?.data.content ?? 'Error: algo inesperado. Recarga o inténtalo más tarde.')
        } finally {
            actions.setSubmitting(false)
        }
    }

    return (
        <FormStyledContainer>
            <h1>Entra en zona socios:</h1>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={LogInValidationSchema} validateOnChange>
                {({ errors, touched, isSubmitting, isValid, dirty }) => (
                    <Form>
                        <StyledRow>
                            <Col>
                                <BootstrapForm.Label htmlFor="email">Email:</BootstrapForm.Label>
                                <Field
                                    as={BootstrapForm.Control}
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="email"
                                    autoComplete="email"
                                    isInvalid={!!errors.email && touched.email}
                                />
                                {errors.email && touched.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                            </Col>
                        </StyledRow>
                        <StyledRow>
                            <Col>
                                <BootstrapForm.Label htmlFor="password">Contraseña:</BootstrapForm.Label>
                                <Field
                                    as={BootstrapForm.Control}
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="contraseña"
                                    autoComplete="current-password"
                                    isInvalid={!!errors.password && touched.password}
                                />
                                {errors.password && touched.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                            </Col>
                        </StyledRow>
                        <ButtonRow>
                            <Col xs="auto">
                                <Button type="submit" variant="success" size="lg" disabled={!dirty || !isValid || isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Accediendo...
                                        </>
                                    ) : (
                                        'Acceder'
                                    )}
                                </Button>
                            </Col>
                        </ButtonRow>
                        {alertMessage && (
                            <StyledRow>
                                <Col>
                                    <ErrorAlert variant="danger" onClose={closeAlert} dismissible>
                                        <ErrorTriangle /> {alertMessage}
                                    </ErrorAlert>
                                </Col>
                            </StyledRow>
                        )}
                    </Form>
                )}
            </Formik>
        </FormStyledContainer>
    )
}

export default LoginForm

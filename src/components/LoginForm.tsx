import React, { useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { LOGIN_URL } from '../resources/server_urls'
import { useAppDispatch } from '../store/hooks'
import { useNavigate } from 'react-router-dom'
import { setJwt } from '../store/slices/user'
import { Alert, Button, Col, Row, Spinner } from 'react-bootstrap'
import { LogInValidationSchema } from '../pages/validation/FormValidationSchemas'
import BootstrapForm from 'react-bootstrap/Form'
import styled from 'styled-components'
import { ExclamationTriangle } from 'react-bootstrap-icons'

// Styled components
const ErrorMessage = styled.div`
    color: red;
`

const StyledRow = styled(Row)`
    padding-bottom: 1em;
`

const LoginFormStyledContainer = styled.div`
    background-color: rgba(250, 238, 168, 0.219);
    box-shadow:
        0 0.5em 0.5em -0.3em rgba(0, 0, 0, 0.3),
        0.5em 0 0.5em -0.3em rgba(0, 0, 0, 0.3);
    padding: 1em;
    font-size: 140%;
    padding-left: 18em;
    padding-right: 18em;
    border-radius: 5px;
    @media (max-width: 768px) {
        padding-left: 3em;
        padding-right: 3em;

        input {
            font-size:100%;
        }
        label {
            font-size: 120%
        }
    }
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

const CenteredButtonRow = styled(Row)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100px;
`

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
        <LoginFormStyledContainer>
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
                        <Row>
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
                        </Row>
                        <CenteredButtonRow>
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
                        </CenteredButtonRow>
                        {alertMessage && (
                            <Row>
                                <Col>
                                    <ErrorAlert variant="danger" onClose={closeAlert} dismissible>
                                        <ErrorTriangle /> {alertMessage}
                                    </ErrorAlert>
                                </Col>
                            </Row>
                        )}
                    </Form>
                )}
            </Formik>
        </LoginFormStyledContainer>
    )
}

export default LoginForm

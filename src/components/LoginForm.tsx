import { useState } from 'react'
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
import { ROUTES } from '../resources/routes-constants'

/**
 * Interface representing the structure of login form values.
 * @interface LoginFormValues
 */
export interface LoginFormValues {
    email: string
    password: string
}

/**
 * Interface representing the structure of the login response from the server.
 * @interface LoginAxiosResponse
 */
interface LoginAxiosResponse {
    jwt: string
}

/**
 * LoginForm component allowing users to log in with their email and password.
 *
 * @returns {JSX.Element} The rendered LoginForm component.
 */
const LoginForm = (): JSX.Element => {
    const initialValues: LoginFormValues = { email: '', password: '' }
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [alertMessage, setAlertMessage] = useState('')

    /**
     * Closes the alert by resetting the alert message state.
     */
    const closeAlert = () => setAlertMessage('')

    /**
     * Handles the form submission.
     * Makes a POST request to the login URL with the form values,
     * dispatches the JWT token to the Redux store, and navigates to the profile page.
     *
     * @param {LoginFormValues} values - The values from the login form.
     * @param {FormikHelpers<LoginFormValues>} actions - Formik helper functions.
     */
    const handleSubmit = async (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
        try {
            const response: AxiosResponse<LoginAxiosResponse> = await axios.post(LOGIN_URL, values)
            dispatch(setJwt(response.data.jwt))
            actions.resetForm()
            navigate(ROUTES.MYPROFILE_ROUTE)
        } catch (error) {
            const axiosError = error as AxiosError<{ content: string }>
            if (axiosError.response) {
                setAlertMessage(axiosError.response.data.content)
            } else {
                setAlertMessage('Error: algo inesperado. Recarga o inténtalo más tarde.')
            }
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
                                <BootstrapForm.Label htmlFor="email">Correo electrónico:</BootstrapForm.Label>
                                <Field
                                    as={BootstrapForm.Control}
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                    autoComplete="email"
                                    isInvalid={!!errors.email && touched.email}
                                />
                                {errors.email && touched.email && (
                                    <ErrorMessage>
                                        <strong>{errors.email}</strong>
                                    </ErrorMessage>
                                )}
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
                                    placeholder="Contraseña"
                                    autoComplete="current-password"
                                    isInvalid={!!errors.password && touched.password}
                                />
                                {errors.password && touched.password && (
                                    <ErrorMessage>
                                        <strong>{errors.password}</strong>
                                    </ErrorMessage>
                                )}
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

import React from 'react'
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik'
import styled from 'styled-components'
import { Container, Row, Col, Form as BootstrapForm, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import axios, { AxiosError } from 'axios'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { UNSUBSCRIBE_URL } from 'resources/server_urls'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { NotificationType } from 'components/Common/hooks/useNotification'
import { useNavigate } from 'react-router'
import { removeJwt } from 'store/slices/user'
import { ROUTES } from 'resources/routes-constants'

const StyledErrorMessage = styled(ErrorMessage)`
    color: red;
    font-weight: bold;
`

const StyledFormContainer = styled(Container)`
    padding-top: 1em;

    @media (max-width: 768px) {
        padding: 0.5em; /* Reduce padding en pantallas pequeñas */
    }
`

const StyledFormControl = styled(FormControl)`
    width: 100%;
`

export interface UnsubscribeMemberFormValues {
    currentPassword: string
    confirmCurrentPassword: string
}

export interface UnsubscribeMemberFormProps {
    formikRef: React.RefObject<FormikProps<UnsubscribeMemberFormValues>>
    userEmail: string
}

const UnsubscribeMemberForm = ({ formikRef, userEmail }: UnsubscribeMemberFormProps): JSX.Element => {
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const { showNotification } = useNotificationContext()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(removeJwt())
        navigate(ROUTES.HOMEPAGE_ROUTE)
    }

    const handleSubmit = (
        resetForm: () => void, // Accept resetForm as a parameter
        setSubmitting: (isSubmitting: boolean) => void // To manage the form's submission state
    ) => {
        axios
            .patch(
                UNSUBSCRIBE_URL,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${userJwt}` // Include the JWT in the Authorization header
                    }
                }
            )
            .then(() => {
                // Handle successful response (optional)
                showNotification('Se ha dado de baja correctamente. ', NotificationType.Success)
                resetForm()
                logoutHandler()
            })
            .catch((err) => {
                const error = err as AxiosError
                // Handle errors
                showNotification('Error: ' + error.message, NotificationType.Error)
            })
            .finally(() => {
                setSubmitting(false) // Ensure the submission state is reset
            })
    }

    return (
        <StyledFormContainer>
            <Formik
                innerRef={formikRef}
                initialValues={{ currentPassword: '', confirmCurrentPassword: '' }}
                validate={(values) => {
                    const errors: Partial<UnsubscribeMemberFormValues> = {}
                    if (!values.currentPassword) {
                        errors.currentPassword = 'Debes ingresar tu contraseña.'
                    } else if (values.currentPassword !== values.confirmCurrentPassword) {
                        errors.confirmCurrentPassword = 'Las contraseñas no coinciden.'
                    }
                    return errors
                }}
                onSubmit={(_, { resetForm, setSubmitting }) => {
                    handleSubmit(resetForm, setSubmitting) // Pass resetForm and setSubmitting to handleSubmit
                }}
            >
                {() => (
                    <BootstrapForm as={Form}>
                        <Field type="hidden" name="email" value={userEmail} readOnly autoComplete="username" />
                        <Row>
                            <Col>
                                <FormGroup>
                                    <FormLabel>
                                        <strong>Contraseña actual:</strong>
                                    </FormLabel>
                                    <Field as={StyledFormControl} type="password" name="currentPassword" autoComplete="current-password" />
                                    <StyledErrorMessage name="currentPassword" component="div" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <FormLabel>
                                        <strong>Repite la contraseña actual:</strong>
                                    </FormLabel>
                                    <Field as={StyledFormControl} type="password" name="confirmCurrentPassword" autoComplete="current-password" />
                                    <StyledErrorMessage name="confirmCurrentPassword" component="div" />
                                </FormGroup>
                            </Col>
                        </Row>
                    </BootstrapForm>
                )}
            </Formik>
        </StyledFormContainer>
    )
}

export default UnsubscribeMemberForm

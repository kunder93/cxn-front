// PasswordChangeForm.tsx
import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage, FormikProps, FormikHelpers } from 'formik'
import styled from 'styled-components'
import { Container, Row, Col, Form as BootstrapForm, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import * as Yup from 'yup'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { CHANGE_MEMBER_PASSWORD_URL } from 'resources/server_urls'
import { useNavigate } from 'react-router'
import { NotificationType } from 'components/Common/hooks/useNotification'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { removeJwt, removeUserProfile } from 'store/slices/user'

export interface ChangePasswordFormValues {
    username: string
    currentPassword: string
    newPassword: string
    confirmNewPassword: string
}

export interface ChangePasswordFormProps {
    formikRef: React.RefObject<FormikProps<ChangePasswordFormValues>>
    userEmail: string
    setIsSubmitting?: (isSubmitting: boolean) => void
    setFormIsValid?: (isValid: boolean) => void
}

const StyledErrorMessage = styled(ErrorMessage)`
    color: red;
    font-weight: bold;
    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`

const StyledFormContainer = styled(Container)`
    padding-top: 1em;
    @media (max-width: 768px) {
        padding: 0.5em;
    }
`

const StyledFormGroup = styled(FormGroup)`
    margin-bottom: 1.5em;
    @media (max-width: 768px) {
        margin-bottom: 1em;
    }
`

const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Debes ingresar tu contraseña actual.'),
    newPassword: Yup.string().required('Debes ingresar una nueva contraseña.'),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Las contraseñas no coinciden.')
        .required('Debes confirmar tu nueva contraseña.')
})

// Componente interno para renderizar el formulario y notificar el estado isSubmitting and validity
const InnerPasswordChangeForm: React.FC<{
    formik: FormikProps<ChangePasswordFormValues>
    setIsSubmitting?: (isSubmitting: boolean) => void
    setFormIsValid?: (isValid: boolean) => void
    userEmail: string
}> = ({ formik, setIsSubmitting, setFormIsValid, userEmail }) => {
    useEffect(() => {
        if (setIsSubmitting) {
            setIsSubmitting(formik.isSubmitting)
        }
    }, [formik.isSubmitting, setIsSubmitting])

    // Update to check both isValid and dirty
    useEffect(() => {
        if (setFormIsValid) {
            setFormIsValid(formik.isValid && formik.dirty)
        }
    }, [formik.isValid, formik.dirty, setFormIsValid])

    return (
        <BootstrapForm as={Form} autoComplete="off" aria-autocomplete="none">
            <Field hidden type="hidden" name="username" value={userEmail} autoComplete="off" />
            <Row>
                <Col xs={12}>
                    <StyledFormGroup>
                        <FormLabel>
                            <strong>Contraseña actual:</strong>
                        </FormLabel>
                        <Field as={FormControl} type="password" name="currentPassword" autoComplete="off" />
                        <StyledErrorMessage name="currentPassword" component="div" />
                    </StyledFormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <StyledFormGroup>
                        <FormLabel>
                            <strong>Nueva contraseña:</strong>
                        </FormLabel>
                        <Field as={FormControl} type="password" name="newPassword" autoComplete="off" />
                        <StyledErrorMessage name="newPassword" component="div" />
                    </StyledFormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <StyledFormGroup>
                        <FormLabel>
                            <strong>Confirmar nueva contraseña:</strong>
                        </FormLabel>
                        <Field as={FormControl} type="password" name="confirmNewPassword" autoComplete="off" />
                        <StyledErrorMessage name="confirmNewPassword" component="div" />
                    </StyledFormGroup>
                </Col>
            </Row>
        </BootstrapForm>
    )
}

const PasswordChangeForm = ({ formikRef, userEmail, setIsSubmitting, setFormIsValid }: ChangePasswordFormProps): React.JSX.Element => {
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { showNotification } = useNotificationContext()
    const handleSubmit = (values: ChangePasswordFormValues, { setSubmitting }: FormikHelpers<ChangePasswordFormValues>) => {
        axios
            .patch(
                CHANGE_MEMBER_PASSWORD_URL,
                {
                    currentPassword: values.currentPassword,
                    newPassword: values.newPassword
                },
                {
                    headers: { Authorization: `Bearer ${userJwt ?? ''}` }
                }
            )
            .then(async () => {
                showNotification('Contraseña cambiada.', NotificationType.Success)
                dispatch(removeUserProfile())
                dispatch(removeJwt())
                await navigate('/')
            })
            .catch((error: unknown) => {
                if (axios.isAxiosError(error)) {
                    showNotification('Error: ' + error.message, NotificationType.Error)
                } else {
                    showNotification('Error inesperado.', NotificationType.Error)
                }
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    return (
        <StyledFormContainer>
            <Formik
                innerRef={formikRef}
                initialValues={{
                    username: userEmail,
                    currentPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <InnerPasswordChangeForm formik={formik} setIsSubmitting={setIsSubmitting} setFormIsValid={setFormIsValid} userEmail={userEmail} />
                )}
            </Formik>
        </StyledFormContainer>
    )
}

export default PasswordChangeForm

import React from 'react'
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik'
import styled from 'styled-components'
import { Container, Row, Col, Form as BootstrapForm, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import ChangeUserPasswordResultAlert from './ChangeUserPasswordResultAlert'
import * as Yup from 'yup'

export interface ChangePasswordFormValues {
    username: string
    currentPassword: string
    newPassword: string
    confirmNewPassword: string
}

export interface ChangePasswordFormProps {
    formikRef: React.RefObject<FormikProps<ChangePasswordFormValues>>
    userEmail: string
}

const StyledErrorMessage = styled(ErrorMessage)`
    color: red;
    font-weight: bold;

    @media (max-width: 768px) {
        font-size: 0.9rem; // Ajuste del tamaño del texto en pantallas pequeñas
    }
`

const StyledFormContainer = styled(Container)`
    padding-top: 1em;

    @media (max-width: 768px) {
        padding: 0.5em; // Menor padding en pantallas pequeñas
    }
`

const StyledFormGroup = styled(FormGroup)`
    margin-bottom: 1.5em;

    @media (max-width: 768px) {
        margin-bottom: 1em; // Ajuste del espaciado en pantallas pequeñas
    }
`

const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Debes ingresar tu contraseña actual.'),
    newPassword: Yup.string().required('Debes ingresar una nueva contraseña.'),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Las contraseñas no coinciden.')
        .required('Debes confirmar tu nueva contraseña.')
})

const PasswordChangeForm = ({ formikRef, userEmail }: ChangePasswordFormProps): JSX.Element => {
    const [visibleAlert, setVisibleAlert] = React.useState(false)

    const handleSubmit = () => {
        setVisibleAlert(true)
    }

    return (
        <StyledFormContainer>
            <Formik
                innerRef={formikRef}
                initialValues={{ username: userEmail, currentPassword: '', newPassword: '', confirmNewPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                    <BootstrapForm as={Form}>
                        <Field hidden type="hidden" name="username" value={userEmail} />
                        <Row>
                            <Col xs={12}>
                                <StyledFormGroup>
                                    <FormLabel>
                                        <strong>Contraseña actual:</strong>
                                    </FormLabel>
                                    <Field as={FormControl} type="password" name="currentPassword" autoComplete="current-password" />
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
                                    <Field as={FormControl} type="password" name="newPassword" autoComplete="new-password" />
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
                                    <Field as={FormControl} type="password" name="confirmNewPassword" autoComplete="new-password" />
                                    <StyledErrorMessage name="confirmNewPassword" component="div" />
                                </StyledFormGroup>
                            </Col>
                        </Row>
                        {visibleAlert && (
                            <ChangeUserPasswordResultAlert
                                visibleParam={visibleAlert}
                                closeFunction={setVisibleAlert}
                                formData={{ email: userEmail, currentPassword: values.currentPassword, newPassword: values.newPassword }}
                            />
                        )}
                    </BootstrapForm>
                )}
            </Formik>
        </StyledFormContainer>
    )
}

export default PasswordChangeForm

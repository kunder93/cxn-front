import React from 'react'
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik'
import styled from 'styled-components'
import { Container, Row, Col, Form as BootstrapForm, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import ChangeUserPasswordResultAlert from './ChangeUserPasswordResultAlert'

export interface ChangePasswordFormValues {
    currentPassword: string
    newPassword: string
    confirmNewPassword: string
}

export interface ChangePasswordFormProps {
    formikRef: React.RefObject<FormikProps<ChangePasswordFormValues>>
    userEmail:string
}


const StyledErrorMessage = styled(ErrorMessage)`
    color: red;
`

const StyledFormContainer = styled(Container)`
    padding-top: 1em;
`

const PasswordChangeForm: React.FC<ChangePasswordFormProps> = ({ formikRef, userEmail }) => {
    const [visibleAlert, setVisibleAlert] = React.useState(false)
    const handleSubmit = () => {
        setVisibleAlert(true)
    }
    console.log(visibleAlert);

    return (
        <StyledFormContainer>
            <Formik
                innerRef={formikRef}
                initialValues={{ currentPassword: '', newPassword: '',confirmNewPassword:''  }}
                validate={(values) => {
                    const errors: Partial<ChangePasswordFormValues> = {}
                    if (!values.currentPassword) {
                        errors.currentPassword = 'Debes ingresar tu contraseña actual.'
                    } else if
                     (!values.newPassword) {
                        errors.newPassword = 'Debes ingresar una nueva contraseña.'
                    } else if (values.newPassword !== values.confirmNewPassword) {
                        errors.confirmNewPassword = 'Las contraseñas no coinciden.'
                    }

                    return errors
                }}
                onSubmit={handleSubmit}
            >
                {({values}) => (
                    <BootstrapForm>
                        <Form>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <FormLabel>
                                            <strong>Contraseña actual:</strong>
                                        </FormLabel>
                                        <Field as={FormControl} type="password" name="currentPassword" />
                                        <StyledErrorMessage name="currentPassword" component="div" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <FormLabel>
                                            <strong>Nueva contraseña:</strong>
                                        </FormLabel>
                                        <Field as={FormControl} type="password" name="newPassword" />
                                        <StyledErrorMessage name="newPassword" component="div" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <FormLabel>
                                            <strong>Confirmar nueva contraseña:</strong>
                                        </FormLabel>
                                        <Field as={FormControl} type="password" name="confirmNewPassword" />
                                        <StyledErrorMessage name="confirmNewPassword" component="div" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            {visibleAlert && (
                                <ChangeUserPasswordResultAlert
                                    visibleParam={visibleAlert}
                                    closeFunction={setVisibleAlert}
                                    formData={{email:userEmail, currentPassword:values.currentPassword, newPassword:values.newPassword}}
                                />
                            )}
                        </Form>
                    </BootstrapForm>
                )}
            </Formik>
        </StyledFormContainer>
    )
}

export default PasswordChangeForm

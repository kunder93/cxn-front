import React from 'react'
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik'
import styled from 'styled-components'
import { Container, Row, Col, Form as BootstrapForm, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import ChangeUserEmailResultAlert from './ChangeUserEmailResultAlert'

export interface EmailChangeFormProps {
    initialEmail: string
    formikRef: React.RefObject<FormikProps<ChangeEmailFormValues>>
    buttonDisabledHandler: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ChangeEmailFormValues {
    currentEmail: string
    newEmail: string
    confirmNewEmail: string
}

const StyledErrorMessage = styled(ErrorMessage)`
    color: #e20101;
    font-weight: bold;
`

const StyledFormContainer = styled(Container)`
    padding-top: 1em;
`

const EmailChangeForm: React.FC<EmailChangeFormProps> = ({ initialEmail, formikRef }) => {
    const [visibleAlert, setVisibleAlert] = React.useState(false)

    const handleSubmit = () => {
        setVisibleAlert(true)
    }

    return (
        <StyledFormContainer>
            <Formik
                innerRef={formikRef}
                initialValues={{ confirmNewEmail: '', newEmail: '', currentEmail: initialEmail }}
                validate={(values) => {
                    const errors: Partial<ChangeEmailFormValues> = {}

                    if (!values.newEmail) {
                        errors.newEmail = 'Debes ingresar un nuevo email'
                    } else if (values.newEmail !== values.confirmNewEmail) {
                        errors.confirmNewEmail = 'Los emails no coinciden'
                    }

                    return errors
                }}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                    <BootstrapForm as={Form}>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <FormLabel htmlFor="currentEmail">
                                        <strong>Email actual:</strong>
                                    </FormLabel>
                                    <FormControl type="text" id="currentEmail" name="currentEmail" value={initialEmail} disabled />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <FormLabel htmlFor="newEmail">
                                        <strong>Nuevo Email:</strong>
                                    </FormLabel>
                                    <Field as={FormControl} type="email" id="newEmail" name="newEmail" />
                                    <StyledErrorMessage name="newEmail" component="div" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <FormLabel htmlFor="confirmNewEmail">
                                        <strong>Confirmar Nuevo Email:</strong>
                                    </FormLabel>
                                    <Field as={FormControl} type="email" id="confirmNewEmail" name="confirmNewEmail" />
                                    <StyledErrorMessage name="confirmNewEmail" component="div" />
                                </FormGroup>
                            </Col>
                        </Row>
                        {visibleAlert && (
                            <ChangeUserEmailResultAlert
                                visibleParam={visibleAlert}
                                closeFunction={setVisibleAlert}
                                formData={{ email: values.currentEmail, newEmail: values.newEmail }}
                            />
                        )}
                    </BootstrapForm>
                )}
            </Formik>
        </StyledFormContainer>
    )
}

export default EmailChangeForm

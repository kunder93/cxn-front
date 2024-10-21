import React from 'react'
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik'
import styled from 'styled-components'
import { Container, Row, Col, Form as BootstrapForm, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import UnsubscribeMemberResultAlert from './UnsubscribeMemberResultAlert'

export interface UnsubscribeMemberFormValues {
    currentPassword: string
    confirmCurrentPassword: string
}

export interface UnsubscribeMemberFormProps {
    formikRef: React.RefObject<FormikProps<UnsubscribeMemberFormValues>>
    userEmail: string
}

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
    width: 100%; /* Asegura que el FormControl ocupe el 100% del ancho */
`

const UnsubscribeMemberForm = ({ formikRef, userEmail }: UnsubscribeMemberFormProps): JSX.Element => {
    const [visibleAlert, setVisibleAlert] = React.useState(false)

    const handleSubmit = () => {
        setVisibleAlert(true)
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
                onSubmit={handleSubmit}
            >
                {({ values }) => (
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
                        {visibleAlert && (
                            <UnsubscribeMemberResultAlert
                                visibleParam={visibleAlert}
                                closeFunction={setVisibleAlert}
                                formData={{ email: userEmail, password: values.currentPassword }}
                            />
                        )}
                    </BootstrapForm>
                )}
            </Formik>
        </StyledFormContainer>
    )
}

export default UnsubscribeMemberForm

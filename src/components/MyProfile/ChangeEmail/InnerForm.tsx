import React, { useEffect, useState } from 'react'
import { ErrorMessage, FormikProps } from 'formik'
import styled from 'styled-components'
import { Container, Row, Col, Form as BootstrapForm, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import ChangeUserEmailResultAlert, { ChangeEmailAxiosValues } from './ChangeUserEmailResultAlert'

// Styled components
const StyledErrorMessage = styled(ErrorMessage)`
    color: #e20101;
    font-weight: bold;
`

const StyledFormContainer = styled(Container)`
    padding-top: 1em;

    @media (max-width: 768px) {
        padding: 0.5em; // Reducir el padding en pantallas pequeñas
    }
`

const StyledFormControl = styled(FormControl)`
    width: 100%;

    @media (max-width: 768px) {
        font-size: 0.9rem; // Ajustar tamaño de la fuente para móviles
    }
`

const StyledFormLabel = styled(FormLabel)`
    @media (max-width: 768px) {
        font-size: 1rem; // Ajustar tamaño de la fuente en móviles
    }
`

// Interfaces
export interface EmailChangeFormProps {
    initialEmail: string
    buttonDisabledHandler: (isDisabled: boolean) => void
}

export interface ChangeEmailFormValues {
    currentEmail: string
    newEmail: string
    confirmNewEmail: string
}

// Component
const InnerForm: React.FC<FormikProps<ChangeEmailFormValues> & EmailChangeFormProps> = ({
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    buttonDisabledHandler
}) => {
    useEffect(() => {
        buttonDisabledHandler(!isValid)
    }, [isValid, buttonDisabledHandler])

    const [visibleAlert, setVisibleAlert] = useState(false)
    const [formData, setFormData] = useState<ChangeEmailAxiosValues | null>(null)

    useEffect(() => {
        if (formData) {
            setVisibleAlert(true)
        }
    }, [formData])

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormData({ email: values.currentEmail, newEmail: values.newEmail })
        handleSubmit()
    }

    return (
        <StyledFormContainer>
            <BootstrapForm id="emailChangeForm" onSubmit={onSubmit}>
                <Row>
                    <Col xs={12}>
                        <FormGroup>
                            <StyledFormLabel htmlFor="currentEmail">
                                <strong>Email actual:</strong>
                            </StyledFormLabel>
                            <StyledFormControl type="text" id="currentEmail" name="currentEmail" value={values.currentEmail} disabled />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <FormGroup>
                            <StyledFormLabel htmlFor="newEmail">
                                <strong>Nuevo Email:</strong>
                            </StyledFormLabel>
                            <StyledFormControl type="email" id="newEmail" name="newEmail" onChange={handleChange} onBlur={handleBlur} />
                            <StyledErrorMessage name="newEmail" component="div" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <FormGroup>
                            <StyledFormLabel htmlFor="confirmNewEmail">
                                <strong>Confirmar Nuevo Email:</strong>
                            </StyledFormLabel>
                            <StyledFormControl type="email" id="confirmNewEmail" name="confirmNewEmail" onChange={handleChange} onBlur={handleBlur} />
                            <StyledErrorMessage name="confirmNewEmail" component="div" />
                        </FormGroup>
                    </Col>
                </Row>
            </BootstrapForm>
            {visibleAlert && formData && <ChangeUserEmailResultAlert visibleParam={visibleAlert} closeFunction={setVisibleAlert} formData={formData} />}
        </StyledFormContainer>
    )
}

export default InnerForm

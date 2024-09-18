import React, { useEffect, useState } from 'react'
import { ErrorMessage, FormikProps } from 'formik'
import styled from 'styled-components'
import { Container, Row, Col, Form as BootstrapForm, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import ChangeUserEmailResultAlert, { ChangeEmailAxiosValues } from './ChangeUserEmailResultAlert'

const StyledErrorMessage = styled(ErrorMessage)`
    color: #e20101;
    font-weight: bold;
`

const StyledFormContainer = styled(Container)`
    padding-top: 1em;
`

export interface EmailChangeFormProps {
    initialEmail: string
    buttonDisabledHandler: (isDisabled: boolean) => void
}

export interface ChangeEmailFormValues {
    currentEmail: string
    newEmail: string
    confirmNewEmail: string
}

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
                    <Col>
                        <FormGroup>
                            <FormLabel htmlFor="currentEmail">
                                <strong>Email actual:</strong>
                            </FormLabel>
                            <FormControl type="text" id="currentEmail" name="currentEmail" value={values.currentEmail} disabled />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <FormLabel htmlFor="newEmail">
                                <strong>Nuevo Email:</strong>
                            </FormLabel>
                            <FormControl type="email" id="newEmail" name="newEmail" onChange={handleChange} onBlur={handleBlur} />
                            <StyledErrorMessage name="newEmail" component="div"></StyledErrorMessage>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <FormLabel htmlFor="confirmNewEmail">
                                <strong>Confirmar Nuevo Email:</strong>
                            </FormLabel>
                            <FormControl type="email" id="confirmNewEmail" name="confirmNewEmail" onChange={handleChange} onBlur={handleBlur} />
                            <StyledErrorMessage name="confirmNewEmail" component="div"></StyledErrorMessage>
                        </FormGroup>
                    </Col>
                </Row>
            </BootstrapForm>
            {visibleAlert && formData && <ChangeUserEmailResultAlert visibleParam={visibleAlert} closeFunction={setVisibleAlert} formData={formData} />}
        </StyledFormContainer>
    )
}

export default InnerForm

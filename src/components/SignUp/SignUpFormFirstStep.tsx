import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import BootstrapForm from 'react-bootstrap/Form'
import { Field,FormikErrors,FormikProps } from 'formik'
import styled from 'styled-components'
import { SignUpFormValues, formFirstStepData } from './SignUpFormTypes'

const ErrorMessage = styled.div`
    color: red;
`

const FormRow = styled(Row)`
  margin-bottom: 2em;
`;

const isFirstStepNextButtonDisabled = (formikProps: FormikProps<SignUpFormValues>): boolean => {
    const formErrors: FormikErrors<SignUpFormValues> = formikProps.errors
    let isBlocked = true
    formErrors.email ? (isBlocked = true) : formErrors.password ? (isBlocked = true) : formErrors.confirmPassword ? (isBlocked = true) : (isBlocked = false)
    return isBlocked
}


const SignUpFormFirstStep = (firstStepData: formFirstStepData) => {
    return ( 
        <Container as={BootstrapForm.Group}>
            <FormRow>
            <Row>
                <Col>
                    <BootstrapForm.Label htmlFor="email">Correo electrónico:</BootstrapForm.Label>
                    <Field as={BootstrapForm.Control} id="email" name="email" type="text" placeholder="email" />
                </Col>
            </Row>
            <Row>
                <Col>{firstStepData.formikProps.errors.email && firstStepData.formikProps.touched.email ? <ErrorMessage>{firstStepData.formikProps.errors.email}</ErrorMessage> : ''}</Col>
            </Row>
            </FormRow>
            <FormRow>
            <Row>
                <Col>
                    <BootstrapForm.Label htmlFor="password">Contraseña:</BootstrapForm.Label>
                    <Field as={BootstrapForm.Control} id="password" type="password" name="password" placeholder="password" />
                </Col>
            </Row>
            <Row>
                <Col>{firstStepData.formikProps.errors.password && firstStepData.formikProps.touched.password ? <ErrorMessage>{firstStepData.formikProps.errors.password}</ErrorMessage> : ''}</Col>
            </Row>
            </FormRow>
            <FormRow>
            <Row>
                <Col>
                    <BootstrapForm.Label htmlFor="confirmPassword">Confirma la contraseña:</BootstrapForm.Label>
                    <Field as={BootstrapForm.Control} id="confirmPassword" type="password" name="confirmPassword" placeholder="Repeat password" />
                </Col>
            </Row>
            <Row>
                <Col>
                    {firstStepData.formikProps.errors.confirmPassword && firstStepData.formikProps.touched.confirmPassword ? (
                        <ErrorMessage>{firstStepData.formikProps.errors.confirmPassword}</ErrorMessage>
                    ) : (
                        ''
                    )}
                </Col>
            </Row>
            </FormRow>
            <Row>
                <Col>
                    <Button variant="primary" onClick={firstStepData.nextStepFunction} disabled={isFirstStepNextButtonDisabled(firstStepData.formikProps)}>
                        Siguiente
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default SignUpFormFirstStep

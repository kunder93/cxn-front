import React from 'react'
import { FormikProps, FormikErrors } from 'formik'
import { Button, Col, Container, Row } from 'react-bootstrap'
import BootstrapForm from 'react-bootstrap/Form'
import { SignUpFormValues, SignUpFormStepProps } from './SignUpFormTypes'
import FormField from './FormField'
import styled from 'styled-components'

const MainContainer = styled(Container)`
    padding-top: 1em;
    padding-bottom: 10em;
`
const FormStyledContainer = styled.div`
    background-color: rgba(250, 238, 168, 0.219);
    box-shadow:
        0 0.5em 0.5em -0.3em rgba(0, 0, 0, 0.3),
        0.5em 0 0.5em -0.3em rgba(0, 0, 0, 0.3);
    padding: 1em;
    padding-left: 14em;
    padding-right: 14em;
    border-radius: 5px;
`

const ButtonRow = styled(Row)`
    display: flex;
    padding-top: 0.5em;
    padding-bottom: 1em;
`
const ButtonCol = styled(Col)`
    justify-content: center;
`

const isFirstStepNextButtonDisabled = (formikProps: FormikProps<SignUpFormValues>): boolean => {
    const formErrors: FormikErrors<SignUpFormValues> = formikProps.errors
    return !!(formErrors.email ?? formErrors.password ?? formErrors.confirmPassword)
}

const SignUpFormFirstStep: React.FC<SignUpFormStepProps> = ({ formikProps, nextStepFunction }) => {
    return (
        <MainContainer as={BootstrapForm.Group}>
            <FormStyledContainer>
                <FormField id="email" name="email" type="text" label="Correo electrónico:" placeholder="Email" formikProps={formikProps} />
                <FormField id="password" name="password" type="password" label="Contraseña:" placeholder="Contraseña" formikProps={formikProps} />
                <FormField
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Confirma la contraseña:"
                    placeholder="Repite la contraseña"
                    formikProps={formikProps}
                />
                <ButtonRow>
                    <Col></Col>
                    <ButtonCol>
                        <Button variant="primary" onClick={nextStepFunction} disabled={isFirstStepNextButtonDisabled(formikProps)}>
                            Siguiente
                        </Button>
                        <Col></Col>
                    </ButtonCol>
                </ButtonRow>
            </FormStyledContainer>
        </MainContainer>
    )
}

export default SignUpFormFirstStep

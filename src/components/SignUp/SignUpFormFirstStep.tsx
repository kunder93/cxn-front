import React from 'react'
import { FormikProps, FormikErrors } from 'formik'
import { Button, Col } from 'react-bootstrap'
import BootstrapForm from 'react-bootstrap/Form'
import { SignUpFormValues, SignUpFormStepProps } from './SignUpFormTypes'
import FormField from './FormField'
import { ButtonCol, ButtonRow, FormStyledContainer, MainContainer } from './CommonStyles'

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

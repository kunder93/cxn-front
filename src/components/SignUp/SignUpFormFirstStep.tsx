import React from 'react'
import { FormikProps, FormikErrors } from 'formik'
import { Button } from 'react-bootstrap'
import BootstrapForm from 'react-bootstrap/Form'
import { SignUpFormValues, SignUpFormStepProps } from './SignUpFormTypes'
import FormField from './FormField'
import { ButtonRow, FormStyledContainer, MainContainer } from './CommonStyles'
import styled from 'styled-components'

const ResponsiveFormStyledContainer = styled(FormStyledContainer)`
    @media (max-width: 768px) {
        width: 100%;
        padding-top: 0.1em;
        padding-left: 2em;
        padding-right: 1em;
        font-size: 120%;
        .form-label {
            font-weight: 600;
        }
    }
`

const ResponsiveMainContainer = styled(MainContainer)`
    @media (max-width: 768px) {
        width: 100%;
        padding: 0;
    }
`

const ResponsiveFormField = styled(FormField)`
    width: 100%;
    @media (max-width: 768px) {
        width: 100%;
    }
`

const isFirstStepNextButtonDisabled = (formikProps: FormikProps<SignUpFormValues>): boolean => {
    const formErrors: FormikErrors<SignUpFormValues> = formikProps.errors
    return !!(formErrors.email ?? formErrors.password ?? formErrors.confirmPassword)
}

const SignUpFormFirstStep: React.FC<SignUpFormStepProps> = ({ formikProps, nextStepFunction }) => {
    return (
        <ResponsiveMainContainer as={BootstrapForm.Group}>
            <ResponsiveFormStyledContainer>
                <ResponsiveFormField id="email" name="email" type="text" label="Correo electrónico:" placeholder="Email" formikProps={formikProps} />
                <ResponsiveFormField id="password" name="password" type="password" label="Contraseña:" placeholder="Contraseña" formikProps={formikProps} />
                <ResponsiveFormField
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Confirma la contraseña:"
                    placeholder="Repite la contraseña"
                    formikProps={formikProps}
                />
                <ButtonRow>
                    <Button variant="primary" onClick={nextStepFunction} disabled={isFirstStepNextButtonDisabled(formikProps)}>
                        Siguiente
                    </Button>
                </ButtonRow>
            </ResponsiveFormStyledContainer>
        </ResponsiveMainContainer>
    )
}

export default SignUpFormFirstStep

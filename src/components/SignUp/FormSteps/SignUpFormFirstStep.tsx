import React from 'react'
import { FormikProps, FormikErrors } from 'formik'
import { Button, Col } from 'react-bootstrap'
import { SignUpFormValues, SignUpFormStepProps } from '../SignUpFormTypes'
import FormField from '../Common/FormField'
import { ButtonRow } from '../../SignUpSingInCommonStyles'
import { ResponsiveMainContainer } from './Styles/FormStepsCommonStyles'

const isFirstStepNextButtonDisabled = (formikProps: FormikProps<SignUpFormValues>): boolean => {
    const formErrors: FormikErrors<SignUpFormValues> = formikProps.errors
    return !!(formErrors.email ?? formErrors.password ?? formErrors.confirmPassword)
}

const SignUpFormFirstStep: React.FC<SignUpFormStepProps> = ({ formikProps, nextStepFunction }) => {
    return (
        <ResponsiveMainContainer>
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
                <Col xs="auto">
                    <Button variant="primary" size="lg" onClick={nextStepFunction} disabled={isFirstStepNextButtonDisabled(formikProps)}>
                        Siguiente
                    </Button>
                </Col>
            </ButtonRow>
        </ResponsiveMainContainer>
    )
}

export default SignUpFormFirstStep

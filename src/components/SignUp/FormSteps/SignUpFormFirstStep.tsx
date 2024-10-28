import { FormikProps, FormikErrors } from 'formik'
import { Button, Col } from 'react-bootstrap'
import { SignUpFormValues, SignUpFormStepProps } from '../SignUpFormTypes'
import FormField from '../Common/FormField'
import { ButtonRow } from '../../SignUpSingInCommonStyles'
import { ResponsiveMainContainer } from './Styles/FormStepsCommonStyles'

/**
 * Checks if the Next button for the first step is disabled based on form validation errors.
 *
 * @param {FormikProps<SignUpFormValues>} formikProps - The Formik props containing form values and errors.
 * @returns {boolean} - Returns true if the Next button should be disabled; otherwise, false.
 */
const isFirstStepNextButtonDisabled = (formikProps: FormikProps<SignUpFormValues>): boolean => {
    const formErrors: FormikErrors<SignUpFormValues> = formikProps.errors
    return !!(formErrors.email ?? formErrors.password ?? formErrors.confirmPassword)
}

/**
 * The first step of the sign-up form.
 *
 * @param {SignUpFormStepProps} props - The component props.
 * @param {FormikProps<SignUpFormValues>} props.formikProps - The Formik props for managing form state.
 * @param {() => void} props.nextStepFunction - Function to move to the next step in the sign-up process.
 * @returns {JSX.Element} - A JSX element representing the first step of the sign-up form.
 */
const SignUpFormFirstStep = ({ formikProps, nextStepFunction }: SignUpFormStepProps) => {
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

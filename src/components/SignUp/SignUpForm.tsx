// src/components/SignUpForm.tsx

import { useState, useCallback } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { SignUpFormValidationSchema } from '../../pages/validation/FormValidationSchemas'
import SignUpFormFirstStep from './FormSteps/SignUpFormFirstStep'
import SignUpFormFourthStep from './FormSteps/SignUpFormFourthStep'
import SignUpFormSecondStep from './FormSteps/SignUpFormSecondStep'
import SignUpFormThirdStep from './FormSteps/SignUpFormThirdStep'
import FormStepBar from './Common/FormStepBar'
import { FormSteps, SignUpFormValues } from './SignUpFormTypes'
import useFormSubmit from './CustomHooks/useFormSubmit'
import useFormSteps from './CustomHooks/useFormSteps'
import { FormStyledContainer } from '../../components/SignUpSingInCommonStyles'
import FormAlertMessage from './Common/FormAlertMessage'

/**
 * Initial values for the sign-up form.
 * @constant {SignUpFormValues}
 */
const initialValues: SignUpFormValues = {
    email: '',
    name: '',
    dni: '',
    password: '',
    confirmPassword: '',
    firstSurname: '',
    secondSurname: '',
    gender: '',
    birthDate: new Date(),
    postalCode: '',
    apartmentNumber: '',
    building: '',
    street: '',
    city: '',
    countryNumericCode: 0,
    countrySubdivisionName: '',
    membersTerms: false,
    privacyTerms: false,
    confidencialityTerms: false
}

/**
 * SignUpForm component for user registration.
 * It handles multi-step sign-up process and form validation.
 *
 * @component
 * @returns {JSX.Element} The rendered sign-up form component.
 */
const SignUpForm = (): JSX.Element => {
    const [alertMessage, setAlertMessage] = useState<string>('')
    const { step, nextStep, previousStep } = useFormSteps(FormSteps.FirstStep)
    const handleSubmit = useFormSubmit(setAlertMessage)

    /**
     * Closes the alert message.
     *
     * @function
     * @returns {void}
     */
    const closeAlert = useCallback(() => setAlertMessage(''), [])

    /**
     * Renders the appropriate step component based on the current step.
     *
     * @function
     * @param {FormikProps<SignUpFormValues>} formikProps - The Formik props.
     * @returns {JSX.Element | null} The rendered step component or null.
     */
    const renderStepComponent = (formikProps: FormikProps<SignUpFormValues>) => {
        switch (step) {
            case FormSteps.FirstStep:
                return <SignUpFormFirstStep formikProps={formikProps} nextStepFunction={nextStep} previousStepFunction={() => ''} />
            case FormSteps.SecondStep:
                return <SignUpFormSecondStep formikProps={formikProps} previousStepFunction={previousStep} nextStepFunction={nextStep} />
            case FormSteps.ThirdStep:
                return <SignUpFormThirdStep formikProps={formikProps} previousStepFunction={previousStep} nextStepFunction={nextStep} />
            case FormSteps.FourthStep:
                return <SignUpFormFourthStep formikProps={formikProps} previousStepFunction={previousStep} nextStepFunction={nextStep} />
            default:
                return null
        }
    }

    return (
        <FormStyledContainer>
            <h1>¡ Solicita ser socio !</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={SignUpFormValidationSchema}
                validateOnChange
                validateOnMount
                validateOnBlur
            >
                {(formikProps) => (
                    <Form>
                        <FormStepBar step={step} />
                        {renderStepComponent(formikProps)}
                        {alertMessage && <FormAlertMessage message={alertMessage} onClose={closeAlert} />}
                    </Form>
                )}
            </Formik>
        </FormStyledContainer>
    )
}

export default SignUpForm

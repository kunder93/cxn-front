import * as React from 'react'
import { Form, Formik, FormikProps } from 'formik'
import { useState, useCallback } from 'react'
import BootstrapForm from 'react-bootstrap/Form'
import { SignUpFormValidationSchema } from '../../pages/validation/FormValidationSchemas'
import SignUpFormFirstStep from './SignUpFormFirstStep'
import SignUpFormFourthStep from './SignUpFormFourthStep'
import SignUpFormSecondStep from './SignUpFormSecondStep'
import SignUpFormThirdStep from './SignUpFormThirdStep'
import FormStepBar from './FormStepBar'
import FormAlertMessage from './FormAlertMessage'
import { FormSteps, SignUpFormValues } from './SignUpFormTypes'
import useFormSubmit from './CustomHooks/useFormSubmit'
import useFormSteps from './CustomHooks/useFormSteps'
import styled from 'styled-components'

const FormContainer = styled.div`
    padding-left: 10em;
    padding-right: 10em;
    padding-top: 2em;
`

const initialValues: SignUpFormValues = {
    email: '',
    name: '',
    dni: '',
    password: '',
    confirmPassword: '',
    firstSurname: '',
    secondSurname: '',
    gender: 'male',
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

export const SignUpForm: React.FC = () => {
    const [alertMessage, setAlertMessage] = useState('')
    const { step, nextStep, previousStep } = useFormSteps(FormSteps.FirstStep)
    const handleSubmit = useFormSubmit(setAlertMessage)

    const closeAlert = useCallback(() => setAlertMessage(''), [])

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
        <FormContainer>
            <h2>¡ Solicita ser socio !</h2>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={SignUpFormValidationSchema}
                validateOnChange
                validateOnMount
                validateOnBlur
            >
                {(formikProps) => (
                    <BootstrapForm as={Form}>
                        <FormStepBar step={step} />
                        {renderStepComponent(formikProps)}
                        {alertMessage && <FormAlertMessage message={alertMessage} onClose={closeAlert} />}
                    </BootstrapForm>
                )}
            </Formik>
        </FormContainer>
    )
}

export default SignUpForm

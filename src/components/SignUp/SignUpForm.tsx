// src/components/SignUpForm.tsx
import React, { useState, useCallback } from 'react'
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

const SignUpForm: React.FC = () => {
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
                        <>{console.log('Form values:', formikProps.values) }</>
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

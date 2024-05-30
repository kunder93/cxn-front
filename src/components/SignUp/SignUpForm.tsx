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
    padding: 2em;
    background-color: #f9f9f9;
    border-radius: 8px;
    max-width: 800px;
    margin: 0 auto;

    @media (max-width: 768px) {
        padding: 1em;
    }
`

const FormTitle = styled.h2`
    text-align: center;
    margin-bottom: 1em;
    @media (max-width: 768px) {
            font-weight: 600;
        }
`

const StyledForm = styled(BootstrapForm)`
    display: flex;
    flex-direction: column;
    gap: 1em;

    input, select, textarea {
        width: 100%;
        padding: 0.75em;
        margin-bottom: 0.5em;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1em;

v
    }

    button {
        padding: 1em 1.5em;
        font-size: 1em;

        @media (max-width: 768px) {
            padding: 1em 2em;
            font-size: 1.1em;
        }
    }
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
        <FormContainer>
            <FormTitle>¡ Solicita ser socio !</FormTitle>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={SignUpFormValidationSchema}
                validateOnChange
                validateOnMount
                validateOnBlur
            >
                {(formikProps) => (
                    <StyledForm as={Form}>
                        <FormStepBar step={step} />
                        {renderStepComponent(formikProps)}
                        {alertMessage && <FormAlertMessage message={alertMessage} onClose={closeAlert} />}
                    </StyledForm>
                )}
            </Formik>
        </FormContainer>
    )
}

export default SignUpForm

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios'
import * as React from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { Button, Container, ProgressBar } from 'react-bootstrap'
import BootstrapForm from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import { SignUpFormValidationSchema } from '../../pages/validation/FormValidationSchemas'
import { SIGN_UP_URL } from '../../resources/server_urls'

import { Icon1Circle, Icon1CircleFill, Icon2Circle, Icon2CircleFill, Icon3Circle, Icon3CircleFill, Icon4Circle, Icon4CircleFill } from 'react-bootstrap-icons'
import SignUpFormFirstStep from './SignUpFormFirstStep'
import SignUpFormFourthStep from './SignUpFormFourthStep'
import SignUpFormSecondStep from './SignUpFormSecondStep'
import { ErrorAlert, ErrorTriangle, ProgressBarIconsContainer } from './SignUpFormStyles'
import SignUpFormThirdStep from './SignUpFormThirdStep'
import { FormSteps, SignUpFormValues } from './SignUpFormTypes'

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

const StepBar: React.FC<{ step: FormSteps }> = ({ step }) => {
    function calculateProgress(step: FormSteps): number {
        switch (step) {
            case FormSteps.FirstStep:
                return 10
            case FormSteps.SecondStep:
                return 33
            case FormSteps.ThirdStep:
                return 66
            case FormSteps.FourthStep:
                return 90
        }
    }

    return (
        <Container>
            <ProgressBarIconsContainer>
                {step === FormSteps.FirstStep ? (
                    <Icon1CircleFill style={{ width: '30px', height: '30px' }}></Icon1CircleFill>
                ) : (
                    <Icon1Circle style={{ width: '30px', height: '30px' }}></Icon1Circle>
                )}
                {step === FormSteps.SecondStep ? (
                    <Icon2CircleFill style={{ width: '30px', height: '30px' }}></Icon2CircleFill>
                ) : (
                    <Icon2Circle style={{ width: '30px', height: '30px' }}></Icon2Circle>
                )}
                {step === FormSteps.ThirdStep ? (
                    <Icon3CircleFill style={{ width: '30px', height: '30px' }}></Icon3CircleFill>
                ) : (
                    <Icon3Circle style={{ width: '30px', height: '30px' }}></Icon3Circle>
                )}
                {step === FormSteps.FourthStep ? (
                    <Icon4CircleFill style={{ width: '30px', height: '30px' }}></Icon4CircleFill>
                ) : (
                    <Icon4Circle style={{ width: '30px', height: '30px' }}></Icon4Circle>
                )}
            </ProgressBarIconsContainer>
            <ProgressBar now={calculateProgress(step)} />
        </Container>
    )
}

export const SignUpForm: React.FC<any> = () => {
    const navigate = useNavigate()
    const [alertMessage, setAlertMessage] = useState('')
    const closeAlert = () => {
        setAlertMessage('')
    }
    const [step, setStep] = useState<FormSteps>(FormSteps.FirstStep)

    const nextStep = () => {
        switch (step) {
            case FormSteps.FirstStep:
                setStep(FormSteps.SecondStep)
                break
            case FormSteps.SecondStep:
                setStep(FormSteps.ThirdStep)
                break
            case FormSteps.ThirdStep:
                setStep(FormSteps.FourthStep)
                break
            case FormSteps.FourthStep:
                break
        }
    }

    const previousStep = () => {
        switch (step) {
            case FormSteps.FirstStep:
                break
            case FormSteps.SecondStep:
                setStep(FormSteps.FirstStep)
                break
            case FormSteps.ThirdStep:
                setStep(FormSteps.SecondStep)
                break
            case FormSteps.FourthStep:
                setStep(FormSteps.ThirdStep)
                break
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                const userData: any = {
                    email: values.email,
                    password: values.password,
                    dni: values.dni,
                    name: values.name,
                    firstSurname: values.firstSurname,
                    secondSurname: values.secondSurname,
                    gender: values.gender,
                    birthDate: values.birthDate,
                    postalCode: values.postalCode,
                    apartmentNumber: values.apartmentNumber,
                    building: values.building,
                    street: values.street,
                    city: values.city,
                    countryNumericCode: values.countryNumericCode,
                    countrySubdivisionName: values.countrySubdivisionName
                }
                axios
                    .post(SIGN_UP_URL, userData)
                    .then((response) => {
                        console.log(response)
                        navigate('/')
                    })
                    .catch((error) => {
                        if (error.response.data) {
                            // Request made and server responded
                            setAlertMessage(error.response.data.content)
                        } else if (error.request) {
                            // The request was made but no response was received
                            setAlertMessage('Error: no hay respuesta.')
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            setAlertMessage('Error: algo inesperado. Recarga o intentalo mas tarde.')
                        }
                    })
                actions.setSubmitting(false)
            }}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            validationSchema={SignUpFormValidationSchema} //     VALIDACION ESQUEMAAA
            validateOnChange={true}
            validateOnMount={true}
            validateOnBlur={true}
        >
            {(formikProps) => (
                <BootstrapForm as={Form}>
                    <StepBar step={step}></StepBar>

                    {step === FormSteps.FirstStep && ( // FORM STEP 1
                        <SignUpFormFirstStep formikProps={formikProps} step={step} nextStepFunction={nextStep}></SignUpFormFirstStep>
                    )}
                    {step === FormSteps.SecondStep && (
                        <SignUpFormSecondStep nextStepFunction={nextStep} previousStepFunction={previousStep} formikProps={formikProps}></SignUpFormSecondStep>
                    )}
                    {step === FormSteps.ThirdStep && (
                        <SignUpFormThirdStep formikProps={formikProps} previousStepFunction={previousStep} nextStepFunction={nextStep}></SignUpFormThirdStep>
                    )}
                    {step === FormSteps.FourthStep && (
                        <SignUpFormFourthStep formikProps={formikProps} nextStepFunction={nextStep} previousStepFunction={previousStep}></SignUpFormFourthStep>
                    )}

                    {
                        <Container>
                            {alertMessage ? (
                                <>
                                    <ErrorAlert key={'danger'} variant={'danger'}>
                                        <ErrorTriangle></ErrorTriangle>
                                        {alertMessage}
                                        <Button variant="outline-danger" onClick={closeAlert}>
                                            Cerrar
                                        </Button>
                                    </ErrorAlert>
                                </>
                            ) : (
                                ''
                            )}
                        </Container>
                    }
                </BootstrapForm>
            )}
        </Formik>
    )
}

export default SignUpForm

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
import { Accordion } from 'react-bootstrap'
import styled from 'styled-components'

const AccordionHeader = styled(Accordion.Header)`
    padding: 0;
    margin: 0;
    button {
        padding: 0.25em;
        border-radius: 5px solid black;
    }
    h2 {
        padding-left: 0.5em;
        padding-right: 0.5em;
        font-size: 100%;
        margin: 0;
    }
`
const AccordionBody = styled(Accordion.Body)`
    p {
        font-size: 80%;
    }
`

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
            <Accordion>
                <Accordion.Item eventKey="0">
                    <AccordionHeader>
                        <h2>Términos y condiciones generales</h2>
                    </AccordionHeader>
                    <AccordionBody>
                        <p>Cuota de socio 2025: 40€/año si eres mayor de 18 años.</p>
                        <p>Cuota de socio menores de 18 años: 20€/año</p>
                        <p>Familiares menores de 18 años y dependientes economicamente de un socio mayor de 18 años: 0€.</p>
                        <p>Posibilidad de pago fraccionado mensual.</p>
                        <p>
                            La ficha federativa tiene un coste adicional de 15€ para los socios mayores de 14 años que así lo deseen. Esta sirve para jugar
                            torneos oficiales cuyo resultado computa para el ranking ELO.
                        </p>
                        <p>La ficha federativa a menores de 14 años tiene un coste de 0€.</p>
                    </AccordionBody>
                </Accordion.Item>
            </Accordion>
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

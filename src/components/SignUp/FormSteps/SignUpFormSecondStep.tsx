import { Field, FormikProps } from 'formik'
import { Button, Col, Row } from 'react-bootstrap'
import BootstrapForm from 'react-bootstrap/Form'
import styled from 'styled-components'
import { SignUpFormValues } from '../SignUpFormTypes'
import FormField from '../Common/FormField'
import { ButtonRow, ErrorMessage } from '../../SignUpSingInCommonStyles'
import { ResponsiveMainContainer } from './Styles/FormStepsCommonStyles'

const FormRowFieldDateGender = styled(Row)`
    margin-bottom: 2em;
`

/**
 * Checks if the Next button for the second step is disabled.
 * @param {FormikProps<SignUpFormValues>} formikProps - The Formik props containing the form state and errors.
 * @returns {boolean} True if the Next button should be disabled; otherwise, false.
 */
const isSecondStepNextButtonDisabled = (formikProps: FormikProps<SignUpFormValues>): boolean => {
    const { errors } = formikProps
    return !!(errors.dni ?? errors.name ?? errors.firstSurname ?? errors.secondSurname ?? errors.gender ?? errors.birthDate)
}

/**
 * Interface representing the props for the SignUpFormSecondStep component.
 * @interface SecondStepFormData
 * @property {() => void} nextStepFunction - Function to call when proceeding to the next step.
 * @property {() => void} previousStepFunction - Function to call when going back to the previous step.
 * @property {FormikProps<SignUpFormValues>} formikProps - Formik props to manage form state and validation.
 */
export interface SecondStepFormData {
    nextStepFunction: () => void
    previousStepFunction: () => void
    formikProps: FormikProps<SignUpFormValues>
}

/**
 * Second step of the sign-up form.
 * This component collects user details such as DNI, name, surnames, gender, and birth date.
 *
 * @param {SecondStepFormData} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const SignUpFormSecondStep = ({ formikProps, nextStepFunction, previousStepFunction }: SecondStepFormData): JSX.Element => (
    <ResponsiveMainContainer>
        <FormField id="dni" name="dni" type="text" label="DNI:" placeholder="Tu DNI" formikProps={formikProps} />
        <FormField id="name" name="name" type="text" label="Nombre:" placeholder="Tu nombre" formikProps={formikProps} />
        <FormField id="firstSurname" name="firstSurname" type="text" label="Primer apellido:" placeholder="Tu primer apellido" formikProps={formikProps} />
        <FormField id="secondSurname" name="secondSurname" type="text" label="Segundo apellido:" placeholder="Tu segundo apellido" formikProps={formikProps} />
        <FormRowFieldDateGender>
            <Col>
                <BootstrapForm.Label htmlFor="gender">Género:</BootstrapForm.Label>
                <Field as={BootstrapForm.Select} id="gender" name="gender">
                    <option value="">Selecciona uno:</option>
                    <option value="male">Hombre</option>
                    <option value="female">Mujer</option>
                    <option value="other">Otro</option>
                </Field>
                <BootstrapForm.Text className="text-muted">Selecciona tu género</BootstrapForm.Text>
                {formikProps.errors.gender && formikProps.touched.gender && <ErrorMessage>{formikProps.errors.gender}</ErrorMessage>}
            </Col>
        </FormRowFieldDateGender>
        <FormRowFieldDateGender>
            <Col>
                <BootstrapForm.Label htmlFor="birthDate">Fecha de nacimiento:</BootstrapForm.Label>
                <Field as={BootstrapForm.Control} id="birthDate" type="date" name="birthDate" max={new Date().toISOString().split('T')[0]} />
                {formikProps.errors.birthDate && formikProps.touched.birthDate && <ErrorMessage>{formikProps.errors.birthDate as string}</ErrorMessage>}
            </Col>
        </FormRowFieldDateGender>
        <ButtonRow>
            <Col>
                <Button variant="primary" size="lg" onClick={previousStepFunction}>
                    Atrás
                </Button>
            </Col>
            <Col>
                <Button variant="primary" size="lg" onClick={nextStepFunction} disabled={isSecondStepNextButtonDisabled(formikProps)}>
                    Siguiente
                </Button>
            </Col>
        </ButtonRow>
    </ResponsiveMainContainer>
)

export default SignUpFormSecondStep

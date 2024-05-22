import { Field, FormikProps } from 'formik'
import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import BootstrapForm from 'react-bootstrap/Form'
import styled from 'styled-components'
import { SignUpFormValues } from './SignUpFormTypes'
import FormField from './FormField'

const ErrorMessage = styled.div`
    color: red;
`

const FormRow = styled(Row)`
    margin-bottom: 2em;
`
const ButtonRow = styled(Row)`
    display: flex;
    padding-top: 0.5em;
    padding-bottom: 1em;
`
const ButtonCol = styled(Col)`
    display: flex;
    flex-direction: row-reverse;
`
const MainContainer = styled(Container)`
    padding-top: 1em;
    padding-bottom: 10em;
`

const FormStyledContainer = styled.div`
    background-color: rgba(250, 238, 168, 0.219);
    box-shadow:
        0 0.5em 0.5em -0.3em rgba(0, 0, 0, 0.3),
        0.5em 0 0.5em -0.3em rgba(0, 0, 0, 0.3);
    padding: 1em;
    padding-left: 14em;
    padding-right: 14em;
    border-radius: 5px;
`

const isSecondStepNextButtonDisabled = (formikProps: FormikProps<SignUpFormValues>): boolean => {
    const { errors } = formikProps
    return !!(errors.dni ?? errors.name ?? errors.firstSurname ?? errors.secondSurname ?? errors.gender ?? errors.birthDate)
}

export interface secondStepFormData {
    nextStepFunction: () => void
    previousStepFunction: () => void
    formikProps: FormikProps<SignUpFormValues>
}

const SignUpFormSecondStep: React.FC<secondStepFormData> = ({ formikProps, nextStepFunction, previousStepFunction }) => (
    <MainContainer>
        <FormStyledContainer>
            <FormField id="dni" name="dni" type="text" label="DNI:" placeholder="Tu DNI" formikProps={formikProps} />
            <FormField id="name" name="name" type="text" label="Nombre:" placeholder="Tu nombre" formikProps={formikProps} />
            <FormField id="firstSurname" name="firstSurname" type="text" label="Primer apellido:" placeholder="Tu primer apellido" formikProps={formikProps} />
            <FormField
                id="secondSurname"
                name="secondSurname"
                type="text"
                label="Segundo apellido:"
                placeholder="Tu segundo apellido"
                formikProps={formikProps}
            />
            <FormRow>
                <Col>
                    <BootstrapForm.Label htmlFor="gender">Género:</BootstrapForm.Label>
                    <Field as={BootstrapForm.Select} id="gender" name="gender">
                        <option value="male">Hombre</option>
                        <option value="female">Mujer</option>
                        <option value="other">Otro</option>
                    </Field>
                    <BootstrapForm.Text className="text-muted">Selecciona tu género</BootstrapForm.Text>
                    {formikProps.errors.gender && formikProps.touched.gender && <ErrorMessage>{formikProps.errors.gender}</ErrorMessage>}
                </Col>
            </FormRow>
            <FormRow>
                <Col>
                    <BootstrapForm.Label htmlFor="birthDate">Fecha de nacimiento:</BootstrapForm.Label>
                    <Field as={BootstrapForm.Control} id="birthDate" type="date" name="birthDate" max={new Date().toISOString().split('T')[0]} />
                    {formikProps.errors.birthDate && formikProps.touched.birthDate && <ErrorMessage>{formikProps.errors.birthDate as string}</ErrorMessage>}
                </Col>
            </FormRow>
            <ButtonRow>
                <ButtonCol>
                    <Button variant="primary" onClick={previousStepFunction}>
                        Atrás
                    </Button>
                </ButtonCol>
                <Col></Col>
                <Col>
                    <Button variant="primary" onClick={nextStepFunction} disabled={isSecondStepNextButtonDisabled(formikProps)}>
                        Siguiente
                    </Button>
                </Col>
            </ButtonRow>
        </FormStyledContainer>
    </MainContainer>
)

export default SignUpFormSecondStep

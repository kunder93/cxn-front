import { Field, FormikProps } from 'formik'
import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import BootstrapForm from 'react-bootstrap/Form'
import styled from 'styled-components'
import { SignUpFormValues } from './SignUpFormTypes'
import FormField from './FormField'
import { ButtonCol, ButtonRow, FormStyledContainer, MainContainer } from './CommonStyles'

const ErrorMessage = styled.div`
    color: red;
`

const FormRow = styled(Row)`
    margin-bottom: 2em;
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

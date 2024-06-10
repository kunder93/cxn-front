import { Field, FormikProps } from 'formik'
import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import BootstrapForm from 'react-bootstrap/Form'
import styled from 'styled-components'
import { SignUpFormValues } from './SignUpFormTypes'
import FormField from './FormField'
import { ButtonRow, FormStyledContainer, MainContainer } from './CommonStyles'

const ErrorMessage = styled.div`
    color: red;
`

const ResponsiveMainContainer = styled(MainContainer)`
    @media (max-width: 768px) {
        width: 100%;
        padding: 0;
    }
`

const ResponsiveFormStyledContainer = styled(FormStyledContainer)`
    @media (max-width: 768px) {
        width: 100%;
        padding-top: 0.1em;
        padding-left: 2em;
        padding-right: 1em;
        font-size: 120%;
        .form-label {
            font-weight: 600;
        }
    }
`

const FormRow = styled(Row)`
    margin-bottom: 2em;
`

const ButtonCol = styled(Col)`
    width: 50%;
    display: flex;
    justify-content: center;
    padding: 0 5px;

    @media (max-width: 768px) {
        width: 100%;
        margin-bottom: 1em;
        padding: 0;
    }
`

const isSecondStepNextButtonDisabled = (formikProps: FormikProps<SignUpFormValues>): boolean => {
    const { errors } = formikProps
    return !!(errors.dni ?? errors.name ?? errors.firstSurname ?? errors.secondSurname ?? errors.gender ?? errors.birthDate)
}

export interface SecondStepFormData {
    nextStepFunction: () => void
    previousStepFunction: () => void
    formikProps: FormikProps<SignUpFormValues>
}

const SignUpFormSecondStep: React.FC<SecondStepFormData> = ({ formikProps, nextStepFunction, previousStepFunction }) => (
    <ResponsiveMainContainer>
        <ResponsiveFormStyledContainer>
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
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={previousStepFunction}
                        style={{ width: '100%', maxWidth: '150px', padding: '5px 10px', fontSize: '14px' }}
                    >
                        Atrás
                    </Button>
                </ButtonCol>
                <ButtonCol>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={nextStepFunction}
                        disabled={isSecondStepNextButtonDisabled(formikProps)}
                        style={{ width: '100%', maxWidth: '150px', padding: '5px 10px', fontSize: '14px' }}
                    >
                        Siguiente
                    </Button>
                </ButtonCol>
            </ButtonRow>
        </ResponsiveFormStyledContainer>
    </ResponsiveMainContainer>
)

export default SignUpFormSecondStep

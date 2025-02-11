import { Field, FormikProps } from 'formik'
import React from 'react'
import { SignUpFormValues } from '../SignUpFormTypes'
import { Col, Row, Form as BootstrapForm } from 'react-bootstrap'
import styled from 'styled-components'

const FormRow = styled(Row)`
    margin-bottom: 1em;
    margin-top: 1em !important;
`

const ErrorMessage = styled.div`
    color: red;
`

interface FormFieldProps {
    id: keyof SignUpFormValues
    name: keyof SignUpFormValues
    type: string
    label: string
    placeholder: string
    formikProps: FormikProps<SignUpFormValues>
}

interface FieldWrapperProps {
    children: React.ReactNode
}

const FieldWrapper: React.FC<FieldWrapperProps> = ({ children }) => (
    <Row>
        <Col>{children}</Col>
    </Row>
)

/**
 * Form Field component.
 *
 * Memorize component avoid useless renders while props doesnt change.
 */
const FormField: React.FC<FormFieldProps> = React.memo(({ id, name, type, label, placeholder, formikProps }) => (
    <FormRow>
        <FieldWrapper>
            <BootstrapForm.Label htmlFor={id}>{label}</BootstrapForm.Label>
            <Field as={BootstrapForm.Control} id={id} name={name} type={type} placeholder={placeholder} autoComplete="new-password" aria-required="true" />
        </FieldWrapper>
        <FieldWrapper>
            {formikProps.errors[name] && formikProps.touched[name] && (
                <ErrorMessage>
                    <strong>{formikProps.errors[name] as string}</strong>
                </ErrorMessage>
            )}
        </FieldWrapper>
    </FormRow>
))

export default FormField

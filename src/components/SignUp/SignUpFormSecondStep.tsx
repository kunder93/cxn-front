/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Field, FormikErrors, FormikProps } from 'formik'
import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import BootstrapForm from 'react-bootstrap/Form'
import styled from 'styled-components'
import { SignUpFormValues } from './SignUpFormTypes'

const ErrorMessage = styled.div`
    color: red;
`

const isSecondStepNextButtonDisabled = (formikProps: FormikProps<SignUpFormValues>): boolean => {
    const formErrors: FormikErrors<SignUpFormValues> = formikProps.errors
    let isBlocked = true
    formErrors.dni
        ? (isBlocked = true)
        : formErrors.name
        ? (isBlocked = true)
        : formErrors.firstSurname
        ? (isBlocked = true)
        : formErrors.secondSurname
        ? (isBlocked = true)
        : formErrors.gender
        ? (isBlocked = true)
        : formErrors.birthDate
        ? (isBlocked = true)
        : (isBlocked = false)
    return isBlocked
}

export interface secondStepFormData {
    nextStepFunction: any
    previousStepFunction: any
    formikProps: FormikProps<SignUpFormValues>
}

const SignUpFormSecondStep: React.FC<secondStepFormData> = (data: secondStepFormData) => {
    return (
        <Container>
            <Row>
                <Col>
                    <BootstrapForm.Label htmlFor="dni">DNI:</BootstrapForm.Label>
                    <Field as={BootstrapForm.Control} id="dni" name="dni" type="text" placeholder="Tu DNI" />
                </Col>
            </Row>
            <Row>
                <Col>{data.formikProps.errors.dni && data.formikProps.touched.dni ? <ErrorMessage>{data.formikProps.errors.dni}</ErrorMessage> : ''}</Col>
            </Row>
            <Row>
                <Col>
                    <BootstrapForm.Label htmlFor="name">Nombre:</BootstrapForm.Label>
                    <Field as={BootstrapForm.Control} id="name" name="name" type="text" placeholder="Tu nombre" />
                </Col>
            </Row>
            <Row>
                <Col>{data.formikProps.errors.name && data.formikProps.touched.name ? <ErrorMessage>{data.formikProps.errors.name}</ErrorMessage> : ''}</Col>
            </Row>
            <Row>
                <Col>
                    <BootstrapForm.Label htmlFor="firstSurname">Primer apellido:</BootstrapForm.Label>
                    <Field as={BootstrapForm.Control} id="firstSurname" name="firstSurname" type="text" placeholder="Tu primer apellido" />
                </Col>
            </Row>
            <Row>
                <Col>
                    {data.formikProps.errors.firstSurname && data.formikProps.touched.firstSurname ? (
                        <ErrorMessage>{data.formikProps.errors.firstSurname}</ErrorMessage>
                    ) : (
                        ''
                    )}
                </Col>
            </Row>

            <Row>
                <Col>
                    <BootstrapForm.Label htmlFor="secondSurname">Segundo apellido:</BootstrapForm.Label>
                    <Field as={BootstrapForm.Control} id="secondSurname" name="secondSurname" type="text" placeholder="Tu segundo apellido" />
                </Col>
            </Row>
            <Row>
                <Col>
                    {data.formikProps.errors.secondSurname && data.formikProps.touched.secondSurname ? (
                        <ErrorMessage>{data.formikProps.errors.secondSurname}</ErrorMessage>
                    ) : (
                        ''
                    )}
                </Col>
            </Row>

            <Row className="mb-3">
                <Col>
                    <BootstrapForm.Label>Género:</BootstrapForm.Label>
                    <Field as={BootstrapForm.Select} name="gender">
                        <option value="male">Hombre</option>
                        <option value="female">Mujer</option>
                        <option value="other">Otro</option>
                    </Field>
                    <BootstrapForm.Text className="text-muted">Selecciona tu género</BootstrapForm.Text>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col>
                    <BootstrapForm.Label>Fecha de nacimiento:</BootstrapForm.Label>
                    <Field type="date" name="birthDate" max={Date.now()} />
                    {data.formikProps.errors.birthDate && data.formikProps.touched.birthDate ? (
                        <ErrorMessage>{'La fecha debe ser anterior a la de HOY.'}</ErrorMessage>
                    ) : (
                        ''
                    )}
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button variant="primary" onClick={data.previousStepFunction}>
                        Atras
                    </Button>
                    <Button variant="primary" onClick={data.nextStepFunction} disabled={isSecondStepNextButtonDisabled(data.formikProps)}>
                        Siguiente
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default SignUpFormSecondStep

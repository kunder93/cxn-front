import React from 'react'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import { withFormik, FormikProps, Form, Field } from 'formik'

import axios from 'axios'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import validationUserSchema from './validation/SignUpSchema'

import Button from 'react-bootstrap/Button'

import BootstrapForm from 'react-bootstrap/Form'

import Tooltip from 'react-bootstrap/Tooltip'

// Tipo de valores del formulario

interface FormValues {
    name: string

    first_surname: string

    second_surname: string

    gender: string

    birth_date: string

    email: string

    password: string
}

interface OtherProps {
    message: string
}

const getCurrentDate = () => {
    const dat = new Date()
    const y = dat.getFullYear()
    const m = dat.getMonth() + 1
    const d = dat.getDay() - 1

    if (d < 10) {
        return y + '-' + m + '-0' + d
    } else {
        return y + '-' + m + '-' + d
    }
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const { touched, errors, isSubmitting, message } = props

    const nameTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            {touched.name && errors.name && <div>{errors.name}</div>}
        </Tooltip>
    )

    const emailTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            {touched.email && errors.email && <div>{errors.email}</div>}
        </Tooltip>
    )

    const passwordTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            {touched.password && errors.password && <div>{errors.password}</div>}
        </Tooltip>
    )

    const first_surnameTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            {touched.first_surname && errors.first_surname && <div>{errors.first_surname}</div>}
        </Tooltip>
    )

    const second_surnameTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            {touched.second_surname && errors.second_surname && <div>{errors.second_surname}</div>}
        </Tooltip>
    )

    const genderTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            {touched.gender && errors.gender && <div>{errors.gender}</div>}
        </Tooltip>
    )

    const birth_dateTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            {touched.birth_date && errors.birth_date && <div>{errors.birth_date}</div>}
        </Tooltip>
    )

    return (
        <Form>
            <h1>{message}</h1>

            <BootstrapForm.Group className="mb-3" controlId="formUserName">
                <Row className="mb-3">
                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={nameTooltip}>
                        <Col>
                            <BootstrapForm.Label>Nombre:</BootstrapForm.Label>
                            <Field as={BootstrapForm.Control} type="text" name="name" placeholder="your name" />
                            <BootstrapForm.Text className="text-muted">Tu nombre real</BootstrapForm.Text>
                        </Col>
                    </OverlayTrigger>
                    <Col></Col>
                </Row>
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3" controlId="formUserEmail">
                <Row className="mb-3">
                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={emailTooltip}>
                        <Col>
                            <BootstrapForm.Label>Correo electronico:</BootstrapForm.Label>
                            <Field as={BootstrapForm.Control} type="email" name="email" placeholder="your email" />
                            <BootstrapForm.Text className="text-muted">Tu correo electronico</BootstrapForm.Text>
                        </Col>
                    </OverlayTrigger>
                    <Col></Col>
                </Row>
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3" controlId="formUserPassword">
                <Row className="mb-3">
                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={passwordTooltip}>
                        <Col>
                            <BootstrapForm.Label>Contraseña:</BootstrapForm.Label>
                            <Field as={BootstrapForm.Control} type="password" name="password" />
                            <BootstrapForm.Text className="text-muted">Tu contraseña secreta</BootstrapForm.Text>
                        </Col>
                    </OverlayTrigger>
                    <Col></Col>
                </Row>
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3" controlId="formUserFirst_surname">
                <Row className="mb-3">
                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={first_surnameTooltip}>
                        <Col>
                            <BootstrapForm.Label>Primer apellido:</BootstrapForm.Label>
                            <Field as={BootstrapForm.Control} type="text" name="first_surname" placeholder=" your first surname" />
                            <BootstrapForm.Text className="text-muted">Tu primer apellido</BootstrapForm.Text>
                        </Col>
                    </OverlayTrigger>
                    <Col></Col>
                </Row>
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3" controlId="formUserSecond_surname">
                <Row className="mb-3">
                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={second_surnameTooltip}>
                        <Col>
                            <BootstrapForm.Label>Segundo apellido:</BootstrapForm.Label>
                            <Field as={BootstrapForm.Control} type="text" name="second_surname" placeholder=" your second surname" />
                            <BootstrapForm.Text className="text-muted">Tu segundo apellido</BootstrapForm.Text>
                        </Col>
                    </OverlayTrigger>
                    <Col></Col>
                </Row>
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3" controlId="formUserGender">
                <Row className="mb-3">
                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={genderTooltip}>
                        <Col>
                            <BootstrapForm.Label>Genero:</BootstrapForm.Label>
                            <Field as={BootstrapForm.Select} name="gender">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </Field>
                            <BootstrapForm.Text className="text-muted">Escoge tu genero</BootstrapForm.Text>
                        </Col>
                    </OverlayTrigger>
                    <Col></Col>
                </Row>
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3" controlId="formUserBirth_date">
                <Row className="mb-3">
                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={birth_dateTooltip}>
                        <Col>
                            <BootstrapForm.Label>Fecha de nacimiento:</BootstrapForm.Label>
                            <Field type="date" name="birth_date" max={getCurrentDate()} />
                            <br></br>
                            <BootstrapForm.Text className="text-muted">Escoge tu fecha de nacimiento</BootstrapForm.Text>
                        </Col>
                    </OverlayTrigger>
                    <Col></Col>
                </Row>
            </BootstrapForm.Group>

            <Row>
                <Col></Col>
                <Col>
                    <Button type="submit" disabled={isSubmitting}>
                        Registrarse
                    </Button>
                </Col>
                <Col></Col>
            </Row>
        </Form>
    )
}

// The type of props MyForm receives

interface MyFormProps {
    initialEmail?: string

    initialName?: string

    initialFirst_surname?: string

    initialSecond_surname?: string

    initialGender?: string

    initialBirth_date?: Date

    message: string // if this passed all the way through you might do this or make a union type
}

// Wrap our form with the withFormik HoC

const MyForm = withFormik<MyFormProps, FormValues>({
    // Transform outer props into form values

    mapPropsToValues: (props) => {
        return {
            email: props.initialEmail || '',
            name: props.initialName || '',
            password: '',
            first_surname: props.initialFirst_surname || '',
            second_surname: props.initialSecond_surname || '',
            gender: props.initialGender || '',
            birth_date: props.initialBirth_date?.toString() || ''
        }
    },

    validationSchema: () => validationUserSchema,

    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            setSubmitting(false)
        }, 1000)
        axios
            .post('http://localhost:8080/api/auth/signup', {
                name: values.name,
                firstSurname: values.first_surname,
                secondSurname: values.second_surname,
                birthDate: values.birth_date,
                gender: values.gender,
                password: values.password,
                email: values.email
            })
            .catch(function (error) {
                console.log(error.toJSON())

                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log('UUUUIII', error.request)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message)
                }
                console.log(error.config)
            })
    }
})(InnerForm)

// Use <MyForm /> wherevs

const SignUpPage = () => (
    <div>
        <h1>My App Sign Up Page</h1>

        <MyForm message="Sign up form:" />
    </div>
)

export default SignUpPage

import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import axios, { isAxiosError } from 'axios'
import BootstrapForm from 'react-bootstrap/Form'
import { Alert, Button, Collapse, Spinner } from 'react-bootstrap'
import styled from 'styled-components'
import { CHESS_QUESTION_URL } from '../../resources/server_urls'
import { FloatingNotificationContainer } from './FloatingNotificationContainer'

const FormTitleStyled = styled.span`
    font-size: 190%;
    text-align: left;
    display: block;
    padding-bottom: 1em;
    font-weight: bold;
`

/**
 * Validation schema for MoreInfoForm.
 */
const validationSchema = Yup.object().shape({
    texto: Yup.string().max(200, 'El texto debe tener como máximo 200 caracteres').required('Se requiere un mensaje'),
    asunto: Yup.string().max(40, 'El asunto debe tener como máximo 40 caracteres').required('Se requiere un asunto.'),
    email: Yup.string().email('Debe ser un email valido.').max(40, 'El email es demasiado largo.').required('Se requiere un email.')
})

interface Props {
    initialTopic: string // Definir initialTopic como opcional
    formTitle: string
    category: string
    // onSubmit: (values: FormData) => Promise<void>; // prop for handling form submission
}

interface FormData {
    texto: string
    asunto: string
    email: string
}

interface SubmitAxiosValues {
    email: string
    category: string
    topic: string
    message: string
}

const FloatingNotification: React.FC<{ message: string; variant: string; onClose: () => void }> = ({ message, variant, onClose }) => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
        }, 5000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    const handleExited = () => {
        onClose()
    }

    return (
        <Collapse in={visible} onExited={handleExited}>
            <FloatingNotificationContainer>
                <Alert variant={variant} onClose={onClose} dismissible>
                    {message}
                </Alert>
            </FloatingNotificationContainer>
        </Collapse>
    )
}

const MoreInfoForm: React.FC<Props> = ({ initialTopic, formTitle, category /*, onSubmit*/ }) => {
    const [alertMessage, setAlertMessage] = useState('')
    const [submitSuccessNotification, setSubmitSuccessNotification] = useState(false)
    const [submitErrorNotification, setSubmitErrorNotification] = useState(false)

    const initialValues: FormData = {
        texto: '',
        asunto: initialTopic,
        email: ''
    }

    function changeSuccessNotificationState(): void {
        setSubmitSuccessNotification(false)
    }
    function changeErrorNotificationState(): void {
        setSubmitErrorNotification(false)
    }
    const handleSubmit = async (values: FormData, actions: FormikHelpers<FormData>) => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // Asegúrate de que coincida con la configuración de CORS en el backend
            }
        }
        
        try {
            await axios.post<SubmitAxiosValues>(CHESS_QUESTION_URL, {
                email: values.email,
                category: category,
                topic: values.asunto,
                message: values.texto
            },axiosConfig)
            setSubmitSuccessNotification(true)
            actions.resetForm()
            actions.setSubmitting(false)
        } catch (error) {
            setSubmitErrorNotification(true)

            if (isAxiosError(error) && error.response?.data) {
                // Request made and server responded
                setAlertMessage('Error enviando el formulario.')
            } else if (isAxiosError(error) && error.request) {
                // The request was made but no response was received
                setAlertMessage('Error: no hay respuesta.')
            } else {
                // Something happened in setting up the request that triggered an Error
                setAlertMessage('Error: algo inesperado. Recarga o intentalo mas tarde.')
            }
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: FormData, actions) => {
                void handleSubmit(values, actions)
            }}
            validateOnMount={true}
        >
            {({ setFieldTouched, touched, errors, isSubmitting, isValid }) => (
                <Form className="mt-4">
                    <FormTitleStyled>{formTitle}</FormTitleStyled>
                    <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label htmlFor="asunto">Asunto:</BootstrapForm.Label>
                        <Field
                            as={BootstrapForm.Control}
                            type="text"
                            id="asunto"
                            name="asunto"
                            className={touched.asunto && errors.asunto ? 'is-invalid' : ''}
                            onBlur={() => setFieldTouched('asunto', true)}
                            placeholder={initialTopic}
                        />
                        <ErrorMessage name="asunto" component="div" className="invalid-feedback" />
                    </BootstrapForm.Group>
                    <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label htmlFor="email">Email:</BootstrapForm.Label>
                        <Field
                            as={BootstrapForm.Control}
                            type="email"
                            id="email"
                            name="email"
                            onBlur={() => setFieldTouched('email', true)}
                            className={touched.email && errors.email ? 'is-invalid' : ''}
                            placeholder="Ingrese su email para responderle."
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </BootstrapForm.Group>

                    <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label htmlFor="texto">Mensaje:</BootstrapForm.Label>
                        <Field
                            as={BootstrapForm.Control}
                            component="textarea"
                            type="text"
                            id="texto"
                            name="texto"
                            placeholder="Ingrese su mensaje"
                            onBlur={() => setFieldTouched('texto', true)}
                            className={touched.texto && errors.texto ? 'is-invalid form-control ' : 'form-control'}
                        />
                        <ErrorMessage name="texto" component="div" className="invalid-feedback" />
                    </BootstrapForm.Group>
                    <Button variant="success" type="submit" disabled={isSubmitting || !isValid}>
                        {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Enviar'}
                    </Button>
                    {submitSuccessNotification && (
                        <FloatingNotification
                            message={'SOLICITUD ENVIADA CORRECTAMENTE'}
                            variant={'success'}
                            onClose={changeSuccessNotificationState}
                        ></FloatingNotification>
                    )}
                    {submitErrorNotification && (
                        <FloatingNotification message={alertMessage} variant={'danger'} onClose={changeErrorNotificationState}></FloatingNotification>
                    )}
                </Form>
            )}
        </Formik>
    )
}

export default MoreInfoForm

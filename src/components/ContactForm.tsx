import React, { useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import BootstrapForm from 'react-bootstrap/Form'
import { Alert, Button, Collapse, Spinner } from 'react-bootstrap'
import axios, { AxiosError } from 'axios'
import { CHESS_QUESTION_URL } from '../resources/server_urls'
import { FloatingNotificationContainer } from './Common/FloatingNotificationContainer'
import { AxiosErrorResponseData } from './SignUp/SignUpFormTypes'
// Define validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string().required('Es necesario un email !').email('Es necesario un email !'),
    reason: Yup.string().required('Es necesario un motivo o razón'),
    messageContent: Yup.string().required('Es necesario por lo menos 20 caracteres.').min(20, 'Se necesitan 20 caracteres minimos.')
})

interface SubmitAxiosValues {
    email: string
    category: string
    topic: string
    message: string
}

interface FormData {
    messageContent: string
    reason: string
    email: string
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

// Form component
const ContactForm: React.FC = () => {
    const [alertMessage, setAlertMessage] = useState('')
    const [submitSuccessNotification, setSubmitSuccessNotification] = useState(false)
    const [submitErrorNotification, setSubmitErrorNotification] = useState(false)
    const initialValues = {
        reason: '',
        messageContent: '',
        email: ''
    }
    function changeSuccessNotificationState(): void {
        setSubmitSuccessNotification(false)
    }
    function changeErrorNotificationState(): void {
        setSubmitErrorNotification(false)
    }
    const handleSubmit = async (values: FormData, actions: FormikHelpers<FormData>) => {
        try {
            await axios.post<SubmitAxiosValues>(CHESS_QUESTION_URL, {
                email: values.email,
                category: 'GENERAL',
                topic: values.reason,
                message: values.messageContent
            })
            setSubmitSuccessNotification(true)
            actions.resetForm()
            actions.setSubmitting(false)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<AxiosErrorResponseData>
                const errorMessage =
                    axiosError.response?.data?.content ??
                    (axiosError.request ? 'Error: no hay respuesta.' : 'Error: algo inesperado. Recarga o intentalo más tarde.')
                setAlertMessage(errorMessage)
            } else {
                setAlertMessage('Error: algo inesperado. Recarga o intentalo más tarde.')
            }
        }
    }
    return (
        <div>
            <h2>Formulario de contacto:</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, isValid }) => (
                    <BootstrapForm as={Form}>
                        <BootstrapForm.Group className="mb-3">
                            <BootstrapForm.Label htmlFor="email">Correo electrónico:</BootstrapForm.Label>
                            <BootstrapForm.Control as={Field} type="email" name="email" title="email" id="email" placeholder="Tu correo electrónico!" />
                            <ErrorMessage name="email" component="div" className="alert alert-danger" />
                            <BootstrapForm.Label htmlFor="reason">Tema: / Razón:</BootstrapForm.Label>
                            <BootstrapForm.Control as={Field} type="text" name="reason" title="reason" id="reason" placeholder="Motivo del mensaje." />
                            <ErrorMessage name="reason" component="div" className="alert alert-danger" />
                            <BootstrapForm.Label htmlFor="messageContent">Detalles:</BootstrapForm.Label>
                            <BootstrapForm.Control
                                as={Field}
                                component={'textarea'}
                                id="messageContent"
                                name="messageContent"
                                rows={4}
                                title="messageContent"
                                placeholder="Escribe aquí el mensaje."
                            />
                            <ErrorMessage name="messageContent" component="div" className="alert alert-danger" />
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
                    </BootstrapForm>
                )}
            </Formik>
        </div>
    )
}

export default ContactForm

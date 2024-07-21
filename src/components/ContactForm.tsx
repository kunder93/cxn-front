import React from 'react'
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import BootstrapForm from 'react-bootstrap/Form'
import { Button, Spinner } from 'react-bootstrap'
import styled from 'styled-components'

import useNotification, { NotificationType } from './Common/hooks/useNotification'
import FloatingNotificationA from './Common/FloatingNotificationA'
import axios, { AxiosError } from 'axios'
import { CHESS_QUESTION_URL } from '../resources/server_urls'

export interface SubmitAxiosValues {
    email: string
    category: string
    topic: string
    message: string
}

const ErrorMessageStyled = styled(ErrorMessage)`
    color: red;
    font-weight: bold;
`

const FiledTittle = styled(BootstrapForm.Label)`
    font-weight: 600;
`

const validationSchema = Yup.object({
    email: Yup.string().required('Es necesario un email!').email('Es necesario un email válido!'),
    reason: Yup.string().required('Es necesario un motivo o razón'),
    messageContent: Yup.string().required('Es necesario por lo menos 20 caracteres.').min(20, 'Se necesitan 20 caracteres mínimos.')
})

interface FormData {
    messageContent: string
    reason: string
    email: string
}

const ContactForm: React.FC = () => {
    const { notification, showNotification, hideNotification } = useNotification()

    const initialValues = {
        reason: '',
        messageContent: '',
        email: ''
    }

    const handleSubmit = (values: FormData, actions: FormikHelpers<FormData>) => {
        const axiosData: SubmitAxiosValues = {
            email: values.email,
            category: 'GENERAL',
            topic: values.reason,
            message: values.messageContent
        }
        axios
            .post(CHESS_QUESTION_URL, axiosData)
            .then(function () {
                showNotification('Se ha enviado correctamente', NotificationType.Success)
            })
            .catch(function (error: AxiosError) {
                showNotification(error.message, NotificationType.Error)
            })
        actions.resetForm()
        actions.setSubmitting(false)
    }

    return (
        <>
            <h2>Formulario de contacto:</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} validateOnMount={true}>
                {(
                    { isSubmitting, isValid, dirty } // Access dirty property from Formik
                ) => (
                    <Form>
                        <BootstrapForm.Group className="mb-3">
                            <FiledTittle htmlFor="email">Correo electrónico:</FiledTittle>
                            <BootstrapForm.Control as={Field} type="email" name="email" id="email" placeholder="Tu correo electrónico!" />
                            <ErrorMessageStyled name="email" component="div" className="" />
                            <FiledTittle htmlFor="reason">Tema: / Razón:</FiledTittle>
                            <BootstrapForm.Control as={Field} type="text" name="reason" id="reason" placeholder="Motivo del mensaje." />
                            <ErrorMessageStyled name="reason" component="div" />
                            <FiledTittle htmlFor="messageContent">Detalles:</FiledTittle>
                            <BootstrapForm.Control
                                as={Field}
                                component={'textarea'}
                                id="messageContent"
                                name="messageContent"
                                rows={4}
                                placeholder="Escribe aquí el mensaje."
                            />
                            <ErrorMessageStyled name="messageContent" component="div" />
                        </BootstrapForm.Group>
                        <Button variant="success" type="submit" disabled={isSubmitting || !isValid || !dirty}>
                            {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Enviar'}
                        </Button>
                        <FloatingNotificationA notification={notification} hideNotification={hideNotification} />
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default ContactForm

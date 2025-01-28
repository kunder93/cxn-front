import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import BootstrapForm from 'react-bootstrap/Form'
import { Button, Spinner } from 'react-bootstrap'
import styled from 'styled-components'

import useNotification, { NotificationType } from './Common/hooks/useNotification'
import FloatingNotificationA from './Common/FloatingNotificationA'
import axios, { AxiosError } from 'axios'
import { CHESS_QUESTION_URL } from '../resources/server_urls'

/**
 * Interface defining the structure of the data to be submitted via Axios in the contact form.
 *
 * @interface
 * @property {string} email - The user's email address, which must be a valid email format.
 * This field is required for submission.
 * @property {string} category - The category of the message, typically used to classify
 * the nature of the inquiry (e.g., 'GENERAL').
 * @property {string} topic - The specific topic or reason for the user's message.
 * This field is required to provide context for the inquiry.
 * @property {string} message - The content of the user's message.
 * This field should contain the details of the inquiry or feedback being provided.
 */
export interface SubmitAxiosValues {
    email: string
    category: string
    topic: string
    message: string
}

// Styled components for error messages and form labels
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

/**
 * Interface defining the structure of form data submitted in the contact form.
 *
 * @interface
 * @property {string} messageContent - The content of the message provided by the user.
 * It must be at least 20 characters long.
 * @property {string} reason - The reason or topic for the user's message.
 * This field is required.
 * @property {string} email - The user's email address, which must be a valid email format.
 * This field is required.
 */
interface FormData {
    messageContent: string
    reason: string
    email: string
}

/**
 * ContactForm component allows users to submit contact messages.
 *
 * This component uses Formik for form handling and Yup for validation.
 * Upon successful submission, it sends the data to a specified URL via Axios and displays
 * a notification to inform the user about the result of the submission.
 *
 * @component
 * @returns {JSX.Element} The rendered ContactForm component.
 */
const ContactForm = (): JSX.Element => {
    const { notification, showNotification, hideNotification } = useNotification()

    // Initial form values
    const initialValues = {
        reason: '',
        messageContent: '',
        email: ''
    }

    /**
     * Handles form submission.
     *
     * @param {FormData} values - The values submitted in the form.
     * @param {FormikHelpers<FormData>} actions - Formik helpers for form handling.
     */
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
                actions.resetForm()
            })
            .catch(function (error: AxiosError) {
                showNotification(error.message, NotificationType.Error)
            })
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
                            {isSubmitting ? (
                                <>
                                    <Spinner animation="border" size="sm" /> Enviando...
                                </>
                            ) : (
                                'Enviar'
                            )}
                        </Button>
                        <FloatingNotificationA notification={notification} hideNotification={hideNotification} />
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default ContactForm

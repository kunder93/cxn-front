import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import BootstrapForm from 'react-bootstrap/Form'
import { Button, Spinner } from 'react-bootstrap'
import { CHESS_QUESTION_URL } from '../../../resources/server_urls'
import styled from 'styled-components'
import { useNotificationContext } from '../NotificationContext'
import { NotificationType } from '../hooks/useNotification'

const FormTitleStyled = styled.span`
    font-size: 190%;
    text-align: left;
    display: block;
    padding-bottom: 1em;
    font-weight: bold;
`

const validationSchema = Yup.object().shape({
    texto: Yup.string().max(200, 'El texto debe tener como máximo 200 caracteres').required('Se requiere un mensaje'),
    asunto: Yup.string().max(40, 'El asunto debe tener como máximo 40 caracteres').required('Se requiere un asunto.'),
    email: Yup.string().email('Debe ser un email válido.').max(40, 'El email es demasiado largo.').required('Se requiere un email.')
})

interface Props {
    initialTopic: string
    formTitle: string
    category: string
}

interface FormData {
    texto: string
    asunto: string
    email: string
}

const MoreInfoForm = ({ initialTopic, formTitle, category }: Props): JSX.Element => {
    const { showNotification } = useNotificationContext()

    const initialValues: FormData = {
        texto: '',
        asunto: initialTopic,
        email: ''
    }

    const handleSubmit = async (values: FormData, actions: FormikHelpers<FormData>) => {
        try {
            await axios.post(CHESS_QUESTION_URL, {
                email: values.email,
                category: category,
                topic: values.asunto,
                message: values.texto
            })
            //notify('Solicitud enviada correctamente', 'success')
            actions.resetForm()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                showNotification('Error: Código: ' + error.code, NotificationType.Error)
            } else {
                showNotification('Error: algo inesperado. Recarga o inténtalo más tarde.', NotificationType.Error)
            }
        } finally {
            actions.setSubmitting(false)
        }
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} validateOnMount>
            {({ touched, errors, isSubmitting, isValid }) => (
                <Form className="mt-4" aria-busy={isSubmitting}>
                    <FormTitleStyled>{formTitle}</FormTitleStyled>
                    <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label htmlFor="asunto">Asunto:</BootstrapForm.Label>
                        <Field
                            as={BootstrapForm.Control}
                            type="text"
                            id="asunto"
                            name="asunto"
                            className={touched.asunto && errors.asunto ? 'is-invalid' : ''}
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
                            className={touched.email && errors.email ? 'is-invalid' : ''}
                            placeholder="Ingrese su email para responderle."
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </BootstrapForm.Group>
                    <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label htmlFor="texto">Mensaje:</BootstrapForm.Label>
                        <BootstrapForm.Control
                            as={Field}
                            component="textarea"
                            id="texto"
                            name="texto"
                            className={touched.texto && errors.texto ? 'is-invalid' : ''}
                            placeholder="Ingrese su mensaje"
                        />
                        <ErrorMessage name="texto" component="div" className="invalid-feedback" />
                    </BootstrapForm.Group>
                    <Button variant="success" type="submit" disabled={isSubmitting || !isValid}>
                        {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Enviar'}
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default MoreInfoForm

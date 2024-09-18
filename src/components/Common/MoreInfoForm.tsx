import React from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import axios, { AxiosError } from 'axios'
import BootstrapForm from 'react-bootstrap/Form'
import { Button, Spinner } from 'react-bootstrap'
import styled from 'styled-components'
import { CHESS_QUESTION_URL } from '../../resources/server_urls'
import useNotification, { NotificationType } from './hooks/useNotification'
import FloatingNotificationA from './FloatingNotificationA'

const ErrorMessageStyled = styled(ErrorMessage)`
    color: red;
    font-weight: bold;
`

const FiledTittle = styled(BootstrapForm.Label)`
    font-weight: 600;
`

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
    email: Yup.string().email('Debe ser un email valido.').max(40, 'El email es demasiado largo.').required('Se requiere un email.')
})

interface FormData {
    texto: string
    asunto: string
    email: string
}

interface ChessQuestionValues {
    email: string
    category: string
    topic: string
    message: string
}

interface MoreInfoFormProps {
    initialTopic: string
    formTitle: string
    category: string
}

const TextInputField: React.FC<{ id: string; name: string; label: string; placeholder?: string; type?: string }> = ({
    id,
    name,
    label,
    placeholder,
    type = 'text'
}) => (
    <BootstrapForm.Group className="mb-3">
        <FiledTittle htmlFor={id}>{label}:</FiledTittle>
        <Field as={BootstrapForm.Control} type={type} id={id} name={name} placeholder={placeholder} />
        <ErrorMessageStyled name={name} component="div" className="invalid-feedback" />
    </BootstrapForm.Group>
)

const MoreInfoForm: React.FC<MoreInfoFormProps> = ({ initialTopic, formTitle, category }) => {
    const { notification, showNotification, hideNotification } = useNotification()
    const initialValues: FormData = {
        texto: '',
        asunto: initialTopic,
        email: ''
    }

    const handleSubmit = async (values: FormData, actions: FormikHelpers<FormData>) => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
        try {
            await axios.post<ChessQuestionValues>(
                CHESS_QUESTION_URL,
                {
                    email: values.email,
                    category: category,
                    topic: values.asunto,
                    message: values.texto
                },
                axiosConfig
            )
            actions.resetForm()
            showNotification('Formulario enviado con éxito', NotificationType.Success)
            await actions.validateForm()
        } catch (error) {
            const axiosError = error as AxiosError
            showNotification(axiosError.message, NotificationType.Error)
        } finally {
            actions.setSubmitting(false)
        }
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} validateOnMount={true} validateOnChange={true}>
            {({ isSubmitting, isValid, dirty }) => (
                <Form className="mt-4">
                    <FormTitleStyled>{formTitle}</FormTitleStyled>
                    <TextInputField id="asunto" name="asunto" label="Asunto" placeholder={initialTopic} />
                    <TextInputField id="email" name="email" label="Email" placeholder="Ingrese su email para responderle." type="email" />
                    <TextInputField id="texto" name="texto" label="Mensaje" placeholder="Ingrese su mensaje" />
                    <Button variant="success" type="submit" disabled={isSubmitting || !isValid || !dirty}>
                        {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Enviar'}
                    </Button>
                    <FloatingNotificationA notification={notification} hideNotification={hideNotification} />
                </Form>
            )}
        </Formik>
    )
}

export default MoreInfoForm

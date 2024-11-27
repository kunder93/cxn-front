import React from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers, FieldProps } from 'formik'
import * as Yup from 'yup'
import axios, { AxiosError } from 'axios'
import BootstrapForm from 'react-bootstrap/Form'
import { Button, Spinner } from 'react-bootstrap'
import styled from 'styled-components'
import { CHESS_QUESTION_URL } from '../../resources/server_urls'
import { NotificationType } from './hooks/useNotification'
import { useNotificationContext } from './NotificationContext'

const ErrorMessageStyled = styled(ErrorMessage)`
    color: red;
    font-weight: bold;
`

const FiledTittle = styled(BootstrapForm.Label)`
    font-weight: 600;
`

const FormTitleStyled = styled.span`
    font-size: 1.9em;
    text-align: left;
    display: block;
    padding-bottom: 1em;

    @media (max-width: 576px) {
        font-size: 1.5em; /* Smaller font size on mobile */
    }
`

const FormWrapper = styled.section`
    max-width: 600px;
    margin: auto;
    padding: 1em;
    form {
        padding-top: 0;
        margin-top: 0 !important;
    }

    @media (max-width: 576px) {
        padding: 0.5em;
        max-width: 100%;
        form {
            padding: 0;
        }
    }
`

const TextInputField: React.FC<{ id: string; name: string; label: string; placeholder?: string; type?: string }> = ({
    id,
    name,
    label,
    placeholder,
    type = 'text'
}) => (
    <BootstrapForm.Group className="mb-3">
        <FiledTittle htmlFor={id}>{label}:</FiledTittle>
        <Field name={name}>
            {({ field, meta }: FieldProps) => (
                <>
                    <BootstrapForm.Control {...field} type={type} id={id} placeholder={placeholder} isInvalid={meta.touched && !!meta.error} />
                    {meta.touched && meta.error && (
                        <ErrorMessageStyled name={name}>{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessageStyled>
                    )}
                </>
            )}
        </Field>
    </BootstrapForm.Group>
)

const StyledButton = styled(Button)`
    width: 100%;
    margin-top: 1em;

    @media (min-width: 576px) {
        width: auto;
    }
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

const MoreInfoForm = ({ initialTopic, formTitle, category }: MoreInfoFormProps): JSX.Element => {
    const { showNotification } = useNotificationContext()

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
        <FormWrapper>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} validateOnMount validateOnChange validateOnBlur>
                {({ isSubmitting, isValid, dirty }) => (
                    <Form className="mt-4">
                        <FormTitleStyled>{formTitle}</FormTitleStyled>
                        <TextInputField id="asunto" name="asunto" label="Asunto" placeholder={initialTopic} />
                        <TextInputField id="email" name="email" label="Email" placeholder="Ingrese su email para responderle." type="email" />
                        <TextInputField id="texto" name="texto" label="Mensaje" placeholder="Ingrese su mensaje" />
                        <StyledButton variant="success" type="submit" disabled={isSubmitting || !isValid || !dirty}>
                            {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Enviar'}
                        </StyledButton>
                    </Form>
                )}
            </Formik>
        </FormWrapper>
    )
}

export default MoreInfoForm

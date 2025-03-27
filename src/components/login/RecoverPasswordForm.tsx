import axios, { isAxiosError } from 'axios'
import { NotificationType } from 'components/Common/hooks/useNotification'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import { EMAIL_MAX_LENGTH } from 'pages/validation/FormValidationSchemas'
import { Form as BootstrapForm, Button, Spinner } from 'react-bootstrap'
import { FORGOT_PASSWORD_SEND_TOKEM_EMAIL_URL } from 'resources/server_urls'
import styled from 'styled-components'
import * as Yup from 'yup'

const LinkButton = styled(Button)`
    color: #0d6efd;
    background-color: transparent;
    border: none;
    padding: 0;
    font-size: 1rem;
    text-decoration: underline;
    cursor: pointer;
`

interface RecoverPasswordFormProps {
    onClose: () => void
    goToSetNewPassword: () => void
}

interface RecoverPasswordFormValues {
    email: string
    dni: string
}

export const RecoverPasswordValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Debe ser un correo válido')
        .required('El correo es obligatorio')
        .max(EMAIL_MAX_LENGTH, 'El email no debe contener más de ' + EMAIL_MAX_LENGTH.toLocaleString() + ' caracteres.'),
    dni: Yup.string().required('El dni es obligatorio').min(9, 'El DNI debe tener 9 caracteres')
})

const RecoverPasswordForm: React.FC<RecoverPasswordFormProps> = ({ onClose, goToSetNewPassword }) => {
    const initialValues: RecoverPasswordFormValues = { email: '', dni: '' }
    const { showNotification } = useNotificationContext()

    const handleSubmit = async (values: RecoverPasswordFormValues, actions: FormikHelpers<RecoverPasswordFormValues>) => {
        try {
            await axios.post(FORGOT_PASSWORD_SEND_TOKEM_EMAIL_URL, values)
            showNotification('Código enviado con éxito. Revisa tu email. ', NotificationType.Success)
            goToSetNewPassword()
            // Aquí podrías llamar a updateModalStep(ModalStepWindow.SET_NEW_PASSWORD) si quieres avanzar al siguiente paso.
        } catch (error: unknown) {
            if (isAxiosError(error) && error.response) {
                showNotification('Error: ' + error.message, NotificationType.Error)
            } else {
                showNotification('Error desconocido, inténtalo mas tarde.', NotificationType.Error)
            }
        } finally {
            actions.setSubmitting(false)
        }
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={RecoverPasswordValidationSchema}>
            {({ errors, touched, isSubmitting, isValid, dirty }) => (
                <Form>
                    <BootstrapForm.Group>
                        <BootstrapForm.Label htmlFor="email">Correo electrónico:</BootstrapForm.Label>
                        <Field as={BootstrapForm.Control} id="email" name="email" type="text" placeholder="Email" isInvalid={!!errors.email && touched.email} />
                        <ErrorMessage component="div" name="email" className="invalid-feedback"></ErrorMessage>

                        <BootstrapForm.Label htmlFor="dni">DNI:</BootstrapForm.Label>
                        <Field as={BootstrapForm.Control} id="dni" name="dni" type="text" placeholder="DNI" isInvalid={!!errors.dni && touched.dni} />
                        <ErrorMessage component="div" name="dni" className="invalid-feedback"></ErrorMessage>
                    </BootstrapForm.Group>

                    <div className="mt-3">
                        <LinkButton variant="link" onClick={goToSetNewPassword}>
                            Tengo un código de recuperación
                        </LinkButton>
                    </div>

                    <div className="d-flex justify-content-end mt-2">
                        <Button variant="danger" onClick={onClose} className="me-2">
                            Cerrar
                        </Button>
                        <Button type="submit" variant="success" disabled={!dirty || !isValid || isSubmitting}>
                            {isSubmitting ? <Spinner as="span" animation="border" size="sm" aria-hidden="true" /> : 'Recuperar'}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default RecoverPasswordForm

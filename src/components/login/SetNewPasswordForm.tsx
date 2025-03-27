import React from 'react'
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik'
import axios from 'axios'
import { Button, Spinner } from 'react-bootstrap'
import * as Yup from 'yup'
import { SET_NEW_PASSWORD_URL } from 'resources/server_urls'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { NotificationType } from 'components/Common/hooks/useNotification'
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from 'pages/validation/FormValidationSchemas'

interface SetNewPasswordFormProps {
    onClose: () => void
    goToGetToken: () => void
}

interface SetNewPasswordFormValues {
    token: string
    dni: string
    newPassword: string
    confirmPassword: string
}

const validationSchema = Yup.object().shape({
    token: Yup.string().required('Se necesita un código.').max(255, 'El código no puede exceder 255 caracteres.'),
    dni: Yup.string().required('El DNI es obligatorio').min(9, 'El DNI debe tener 9 caracteres'),
    newPassword: Yup.string()
        .required('La nueva contraseña es obligatoria')
        .max(PASSWORD_MAX_LENGTH, 'La contraseña no debe contener mas de ' + PASSWORD_MAX_LENGTH.toLocaleString() + ' caracteres.')
        .min(PASSWORD_MIN_LENGTH, 'La contraseña debe contener minimo ' + PASSWORD_MIN_LENGTH.toLocaleString() + ' caracteres'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Las contraseñas deben coincidir')

        .required('Confirmar la contraseña es obligatorio')
})

const SetNewPasswordForm: React.FC<SetNewPasswordFormProps> = ({ onClose, goToGetToken }) => {
    const { showNotification } = useNotificationContext()

    const initialValues: SetNewPasswordFormValues = {
        token: '',
        dni: '',
        newPassword: '',
        confirmPassword: ''
    }

    const handleSubmit = async (values: SetNewPasswordFormValues, actions: FormikHelpers<SetNewPasswordFormValues>) => {
        // Construimos el objeto de petición para el endpoint, ignorando confirmPassword
        const requestData = {
            token: values.token,
            newPassword: values.newPassword,
            dni: values.dni
        }

        try {
            await axios.post(SET_NEW_PASSWORD_URL, requestData)
            showNotification('Contraseña restablecida con éxito.', NotificationType.Success)
            onClose()
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                showNotification('Error: ' + error.message, NotificationType.Error)
            } else {
                showNotification('Error desconocido, inténtalo más tarde.', NotificationType.Error)
            }
        } finally {
            actions.setSubmitting(false)
        }
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting, dirty, isValid }) => (
                <Form>
                    <div className="mb-3">
                        <label htmlFor="token">Código de recuperación:</label>
                        <Field name="token" type="text" className="form-control" placeholder="El código enviado al email" autoComplete={'off'} />
                        <ErrorMessage name="token" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="dni">DNI:</label>
                        <Field name="dni" type="text" className="form-control" placeholder="Introduce tu DNI" autoComplete={'off'} />
                        <ErrorMessage name="dni" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="newPassword">Nueva contraseña:</label>
                        <Field name="newPassword" type="password" className="form-control" placeholder="Nueva contraseña" autoComplete={'off'} />
                        <ErrorMessage name="newPassword" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirmPassword">Confirmar nueva contraseña:</label>
                        <Field
                            name="confirmPassword"
                            type="password"
                            className="form-control"
                            placeholder="Confirma la nueva contraseña"
                            autoComplete={'off'}
                        />
                        <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                    </div>

                    <div className="d-flex justify-content-end mt-3">
                        <Button variant="secondary" onClick={goToGetToken} className="me-2">
                            Volver
                        </Button>
                        <Button type="submit" variant="success" disabled={!dirty || !isValid || isSubmitting}>
                            {isSubmitting ? <Spinner as="span" animation="border" size="sm" aria-hidden="true" /> : 'Restablecer contraseña'}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default SetNewPasswordForm

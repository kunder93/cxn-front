import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik'
import * as Yup from 'yup'
import { Form as BootstrapForm } from 'react-bootstrap'
import axios from 'axios'
import { CHANGE_MEMBER_EMAIL_URL } from 'resources/server_urls'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { removeJwt, removeUserProfile } from 'store/slices/user'
import { useNavigate } from 'react-router-dom'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { NotificationType } from 'components/Common/hooks/useNotification'
import styled from 'styled-components'

const StyledErrorMessage = styled(ErrorMessage)`
    color: red;
    font-weight: bold;

    @media (max-width: 768px) {
        font-size: 0.9rem; // Ajuste del tamaño del texto en pantallas pequeñas
    }
`

interface ChangeEmailFormProps {
    initialEmail: string
    setButtonAvaliability: (value: boolean) => void
    setSubmitForm?: (submitForm: () => void) => void
    setIsSubmitting?: (isSubmitting: boolean) => void
}

interface ChangeEmailFormValues {
    currentEmail: string
    newEmail: string
    confirmNewEmail: string
}

const validationSchema = Yup.object().shape({
    newEmail: Yup.string().required('Debes ingresar un nuevo email').email('Debe ser un email válido').min(4, 'El email debe tener al menos 4 caracteres'),
    confirmNewEmail: Yup.string()
        .required('Debes confirmar el nuevo email')
        .oneOf([Yup.ref('newEmail')], 'Los emails no coinciden')
})

/**
 * Componente interno que recibe el objeto formik y se encarga de actualizar
 * la disponibilidad del botón, el estado de envío y de setear la función de submit.
 */
const InnerForm: React.FC<{
    formik: FormikProps<ChangeEmailFormValues>
    setButtonAvaliability: (value: boolean) => void
    setSubmitForm?: (submitForm: () => void) => void
    setIsSubmitting?: (isSubmitting: boolean) => void
}> = ({ formik, setButtonAvaliability, setSubmitForm, setIsSubmitting }) => {
    // Actualiza la disponibilidad del botón cuando cambian isValid y dirty
    useEffect(() => {
        setButtonAvaliability(formik.isValid && formik.dirty)
    }, [formik.isValid, formik.dirty, setButtonAvaliability])

    // Notifica el estado de isSubmitting
    useEffect(() => {
        if (setIsSubmitting) {
            setIsSubmitting(formik.isSubmitting)
        }
    }, [formik.isSubmitting, setIsSubmitting])

    // Establece la función submit en el componente padre
    useEffect(() => {
        if (setSubmitForm) {
            setSubmitForm(() => formik.submitForm)
        }
    }, [formik.submitForm, setSubmitForm])

    return (
        <Form>
            <BootstrapForm.Group>
                <BootstrapForm.Label>Correo actual:</BootstrapForm.Label>
                <Field as={BootstrapForm.Control} type="email" name="currentEmail" disabled />
            </BootstrapForm.Group>
            <BootstrapForm.Group>
                <div>
                    <BootstrapForm.Label>Nuevo correo:</BootstrapForm.Label>
                    <Field as={BootstrapForm.Control} type="email" name="newEmail" />
                    <StyledErrorMessage name="newEmail" component="div" className="error" />
                </div>
                <div>
                    <BootstrapForm.Label>Confirmar nuevo correo:</BootstrapForm.Label>
                    <Field as={BootstrapForm.Control} type="email" name="confirmNewEmail" />
                    <StyledErrorMessage name="confirmNewEmail" component="div" className="error" />
                </div>
            </BootstrapForm.Group>
        </Form>
    )
}

const ChangeEmailForm: React.FC<ChangeEmailFormProps> = ({ initialEmail, setButtonAvaliability, setSubmitForm, setIsSubmitting }) => {
    const jwtToken = useAppSelector<string>((state) => state.users.jwt)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { showNotification } = useNotificationContext()

    return (
        <Formik
            initialValues={{
                currentEmail: initialEmail,
                newEmail: '',
                confirmNewEmail: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                console.log('Submitting:', values)

                axios
                    .patch(
                        CHANGE_MEMBER_EMAIL_URL,
                        { email: values.currentEmail, newEmail: values.newEmail }, // Enviamos el nuevo email al backend
                        { headers: { Authorization: 'Bearer ' + jwtToken } }
                    )
                    .then(async (response) => {
                        // Caso de envío correcto
                        console.log('Email actualizado con éxito:', response.data)
                        dispatch(removeJwt())
                        dispatch(removeUserProfile())
                        showNotification('¡Correo cambiado!', NotificationType.Success)
                        await navigate('/')
                    })
                    .catch((error) => {
                        // Caso de envío erróneo
                        showNotification('Error: ' + error, NotificationType.Error)
                    })
                    .finally(() => {
                        setSubmitting(false)
                    })
            }}
            validateOnMount
        >
            {(formik) => (
                <InnerForm formik={formik} setButtonAvaliability={setButtonAvaliability} setSubmitForm={setSubmitForm} setIsSubmitting={setIsSubmitting} />
            )}
        </Formik>
    )
}

export default ChangeEmailForm

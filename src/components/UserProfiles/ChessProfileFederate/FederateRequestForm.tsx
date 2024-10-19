import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { Formik, Form } from 'formik'
import axios, { AxiosError } from 'axios'
import { Button } from 'react-bootstrap'
import { Form as BootstrapForm } from 'react-bootstrap'
import styled from 'styled-components'
import { ToggleOff, ToggleOn } from 'react-bootstrap-icons'
import { useAppSelector } from '../../../store/hooks'
import { FEDERATE_USER_URL } from '../../../resources/server_urls'
import { FederateStateResponse } from './Hooks/getFederateState'
import { federateRequestValidationSchema } from './federateValidations'
import { useNotificationContext } from '../../../components/Common/NotificationContext'
import { NotificationType } from '../../../components/Common/hooks/useNotification'

const StyledLabel = styled(BootstrapForm.Label)`
    font-weight: bold;
    display: flex;
    align-items: center;
    flex-direction: row;
`

const PreviewRow = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
`

interface DniFormValues {
    frontDni: File | null
    backDni: File | null
    autoRenewal: boolean
}

interface FederateRequestFormProps {
    setFederateState: Dispatch<SetStateAction<FederateStateResponse>>
    closeModal: () => void
}

const FederateRequestForm: React.FC<FederateRequestFormProps> = ({ setFederateState, closeModal }) => {
    const [frontDniPreview, setFrontDniPreview] = useState<string | null>(null)
    const [backDniPreview, setBackDniPreview] = useState<string | null>(null)
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const { showNotification } = useNotificationContext()

    // Referencias para los inputs de archivo
    const frontDniInputRef = useRef<HTMLInputElement | null>(null)
    const backDniInputRef = useRef<HTMLInputElement | null>(null)

    const initialValues: DniFormValues = {
        frontDni: null,
        backDni: null,
        autoRenewal: false
    }

    const handleSubmit = (values: DniFormValues) => {
        const formData = new FormData()

        if (values.frontDni) {
            formData.append('frontDni', values.frontDni)
        }

        if (values.backDni) {
            formData.append('backDni', values.backDni)
        }
        formData.append('autoRenewal', values.autoRenewal.toString())

        axios
            .post<FederateStateResponse>(FEDERATE_USER_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userJwt}`
                }
            })
            .then((response) => {
                setFederateState(response.data)
                closeModal()
                showNotification('Petición de federarse realizada correctamente, Gracias!', NotificationType.Success)
            })
            .catch((error) => {
                const axiosError = error as AxiosError
                showNotification('Error al subir las imágenes: ' + axiosError.message, NotificationType.Error)
            })
    }

    const handleImagePreview = (file: File, setPreview: (value: string | null) => void) => {
        const reader = new FileReader()
        reader.onload = () => {
            setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    return (
        <>
            <span>Formatos de imagen: png, jpg, jpeg, avif, webp. Máximo 10MB y resolución de 2000x2000 px.</span>

            <Formik initialValues={initialValues} validationSchema={federateRequestValidationSchema} onSubmit={handleSubmit}>
                {({ setFieldValue, resetForm, values, errors, touched, setTouched, validateForm }) => {
                    return (
                        <BootstrapForm as={Form}>
                            <BootstrapForm.Group controlId="frontDni">
                                <StyledLabel>Anverso del DNI:</StyledLabel>
                                <BootstrapForm.Control
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg, image/avif, image/webp"
                                    ref={frontDniInputRef} // Asigna la referencia
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const file = event.currentTarget.files?.[0]

                                        void setFieldValue('frontDni', file)
                                        void setTouched({ ...touched, frontDni: true }, true).then(() => {
                                            // Usamos validateForm() para obtener los errores actualizados
                                            void validateForm().then((validationErrors) => {
                                                // Si no hay errores, procedemos con la previsualización de la imagen
                                                if (file && !validationErrors.frontDni) {
                                                    handleImagePreview(file, setFrontDniPreview)
                                                }
                                            })
                                        })
                                    }}
                                    isInvalid={!!errors.frontDni && touched.frontDni}
                                />
                                {touched.frontDni && errors.frontDni && (
                                    <BootstrapForm.Control.Feedback type="invalid">{errors.frontDni}</BootstrapForm.Control.Feedback>
                                )}
                            </BootstrapForm.Group>

                            <BootstrapForm.Group controlId="backDni" className="mt-3">
                                <StyledLabel>Reverso del DNI</StyledLabel>
                                <BootstrapForm.Control
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg, image/avif, image/webp"
                                    ref={backDniInputRef} // Asigna la referencia
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const file = event.currentTarget.files?.[0]
                                        void setFieldValue('backDni', file)
                                        void setTouched({ ...touched, backDni: true }, true).then(() => {
                                            // Usamos validateForm() para obtener los errores actualizados
                                            void validateForm().then((validationErrors) => {
                                                // Si no hay errores, procedemos con la previsualización de la imagen
                                                if (file && !validationErrors.backDni) {
                                                    handleImagePreview(file, setBackDniPreview)
                                                }
                                            })
                                        })
                                    }}
                                    isInvalid={!!errors.backDni && touched.backDni}
                                />
                                {touched.backDni && errors.backDni && (
                                    <BootstrapForm.Control.Feedback type="invalid">{errors.backDni}</BootstrapForm.Control.Feedback>
                                )}
                            </BootstrapForm.Group>
                            <BootstrapForm.Group controlId="autoRenewal" className="mt-3">
                                <StyledLabel>Renovación automática</StyledLabel>
                                <div
                                    onClick={() => void setFieldValue('autoRenewal', !values.autoRenewal)}
                                    style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                                >
                                    {values.autoRenewal ? <ToggleOn size={30} /> : <ToggleOff size={30} />}
                                    <span className="ms-2">{values.autoRenewal ? 'Activado' : 'Desactivado'}</span>
                                </div>
                            </BootstrapForm.Group>

                            <PreviewRow>
                                {frontDniPreview && !errors.frontDni && (
                                    <div>
                                        <img src={frontDniPreview} alt="Previsualización anverso" className="img-thumbnail" style={{ maxWidth: '200px' }} />
                                        <p>Anverso del DNI</p>
                                    </div>
                                )}

                                {backDniPreview && !errors.backDni && (
                                    <div>
                                        <img src={backDniPreview} alt="Previsualización reverso" className="img-thumbnail" style={{ maxWidth: '200px' }} />
                                        <p>Reverso del DNI</p>
                                    </div>
                                )}
                            </PreviewRow>

                            <Button variant="success" type="submit" className="mt-3 me-3">
                                Enviar
                            </Button>

                            <Button
                                variant="secondary"
                                type="button"
                                className="mt-3"
                                onClick={() => {
                                    resetForm()
                                    setFrontDniPreview(null)
                                    setBackDniPreview(null)

                                    // Reinicia los campos de archivo manualmente
                                    if (frontDniInputRef.current) {
                                        frontDniInputRef.current.value = ''
                                    }
                                    if (backDniInputRef.current) {
                                        backDniInputRef.current.value = ''
                                    }
                                }}
                            >
                                Reestablecer formulario
                            </Button>
                        </BootstrapForm>
                    )
                }}
            </Formik>
        </>
    )
}

export default FederateRequestForm

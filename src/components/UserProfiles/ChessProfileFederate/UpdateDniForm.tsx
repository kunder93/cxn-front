import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import axios, { AxiosError } from 'axios'
import { Button } from 'react-bootstrap'
import { Form as BootstrapForm } from 'react-bootstrap'
import styled from 'styled-components'
import { UPDATE_DNI_URL } from '../../../resources/server_urls'
import { useAppSelector } from '../../../store/hooks'
import { FederateStateResponse } from './Hooks/getFederateState'
import { useNotificationContext } from '../../../components/Common/NotificationContext'
import { NotificationType } from '../../../components/Common/hooks/useNotification'

const StyledLabel = styled(BootstrapForm.Label)`
    font-weight: bold;
`

const PreviewRow = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
`

// Tipo de los archivos a enviar
interface DniFormValues {
    frontDni: File | null
    backDni: File | null
}

// Límite de tamaño y resolución
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_RESOLUTION = { width: 2000, height: 2000 }
// Obtener dimensiones de la imagen
// Función para obtener las dimensiones de la imagen
const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = URL.createObjectURL(file)
        img.onload = () => {
            resolve({ width: img.width, height: img.height })
        }
        img.onerror = (error) => reject(error)
    })
}

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
    frontDni: Yup.mixed<File>()
        .required('Se requiere la imagen del anverso del DNI')
        .test('fileType', 'El archivo debe ser una imagen (png, jpg, jpeg, avif, webp)', (value) => {
            return value ? ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp'].includes(value.type) : false
        })
        .test('fileSize', 'El archivo es muy grande (máx. 10MB)', function (value) {
            // Only check file size if fileType is valid
            if (this.parent.frontDni?.type && ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp'].includes(this.parent.frontDni.type)) {
                return value ? value.size <= MAX_FILE_SIZE : false
            }
            return true // Skip if the file type is invalid
        })
        .test('resolution', 'La resolución es muy alta (máx. 2000x2000 px)', async function (value) {
            // Only check resolution if fileType is valid
            if (this.parent.frontDni?.type && ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp'].includes(this.parent.frontDni.type)) {
                if (!value) return true // If no value, validation passes
                try {
                    const img = await getImageDimensions(value)
                    return img.width <= MAX_RESOLUTION.width && img.height <= MAX_RESOLUTION.height
                } catch (error) {
                    return false // Return false if there was an error
                }
            }
            return true // Skip if the file type is invalid
        }),

    backDni: Yup.mixed<File>()
        .required('Se requiere la imagen del reverso del DNI')
        .test('fileType', 'El archivo debe ser una imagen (png, jpg, jpeg, avif, webp)', (value) => {
            return value ? ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp'].includes(value.type) : false
        })
        .test('fileSize', 'El archivo es muy grande (máx. 10MB)', function (value) {
            if (this.parent.backDni?.type && ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp'].includes(this.parent.backDni.type)) {
                return value ? value.size <= MAX_FILE_SIZE : false
            }
            return true // Skip if the file type is invalid
        })
        .test('resolution', 'La resolución es muy alta (máx. 2000x2000 px)', async function (value) {
            if (this.parent.backDni?.type && ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp'].includes(this.parent.backDni.type)) {
                if (!value) return true // If no value, validation passes
                try {
                    const img = await getImageDimensions(value)
                    return img.width <= MAX_RESOLUTION.width && img.height <= MAX_RESOLUTION.height
                } catch (error) {
                    return false // Return false if there was an error
                }
            }
            return true // Skip if the file type is invalid
        })
})

interface UpdateDniRequestFormProps {
    setFederateState: Dispatch<SetStateAction<FederateStateResponse>>
    closeModal: () => void
}

const UpdateDniForm = ({ setFederateState, closeModal }: UpdateDniRequestFormProps): JSX.Element => {
    const [frontDniPreview, setFrontDniPreview] = useState<string | null>(null)
    const [backDniPreview, setBackDniPreview] = useState<string | null>(null)
    const frontDniInputRef = useRef<HTMLInputElement | null>(null)
    const backDniInputRef = useRef<HTMLInputElement | null>(null)
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const { showNotification } = useNotificationContext()
    const initialValues: DniFormValues = {
        frontDni: null,
        backDni: null
    }

    const handleSubmit = (values: DniFormValues) => {
        const formData = new FormData()

        // Verificar explícitamente que frontDni y backDni no sean nulos o undefined
        if (values.frontDni) {
            formData.append('frontDni', values.frontDni)
        }

        if (values.backDni) {
            formData.append('backDni', values.backDni)
        }

        axios
            .patch<FederateStateResponse>(UPDATE_DNI_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userJwt}`
                }
            })
            .then((response) => {
                setFederateState(response.data)
                closeModal()
                showNotification('El DNI se ha actualizado correctamente.', NotificationType.Success)
            })
            .catch((error) => {
                const axiosError = error as AxiosError
                showNotification('Ha sucedido un error, inténtelo más tarde. Error: ' + axiosError.message, NotificationType.Error)
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
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ setFieldValue, resetForm, errors, touched, setTouched, validateForm }) => {
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
    )
}

export default UpdateDniForm

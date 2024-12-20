import React, { useState } from 'react'
import { Modal, ModalProps, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { ActivityCategory, IActivityForm, IActivityWithImageUrl } from './Types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Dropzone from 'react-dropzone'
import { AddActivityValidationSchema } from './FormValidations'
import axios, { AxiosError } from 'axios'
import { ACTIVITIES_URL } from 'resources/server_urls'
import { useAppSelector } from 'store/hooks'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { NotificationType } from 'components/Common/hooks/useNotification'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker, { registerLocale } from 'react-datepicker'
import { es } from 'date-fns/locale'
import { Form as BootstrapForm } from 'react-bootstrap'

registerLocale('es', es)

const ErrorContainer = styled.div`
    min-height: 20px;
    color: #c70000;
    font-size: 0.875rem;
    font-weight: bold;
`

const CreateActivityModal = styled(Modal)`
    .modal-content {
        padding: 1rem;
    }
    .modal-header {
        display: flex;
        flex-direction: column;
        align-items: start;
    }
    .modal-footer {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        @media (max-width: 768px) {
            flex-direction: column-reverse;
            button {
                width: 100%;
            }
        }
    }
`

const DropzoneContainer = styled.div`
    border: 2px dashed #007bff;
    padding: 1rem;
    text-align: center;
    cursor: pointer;
    margin-bottom: 1rem;
    &:hover {
        background-color: #f0f8ff;
    }
    img {
        max-width: 100%;
        max-height: 150px;
        margin-top: 1rem;
    }
`

const DateWrapper = styled.div`
    display: flex;
    gap: 1rem;
    flex-direction: row;
    justify-content: space-between;
`

interface AddActivityModalFormProps extends ModalProps {
    addActivity: (activity: IActivityWithImageUrl) => void
}

const AddActivityModalForm: React.FC<AddActivityModalFormProps> = (props: AddActivityModalFormProps) => {
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const { showNotification } = useNotificationContext()

    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const initialValues: IActivityForm = {
        title: '',
        description: '',
        imageFile: null,
        startDate: null,
        endDate: null,
        category: ActivityCategory.TORNEO
    }

    return (
        <CreateActivityModal
            show={props.show}
            onHide={props.onHide}
            centered
            aria-labelledby="modalTitle" // Accessible name for the dialog
            aria-modal="true"
        >
            <Formik
                validateOnMount
                validateOnChange
                initialValues={initialValues}
                validationSchema={AddActivityValidationSchema}
                onSubmit={(values, { resetForm }) => {
                    const formData = new FormData()

                    // Prepare the activity data to match AddActivityRequestData
                    const activityData = {
                        title: values.title,
                        description: values.description,
                        startDate: values.startDate?.toISOString() ?? '',
                        endDate: values.endDate?.toISOString() ?? '',
                        category: values.category ?? ''
                    }

                    // Add activity data as a JSON Blob to the FormData
                    const jsonBlob = new Blob([JSON.stringify(activityData)], { type: 'application/json' })
                    formData.append('data', jsonBlob)

                    // Append the image file if it exists
                    if (values.imageFile) {
                        formData.append('imageFile', values.imageFile)
                    }

                    axios
                        .post(ACTIVITIES_URL, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization: `Bearer ${userJwt}`
                            }
                        })
                        .then((/*response*/) => {
                            showNotification('Actividad creada', NotificationType.Success)
                            resetForm()
                            setPreviewUrl(null)
                            props.addActivity({
                                title: values.title,
                                description: values.description,
                                startDate: values.startDate,
                                endDate: values.endDate,
                                category: values.category,
                                imageUrl: previewUrl ? previewUrl : 'default-image.jpg'
                            })
                        })
                        .catch((error) => {
                            const err = error as AxiosError
                            // Use optional chaining to safely access the error response data
                            const errorMessages = err.response?.data
                            if (Array.isArray(errorMessages)) {
                                // If errorMessages is an array, join them into a string
                                showNotification(errorMessages.join(', '), NotificationType.Error)
                            } else if (errorMessages && typeof errorMessages === 'object') {
                                // If errorMessages is an object (and not null)
                                const formattedMessages = Object.values(errorMessages).join(', ')
                                showNotification(formattedMessages, NotificationType.Error)
                            } else {
                                // If no validation errors, display the error message
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                                showNotification(error.message, NotificationType.Error)
                            }
                        })
                }}
            >
                {({ setFieldValue, values, validateField, setFieldTouched, isValid, dirty }) => {
                    return (
                        <Form>
                            <Modal.Header>
                                <Modal.Title id="modalTitle">Crear Actividad</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <BootstrapForm.Label htmlFor="title">Título:</BootstrapForm.Label>
                                <Field
                                    id="title" // Added id attribute
                                    name="title"
                                    type="text"
                                    className="form-control"
                                    placeholder="Título de la actividad."
                                    aria-label="Título de la actividad"
                                    aria-describedby="titleError"
                                />
                                <ErrorContainer>
                                    <ErrorMessage name="title" component="div" />
                                </ErrorContainer>
                                <div>
                                    <BootstrapForm.Label htmlFor="imageFile">Imagen:</BootstrapForm.Label>
                                    <DropzoneContainer>
                                        <Dropzone
                                            onDrop={(acceptedFiles) => {
                                                const file = acceptedFiles[0]
                                                void setFieldValue('imageFile', file)
                                                setPreviewUrl(file ? URL.createObjectURL(file) : null)
                                            }}
                                            accept={{
                                                'image/png': ['.png'],
                                                'image/jpeg': ['.jpeg', '.jpg'],
                                                'image/webp': ['.webp'],
                                                'image/avif': ['.avif']
                                            }}
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                                <div {...getRootProps()} aria-label="Zona de carga de imagen de actividad">
                                                    <input {...getInputProps()} id="imageFile" aria-label="Cargar imagen de actividad" />
                                                    {previewUrl ? (
                                                        <img src={previewUrl} alt="Vista previa de la imagen" />
                                                    ) : (
                                                        <p>Arrastra aquí la imagen de la actividad o haz clic para añadir una.</p>
                                                    )}
                                                </div>
                                            )}
                                        </Dropzone>
                                    </DropzoneContainer>
                                    <ErrorContainer>
                                        <ErrorMessage name="imageFile" component="div" />
                                    </ErrorContainer>
                                </div>

                                <div className="mb-3">
                                    <BootstrapForm.Label htmlFor="description">Descripción:</BootstrapForm.Label>
                                    <Field
                                        id="description" // Added id attribute
                                        name="description"
                                        as="textarea"
                                        className="form-control"
                                        placeholder="Descripción detallada de la actividad. Qué se va a hacer."
                                        aria-label="Descripción de la actividad"
                                        aria-describedby="descriptionError"
                                    />
                                    <ErrorContainer>
                                        <ErrorMessage name="description" component="div" />
                                    </ErrorContainer>
                                </div>

                                <DateWrapper>
                                    <div className="mb-3">
                                        <BootstrapForm.Label htmlFor="startDate">Fecha de inicio:</BootstrapForm.Label>
                                        <DatePicker
                                            id="startDate" // Added id attribute
                                            selected={values.startDate}
                                            onChange={(date) =>
                                                void setFieldValue('startDate', date).then(() =>
                                                    validateField('startDate').then(() => setFieldTouched('startDate', true))
                                                )
                                            }
                                            onSelect={() => void validateField('startDate')}
                                            showTimeSelect
                                            dateFormat="Pp"
                                            className="form-control"
                                            locale="es"
                                            placeholderText="Seleccione"
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            minDate={new Date()}
                                            aria-label="Fecha de inicio"
                                            aria-describedby="startDateError"
                                        />
                                        <ErrorContainer>
                                            <ErrorMessage name="startDate" component="div" />
                                        </ErrorContainer>
                                    </div>

                                    <div className="mb-3">
                                        <BootstrapForm.Label htmlFor="endDate">Fecha de fin:</BootstrapForm.Label>
                                        <DatePicker
                                            id="endDate" // Added id attribute
                                            selected={values.endDate}
                                            onChange={(date) =>
                                                void setFieldValue('endDate', date).then(() =>
                                                    validateField('endDate').then(() => setFieldTouched('endDate', true))
                                                )
                                            }
                                            showTimeSelect
                                            dateFormat="Pp"
                                            className="form-control"
                                            locale="es"
                                            placeholderText="Seleccione"
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            minDate={new Date()}
                                            aria-label="Fecha de fin"
                                            aria-describedby="endDateError"
                                        />
                                        <ErrorContainer>
                                            <ErrorMessage name="endDate" component="div" />
                                        </ErrorContainer>
                                    </div>
                                </DateWrapper>

                                <div className="mb-3">
                                    <BootstrapForm.Label htmlFor="category">Categoría:</BootstrapForm.Label>
                                    <Field
                                        id="category" // Added id attribute
                                        name="category"
                                        as="select"
                                        className="form-control"
                                        aria-label="Categoría de la actividad"
                                    >
                                        {Object.values(ActivityCategory).map((category, index) => (
                                            <option value={category} key={index}>
                                                {category}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorContainer>
                                        <ErrorMessage name="category" component="div" />
                                    </ErrorContainer>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={props.onHide}>
                                    Cancelar
                                </Button>
                                <Button type="submit" variant="primary" disabled={!isValid || !dirty}>
                                    Añadir actividad
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )
                }}
            </Formik>
        </CreateActivityModal>
    )
}

export default AddActivityModalForm

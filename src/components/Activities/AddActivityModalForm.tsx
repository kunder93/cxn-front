import React from 'react'
import { Modal, ModalProps, Button, Spinner, Form as BootstrapForm } from 'react-bootstrap'
import styled from 'styled-components'
import { ActivityCategory, IActivity, IActivityForm } from './Types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Dropzone from 'react-dropzone'
import { AddActivityValidationSchema } from './FormValidations'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { NotificationType } from 'components/Common/hooks/useNotification'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker, { registerLocale } from 'react-datepicker'
import { es } from 'date-fns/locale'
import { useAddActivity } from './Hooks'

registerLocale('es', es)

const ClearImageButton = styled(Button)`
    min-height: 40px;
    min-width: 130px;
    background-color: #dc3545;
    border-color: #dc3545;
    color: white;
    margin-top: 10px;
    &:hover {
        background-color: #c82333;
        border-color: #c82333;
    }
`

const AddActivityButton = styled(Button)`
    min-height: 50px;
    min-width: 130px;
`
const CancelButton = styled(Button)`
    min-height: 50px;
    min-width: 130px;
`

const AddActivityButtonContent = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

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
    addActivity: (activity: IActivity) => void
}

const AddActivityModalForm: React.FC<AddActivityModalFormProps> = (props: AddActivityModalFormProps) => {
    const { showNotification } = useNotificationContext()
    const { handleSubmit, previewUrl, setPreviewUrl } = useAddActivity(props.addActivity)

    const initialValues: IActivityForm = { title: '', description: '', imageFile: null, startDate: null, endDate: null, category: ActivityCategory.TORNEO }

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
                validateOnBlur
                initialValues={initialValues}
                validationSchema={AddActivityValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, values, validateField, setFieldTouched, isValid, dirty, isSubmitting }) => {
                    return (
                        <Form>
                            <Modal.Header>
                                <Modal.Title id="modalTitle">Crear actividad</Modal.Title>
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
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label htmlFor="imageFile">Imagen:</BootstrapForm.Label>
                                    <DropzoneContainer>
                                        <Dropzone
                                            onDrop={(acceptedFiles) => {
                                                const file = acceptedFiles[0]
                                                setPreviewUrl(null) // Clear previous preview

                                                const handleImageFile = async () => {
                                                    try {
                                                        await setFieldValue('imageFile', null) // Clear previous value
                                                        await setFieldValue('imageFile', file)
                                                        await validateField('imageFile')

                                                        await setFieldTouched('imageFile', true)
                                                        setPreviewUrl(URL.createObjectURL(file))
                                                    } catch (error) {
                                                        console.error('Error handling image file:', error)
                                                        showNotification('Error cargando imagen.', NotificationType.Error)
                                                    }
                                                }

                                                void handleImageFile() // Call the async function
                                            }}
                                            accept={{
                                                'image/png': ['.png'],
                                                'image/jpeg': ['.jpeg', '.jpg'],
                                                'image/webp': ['.webp'],
                                                'image/avif': ['.avif']
                                            }}
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                                <>
                                                    <Field name="imageFile" style={{ display: 'none' }}></Field>

                                                    <div {...getRootProps()} aria-label="Zona de carga de imagen de actividad">
                                                        <input {...getInputProps()} id="imageFile" aria-label="Cargar imagen de actividad" />
                                                        {previewUrl ? (
                                                            <img src={previewUrl} alt="Vista previa de la imagen" />
                                                        ) : (
                                                            <p>Arrastra aquí la imagen de la actividad o haz clic para añadir una.</p>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </Dropzone>
                                    </DropzoneContainer>
                                    <>
                                        {previewUrl ? (
                                            <ClearImageButton
                                                type="button"
                                                onClick={() => {
                                                    setFieldValue('imageFile', null)
                                                        .then(() => {
                                                            setPreviewUrl(null)
                                                        })
                                                        .catch(() => {
                                                            console.error('Error found changing field value.')
                                                        })
                                                }}
                                            >
                                                Limpiar imagen
                                            </ClearImageButton>
                                        ) : (
                                            <></>
                                        )}
                                    </>

                                    {/* Add explicit error display */}
                                    <ErrorContainer>
                                        <ErrorMessage name="imageFile" component="div" />
                                    </ErrorContainer>
                                </BootstrapForm.Group>

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
                                            onChange={(date) => {
                                                void (async () => {
                                                    try {
                                                        await setFieldValue('startDate', date)
                                                        await validateField('startDate')
                                                        await setFieldTouched('startDate', true)
                                                    } catch (error) {
                                                        console.error('Error updating startDate:', error)
                                                    }
                                                })()
                                            }}
                                            onSelect={() => {
                                                void (async () => {
                                                    try {
                                                        await validateField('startDate')
                                                    } catch (error) {
                                                        console.error('Error validating field:', error)
                                                    }
                                                })()
                                            }}
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
                                            onChange={(date) => {
                                                void (async () => {
                                                    try {
                                                        await setFieldValue('endDate', date)
                                                        await validateField('endDate')
                                                        await setFieldTouched('endDate', true)
                                                    } catch (error) {
                                                        console.error('Error updating endDate:', error)
                                                    }
                                                })()
                                            }}
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
                                        {Object.values(ActivityCategory).map((category) => (
                                            <option value={category} key={category}>
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
                                <CancelButton variant="danger" onClick={props.onHide}>
                                    Cancelar
                                </CancelButton>
                                <AddActivityButton type="submit" variant="primary" disabled={!isValid || !dirty || isSubmitting}>
                                    {isSubmitting ? (
                                        <AddActivityButtonContent>
                                            <Spinner size="sm" />
                                            Añadiendo...
                                        </AddActivityButtonContent>
                                    ) : (
                                        'Añadir actividad'
                                    )}
                                </AddActivityButton>
                            </Modal.Footer>
                        </Form>
                    )
                }}
            </Formik>
        </CreateActivityModal>
    )
}

export default AddActivityModalForm

import React, { useState } from 'react'
import { Field, Form, Formik, FieldArray, ErrorMessage, FormikState } from 'formik'
import { Form as BootstrapForm, Button } from 'react-bootstrap'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import Dropzone from 'react-dropzone'
import { AddMagazineValidationSchema } from './AddMagazineValidationSchema'
import axios, { AxiosError } from 'axios'
import { RESOURCES_MAGAZINE_URL } from 'resources/server_urls'
import { useAppSelector } from 'store/hooks'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { NotificationType } from 'components/Common/hooks/useNotification'
import { IFormMagazine, Magazine } from './Types'

const DateWrapper = styled.div`
    display: flex;
    gap: 1rem;
    flex-direction: row;
    align-items: baseline;
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
        width: 200px; /* Fijar ancho del marco */
        height: 300px; /* Fijar alto del marco */
        object-fit: cover; /* Para que la imagen se ajuste al contenedor */
    }
`

const AuthorsHeaderWrapper = styled.div`
    display: flex;
    gap: 1rem;
    flex-direction: row;
    align-items: baseline;
`

const ErrorContainer = styled.div`
    min-height: 20px;
    color: #c70000;
    font-size: 0.875rem;
    font-weight: bold;
`

interface AddMagazineFormProps {
    addMagazineFunction: (newMagazine: Magazine) => void
}

export const AddMagazineForm: React.FC<AddMagazineFormProps> = ({ addMagazineFunction }) => {
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const { showNotification } = useNotificationContext()
    const initialValues: IFormMagazine = {
        issn: '',
        title: '',
        publisher: '',
        editionNumber: 0,
        publishDate: null,
        description: '',
        coverImageUrl: '',
        pagesAmount: 0,
        authors: [],
        language: '',
        imageFile: null
    }

    const handleSubmit = (values: IFormMagazine, resetForm: (nextState?: Partial<FormikState<IFormMagazine>> | undefined) => void) => {
        const formData = new FormData()
        const formattedPublishDate = values.publishDate
            ? `${String(values.publishDate.getDate()).padStart(2, '0')}/${String(values.publishDate.getMonth() + 1).padStart(2, '0')}/${values.publishDate.getFullYear()}`
            : ''

        const magazineData = {
            issn: values.issn,
            title: values.title,
            publisher: values.publisher,
            editionNumber: values.editionNumber,
            description: values.description,
            pagesAmount: values.pagesAmount,
            language: values.language,
            publishDate: formattedPublishDate,
            authors: values.authors
        }

        const jsonBlob = new Blob([JSON.stringify(magazineData)], { type: 'application/json' })
        formData.append('data', jsonBlob)

        // Append the image file if it exists
        if (values.imageFile) {
            formData.append('imageFile', values.imageFile)
        }

        axios
            .post(RESOURCES_MAGAZINE_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userJwt}`
                }
            })
            .then((/*response*/) => {
                showNotification('Revista añadida.', NotificationType.Success)
                addMagazineFunction(magazineData)
                resetForm()
                setPreviewUrl(null)
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
    }

    return (
        <Formik<IFormMagazine>
            validateOnBlur
            validateOnMount
            validateOnChange
            validationSchema={AddMagazineValidationSchema}
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
        >
            {({ setFieldValue, values, validateField, setFieldTouched, isValid, dirty, errors }) => (
                <Form>
                    <div className="mb-3">
                        <BootstrapForm.Label htmlFor="issn">ISSN:</BootstrapForm.Label>
                        <Field
                            id="issn"
                            name="issn"
                            type="text"
                            className="form-control"
                            placeholder="ISSN de la revista."
                            aria-label="ISSN de la revista."
                            aria-describedby="ISSNError"
                        />
                        <ErrorContainer>
                            <ErrorMessage name="issn" component="div" />
                        </ErrorContainer>
                    </div>
                    <div className="mb-3">
                        <BootstrapForm.Label htmlFor="issn">Título:</BootstrapForm.Label>
                        <Field
                            id="title"
                            name="title"
                            type="text"
                            className="form-control"
                            placeholder="Título de la revista."
                            aria-label="Título de la revista."
                            aria-describedby="titleError"
                        />
                        <ErrorContainer>
                            <ErrorMessage name="title" component="div" />
                        </ErrorContainer>
                    </div>
                    <div className="mb-3">
                        <BootstrapForm.Label htmlFor="publisher">Editorial:</BootstrapForm.Label>
                        <Field
                            id="publisher"
                            name="publisher"
                            type="text"
                            className="form-control"
                            placeholder="Editorial de la revista."
                            aria-label="Editorial de la revista."
                            aria-describedby="publisherError"
                        />
                        <ErrorContainer>
                            <ErrorMessage name="publisher" component="div" />
                        </ErrorContainer>
                    </div>

                    <div className="mb-3">
                        <BootstrapForm.Label htmlFor="editionNumber">Número de la revista:</BootstrapForm.Label>
                        <Field
                            id="editionNumber"
                            name="editionNumber"
                            type="number"
                            className="form-control"
                            placeholder="Número de la revista."
                            aria-label="Número de la revista."
                            aria-describedby="editionNumberError"
                        />
                        <ErrorContainer>
                            <ErrorMessage name="editionNumber" component="div" />
                        </ErrorContainer>
                    </div>
                    <DateWrapper>
                        <BootstrapForm.Label htmlFor="publishDate">Fecha de publicación:</BootstrapForm.Label>
                        <DatePicker
                            id="publishDate" // Added id attribute
                            selected={values.publishDate}
                            onChange={(date) => async () => {
                                await setFieldValue('publishDate', date).then(() =>
                                    validateField('publishDate').then(() => setFieldTouched('publishDate', true))
                                )
                            }}
                            onSelect={() => async () => {
                                await validateField('publishDate')
                            }}
                            dateFormat={'dd/MM/yyyy'}
                            className="form-control"
                            locale="es"
                            showYearDropdown
                            placeholderText="Seleccione"
                            maxDate={new Date()}
                            aria-label="Fecha de inicio"
                            aria-describedby="publishDateError"
                        />
                        <ErrorContainer>
                            <ErrorMessage name="publishDate" component="div" />
                        </ErrorContainer>
                    </DateWrapper>

                    <div className="mb-3">
                        <BootstrapForm.Label htmlFor="description">Descripción:</BootstrapForm.Label>
                        <Field
                            id="description" // Added id attribute
                            name="description"
                            as="textarea"
                            className="form-control"
                            placeholder="Descripción detallada de la revista."
                            aria-label="Descripción de la revista."
                            aria-describedby="descriptionError"
                        />
                        <ErrorContainer>
                            <ErrorMessage name="description" component="div" />
                        </ErrorContainer>
                    </div>

                    <div className="mb-3">
                        <BootstrapForm.Label htmlFor="pagesAmount">Número de paginas:</BootstrapForm.Label>
                        <Field
                            id="pagesAmount"
                            name="pagesAmount"
                            type="number"
                            className="form-control"
                            placeholder="Número de páginas."
                            aria-label="Número de páginas."
                            aria-describedby="pagesAmountError"
                        />
                        <ErrorContainer>
                            <ErrorMessage name="pagesAmount" component="div" />
                        </ErrorContainer>
                    </div>

                    <FieldArray name="authors">
                        {({ push, remove }) => (
                            <div>
                                <AuthorsHeaderWrapper>
                                    <BootstrapForm.Label className="form-label mb-3">Autores:</BootstrapForm.Label>
                                    <Button type="button" variant="primary" className="mt-3" onClick={() => push({ name: '', lastName: '' })}>
                                        Añadir Autor
                                    </Button>
                                </AuthorsHeaderWrapper>
                                {errors.authors && <ErrorContainer>{Array.isArray(errors.authors) ? '' : errors.authors}</ErrorContainer>}
                                {values.authors.map((_, index) => (
                                    <div
                                        key={index}
                                        className="border rounded p-3 mb-3 bg-light position-relative"
                                        style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}
                                    >
                                        <p className="fw-bold mb-3">Autor {index + 1}</p>
                                        <div className="mb-3">
                                            <Field
                                                className="form-control mb-2"
                                                type="text"
                                                aria-label="Nombre del autor."
                                                name={`authors[${index}].firstName`}
                                                placeholder="Nombre del autor."
                                            />
                                            <ErrorContainer>
                                                <ErrorMessage name={`authors[${index}].firstName`} component="div" />
                                            </ErrorContainer>
                                        </div>
                                        <div className="mb-3">
                                            <Field
                                                className="form-control"
                                                type="text"
                                                aria-label="Apellido del autor."
                                                name={`authors[${index}].lastName`}
                                                placeholder="Apellido del autor."
                                            />
                                            <ErrorContainer>
                                                <ErrorMessage name={`authors[${index}].lastName`} component="div" />
                                            </ErrorContainer>
                                        </div>
                                        <Button
                                            variant="danger"
                                            type="button"
                                            className="position-absolute"
                                            style={{ top: '10px', right: '10px' }}
                                            onClick={() => remove(index)}
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </FieldArray>

                    <div className="mb-3">
                        <BootstrapForm.Label htmlFor="language">Idioma:</BootstrapForm.Label>
                        <Field
                            id="language"
                            name="language"
                            type="text"
                            className="form-control"
                            placeholder="Idioma de la revista."
                            aria-label="Idioma de la revista."
                            aria-describedby="languageError"
                        />
                        <ErrorContainer>
                            <ErrorMessage name="language" component="div" />
                        </ErrorContainer>
                    </div>

                    <div>
                        <BootstrapForm.Label htmlFor="imageFile">Imagen de portada:</BootstrapForm.Label>
                        <DropzoneContainer>
                            <Dropzone
                                onDrop={(acceptedFiles) => {
                                    const file = acceptedFiles[0]
                                    if (file instanceof File) {
                                        setFieldValue('imageFile', file)
                                            .then(() => setPreviewUrl(URL.createObjectURL(file))) // Generar URL de la imagen))
                                            .catch((error) => {
                                                throw error
                                            })
                                    }
                                }}
                                accept={{
                                    'image/png': ['.png'],
                                    'image/jpeg': ['.jpeg', '.jpg'],
                                    'image/webp': ['.webp'],
                                    'image/avif': ['.avif']
                                }}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()} aria-label="Zona de carga de portada de la revista." aria-describedby="imageFileError">
                                        <input {...getInputProps()} id="imageFile" aria-label="Cargar imagen portada revista." />
                                        {previewUrl ? (
                                            <img src={previewUrl} alt="Vista previa de la imagen" />
                                        ) : (
                                            <p>Arrastra aquí la imagen de la portada de la revista o haz clic para añadir una.</p>
                                        )}
                                    </div>
                                )}
                            </Dropzone>
                        </DropzoneContainer>
                    </div>
                    {errors.imageFile && (
                        <ErrorContainer style={{ marginBottom: '1rem' }}>
                            <p>{errors.imageFile}</p>
                        </ErrorContainer>
                    )}

                    <Button type="submit" variant="success" disabled={!isValid || !dirty}>
                        Añadir revista
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

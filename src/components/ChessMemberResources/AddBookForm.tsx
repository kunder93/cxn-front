import React, { useState } from 'react'
import { Field, FieldArray, Form, Formik, FormikState } from 'formik'
import DatePicker, { registerLocale } from 'react-datepicker'
import styled from 'styled-components'

import Dropzone from 'react-dropzone'
import { Form as BootstrapForm, Button } from 'react-bootstrap'
import { ErrorMessage } from 'formik'
import { es } from 'date-fns/locale'
import { AddBookValidationSchema } from './AddBookValidationSchema'
import { useAppSelector } from 'store/hooks'
import { useNotificationContext } from 'components/Common/NotificationContext'
import axios, { AxiosError } from 'axios'
import { RESOURCES_BOOK_URL } from 'resources/server_urls'
import { NotificationType } from 'components/Common/hooks/useNotification'
import { Book, IFormBook } from './Types'

registerLocale('es', es)

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

const DateWrapper = styled.div`
    display: flex;
    gap: 1rem;
    flex-direction: row;
    align-items: baseline;
`

interface AddBookFormProps {
    addBookFunction: (newBook: Book) => void
}

const AddBookForm: React.FC<AddBookFormProps> = ({ addBookFunction }) => {
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const { showNotification } = useNotificationContext()

    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const initialValues: IFormBook = {
        isbn: '',
        title: '',
        description: '',
        genre: '',
        language: '',
        publishDate: null,
        authors: [],
        coverSrc: '',
        previewUrl: null,
        imageFile: null
    }

    const handleSubmit = (values: IFormBook, resetForm: (nextState?: Partial<FormikState<IFormBook>> | undefined) => void) => {
        const formData = new FormData()
        const formattedPublishDate = values.publishDate
            ? `${String(values.publishDate.getDate()).padStart(2, '0')}/${String(values.publishDate.getMonth() + 1).padStart(2, '0')}/${values.publishDate.getFullYear()}`
            : ''

        const bookData = {
            isbn: values.isbn,
            title: values.title,
            description: values.description,
            genre: values.genre,
            language: values.language,
            publishDate: formattedPublishDate,
            authors: values.authors
        }

        const jsonBlob = new Blob([JSON.stringify(bookData)], { type: 'application/json' })
        formData.append('data', jsonBlob)

        // Append the image file if it exists
        if (values.imageFile) {
            formData.append('imageFile', values.imageFile)
        }

        axios
            .post(RESOURCES_BOOK_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userJwt}`
                }
            })
            .then((/*response*/) => {
                showNotification('Libro añadido.', NotificationType.Success)
                addBookFunction(bookData)
                resetForm()
                setPreviewUrl(null)
                //ADD BOOK
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
        <Formik
            validateOnMount
            validateOnChange
            initialValues={initialValues}
            validationSchema={AddBookValidationSchema}
            onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
        >
            {({ setFieldValue, values, validateField, setFieldTouched, isValid, dirty, errors }) => {
                return (
                    <Form>
                        <div className="mb-3">
                            <BootstrapForm.Label htmlFor="isbn">ISBN:</BootstrapForm.Label>
                            <Field
                                id="isbn" // Added id attribute
                                name="isbn"
                                type="text"
                                className="form-control"
                                placeholder="ISBN del libro."
                                aria-label="ISBN del libro."
                                aria-describedby="ISBNError"
                            />
                            <ErrorContainer>
                                <ErrorMessage name="isbn" component="div" />
                            </ErrorContainer>
                        </div>

                        <div className="mb-3">
                            <BootstrapForm.Label htmlFor="title">Título:</BootstrapForm.Label>
                            <Field
                                id="title" // Added id attribute
                                name="title"
                                type="text"
                                className="form-control"
                                placeholder="Título del libro."
                                aria-label="Título del libro."
                                aria-describedby="titleError"
                            />
                            <ErrorContainer>
                                <ErrorMessage name="title" component="div" />
                            </ErrorContainer>
                        </div>
                        <div className="mb-3">
                            <BootstrapForm.Label htmlFor="description">Descripción:</BootstrapForm.Label>
                            <Field
                                id="description" // Added id attribute
                                name="description"
                                as="textarea"
                                className="form-control"
                                placeholder="Descripción detallada del libro. Qué se va a hacer."
                                aria-label="Descripción del libro."
                                aria-describedby="descriptionError"
                            />
                            <ErrorContainer>
                                <ErrorMessage name="description" component="div" />
                            </ErrorContainer>
                        </div>

                        <div className="mb-3">
                            <BootstrapForm.Label htmlFor="genre">Género:</BootstrapForm.Label>
                            <Field
                                id="genre" // Added id attribute
                                name="genre"
                                type="text"
                                className="form-control"
                                placeholder="Género del libro."
                                aria-label="Género del libro."
                                aria-describedby="genreError"
                            />
                            <ErrorContainer>
                                <ErrorMessage name="genre" component="div" />
                            </ErrorContainer>
                        </div>
                        <div className="mb-3">
                            <BootstrapForm.Label htmlFor="language">Idioma:</BootstrapForm.Label>
                            <Field
                                id="language"
                                name="language"
                                type="text"
                                className="form-control"
                                placeholder="Idioma del libro."
                                aria-label="Idioma del libro."
                                aria-describedby="languageError"
                            />
                            <ErrorContainer>
                                <ErrorMessage name="language" component="div" />
                            </ErrorContainer>
                        </div>

                        <DateWrapper>
                            <BootstrapForm.Label htmlFor="publishDate">Fecha de publicación:</BootstrapForm.Label>
                            <DatePicker
                                id="publishDate" // Added id attribute
                                selected={values.publishDate}
                                onChange={(date) =>
                                    void setFieldValue('publishDate', date).then(() =>
                                        validateField('publishDate').then(() => setFieldTouched('publishDate', true))
                                    )
                                }
                                onSelect={() => void validateField('publishDate')}
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

                        <div>
                            <BootstrapForm.Label htmlFor="imageFile">Imagen de portada:</BootstrapForm.Label>
                            <DropzoneContainer>
                                <Dropzone
                                    onDrop={(acceptedFiles) => {
                                        const file = acceptedFiles[0]
                                        if (file instanceof File) {
                                            void setFieldValue('imageFile', file)
                                            setPreviewUrl(URL.createObjectURL(file)) // Generar URL de la imagen
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
                                        <div {...getRootProps()} aria-label="Zona de carga de portada de libro." aria-describedby="imageFileError">
                                            <input {...getInputProps()} id="imageFile" aria-label="Cargar imagen portada libro." />
                                            {previewUrl ? (
                                                <img src={previewUrl} alt="Vista previa de la imagen" />
                                            ) : (
                                                <p>Arrastra aquí la imagen de la portada del libro o haz clic para añadir una.</p>
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
                            Añadir libro
                        </Button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default AddBookForm

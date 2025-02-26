// AddBookForm.tsx
import React, { useState } from 'react'
import { FieldArray, Form, Formik, FormikState } from 'formik'
import { registerLocale } from 'react-datepicker'
import { Form as BootstrapForm, Button, Spinner } from 'react-bootstrap'
import { es } from 'date-fns/locale'
import { AddBookValidationSchema } from './AddBookValidationSchema'
import { useAppSelector } from 'store/hooks'
import { useNotificationContext } from 'components/Common/NotificationContext'
import axios from 'axios'
import { RESOURCES_BOOK_URL } from 'resources/server_urls'
import { NotificationType } from 'components/Common/hooks/useNotification'
import { Book, IFormBook } from './Types'
import { AuthorsHeaderWrapper, ErrorContainer } from './Common/FormStyles'
import { DateField, FormTextField, CoverImageDropzone } from './Common/FormComponents'

registerLocale('es', es)

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

    const handleSubmit = (
        values: IFormBook,
        setSubmitting: (isSubmitting: boolean) => void,
        resetForm: (nextState?: Partial<FormikState<IFormBook>>) => void
    ) => {
        const formData = new FormData()
        const formattedPublishDate = values.publishDate
            ? `${String(values.publishDate.getDate()).padStart(2, '0')}/${String(values.publishDate.getMonth() + 1).padStart(
                  2,
                  '0'
              )}/${values.publishDate.getFullYear().toLocaleString()}`
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

        // Agregar la imagen si existe
        if (values.imageFile) {
            formData.append('imageFile', values.imageFile)
        }

        axios
            .post(RESOURCES_BOOK_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userJwt ?? ''}`
                }
            })
            .then(() => {
                showNotification('Libro añadido.', NotificationType.Success)
                addBookFunction(bookData)
                resetForm()
                setPreviewUrl(null)
            })
            .catch((error: unknown) => {
                setSubmitting(false)
                if (axios.isAxiosError(error)) {
                    showNotification(error.message, NotificationType.Error)
                } else {
                    showNotification('Error inesperado.', NotificationType.Error)
                }
            })
    }

    return (
        <Formik<IFormBook>
            validateOnBlur
            validateOnMount
            validateOnChange
            initialValues={initialValues}
            validationSchema={AddBookValidationSchema}
            onSubmit={(values, { resetForm, setSubmitting }) => {
                handleSubmit(values, setSubmitting, resetForm)
            }}
        >
            {({ setFieldValue, values, validateField, setFieldTouched, isValid, dirty, errors, isSubmitting }) => (
                <Form>
                    <FormTextField label="ISBN:" name="isbn" placeholder="ISBN del libro." />
                    <FormTextField label="Título:" name="title" placeholder="Título del libro." />
                    <FormTextField label="Descripción:" name="description" as="textarea" placeholder="Descripción detallada del libro. Qué se va a hacer." />
                    <FormTextField label="Género:" name="genre" placeholder="Género del libro." />
                    <FormTextField label="Idioma:" name="language" placeholder="Idioma del libro." />
                    <DateField publishDate={values.publishDate} setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} validateField={validateField} />

                    <FieldArray name="authors">
                        {(arrayHelpers) => (
                            <div>
                                <AuthorsHeaderWrapper>
                                    <BootstrapForm.Label className="form-label mb-3">Autores:</BootstrapForm.Label>
                                    <Button
                                        type="button"
                                        variant="primary"
                                        className="mt-3"
                                        onClick={() => {
                                            arrayHelpers.push({ firstName: '', lastName: '' })
                                        }}
                                    >
                                        Añadir Autor
                                    </Button>
                                </AuthorsHeaderWrapper>

                                {errors.authors && <ErrorContainer>{Array.isArray(errors.authors) ? '' : errors.authors}</ErrorContainer>}

                                {values.authors.map((_, index) => (
                                    <div
                                        key={`author-${index.toString()}`}
                                        className="border rounded p-3 mb-3 bg-light position-relative"
                                        style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}
                                    >
                                        <p className="fw-bold mb-3">Autor {index + 1}</p>
                                        <FormTextField
                                            label="Nombre del autor:"
                                            name={`authors[${index.toString()}].firstName`}
                                            placeholder="Nombre del autor."
                                        />
                                        <FormTextField
                                            label="Apellido del autor:"
                                            name={`authors[${index.toString()}].lastName`}
                                            placeholder="Apellido del autor."
                                        />
                                        <Button
                                            variant="danger"
                                            type="button"
                                            className="position-absolute"
                                            style={{ top: '10px', right: '10px' }}
                                            onClick={() => arrayHelpers.remove(index)}
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </FieldArray>

                    {/* Usamos el componente refactorizado para el dropzone */}
                    <CoverImageDropzone
                        fieldName="imageFile"
                        setFieldValue={setFieldValue}
                        previewUrl={previewUrl}
                        error={typeof errors.imageFile === 'string' ? errors.imageFile : undefined}
                        coverType="libro"
                        onPreviewUrlChange={setPreviewUrl}
                    />

                    <Button type="submit" variant="success" disabled={!isValid || !dirty || isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Spinner animation="border" size="sm" /> Enviando...
                            </>
                        ) : (
                            'Añadir libro'
                        )}
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default AddBookForm

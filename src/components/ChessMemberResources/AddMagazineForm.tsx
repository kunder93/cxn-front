import React, { useState } from 'react'
import { Form, Formik, FieldArray, FormikState } from 'formik'
import { Form as BootstrapForm, Button, Spinner } from 'react-bootstrap'
import { AddMagazineValidationSchema } from './AddMagazineValidationSchema'
import axios from 'axios'
import { RESOURCES_MAGAZINE_URL } from 'resources/server_urls'
import { useAppSelector } from 'store/hooks'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { NotificationType } from 'components/Common/hooks/useNotification'
import { IFormMagazine, Magazine } from './Types'
import { AuthorsHeaderWrapper, ErrorContainer } from './Common/FormStyles'
import { CoverImageDropzone, DateField, FormTextField } from './Common/FormComponents'

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

    const handleSubmit = (
        values: IFormMagazine,
        setSubmitting: (isSubmitting: boolean) => void,
        resetForm: (nextState?: Partial<FormikState<IFormMagazine>>) => void
    ) => {
        const formData = new FormData()
        const formattedPublishDate = values.publishDate
            ? `${String(values.publishDate.getDate()).padStart(2, '0')}/${String(values.publishDate.getMonth() + 1).padStart(2, '0')}/${values.publishDate.getFullYear().toString()}`
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

        if (values.imageFile) {
            formData.append('imageFile', values.imageFile)
        }

        axios
            .post(RESOURCES_MAGAZINE_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userJwt ?? ''}`
                }
            })
            .then(() => {
                showNotification('Revista añadida.', NotificationType.Success)
                addMagazineFunction(magazineData)
                resetForm()
                setPreviewUrl(null)
            })
            .catch((error: unknown) => {
                setSubmitting(false)
                if (axios.isAxiosError(error)) {
                    showNotification('Error: ' + error.message, NotificationType.Error)
                } else {
                    showNotification('Error inesperado.', NotificationType.Error)
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
            onSubmit={(values, { resetForm, setSubmitting }) => {
                handleSubmit(values, setSubmitting, resetForm)
            }}
        >
            {({ setFieldValue, values, validateField, setFieldTouched, isValid, dirty, errors, isSubmitting }) => (
                <Form>
                    <FormTextField label="ISSN:" name="issn" placeholder="ISSN de la revista." />
                    <FormTextField label="Título:" name="title" placeholder="Título de la revista." />
                    <FormTextField label="Editorial:" name="publisher" placeholder="Editorial de la revista." />
                    <FormTextField label="Número de la revista:" name="editionNumber" placeholder="Número de la revista." type="number" />
                    <DateField publishDate={values.publishDate} setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} validateField={validateField} />
                    <FormTextField label="Descripción:" name="description" as="textarea" placeholder="Descripción detallada de la revista." />
                    <FormTextField label="Número de páginas:" name="pagesAmount" placeholder="Número de páginas." type="number" />

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

                    <FormTextField label="Idioma:" name="language" placeholder="Idioma de la revista." />

                    <CoverImageDropzone
                        fieldName="imageFile"
                        setFieldValue={setFieldValue}
                        previewUrl={previewUrl}
                        error={typeof errors.imageFile === 'string' ? errors.imageFile : undefined}
                        coverType="revista"
                        onPreviewUrlChange={setPreviewUrl}
                    />

                    <Button type="submit" variant="success" disabled={!isValid || !dirty || isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Spinner animation="border" size="sm" /> Enviando...
                            </>
                        ) : (
                            'Añadir revista'
                        )}
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default AddMagazineForm

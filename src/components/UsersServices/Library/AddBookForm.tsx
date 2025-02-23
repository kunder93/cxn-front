import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Field, FieldArray, Form, Formik, FormikHelpers, ErrorMessage } from 'formik'
import { IAuthor, IBook } from '../../Types/Types'
import { LIBRARY_URL } from '../../../resources/server_urls'
import axios, { isAxiosError } from 'axios'
import BootstrapForm from 'react-bootstrap/Form'
import { CreateBookValidationSchema } from '../../../pages/validation/FormValidationSchemas'

interface CreateBookFormValues {
    isbn: string
    title: string
    gender: string
    publish_year: Date
    language: string
    authorsList: IAuthor[]
}

interface AddBookFormProps {
    updateBooksList: (book: IBook) => void
}

const AddBookForm: React.FC<AddBookFormProps> = () => {
    const initialValues: CreateBookFormValues = { isbn: '', title: '', gender: '', publish_year: new Date(), language: '', authorsList: [] }

    const handleSubmit = async (values: CreateBookFormValues, actions: FormikHelpers<CreateBookFormValues>) => {
        try {
            const bookData = {
                isbn: values.isbn,
                title: values.title,
                gender: values.gender,
                publishYear: values.publish_year,
                language: values.language,
                authorsList: values.authorsList
            }

            await axios.post<IBook>(LIBRARY_URL, bookData)

            //updateBooksList(bookData);
        } catch (error) {
            if (isAxiosError(error)) {
                console.error(error)
            }
        }

        actions.resetForm()
        actions.setSubmitting(false)
    }

    return (
        <Container>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={CreateBookValidationSchema} validateOnChange={true}>
                {({ errors }) => (
                    <BootstrapForm as={Form}>
                        <Container as={BootstrapForm.Group}>
                            <Row>
                                <Col>
                                    <BootstrapForm.Label htmlFor="isbn">ISBN:</BootstrapForm.Label>
                                    <Field as={BootstrapForm.Control} id="isbn" name="isbn" type="text" placeholder="El ISBN" />
                                    <ErrorMessage name="isbn" component={'div'} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <BootstrapForm.Label htmlFor="title">Titulo:</BootstrapForm.Label>
                                    <Field as={BootstrapForm.Control} id="title" type="text" name="title" placeholder="El titulo" />
                                    <ErrorMessage name="title" component={'div'} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <BootstrapForm.Label htmlFor="gender">Genero:</BootstrapForm.Label>
                                    <Field as={BootstrapForm.Control} id="gender" type="text" name="gender" placeholder="El genero" />
                                    <ErrorMessage name="gender" component={'div'} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <BootstrapForm.Label htmlFor="language">Idioma:</BootstrapForm.Label>
                                    <Field as={BootstrapForm.Control} id="language" type="text" name="language" placeholder="El idioma" />
                                    <ErrorMessage name="language" component={'div'} />
                                </Col>
                            </Row>
                            <Row>
                                <Col md="auto">
                                    <BootstrapForm.Label htmlFor="publish_year">Fecha publicacion: </BootstrapForm.Label>
                                </Col>
                                <Col md="auto">
                                    <Field as={BootstrapForm.Control} id="publish_year" name="publish_year" type="date" />
                                </Col>
                            </Row>

                            <FieldArray name="authorsList">
                                {({ push, remove, form }) => (
                                    <div>
                                        {form.values.authorsList.map((_author: IAuthor, index: number) => (
                                            <div className="row" key={index}>
                                                <div className="col">
                                                    <label htmlFor={`authorsList.${index}.firstName`}>Nombre</label>
                                                    <Field name={`authorsList.${index}.firstName`} placeholder="Nombre del autor" type="text" />
                                                    <ErrorMessage name={`authorsList.${index}.firstName`} component="div" className="field-error" />
                                                </div>
                                                <div className="col">
                                                    <label htmlFor={`authorsList.${index}.lastName`}>Apellidos</label>
                                                    <Field name={`authorsList.${index}.lastName`} placeholder="Apellidos del autor" type="text" />
                                                    <ErrorMessage name={`authorsList.${index}.lastName`} component="div" className="field-error" />
                                                </div>
                                                <div className="col">
                                                    <label htmlFor={`authorsList.${index}.nationality`}>Nacionalidad</label>
                                                    <Field name={`authorsList.${index}.nationality`} placeholder="Nacionalidad del autor" type="text" />
                                                    <ErrorMessage name={`authorsList.${index}.nationality`} component="div" className="field-error" />
                                                </div>
                                                <div className="col">
                                                    <Button type="button" className="secondary" onClick={() => remove(index)}>
                                                        X
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                        <Button type="button" className="secondary" onClick={() => push({ firstName: '', lastName: '', nationality: '' })}>
                                            Añadir autor
                                        </Button>
                                    </div>
                                )}
                            </FieldArray>

                            <Row>
                                <Button type="submit" disabled={Object.keys(errors).length > 0}>
                                    Registrar libro
                                </Button>
                            </Row>
                        </Container>
                    </BootstrapForm>
                )}
            </Formik>
        </Container>
    )
}

export default AddBookForm

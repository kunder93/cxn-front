/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Collapse, Container, Row } from 'react-bootstrap'
import { FloatingNotificationContainer } from '../../Common/FloatingNotificationContainer'
import { Field, FieldArray, Form, Formik, FormikHelpers, ErrorMessage } from 'formik'
import { IAuthor, IBook } from '../../Types/Types'
import { LIBRARY_URL } from '../../../resources/server_urls'
import axios from 'axios'
import BootstrapForm from 'react-bootstrap/Form'
import { CreateBookValidationSchema } from '../../../pages/validation/FormValidationSchemas'
import { FormErrorMessage } from '../../Common/FormErrorMessage'

interface CreateBookFormValues {
    isbn: string
    title: string
    gender: string
    publish_year: Date
    language: string
    authorsList: IAuthor[]
}

const AddBookForm = (props: any) => {
    const FloatingNotification: React.FC<{ message: string; variant: string; onClose: () => void }> = ({ message, variant, onClose }) => {
        const [visible, setVisible] = useState(true)
        useEffect(() => {
            const timer = setTimeout(() => {
                setVisible(false)
            }, 5000)

            return () => {
                clearTimeout(timer)
            }
        }, [])

        const handleExited = () => {
            onClose()
        }

        return (
            <Collapse in={visible} onExited={handleExited}>
                <FloatingNotificationContainer>
                    <Alert variant={variant} onClose={onClose} dismissible>
                        {message}
                    </Alert>
                </FloatingNotificationContainer>
            </Collapse>
        )
    }

    const initialValues: CreateBookFormValues = { isbn: '', title: '', gender: '', publish_year: new Date(), language: '', authorsList: [] }
    const [alertMessage, setAlertMessage] = useState('')
    const [submitSuccessNotification, setSubmitSuccessNotification] = useState(false)
    const [submitErrorNotification, setSubmitErrorNotification] = useState(false)
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
            setSubmitSuccessNotification(true)
            props.updateBooksList(bookData)
        } catch (error: any) {
            setSubmitErrorNotification(true)

            if (error.response?.data) {
                // Request made and server responded
                setAlertMessage(error.response.data.content)
            } else if (error.request) {
                // The request was made but no response was received
                setAlertMessage('Error: no hay respuesta.')
            } else {
                // Something happened in setting up the request that triggered an Error
                setAlertMessage('Error: algo inesperado. Recarga o intentalo mas tarde.')
            }
        }

        actions.resetForm()
        actions.setSubmitting(false)
    }

    function changeSuccessNotificationState(): void {
        setSubmitSuccessNotification(false)
    }
    function changeErrorNotificationState(): void {
        setSubmitErrorNotification(false)
    }
    return (
        <Container>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => handleSubmit(values, actions)}
                validationSchema={CreateBookValidationSchema}
                validateOnChange={true}
            >
                {({ errors, touched }) => (
                    <BootstrapForm as={Form}>
                        <Container as={BootstrapForm.Group}>
                            <Row>
                                <Col>
                                    <BootstrapForm.Label htmlFor="isbn">ISBN:</BootstrapForm.Label>
                                    <Field as={BootstrapForm.Control} id="isbn" name="isbn" type="text" placeholder="El ISBN" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>{errors.isbn && touched.isbn ? <FormErrorMessage>{errors.isbn}</FormErrorMessage> : ''}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <BootstrapForm.Label htmlFor="title">Titulo:</BootstrapForm.Label>
                                    <Field as={BootstrapForm.Control} id="title" type="text" name="title" placeholder="El titulo" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>{errors.title && touched.title ? <FormErrorMessage>{errors.title}</FormErrorMessage> : ''}</Col>
                            </Row>

                            <Row>
                                <Col>
                                    <BootstrapForm.Label htmlFor="gender">Genero:</BootstrapForm.Label>
                                    <Field as={BootstrapForm.Control} id="gender" type="text" name="gender" placeholder="El genero" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>{errors.gender && touched.gender ? <FormErrorMessage>{errors.gender}</FormErrorMessage> : ''}</Col>
                            </Row>

                            <Row>
                                <Col>
                                    <BootstrapForm.Label htmlFor="language">Idioma:</BootstrapForm.Label>
                                    <Field as={BootstrapForm.Control} id="language" type="text" name="language" placeholder="El idioma" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>{errors.language && touched.language ? <FormErrorMessage>{errors.language}</FormErrorMessage> : ''}</Col>
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
                                        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access*/} 
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
                                <Button
                                    type="submit"
                                    disabled={errors.isbn ?? errors.title ?? errors.gender ?? errors.language ?? errors.publish_year ? true : false}
                                >
                                    Registrar libro
                                </Button>
                            </Row>

                            {submitSuccessNotification && (
                                <FloatingNotification
                                    message={'LIBRO REGISTRADO CON EXITO'}
                                    variant={'success'}
                                    onClose={changeSuccessNotificationState}
                                ></FloatingNotification>
                            )}
                            {submitErrorNotification && (
                                <FloatingNotification message={alertMessage} variant={'danger'} onClose={changeErrorNotificationState}></FloatingNotification>
                            )}
                        </Container>
                    </BootstrapForm>
                )}
            </Formik>
        </Container>
    )
}

export default AddBookForm

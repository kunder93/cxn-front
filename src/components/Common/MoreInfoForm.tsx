import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import BootstrapForm from 'react-bootstrap/Form'
import { Button, Spinner } from 'react-bootstrap'
import styled from 'styled-components'

const FormTitleStyled = styled.span`
    font-size: 150%;
    text-align: left;
    display: block;
    padding-bottom: 1em;
`

/**
 * Validation schema for MoreInfoForm.
 */
const validationSchema = Yup.object().shape({
    texto: Yup.string().max(200, 'El texto debe tener como máximo 200 caracteres').required('Se requiere un mensaje'),
    asunto: Yup.string().max(40, 'El asunto debe tener como máximo 40 caracteres').required('Se requiere un asunto.'),
    email: Yup.string().email('Debe ser un email valido.').max(40, 'El email es demasiado largo.').required('Se requiere un email.')
})

interface Props {
    initialTopic: string // Definir initialTopic como opcional
    formTitle: string
    // onSubmit: (values: FormData) => Promise<void>; // prop for handling form submission
}

interface FormData {
    texto: string
    asunto: string
    email: string
}

const MoreInfoForm: React.FC<Props> = ({ initialTopic, formTitle /*, onSubmit*/ }) => {
    const initialValues: FormData = {
        texto: '',
        asunto: initialTopic,
        email: ''
    }

    const handleSubmit = async (values: FormData) => {
        await new Promise((resolve) => setTimeout(resolve, 5000)) // Simular una espera de 5 seg.
        try {
            await axios.post('https://FORMULARIO.CLASES', values)
            console.log('Datos enviados:', values)
        } catch (error) {
            console.error('Error al enviar los datos:', error)
        }
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} validateOnMount={true}>
            {({ setFieldTouched, touched, errors, isSubmitting, isValid }) => (
                <Form className="mt-4">
                    <FormTitleStyled>{formTitle}</FormTitleStyled>
                    <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label htmlFor="asunto">Asunto:</BootstrapForm.Label>
                        <Field
                            as={BootstrapForm.Control}
                            type="text"
                            id="asunto"
                            name="asunto"
                            className={touched.asunto && errors.asunto ? 'is-invalid' : ''}
                            onBlur={() => setFieldTouched('asunto', true)}
                            placeholder={initialTopic}
                        />
                        <ErrorMessage name="asunto" component="div" className="invalid-feedback" />
                    </BootstrapForm.Group>
                    <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label htmlFor="email">Email:</BootstrapForm.Label>
                        <Field
                            as={BootstrapForm.Control}
                            type="email"
                            id="email"
                            name="email"
                            onBlur={() => setFieldTouched('email', true)}
                            className={touched.email && errors.email ? 'is-invalid' : ''}
                            placeholder="Ingrese su email para responderle."
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </BootstrapForm.Group>

                    <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label htmlFor="texto">Mensaje:</BootstrapForm.Label>
                        <Field
                            as={BootstrapForm.Control}
                            component="textarea"
                            type="text"
                            id="texto"
                            name="texto"
                            placeholder="Ingrese su mensaje"
                            onBlur={() => setFieldTouched('texto', true)}
                            className={touched.texto && errors.texto ? 'is-invalid form-control ' : 'form-control'}
                        />
                        <ErrorMessage name="texto" component="div" className="invalid-feedback" />
                    </BootstrapForm.Group>
                    <Button variant="success" type="submit" disabled={isSubmitting || !isValid}>
                        {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Enviar'}
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default MoreInfoForm

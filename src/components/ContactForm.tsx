/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import BootstrapForm from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
// Define validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string().required('Es necesario un email !').email('Es necesario un email !'),
    reason: Yup.string().required('Es necesario un motivo o razón'),
    text: Yup.string().required('Es necesario por lo menos 20 caracteres.').min(20, 'Se necesitan 20 caracteres minimos.')
})

// Form component
const ContactForm: React.FC = () => {
    const initialValues = {
        reason: '',
        messageContent: '',
        email: ''
    }

    const handleSubmit = (values: any) => {
        console.log(values)
        // Handle form submission here
    }

    return (
        <div>
            <h2>Formulario de contacto:</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <BootstrapForm as={Form}>
                    <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label htmlFor="email">Correo electrónico:</BootstrapForm.Label>
                        <BootstrapForm.Control as={Field} type="email" name="email" title="email" id="email" placeholder="tu correo electrónico!" />
                        <ErrorMessage name="email" component="div" className="alert alert-danger" />
                        <BootstrapForm.Label htmlFor="reason">Tema: / Razón:</BootstrapForm.Label>
                        <BootstrapForm.Control as={Field} type="text" name="reason" title="reason" id="reason" placeholder="Motivo del mensaje." />
                        <ErrorMessage name="reason" component="div" className="alert alert-danger" />
                        <BootstrapForm.Label htmlFor="messageContent">Detalles:</BootstrapForm.Label>
                        <BootstrapForm.Control
                            as={Field}
                            component={'textarea'}
                            id="messageContent"
                            name="messageContent"
                            rows={4}
                            title="messageContent"
                            placeholder="Escribe aquí el mensaje."
                        />
                        <ErrorMessage name="messageContent" component="div" className="alert alert-danger" />
                    </BootstrapForm.Group>
                    <Button type="submit" variant="success">
                        Enviar
                    </Button>
                </BootstrapForm>
            </Formik>
        </div>
    )
}

export default ContactForm

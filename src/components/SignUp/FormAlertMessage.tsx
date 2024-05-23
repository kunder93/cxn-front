import React from 'react'
import { ErrorAlert, ErrorTriangle } from './SignUpFormStyles'
import { Button, Container } from 'react-bootstrap'

// Componente para mostrar mensajes de alerta
const FormAlertMessage: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
    <Container>
        <ErrorAlert variant="danger">
            <ErrorTriangle />
            {message}
            <Button variant="outline-danger" onClick={onClose}>
                Cerrar
            </Button>
        </ErrorAlert>
    </Container>
)

export default FormAlertMessage

import { useRef } from 'react'
import { Button, Modal, ModalProps } from 'react-bootstrap'
import styled from 'styled-components'
import { FormikProps } from 'formik'
import UnsubscribeMemberForm, { UnsubscribeMemberFormValues } from './UnsubscribeMemberForm'

interface UnsubscribeMemberModalProps extends ModalProps {
    useremail: string
    name: string
    firstsurname: string
    secondsurname: string
}

const ModalBody = styled(Modal.Body)`
    padding-top: 1em;
    background-color: #f9f9f9; /* Fondo neutro */

    p {
        color: #333; /* Texto principal en gris oscuro */
        font-size: 1rem;
        line-height: 1.5;
    }

    a {
        color: #007bff; /* Enlace azul */
        text-decoration: underline;
        &:hover {
            color: #0056b3; /* Azul más oscuro al pasar */
        }
    }

    @media (max-width: 768px) {
        padding: 1em;
    }
`

// Estilos para el pie del modal
const ModalFooter = styled(Modal.Footer)`
    justify-content: space-between !important;
    background-color: #f1f1f1; /* Fondo claro para separar visualmente */

    button {
        transition:
            background-color 0.3s ease,
            transform 0.2s ease;
        font-size: 1rem;
        font-weight: 500;
    }

    button:hover {
        transform: translateY(-2px); /* Animación sutil */
    }

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 1em;

        button {
            width: 100%; /* Botones de ancho completo en móvil */
            font-size: 1.4em;
        }
    }
`

// Estilos para el título del modal
const ModalTitle = styled.h2`
    font-size: 1.8rem;
    color: #444;
    font-weight: bold;

    @media (max-width: 768px) {
        font-size: 1.5rem;
        text-align: center;
    }
`

// Botón de confirmación estilizado
const ConfirmButton = styled(Button)`
    background-color: #28a745; /* Verde para confirmación */
    border: none;

    &:hover {
        background-color: #218838;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.5); /* Indicador de enfoque accesible */
    }
`

// Botón de cierre estilizado
const CloseButton = styled(Button)`
    background-color: #dc3545; /* Rojo para acciones de cancelación */
    border: none;

    &:hover {
        background-color: #c82333;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.5); /* Indicador de enfoque accesible */
    }
`

// Estilos para el contenedor de advertencias
const WarningContainer = styled.div`
    border: 1px solid #ffc107; /* Borde amarillo */
    background-color: #fff3cd; /* Fondo amarillo claro */
    padding: 1em;
    border-radius: 5px;
    margin-bottom: 1em;

    p {
        margin: 0;
        font-size: 1rem;
        color: #856404; /* Texto amarillo oscuro */
    }
`

const UnsubscribeAdvertence = (): JSX.Element => {
    return (
        <WarningContainer>
            <p>
                Estas a punto de darse de baja como socio de Xadrez Narón. Esta acción tiene una duración de 15 días. Durante estos días, no podrás entrar de
                nuevo como socio en la web ni hacer uso de los servicios de socio. Para revocar esta petición, ponte en contacto a través del formulario de
                contacto en la sección CLUB, o del correo electrónico {<a href="mailto:xadreznaron@hotmail.es">xadreznaron@hotmail.es</a>}. Por favor, confirma
                que deseas continuar.
            </p>
        </WarningContainer>
    )
}

const UnsubscribeMemberModal = (props: UnsubscribeMemberModalProps): JSX.Element => {
    const formRef = useRef<FormikProps<UnsubscribeMemberFormValues>>(null)

    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * Submit the form programatically. This function is called when the
     * confirm button is clicked.
     */
    /******  4389c26b-424c-4e7b-9deb-88730f039c75  *******/
    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.handleSubmit()
        }
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <ModalTitle>Darse de baja como socio: {props.name + ' ' + props.firstsurname + ' ' + props.secondsurname}</ModalTitle>
                </Modal.Title>
            </Modal.Header>
            <ModalBody>
                <UnsubscribeAdvertence />
                <UnsubscribeMemberForm formikRef={formRef} userEmail={props.useremail} />
            </ModalBody>
            <ModalFooter>
                <ConfirmButton onClick={handleSubmit}>Confirmar</ConfirmButton>
                <CloseButton onClick={props.onHide}>Cerrar</CloseButton>
            </ModalFooter>
        </Modal>
    )
}

export default UnsubscribeMemberModal

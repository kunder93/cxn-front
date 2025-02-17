import { Modal, ModalProps } from 'react-bootstrap'
import styled from 'styled-components'
import UnsubscribeMemberForm from './UnsubscribeMemberForm'

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
    // Function to close the modal
    const closeModal = () => {
        if (props.onHide) {
            // Ensure onHide exists before invoking it
            props.onHide()
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
                <UnsubscribeMemberForm userEmail={props.useremail} closeModal={closeModal} />
            </ModalBody>
        </Modal>
    )
}

export default UnsubscribeMemberModal

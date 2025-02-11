import React, { useState } from 'react'
import { Button, Modal, ModalProps } from 'react-bootstrap'
import styled from 'styled-components'
import ChangeEmailForm from './ChangeEmailForm'

interface ChangeEmailModalProps extends ModalProps {
    useremail: string
    name: string
    firstsurname: string
    secondsurname: string
}

const ModalBody = styled(Modal.Body)`
    padding-top: 0px !important;

    // Ajuste del padding para pantallas móviles
    @media (max-width: 768px) {
        padding: 1rem !important;
    }
`

const ModalFooter = styled(Modal.Footer)`
    justify-content: space-between !important;

    // Cambiar la disposición de los botones en móviles
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;

        button {
            width: 100%;
            font-size: 1.4em;
        }
    }
`
const ModalTitle = styled.h2`
    font-size: 1.5rem;

    // Ajustar el tamaño de la fuente en pantallas más pequeñas
    @media (max-width: 768px) {
        font-size: 1.25rem;
    }
`
const ChangeEmailModal: React.FC<ChangeEmailModalProps> = (props) => {
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const handleButtonDisabled = (isDisabled: boolean) => {
        setButtonDisabled(isDisabled)
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <ModalTitle>Cambiar email de: {`${props.name} ${props.firstsurname} ${props.secondsurname}`}</ModalTitle>
                </Modal.Title>
            </Modal.Header>
            <ModalBody>
                <ChangeEmailForm initialEmail={props.useremail} buttonDisabledHandler={handleButtonDisabled} />
            </ModalBody>
            <ModalFooter>
                <Button variant="success" type="submit" form="emailChangeForm" disabled={buttonDisabled}>
                    Cambiar
                </Button>
                <Button variant="danger" onClick={props.onHide}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ChangeEmailModal

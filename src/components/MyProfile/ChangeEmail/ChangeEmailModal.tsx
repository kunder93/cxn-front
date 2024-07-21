import React, { useState } from 'react'
import { Button, Modal, ModalProps } from 'react-bootstrap'
import styled from 'styled-components'
import ChangeEmailForm from './ChangeEmailForm'

interface ChangeEmailModalProps extends ModalProps {
    userEmail: string
    name: string
    firstsurname: string
    secondsurname: string
}

const ModalBody = styled(Modal.Body)`
    padding-top: 0px !important;
`

const ModalFooter = styled(Modal.Footer)`
    justify-content: space-between !important; /* Distribuye los elementos a lo largo del contenedor */
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
                    <h2>Cambiar email de: {`${props.name} ${props.firstSurname} ${props.secondsurname}`}</h2>
                </Modal.Title>
            </Modal.Header>
            <ModalBody>
                <ChangeEmailForm initialEmail={props.userEmail} buttonDisabledHandler={handleButtonDisabled} />
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

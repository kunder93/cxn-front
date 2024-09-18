import React from 'react'
import { Button, Modal } from 'react-bootstrap'

interface HomePageCardModalProps {
    show: boolean
    closeModal: () => void
    modalContentComponent: React.ReactElement | null
    ariaLabel: string
}

const HomePageCardModal: React.FC<HomePageCardModalProps> = ({ show, closeModal, modalContentComponent, ariaLabel }) => {
    return (
        <Modal show={show} onHide={closeModal} aria-label={ariaLabel}>
            <Modal.Header closeButton>
                <Modal.Title>INFORMACIÓN:</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalContentComponent}</Modal.Body>
            <Modal.Footer>
                <Button variant={'danger'} onClick={closeModal}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default HomePageCardModal

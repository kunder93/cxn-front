import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { AddMagazineForm } from './AddMagazineForm'

interface AddMagazineModalProps {
    showModal: boolean
    handleCloseModal: () => void
}

const AddMagazineModal: React.FC<AddMagazineModalProps> = ({ showModal, handleCloseModal }) => {
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Revista</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddMagazineForm></AddMagazineForm>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddMagazineModal

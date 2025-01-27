import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import AddBookForm from './AddBookForm'

interface AddBookModalProps {
    showModal: boolean
    handleCloseModal: () => void
}

const AddBookModal: React.FC<AddBookModalProps> = ({ showModal, handleCloseModal }) => {
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Libro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddBookForm></AddBookForm>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddBookModal

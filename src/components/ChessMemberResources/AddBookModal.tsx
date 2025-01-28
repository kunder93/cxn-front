import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import AddBookForm from './AddBookForm'
import { Book } from './Types'

interface AddBookModalProps {
    showModal: boolean
    handleCloseModal: () => void
    addBookFunction: (newBook: Book) => void
}

const AddBookModal: React.FC<AddBookModalProps> = ({ showModal, handleCloseModal, addBookFunction }) => {
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Libro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddBookForm addBookFunction={addBookFunction}></AddBookForm>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleCloseModal}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddBookModal

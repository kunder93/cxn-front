import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { AddMagazineForm } from './AddMagazineForm'
import { Magazine } from './Types'

interface AddMagazineModalProps {
    showModal: boolean
    handleCloseModal: () => void
    addMagazineFunction: (newMagazine: Magazine) => void
}

const AddMagazineModal: React.FC<AddMagazineModalProps> = ({ showModal, handleCloseModal, addMagazineFunction }) => {
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Revista</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddMagazineForm addMagazineFunction={addMagazineFunction}></AddMagazineForm>
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

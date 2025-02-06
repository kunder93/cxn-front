import { Button, Modal, Spinner } from 'react-bootstrap'
import { Magazine } from './Types'
import { useState } from 'react'

interface RemoveMagazineModalProps {
    showModal: boolean
    handleCloseModal: () => void
    removeMagazineFunction: (magazine: Magazine) => Promise<void>
    selectedMagazine: Magazine
}

const RemoveMagazineModal: React.FC<RemoveMagazineModalProps> = ({ handleCloseModal, removeMagazineFunction, selectedMagazine, showModal }) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleRemoveClick = async () => {
        setIsLoading(true)
        try {
            await removeMagazineFunction(selectedMagazine)
        } catch (error) {
            console.error('Error removing magazine:', error)
        } finally {
            setIsLoading(false)
            handleCloseModal()
        }
    }

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar revista</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    ¿Estás seguro de que quieres eliminar la revista <strong>{selectedMagazine.title}</strong>?
                </p>
                {isLoading && (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" role="output" />
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="danger"
                    onClick={() => async () => {
                        await handleRemoveClick()
                    }}
                    disabled={isLoading}
                >
                    'Eliminar'
                </Button>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RemoveMagazineModal

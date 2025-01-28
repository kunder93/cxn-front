import { Button, Modal } from 'react-bootstrap'
import { Magazine } from './MagazinesViewer'

interface RemoveMagazineModalProps {
    showModal: boolean
    handleCloseModal: () => void
    removeMagazineFunction: (nagazine: Magazine) => Promise<void>
    selectedMagazine: Magazine
}

const RemoveMagazineModal: React.FC<RemoveMagazineModalProps> = ({ handleCloseModal, removeMagazineFunction, selectedMagazine, showModal }) => {
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar Revista</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    ¿Estás seguro de que quieres eliminar la revista <strong>{selectedMagazine.title}</strong>?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => void removeMagazineFunction(selectedMagazine).then(handleCloseModal)}>
                    Eliminar
                </Button>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RemoveMagazineModal

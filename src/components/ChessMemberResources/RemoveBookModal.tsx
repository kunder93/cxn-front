import { Button, Modal } from 'react-bootstrap'
import { Book } from './BooksViewer'

interface RemoveBookModalProps {
    showModal: boolean
    handleCloseModal: () => void
    removeBookFunction: (book: Book) => Promise<void>
    selectedBook: Book
}

const RemoveBookModal: React.FC<RemoveBookModalProps> = ({ handleCloseModal, removeBookFunction, selectedBook, showModal }) => {
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar Libro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    ¿Estás seguro de que quieres eliminar el libro <strong>{selectedBook.title}</strong>?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => void removeBookFunction(selectedBook).then(handleCloseModal)}>
                    Eliminar
                </Button>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RemoveBookModal

import { Button, Modal, Spinner } from 'react-bootstrap'
import { useState } from 'react'
import { Book } from './Types'

interface RemoveBookModalProps {
    showModal: boolean
    handleCloseModal: () => void
    removeBookFunction: (book: Book) => Promise<void>
    selectedBook: Book
}

const RemoveBookModal: React.FC<RemoveBookModalProps> = ({ handleCloseModal, removeBookFunction, selectedBook, showModal }) => {
    const [loading, setLoading] = useState(false)

    const handleRemoveBook = async () => {
        setLoading(true)
        try {
            await removeBookFunction(selectedBook)
        } catch (error) {
            console.error('Error removing book:', error)
        } finally {
            setLoading(false)
            handleCloseModal() // Close the modal after removal
        }
    }

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar Libro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    ¿Estás seguro de que quieres eliminar el libro <strong>{selectedBook.title}</strong>?
                </p>
                {loading && (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" role="status" />
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleRemoveBook} disabled={loading}>
                    {loading ? 'Eliminando...' : 'Eliminar'}
                </Button>
                <Button variant="secondary" onClick={handleCloseModal} disabled={loading}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RemoveBookModal

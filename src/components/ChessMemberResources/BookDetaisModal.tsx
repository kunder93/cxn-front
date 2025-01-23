import { Button, Modal } from 'react-bootstrap'
import { Book } from './BooksViewer'

interface BookDetailsModalProps {
    showModal: boolean
    handleCloseModal: () => void
    selectedBook: Book
}

const BookDetailsModal: React.FC<BookDetailsModalProps> = ({ showModal, handleCloseModal, selectedBook }) => {
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedBook?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedBook && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ width: '50%' }}>
                                <p>
                                    <strong>Título:</strong> {selectedBook.title}
                                </p>
                                <p>
                                    <strong>Descripción:</strong> {selectedBook.description}
                                </p>
                                <p>
                                    <strong>Género:</strong> {selectedBook.genre}
                                </p>
                                <p>
                                    <strong>Idioma:</strong> {selectedBook.language}
                                </p>
                            </div>
                            <div style={{ width: '50%' }}>
                                <p>
                                    <strong>Fecha de publicación:</strong> {selectedBook.publishDate}
                                </p>

                                <h5>Autores:</h5>
                                <ul>
                                    {selectedBook.authors.map((author, index) => (
                                        <li key={index}>
                                            {author.name} {author.lastName}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <img src={selectedBook.coverSrc} alt="Portada" style={{ width: '200px', height: '300px', border: '3px solid black' }} />
                        </div>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BookDetailsModal

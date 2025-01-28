import { Button, Modal } from 'react-bootstrap'
import { useAppSelector } from 'store/hooks'
import { Book } from './Types'
import { useBookCover } from './hooks'
import { AuthorsList, BookImageSection, DetailItemRow, DetailsColumn, DetailsContainer } from './Common/CommonElements'

interface BookDetailsModalProps {
    showModal: boolean
    handleCloseModal: () => void
    selectedBook: Book
}

const BookDetailsModal: React.FC<BookDetailsModalProps> = ({ showModal, handleCloseModal, selectedBook }) => {
    const jwtToken = useAppSelector<string | null>((state) => state.users.jwt)

    const { image, isLoading, error } = useBookCover(selectedBook.isbn, jwtToken)

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedBook.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DetailsContainer>
                    <DetailsColumn>
                        <DetailItemRow label="Título" value={selectedBook.title} />
                        <DetailItemRow label="Descripción" value={selectedBook.description} />
                        <DetailItemRow label="Género" value={selectedBook.genre} />
                        <DetailItemRow label="Idioma" value={selectedBook.language} />
                    </DetailsColumn>
                    <DetailsColumn>
                        <DetailItemRow label="ISBN" value={selectedBook.isbn} />
                        <DetailItemRow label="Fecha de publicación" value={selectedBook.publishDate} />
                        <AuthorsList authors={selectedBook.authors} />
                    </DetailsColumn>
                </DetailsContainer>
                <BookImageSection image={image} isLoading={isLoading} error={error} />
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

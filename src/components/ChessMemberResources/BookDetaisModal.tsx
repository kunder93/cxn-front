import { Button, Modal } from 'react-bootstrap'
import { Book } from './BooksViewer'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { RESOURCES_BOOK_URL } from 'resources/server_urls'
import { useAppSelector } from 'store/hooks'
import styled from 'styled-components'
import { Spinner } from 'react-bootstrap'

// Styled Components

const DetailsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const DetailsColumn = styled.div`
    flex: 1;

    p {
        word-break: break-word;
        margin-bottom: 12px;
        font-size: 0.95rem;
        line-height: 1.4;
    }
`

const DetailItem = styled.p`
    word-wrap: break-word;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
`

const AuthorsSection = styled.div`
    margin-top: 10px;
`

const AuthorsTitle = styled.h5`
    margin-bottom: 10px;
    font-size: 1rem;
    font-weight: bold;
`

const AuthorsList = styled.ul`
    padding-left: 20px;
    margin: 0;

    li {
        font-size: 0.9rem;
        margin-bottom: 6px;
        word-break: break-word;
    }
`

const Author = styled.li`
    word-wrap: break-word;
`

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto; /* Centramos el marco horizontalmente */
    width: 200px; /* Fijar ancho del marco */
    height: 300px; /* Fijar alto del marco */
    border: 3px solid black;
    border-radius: 8px;
    position: relative; /* Para posicionar el spinner dentro */
    background-color: #f0f0f0; /* Añadir fondo gris claro mientras carga */
`

const BookImage = styled.img<{ isLoading: boolean }>`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    display: ${({ isLoading }) => (isLoading ? 'none' : 'block')};
`

const SpinnerWrapper = styled.div`
    position: absolute; /* Centrado absoluto dentro del marco */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

interface BookDetailsModalProps {
    showModal: boolean
    handleCloseModal: () => void
    selectedBook: Book
}

const BookDetailsModal: React.FC<BookDetailsModalProps> = ({ showModal, handleCloseModal, selectedBook }) => {
    const [image, setImage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const jwtToken = useAppSelector<string | null>((state) => state.users.jwt)

    useEffect(() => {
        if (selectedBook?.isbn) {
            setIsLoading(true) // Reiniciar loading al cambiar el libro seleccionado
            axios
                .get(`${RESOURCES_BOOK_URL}/${selectedBook.isbn}/coverImage`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    },
                    responseType: 'blob'
                })
                .then((response) => {
                    const reader = new FileReader()
                    reader.readAsDataURL(response.data as Blob)
                    reader.onload = () => {
                        setImage(reader.result as string)
                        setIsLoading(false)
                    }
                })
                .catch((error) => {
                    console.error('Error loading book cover image:', error)
                    setIsLoading(false) // Terminar loading incluso en caso de error
                })
        }
    }, [jwtToken, selectedBook])

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedBook?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedBook && (
                    <>
                        <DetailsContainer>
                            {/* Left section */}
                            <DetailsColumn>
                                <DetailItem>
                                    <strong>Título:</strong> {selectedBook.title}
                                </DetailItem>
                                <DetailItem>
                                    <strong>Descripción:</strong> {selectedBook.description}
                                </DetailItem>
                                <DetailItem>
                                    <strong>Género:</strong> {selectedBook.genre}
                                </DetailItem>
                                <DetailItem>
                                    <strong>Idioma:</strong> {selectedBook.language}
                                </DetailItem>
                            </DetailsColumn>

                            {/* Right section */}
                            <DetailsColumn>
                                <DetailItem>
                                    <strong>Fecha de publicación:</strong> {selectedBook.publishDate}
                                </DetailItem>
                                <AuthorsSection>
                                    <AuthorsTitle>Autores:</AuthorsTitle>
                                    <AuthorsList>
                                        {selectedBook.authors.map((author, index) => (
                                            <Author key={index}>
                                                {author.firstName} {author.lastName}
                                            </Author>
                                        ))}
                                    </AuthorsList>
                                </AuthorsSection>
                            </DetailsColumn>
                        </DetailsContainer>

                        {/* Image section */}
                        <ImageWrapper>
                            {isLoading && (
                                <SpinnerWrapper>
                                    <Spinner animation="border" />
                                </SpinnerWrapper>
                            )}
                            <BookImage src={image ? image : ''} alt="Portada" isLoading={isLoading} />
                        </ImageWrapper>
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

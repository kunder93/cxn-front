import { Spinner } from 'react-bootstrap'
import styled from 'styled-components'
import type { Author } from '../Types'

const Author = styled.li`
    word-wrap: break-word;
`

const AuthorsTitle = styled.h5`
    margin-bottom: 10px;
    font-size: 1rem;
    font-weight: bold;
`

const AuthorsSection = styled.div`
    margin-top: 10px;
`

const BookImage = styled.img<{ isLoading: boolean }>`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    display: ${({ isLoading }) => (isLoading ? 'none' : 'block')};
`

const DetailItem = styled.p`
    word-wrap: break-word;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
`

const ErrorText = styled.p`
    color: red;
    text-align: center;
    margin-top: 16px;
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

export const DetailsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 20px;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`

export const DetailsColumn = styled.div`
    flex: 1;
    p {
        word-break: break-word;
        margin-bottom: 12px;
        font-size: 0.95rem;
        line-height: 1.4;
    }
`

const SpinnerWrapper = styled.div`
    position: absolute; /* Centrado absoluto dentro del marco */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

// BookImageSection Component
export const BookImageSection: React.FC<{ image: string | null; isLoading: boolean; error: string | null }> = ({ image, isLoading, error }) => (
    <ImageWrapper>
        {isLoading && (
            <SpinnerWrapper>
                <Spinner animation="border" />
            </SpinnerWrapper>
        )}
        {error ? <ErrorText>{error}</ErrorText> : <BookImage src={image ?? ''} alt="Portada" isLoading={isLoading} />}
    </ImageWrapper>
)

// AuthorsList Component
export const AuthorsList: React.FC<{ authors: Author[] }> = ({ authors }) => (
    <AuthorsSection>
        <AuthorsTitle>Autores:</AuthorsTitle>
        <ul>
            {authors.map((author, index) => (
                <Author key={index}>
                    {author.firstName} {author.lastName}
                </Author>
            ))}
        </ul>
    </AuthorsSection>
)

export const DetailItemRow: React.FC<{ label: string; value: string | undefined }> = ({ label, value }) => (
    <DetailItem>
        <strong>{label}:</strong> {value ?? 'N/A'}
    </DetailItem>
)

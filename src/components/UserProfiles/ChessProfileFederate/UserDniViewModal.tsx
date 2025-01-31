import React, { useState, useCallback } from 'react'
import { Alert, Button, Modal, ModalProps, Spinner } from 'react-bootstrap'
import { useDniImages } from './Hooks/useDniImages'
import styled from 'styled-components'
import { FaDownload } from 'react-icons/fa'

// Componentes estilizados
const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: nowrap;
    margin-top: 10px;

    @media (max-width: 600px) {
        flex-wrap: wrap;
    }
`

const DniCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 250px;
`

const DniImage = styled.img`
    width: 200px;
    height: 130px;
    border-radius: 8px;
    object-fit: cover;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s;

    &:focus {
        outline: 2px solid #007bff;
        outline-offset: 2px;
    }

    &:hover {
        transform: scale(1.03);
    }
`

const LabelContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 5px;
`

const DownloadButton = styled.button`
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    transition: background 0.2s;

    &:hover {
        background: rgba(0, 0, 0, 0.9);
    }

    &:focus {
        outline: 2px solid #007bff;
        outline-offset: 2px;
    }
`

const ExitButton = styled(Button)`
    width: 100%;
    margin-top: 15px;
    font-weight: bold;
`

interface UserDniViewModalProps extends ModalProps {
    userDni: string
}

// Componente reutilizable para tarjetas de DNI
interface DniImageCardProps {
    imageData: string
    label: string
    userDni: string
    onDownload: () => void
    onExpand: () => void
}

const DniImageCard: React.FC<DniImageCardProps> = ({ imageData, label, userDni, onDownload, onExpand }) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') onExpand()
    }

    return (
        <DniCard>
            <DniImage
                src={`data:image/png;base64,${imageData}`}
                alt={`${label} del DNI ${userDni}`}
                onClick={onExpand}
                role="button"
                tabIndex={0}
                onKeyPress={handleKeyPress}
                aria-label={`Ampliar imagen del ${label}`}
            />
            <LabelContainer>
                <DownloadButton onClick={onDownload} aria-label={`Descargar ${label}`}>
                    <FaDownload aria-hidden="true" />
                </DownloadButton>
                <p aria-hidden="true">{label}</p>
            </LabelContainer>
        </DniCard>
    )
}

export const UserDniViewModal: React.FC<UserDniViewModalProps> = ({ userDni, show, onHide }) => {
    const { dniImages, isLoading, error } = useDniImages(userDni)
    const [expandedImage, setExpandedImage] = useState<string | null>(null)

    const handleDownload = useCallback(
        (imageData: string, side: 'anverso' | 'reverso') => {
            const link = document.createElement('a')
            link.href = `data:image/png;base64,${imageData}`
            link.download = `${userDni}_${side}.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        },
        [userDni]
    )

    const renderContent = () => {
        if (!dniImages) return null

        return (
            <>
                <ImageContainer role="group" aria-label="Imágenes del documento">
                    <DniImageCard
                        imageData={dniImages.frontImage}
                        label="Anverso"
                        userDni={userDni}
                        onDownload={() => handleDownload(dniImages.frontImage, 'anverso')}
                        onExpand={() => setExpandedImage(`data:image/png;base64,${dniImages.frontImage}`)}
                    />
                    <DniImageCard
                        imageData={dniImages.backImage}
                        label="Reverso"
                        userDni={userDni}
                        onDownload={() => handleDownload(dniImages.backImage, 'reverso')}
                        onExpand={() => setExpandedImage(`data:image/png;base64,${dniImages.backImage}`)}
                    />
                </ImageContainer>
                <ExitButton variant="secondary" onClick={onHide} aria-label="Cerrar visor de DNI">
                    Cerrar
                </ExitButton>
            </>
        )
    }

    return (
        <>
            <Modal show={show} onHide={onHide} centered aria-labelledby="dni-modal-title" aria-modal="true">
                <Modal.Header closeButton>
                    <Modal.Title id="dni-modal-title">DNI: {userDni}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLoading && (
                        <div className="text-center" aria-live="polite">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Cargando imágenes...</span>
                            </Spinner>
                        </div>
                    )}

                    {error && (
                        <Alert variant="danger" role="alert" aria-live="assertive">
                            {error}
                        </Alert>
                    )}

                    {!isLoading && !error && renderContent()}
                </Modal.Body>
            </Modal>

            <Modal show={!!expandedImage} onHide={() => setExpandedImage(null)} centered aria-labelledby="expanded-image-title">
                <Modal.Header closeButton>
                    <Modal.Title id="expanded-image-title">DNI {userDni} - Vista ampliada</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    {expandedImage && <img src={expandedImage} alt="" aria-labelledby="expanded-image-title" style={{ width: '100%', height: 'auto' }} />}
                </Modal.Body>
            </Modal>
        </>
    )
}

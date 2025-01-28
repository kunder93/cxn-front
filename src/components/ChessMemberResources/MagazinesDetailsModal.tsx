import { Button, Modal } from 'react-bootstrap'
import { Magazine } from './MagazinesViewer'

interface MagazinesDetailsModalProps {
    showModal: boolean
    handleCloseModal: () => void
    selectedMagazine: Magazine
}

const MagazinesDetailsModal: React.FC<MagazinesDetailsModalProps> = ({ showModal, handleCloseModal, selectedMagazine }) => {
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedMagazine?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedMagazine && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ width: '50%' }}>
                                <p>
                                    <strong>Editorial:</strong> {selectedMagazine.publisher}
                                </p>
                                <p>
                                    <strong>Número de Edición:</strong> {selectedMagazine.editionNumber}
                                </p>
                                <p>
                                    <strong>Fecha de Publicación:</strong> {selectedMagazine.publishDate}
                                </p>
                                <p>
                                    <strong>Descripción:</strong> {selectedMagazine.description}
                                </p>
                            </div>
                            <div style={{ width: '50%' }}>
                                <p>
                                    <strong>Número de Páginas:</strong> {selectedMagazine.pagesAmount}
                                </p>
                                <p>
                                    <strong>Idioma:</strong> {selectedMagazine.language}
                                </p>
                                <p>
                                    <strong>ISBN:</strong> {selectedMagazine.issn}
                                </p>
                                <h5>Autores:</h5>
                                <ul>
                                    {selectedMagazine.authors.map((author, index) => (
                                        <li key={index}>
                                            {author.name} {author.lastName}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <img src={''} alt="Portada" style={{ width: '200px', height: '300px', border: '3px solid black' }} />
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

export default MagazinesDetailsModal

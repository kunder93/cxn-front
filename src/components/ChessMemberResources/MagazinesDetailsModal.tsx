import { Button, Modal } from 'react-bootstrap'
import { useAppSelector } from 'store/hooks'
import { Magazine } from './Types'
import { useMagazineImageLoader } from './hooks'
import { AuthorsList, BookImageSection, DetailItemRow, DetailsColumn, DetailsContainer } from './Common/CommonElements'

interface MagazineDetailsModalProps {
    showModal: boolean
    handleCloseModal: () => void
    selectedMagazine: Magazine
}

const MagazineDetailsModal: React.FC<MagazineDetailsModalProps> = ({ showModal, handleCloseModal, selectedMagazine }) => {
    const jwtToken = useAppSelector<string | null>((state) => state.users.jwt)
    const { image, isLoading, error } = useMagazineImageLoader(selectedMagazine.issn, jwtToken)

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedMagazine?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedMagazine && (
                    <>
                        <DetailsContainer>
                            <DetailsColumn>
                                <DetailItemRow label="ISSN" value={selectedMagazine.issn} />
                                <DetailItemRow label="Título" value={selectedMagazine.title} />
                                <DetailItemRow label="Editorial" value={selectedMagazine.publisher} />
                                <DetailItemRow label="Edición" value={selectedMagazine.editionNumber.toString()} />
                                <DetailItemRow label="Fecha de publicación" value={selectedMagazine.publishDate} />
                                <AuthorsList authors={selectedMagazine.authors} />
                            </DetailsColumn>
                            <DetailsColumn>
                                <DetailItemRow label="Descripción" value={selectedMagazine.description} />
                                <DetailItemRow label="Páginas" value={selectedMagazine.pagesAmount.toString()} />
                                <DetailItemRow label="Idioma" value={selectedMagazine.language} />
                            </DetailsColumn>
                        </DetailsContainer>
                        <BookImageSection image={image} isLoading={isLoading} error={error} />
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

export default MagazineDetailsModal

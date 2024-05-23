import React, { ReactElement } from 'react'
import { Button, Modal, ModalProps } from 'react-bootstrap'

interface CardsButtonsModalProps extends ModalProps {
    closemodal: () => void
    modalcontentcomponent: ReactElement | null
}

const HomePageCardsModal: React.FC<CardsButtonsModalProps> = (props) => {
    return (
        <Modal
            {...props}
            onHide={props.closemodal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            aria-label="Modal de información de las tarjetas de inicio."
        >
            <Modal.Body>{props.modalcontentcomponent}</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.closemodal}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default HomePageCardsModal

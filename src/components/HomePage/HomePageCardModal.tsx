import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface HomePageCardModalProps {
    show: boolean;
    closeModal: () => void;
    modalContentComponent: React.ReactElement | null;
}

const HomePageCardModal: React.FC<HomePageCardModalProps> = ({ show, closeModal, modalContentComponent }) => {
    return (
        <Modal show={show} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>FORMULARIO DE INFORMACIÓN:</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalContentComponent}</Modal.Body>
            <Modal.Footer>
                <Button variant={'danger'} onClick={closeModal}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default HomePageCardModal;

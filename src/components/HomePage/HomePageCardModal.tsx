import React from 'react';
import { Modal } from 'react-bootstrap';

interface HomePageCardModalProps {
    show: boolean;
    closeModal: () => void;
    modalContentComponent: React.ReactElement | null;
}

const HomePageCardModal: React.FC<HomePageCardModalProps> = ({ show, closeModal, modalContentComponent }) => {
    return (
        <Modal show={show} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Modal Heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalContentComponent}</Modal.Body>
            <Modal.Footer>
                <button onClick={closeModal}>Close</button>
            </Modal.Footer>
        </Modal>
    );
};

export default HomePageCardModal;

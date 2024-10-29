import React from 'react'
import { Modal } from 'react-bootstrap'
import styled from 'styled-components'

const StyledModal = styled(Modal)`
    .modal-content {
        background-color: #f0f0f5;
        border-radius: 8px;
    }

    .modal-header,
    .modal-footer {
        background-color: #f0f0f5;
    }

    @media (max-width: 576px) {
        .modal-dialog {
            max-width: 100%;
            margin: 0;
        }

        .modal-content {
            padding-top: 1rem;
            padding-bottom: 1rem;
            border-radius: 0;
        }

        .modal-header {
            padding: 0.75rem 1rem;
        }

        .modal-footer {
            padding: 0.75rem 1rem;
            flex-direction: column;
        }
    }
`

interface HomePageCardModalProps {
    show: boolean
    closeModal: () => void
    modalContentComponent: React.ReactElement | null
    ariaLabel: string
}

const HomePageCardModal: React.FC<HomePageCardModalProps> = ({ show, closeModal, modalContentComponent, ariaLabel }) => {
    return (
        <StyledModal show={show} onHide={closeModal} aria-label={ariaLabel} centered>
            <Modal.Header closeButton>
                <Modal.Title>INFORMACIÓN:</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalContentComponent}</Modal.Body>
        </StyledModal>
    )
}

export default HomePageCardModal

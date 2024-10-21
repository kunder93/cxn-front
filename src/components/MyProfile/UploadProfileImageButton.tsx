import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import ImageUploadForm from './ProflieImageUploadForm'
import styled from 'styled-components'

// Styled components
const ModalHeaderStyled = styled(Modal.Header)`
    font-size: 150%;
    font-weight: bold;
    background-color: #007bff;
    color: white;
    border-bottom: 1px solid #0056b3;

    // Remove rounded corners and adjust for mobile
    border-radius: 0;
    @media (max-width: 768px) {
        font-size: 125%;
        padding: 1rem;
    }
`

const ModalBodyStyled = styled(Modal.Body)`
    background-color: #f8f9fa;
    padding: 2rem;

    // Adjust padding for mobile devices
    @media (max-width: 768px) {
        padding: 1rem;
    }
`

const ModalFooterStyled = styled(Modal.Footer)`
    display: flex;
    justify-content: space-between;
    background-color: #f1f1f1;
    border-top: 1px solid #dee2e6;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
        button {
            width: 100%;
        }
    }
`

const StyledButton = styled(Button)`
    background-color: #007bff;
    border: none;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    // Make button full-width on mobile
    @media (max-width: 768px) {
        width: 100%;
    }
`
const ModalStyled = styled(Modal)`
    .modal-content {
        border: 7px solid grey;
        border-radius: 2%;
    }

    // Ensure modal content fits on mobile screens
    @media (max-width: 768px) {
        .modal-content {
            border-width: 5px;
            width: 95%;
            margin: auto;
        }
    }
`
const UploadProfileImageButton = (): JSX.Element => {
    const [activeModal, setActiveModal] = useState(false)

    return (
        <>
            <StyledButton onClick={() => setActiveModal(true)}>Subir imagen propia</StyledButton>
            <ModalStyled aria-labelledby="contained-modal-title-vcenter" centered show={activeModal} onHide={() => setActiveModal(false)}>
                <ModalHeaderStyled closeButton>
                    <Modal.Title>Sube una imagen de perfil propia:</Modal.Title>
                </ModalHeaderStyled>
                <ModalBodyStyled>
                    <ImageUploadForm />
                </ModalBodyStyled>
                <ModalFooterStyled>
                    <Button variant="danger" onClick={() => setActiveModal(false)}>
                        Cerrar
                    </Button>
                </ModalFooterStyled>
            </ModalStyled>
        </>
    )
}

export default UploadProfileImageButton

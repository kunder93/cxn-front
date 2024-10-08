import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import ImageUploadForm from './ProflieImageUploadForm'
import styled from 'styled-components'

// Styled components
const ModalHeaderStyled = styled(Modal.Header)`
    font-size: 150%;
    font-weight: bold;
    background-color: #007bff; // Bootstrap primary color
    color: white; // Text color
    border-bottom: 1px solid #0056b3; // Darker border for emphasis
    border-radius: 0px; // remove rounded corners Modal have margin with rounded corners
`

const ModalBodyStyled = styled(Modal.Body)`
    background-color: #f8f9fa; // Light background
    padding: 2rem; // Increased padding for comfort
`

const ModalFooterStyled = styled(Modal.Footer)`
    display: flex;
    justify-content: space-between;
    background-color: #f1f1f1; // Slightly darker footer
    border-top: 1px solid #dee2e6; // Light border
`

const StyledButton = styled(Button)`
    background-color: #007bff; // Bootstrap primary color
    border: none; // Remove default border
    transition: background-color 0.3s ease; // Transition for hover effect

    &:hover {
        background-color: #0056b3; // Darker shade on hover
    }
`
const ModalStyled = styled(Modal)`
    .modal-content {
        border: 7px solid grey; // Intense border color (e.g., deep orange)
        border-radius: 2%; // Optional: rounded corners for a smoother look
    }
`
const UploadProfileImageButton = (): JSX.Element => {
    const [activeModal, setActiveModal] = useState(false)

    return (
        <>
            <StyledButton onClick={() => setActiveModal(true)}>Subir imagen propia</StyledButton>
            <ModalStyled show={activeModal} onHide={() => setActiveModal(false)}>
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

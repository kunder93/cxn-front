import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import ImageUploadForm from './ProflieImageUploadForm'
import styled from 'styled-components'

const ModalHeaderStyled = styled(Modal.Header)`
    font-size: 150%;
    font-weight: bold;
`

const UploadProfileImageButton = (): JSX.Element => {
    const [activeModal, setActiveModal] = useState(false)

    return (
        <>
            <Button variant="secondary" onClick={() => setActiveModal(true)}>
                Subir imagen propia
            </Button>
            <Modal show={activeModal} onHide={() => setActiveModal(false)}>
                <ModalHeaderStyled>Sube una imagen de perfil propia:</ModalHeaderStyled>
                <Modal.Body>
                    <ImageUploadForm></ImageUploadForm>
                </Modal.Body>
                <Modal.Footer>Footer del modal </Modal.Footer>
            </Modal>
        </>
    )
}

export default UploadProfileImageButton

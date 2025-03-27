import React from 'react'
import { Button, Modal, ModalProps } from 'react-bootstrap'
import CreateTeamForm from './CreateTeamForm'
import styled from 'styled-components'

const StyledCloseButton = styled(Button)`
    width: 100%; /* Ocupa todo el ancho */
    display: flex;
    align-items: center;
    justify-content: center; /* Centra el contenido */
    min-height: 50px;
    min-width: 150px;
`

interface CreateTeamModalProps extends ModalProps {
    addTeam: (name: string, category: string, description: string) => Promise<void>
}

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({ addTeam, ...modalProps }) => {
    return (
        <Modal {...modalProps}>
            <Modal.Header closeButton>
                <Modal.Title>Crear equipo de liga:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CreateTeamForm addTeam={addTeam} />
            </Modal.Body>
            <Modal.Footer>
                <StyledCloseButton variant="danger" onClick={modalProps.onHide}>
                    Cerrar
                </StyledCloseButton>
            </Modal.Footer>
        </Modal>
    )
}

export default React.memo(CreateTeamModal)

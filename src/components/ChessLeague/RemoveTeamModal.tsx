import React from 'react'
import { Button, Modal, ModalProps } from 'react-bootstrap'
import styled from 'styled-components'
import { TeamWithMembers } from './types'
import { NotificationType } from 'components/Common/hooks/useNotification'
import { useNotificationContext } from 'components/Common/NotificationContext'

const StyledCloseButton = styled(Button)`
    width: 100%; /* Ocupa todo el ancho */
    display: flex;
    align-items: center;
    justify-content: center; /* Centra el contenido */
    min-height: 50px;
    min-width: 150px;
`

interface RemoveTeamModalProps extends ModalProps {
    removeTeam: (name: string) => Promise<void>
    selectedTeam: TeamWithMembers
}

const RemoveTeamModal: React.FC<RemoveTeamModalProps> = ({ removeTeam, selectedTeam, ...modalProps }) => {
    const { showNotification } = useNotificationContext()
    return (
        <Modal {...modalProps}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar equipo de liga: {selectedTeam.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <>
                    <p> Se va a procedera eliminar al equipo y dejar sin equipo asignado a todos sus miembros.</p>
                    <StyledCloseButton
                        variant="danger"
                        onClick={() => {
                            void removeTeam(selectedTeam.name).then(() => {
                                if (modalProps.onHide) {
                                    modalProps.onHide()
                                }
                                showNotification('Eliminado correctamente.', NotificationType.Success)
                            })
                        }}
                    >
                        {' '}
                        Confirmar Eliminar
                    </StyledCloseButton>
                </>
            </Modal.Body>
            <Modal.Footer>
                <StyledCloseButton variant="secondary" onClick={modalProps.onHide}>
                    Cerrar
                </StyledCloseButton>
            </Modal.Footer>
        </Modal>
    )
}

export default React.memo(RemoveTeamModal)

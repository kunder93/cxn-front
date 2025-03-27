import { Button, Modal, ModalProps } from 'react-bootstrap'
import { TeamWithMembers } from './types'
import { NotificationType } from 'components/Common/hooks/useNotification'
import { useNotificationContext } from 'components/Common/NotificationContext'
import styled from 'styled-components'
import { useState } from 'react'

interface RemoveMemberFromTeamModalProps extends ModalProps {
    team: TeamWithMembers | null
    removeMemberFromTeam: (userEmail: string, teamName: string) => Promise<void>
    memberEmail: string
}

const ModalBody = styled(Modal.Body)`
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    gap: 0.5em;
    button {
        width: 100%;
    }
`

const RemoveMemberFromTeamModal: React.FC<RemoveMemberFromTeamModalProps> = (props) => {
    const { showNotification } = useNotificationContext()

    const [isLoading, setIsLoading] = useState(false)

    // Si no hay equipo seleccionado, retorna null y no renderiza nada
    if (!props.team) {
        return null
    }

    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Eliminar miembro con email: {props.memberEmail} del equipo: {props.team.name}
                </Modal.Title>
            </Modal.Header>
            <ModalBody>
                <Button
                    variant="danger"
                    onClick={() => {
                        setIsLoading(true)
                        props
                            .removeMemberFromTeam(props.memberEmail, props.team?.name ?? '')
                            .then(() => {
                                showNotification('Eliminado correctamente.', NotificationType.Success)
                                props.onHide?.()
                            })
                            .catch(() => {
                                showNotification('Error eliminando el integrante del equipo.', NotificationType.Error)
                            })
                            .finally(() => {
                                setIsLoading(false)
                            })
                    }}
                >
                    Eliminar
                </Button>
                <Button variant="secondary" onClick={props.onHide} hidden={isLoading}>
                    Cancelar
                </Button>
            </ModalBody>
        </Modal>
    )
}
export default RemoveMemberFromTeamModal

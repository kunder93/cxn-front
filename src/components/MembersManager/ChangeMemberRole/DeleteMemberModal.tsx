import axios, { AxiosError } from 'axios'
import { NotificationType } from 'components/Common/hooks/useNotification'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { Button, Modal, ModalProps } from 'react-bootstrap'
import { DELETE_USER_URL } from 'resources/server_urls'
import { useAppSelector } from 'store/hooks'
import styled from 'styled-components'

const StyledModalFooter = styled(Modal.Footer)`
    justify-content: space-between !important;
`

interface DeleteMemberModalProps extends ModalProps {
    memberEmail: string
    memberName?: string
    memberFirstSurname?: string
    memberSecondSurname?: string
    onDeleteSuccess?: (email: string) => void // Callback function for successful deletion
}

const DeleteMemberModal = ({
    memberName,
    memberEmail,
    memberFirstSurname,
    memberSecondSurname,
    onDeleteSuccess,
    ...props
}: DeleteMemberModalProps): JSX.Element => {
    const { showNotification } = useNotificationContext()
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)

    const handleDeleteMember = async () => {
        if (!userJwt) {
            showNotification('No se encontró el token de autenticación.', NotificationType.Error)
            return
        }

        try {
            await axios.delete(`${DELETE_USER_URL}/${memberEmail}`, {
                headers: {
                    Authorization: `Bearer ${userJwt}`
                }
            })
            showNotification('Usuario eliminado correctamente.', NotificationType.Success)

            // Trigger success callback
            onDeleteSuccess?.(memberEmail)

            // Close modal after successful deletion
            props.onHide?.()
        } catch (error) {
            const axiosError = error as AxiosError
            showNotification(axiosError.message, NotificationType.Error)
        }
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Eliminar usuario: <strong>{`${memberName} ${memberFirstSurname} ${memberSecondSurname}`}</strong>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    ¿Estás seguro de querer <strong>eliminar definitivamente</strong> el usuario: {`${memberName} ${memberFirstSurname} ${memberSecondSurname}`}{' '}
                    con email: {memberEmail}?
                </p>
            </Modal.Body>
            <StyledModalFooter>
                <Button variant="danger" onClick={() => void handleDeleteMember()}>
                    Eliminar permanente
                </Button>

                <Button variant="secondary" onClick={props.onHide}>
                    Cancelar
                </Button>
            </StyledModalFooter>
        </Modal>
    )
}

export default DeleteMemberModal

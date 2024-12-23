import axios, { AxiosError } from 'axios'
import { NotificationType } from 'components/Common/hooks/useNotification'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Modal, ModalProps } from 'react-bootstrap'
import { PAYMENT_URL } from 'resources/server_urls'
import { useAppSelector } from 'store/hooks'
import { formatCurrency } from 'utility/paymentsUtilities'
import { CloseButton, ConfirmButton, StyledModalBody, StyledModalFooter, StyledModalHeader } from './CommonStyles'
import { PaymentInfo } from './Types'

interface CancelPaymentModalProps extends ModalProps {
    paymentinfo: PaymentInfo | null
}

export const CancelPaymentModal: React.FC<CancelPaymentModalProps> = ({ show, onHide, paymentinfo }) => {
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const { showNotification } = useNotificationContext()
    const handleCancelPayment = async (paymentId: string | null) => {
        if (!paymentId) {
            showNotification('El ID del pago es requerido para confirmar el pago.', NotificationType.Error)
            return
        }

        try {
            await axios.patch(`${PAYMENT_URL}/${paymentId}/cancel`, {}, { headers: { Authorization: `Bearer ${userJwt}` } })
            showNotification('Pago cancelado con éxito.', NotificationType.Success)
            if (onHide) onHide() // Close the modal after success
        } catch (error) {
            const axiosError = error as AxiosError
            if (axiosError.response?.data) {
                const responseData = axiosError.response.data as { message?: string }
                if (responseData.message) {
                    showNotification(responseData.message, NotificationType.Error)
                } else {
                    showNotification('Error inesperado, intentalo más tarde.', NotificationType.Error)
                }
            } else {
                showNotification('Error inesperado, intentalo más tarde.', NotificationType.Error)
            }
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <StyledModalHeader closeButton>
                <Modal.Title>Cancelar pago</Modal.Title>
            </StyledModalHeader>
            <StyledModalBody>
                {paymentinfo ? (
                    <p>
                        Se va a marcar como <strong>cancelado</strong> el pago con ID: <strong>{paymentinfo.id}</strong>
                        <br />
                        Título: <strong>{paymentinfo.title}</strong>
                        <br />
                        Monto: <strong>{formatCurrency(paymentinfo.amount)} €</strong>
                        <br />
                        Fecha de creación: <strong>{format(new Date(paymentinfo.createdAt), "dd '/' MM '/' yyyy", { locale: es })}</strong>
                        <br />
                        DNI del socio: <strong>{paymentinfo.ownerDni}</strong>
                    </p>
                ) : (
                    'No se encontró información de pago.'
                )}
            </StyledModalBody>
            <StyledModalFooter>
                <ConfirmButton onClick={() => void handleCancelPayment(paymentinfo?.id ?? null)}>Confirmar Cancelación</ConfirmButton>
                <CloseButton onClick={onHide}>Cerrar</CloseButton>
            </StyledModalFooter>
        </Modal>
    )
}

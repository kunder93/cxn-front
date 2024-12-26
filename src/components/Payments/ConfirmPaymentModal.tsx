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
import { PaymentsState, ReceivedCreatedPayment } from 'components/Types/Types'

interface ConfirmPaymentModalProps extends ModalProps {
    paymentinfo: PaymentInfo | null
    updatePaymentStateFunc: (userDni: string, paymentId: string, newState: PaymentsState) => void
}

export const ConfirmPaymentModal: React.FC<ConfirmPaymentModalProps> = ({ show, onHide, paymentinfo, updatePaymentStateFunc }) => {
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const { showNotification } = useNotificationContext()
    const handleConfirmPayment = async (paymentId: string | null) => {
        if (!paymentId) {
            showNotification('El ID del pago es requerido para confirmar el pago.', NotificationType.Error)
            return
        }

        try {
            const response = await axios.patch<ReceivedCreatedPayment>(
                `${PAYMENT_URL}/${paymentId}/pay`,
                {},
                { headers: { Authorization: `Bearer ${userJwt}` } }
            )
            showNotification('Pago confirmado con éxito.', NotificationType.Success)
            updatePaymentStateFunc(response.data.userDni, response.data.id, response.data.state)
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
                <Modal.Title>Confirmar pago</Modal.Title>
            </StyledModalHeader>
            <StyledModalBody>
                {paymentinfo ? (
                    <p>
                        Se va a marcar como pagado el pago con ID: <strong>{paymentinfo.id}</strong>
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
                <ConfirmButton onClick={() => void handleConfirmPayment(paymentinfo?.id ?? null)}>Confirmar</ConfirmButton>
                <CloseButton onClick={onHide}>Cerrar</CloseButton>
            </StyledModalFooter>
        </Modal>
    )
}

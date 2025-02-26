import { AxiosError } from 'axios'
import { NotificationType } from 'components/Common/hooks/useNotification'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { Modal, ModalProps, Spinner } from 'react-bootstrap'
import { CloseButton, ConfirmButton, StyledModalBody, StyledModalFooter, StyledModalHeader } from './CommonStyles'
import { PaymentInfo } from './Types'
import { PaymentsState } from 'components/Types/Types'
import { useConfirmPayment } from './Hooks'
import { formatCurrency } from 'utility/paymentsUtilities'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface ConfirmPaymentModalProps extends ModalProps {
    paymentinfo: PaymentInfo | null
    updatePaymentStateFunc: (userDni: string, paymentId: string, newState: PaymentsState) => void
}

export const ConfirmPaymentModal: React.FC<ConfirmPaymentModalProps> = ({ show, onHide, paymentinfo, updatePaymentStateFunc }) => {
    const { showNotification } = useNotificationContext()
    const { confirmPayment, isLoading, error } = useConfirmPayment()

    const handleConfirm = async (paymentId: string | null) => {
        if (!paymentId) {
            showNotification('El ID del pago es necesario.', NotificationType.Error)
            return
        }
        try {
            const response = await confirmPayment(paymentId)
            showNotification('Pago confirmado exitosamente.', NotificationType.Success)
            updatePaymentStateFunc(response.userDni, response.id, response.state)
            onHide?.()
        } catch (err) {
            const axiosError = error ?? (err as AxiosError)
            const message = (axiosError.response?.data as { message?: string }).message ?? 'Error inesperado.'
            showNotification(message, NotificationType.Error)
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <StyledModalHeader closeButton>
                <Modal.Title>Confirm Payment</Modal.Title>
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
                <ConfirmButton variant="success" onClick={() => void handleConfirm(paymentinfo?.id ?? null)} disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Confirmando...
                        </>
                    ) : (
                        'Confirmar pago'
                    )}
                </ConfirmButton>
                <CloseButton variant="danger" onClick={onHide} disabled={isLoading}>
                    Close
                </CloseButton>
            </StyledModalFooter>
        </Modal>
    )
}

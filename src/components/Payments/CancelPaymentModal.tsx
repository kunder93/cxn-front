import { AxiosError } from 'axios'
import { NotificationType } from 'components/Common/hooks/useNotification'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Modal, ModalProps, Spinner } from 'react-bootstrap'
import { formatCurrency } from 'utility/paymentsUtilities'
import { CloseButton, ConfirmButton, StyledModalBody, StyledModalFooter, StyledModalHeader } from './CommonStyles'
import { PaymentInfo } from './Types'
import { PaymentsState } from 'components/Types/Types'
import { useCancelPayment } from './Hooks'

interface CancelPaymentModalProps extends ModalProps {
    paymentinfo: PaymentInfo | null
    updatePaymentStateFunc: (userDni: string, paymentId: string, newState: PaymentsState) => void
}

export const CancelPaymentModal: React.FC<CancelPaymentModalProps> = ({ show, onHide, paymentinfo, updatePaymentStateFunc }) => {
    // Remove this line: const userJwt = useAppSelector(...) - now handled in hook
    const { showNotification } = useNotificationContext()
    const { cancelPayment, isLoading, error } = useCancelPayment()

    const handleCancelPayment = async (paymentId: string | null) => {
        if (!paymentId) {
            showNotification('El ID del pago es requerido para confirmar el pago.', NotificationType.Error)
            return
        }
        try {
            const responseData = await cancelPayment(paymentId)
            showNotification('Pago cancelado con éxito.', NotificationType.Success)
            updatePaymentStateFunc(responseData.userDni, responseData.id, responseData.state)
            onHide?.()
        } catch (err) {
            const axiosError = error ?? (err as AxiosError)
            const defaultMsg = 'Error inesperado, intentalo más tarde.'
            const message = (axiosError.response?.data as { message?: string }).message ?? defaultMsg
            showNotification(message, NotificationType.Error)
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
                <ConfirmButton variant="success" onClick={() => void handleCancelPayment(paymentinfo?.id ?? null)} disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Cancelando...
                        </>
                    ) : (
                        'Confirmar Cancelación'
                    )}
                </ConfirmButton>
                <CloseButton onClick={onHide} disabled={isLoading}>
                    Cerrar
                </CloseButton>
            </StyledModalFooter>
        </Modal>
    )
}

import { PaymentsCategory, PaymentsState } from 'components/Types/Types'

export const translatePaymentCategory = (category: PaymentsCategory): string => {
    switch (category) {
        case PaymentsCategory.FEDERATE_PAYMENT:
            return 'Ficha federativa'
        case PaymentsCategory.MEMBERSHIP_PAYMENT:
            return 'Socio'
        case PaymentsCategory.OTHER_PAYMENT:
            return 'Otro'
        default:
            return 'Desconocido'
    }
}

export const translatePaymentState = (state: PaymentsState): string => {
    switch (state) {
        case PaymentsState.UNPAID:
            return 'Pendiente'
        case PaymentsState.PAID:
            return 'Pagado'
        case PaymentsState.CANCELLED:
            return 'Cancelado'
        default:
            return 'Desconocido'
    }
}

export const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    })
        .format(amount)
        .replace('€', '')
        .trim()

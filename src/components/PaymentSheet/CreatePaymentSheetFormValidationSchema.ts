import * as Yup from 'yup'
import { parse, isDate } from 'date-fns'

const parseDateString = (originalValue: string) => {
    const parsedDate = isDate(originalValue) ? originalValue : parse(originalValue, 'yyyy-MM-dd', new Date())
    return parsedDate
}

export const CreatePaymentSheetFormValidationSchema = Yup.object().shape({
    userEmail: Yup.string().required('Debe seleccionar a alguien que reciba el pago'),

    reason: Yup.string()
        .min(10, 'El motivo del abono debe tener al menos 10 caracteres')
        .max(50, 'El motivo del abono no debe exceder los 50 caracteres')
        .required('El motivo del abono es requerido'),

    place: Yup.string()
        .min(10, 'El lugar y país debe tener al menos 10 caracteres')
        .max(30, 'El lugar y país no debe exceder los 30 caracteres')
        .required('El lugar y país es requerido'),

    startDate: Yup.date().transform(parseDateString).required('La fecha de inicio de la actividad es requerida'),

    endDate: Yup.date()
        .transform(parseDateString)
        .required('La fecha de fin de la actividad es requerida')
        .min(Yup.ref('startDate'), 'La fecha de fin debe ser posterior a la fecha de inicio')
})

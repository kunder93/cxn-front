import * as Yup from 'yup'
import { ActivityCategory } from './Types'

export const AddActivityValidationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Es necesario un título.')
        .min(4, ' El título debe contener al menos 4 caracteres.')
        .max(30, 'El título no debe exceder los 30 caracteres.'),
    description: Yup.string()
        .required('Es necesaria una descripción.')
        .min(10, 'La descripción debe ser de al menos 10 caracteres.')
        .max(150, 'La descripción no debe exceder los 150 caracteres.'),
    startDate: Yup.date().required('Es necesaria una fecha.').typeError('Invalid date').min(new Date(), 'La fecha de inicio debe ser futura.'),
    endDate: Yup.date().required('Es necesaria una fecha.').min(Yup.ref('startDate'), 'La fecha de fin debe ser posterior a la fecha de comienzo.'),
    category: Yup.string().oneOf(Object.values(ActivityCategory), 'Selecciona una categoría.').required('Selecciona una categoría.')
})

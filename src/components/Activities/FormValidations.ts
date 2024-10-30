import * as Yup from 'yup'
import { ActivityCategory } from './Types'

export const AddActivityValidationSchema = Yup.object().shape({
    title: Yup.string().required('Es necesario un título.'),
    description: Yup.string().required('Es necesaria una descripción.'),
    image: Yup.mixed().required('An image is required'),
    startDate: Yup.date().required('Es necesario una fecha.').typeError('Invalid date'),
    endDate: Yup.date().required('Es necesario una fecha.').min(Yup.ref('startDate'), 'End date must be after start date'),
    category: Yup.string().oneOf(Object.values(ActivityCategory), 'Selecciona una categoría.').required('Selecciona una categoría.')
})

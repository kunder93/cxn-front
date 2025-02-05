import * as Yup from 'yup'
import { ActivityCategory } from './Types'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_RESOLUTION = { width: 2000, height: 2000 }
const VALID_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp']

// Función para obtener las dimensiones de la imagen
const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
        if (!file.type.startsWith('image/')) {
            reject(new Error('The file is not an image.'))
            return
        }

        const img = new Image()
        const url = URL.createObjectURL(file)

        img.onload = () => {
            URL.revokeObjectURL(url)
            resolve({ width: img.width, height: img.height })
        }

        img.onerror = () => {
            URL.revokeObjectURL(url)
            reject(new Error('Failed to load image.'))
        }

        img.src = url
    })
}

// Función reutilizable para validar imágenes
const imageValidation = () =>
    Yup.mixed<File>()
        .nullable()
        .test('fileType', 'El archivo debe ser una imagen (png, jpg, jpeg, avif, webp)', (value) => {
            if (!value) return true // Permitir null
            return VALID_IMAGE_TYPES.includes(value.type)
        })
        .test('fileSize', 'El archivo es muy grande (máx. 10MB)', (value) => {
            if (!value) return true // Permitir null
            return value.size <= MAX_FILE_SIZE
        })
        .test('resolution', 'La resolución es muy alta (máx. 2000x2000 px)', async (value) => {
            if (!value) return true // Permitir null
            try {
                const img = await getImageDimensions(value)
                return img.width <= MAX_RESOLUTION.width && img.height <= MAX_RESOLUTION.height
            } catch (error) {
                return false
            }
        })

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
    category: Yup.string().oneOf(Object.values(ActivityCategory), 'Selecciona una categoría.').required('Selecciona una categoría.'),
    imageFile: imageValidation()
})

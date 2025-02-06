import { getImageDimensions, MAX_FILE_SIZE, MAX_RESOLUTION, VALID_IMAGE_TYPES } from 'components/Activities/FormValidations'
import * as Yup from 'yup'

// Función reutilizable para validar imágenes
const imageValidation = (fieldName: string) =>
    Yup.mixed<File>()
        .required(`Se requiere la imagen: ${fieldName}`)
        .test('fileType', 'El archivo debe ser una imagen (png, jpg, jpeg, avif, webp)', (value) => {
            return value ? VALID_IMAGE_TYPES.includes(value.type) : false
        })
        .test('fileSize', 'El archivo es muy grande (máx. 10MB)', function (value) {
            return value ? value.size <= MAX_FILE_SIZE : false
        })
        .test('resolution', 'La resolución es muy alta (máx. 2000x2000 px)', async function (value) {
            if (!value) return true
            try {
                const img = await getImageDimensions(value)
                return img.width <= MAX_RESOLUTION.width && img.height <= MAX_RESOLUTION.height
            } catch (error) {
                return false
            }
        })

// Esquema de validación con Yup
export const federateRequestValidationSchema = Yup.object().shape({
    frontDni: imageValidation('anverso del DNI'),
    backDni: imageValidation('reverso del DNI')
})

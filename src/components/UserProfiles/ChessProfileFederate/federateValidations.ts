import { getImageDimensions, MAX_FILE_SIZE, MAX_RESOLUTION, VALID_IMAGE_TYPES } from 'components/Activities/FormValidations'
import * as Yup from 'yup'

// Función reutilizable para validar imágenes
const imageValidation = (fieldName: string) =>
    Yup.mixed<File>()
        .required(`Se requiere la imagen: ${fieldName}`)
        .test(
            'fileType',
            'El archivo debe ser una imagen (png, jpg, jpeg, avif, webp)',
            (value) => VALID_IMAGE_TYPES.includes(value.type || '') // Aseguramos que value sea válido antes de acceder a value.type
        )
        .test('fileSize', 'El archivo es muy grande (máx. 10MB)', (value) => value.size <= MAX_FILE_SIZE)
        .test('resolution', 'La resolución es muy alta (máx. 2000x2000 px)', async (value) => {
            // Aquí no es necesario hacer if (!value) porque 'value' debería ser un File
            try {
                const img = await getImageDimensions(value) // getImageDimensions toma el valor como un archivo de imagen
                return img.width <= MAX_RESOLUTION.width && img.height <= MAX_RESOLUTION.height
            } catch {
                return false // Si ocurre un error, retorna false
            }
        })
// Esquema de validación con Yup
export const federateRequestValidationSchema = Yup.object().shape({
    frontDni: imageValidation('anverso del DNI'),
    backDni: imageValidation('reverso del DNI')
})

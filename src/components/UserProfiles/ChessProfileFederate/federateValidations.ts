import * as Yup from 'yup'

// Límite de tamaño y resolución
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
const imageValidation = (fieldName: string) =>
    Yup.mixed<File>()
        .required(`Se requiere la imagen del ${fieldName}`)
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

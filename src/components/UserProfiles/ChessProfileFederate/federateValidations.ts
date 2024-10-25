import * as Yup from 'yup'

// Límite de tamaño y resolución
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_RESOLUTION = { width: 2000, height: 2000 }

// Función para obtener las dimensiones de la imagen
const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
        if (!file.type.startsWith('image/')) {
            reject(new Error('The file is not an image.')) // This error will be caught in your validation
            return
        }

        const img = new Image()
        const url = URL.createObjectURL(file)

        img.onload = () => {
            URL.revokeObjectURL(url)
            resolve({ width: img.width, height: img.height })
        }

        img.onerror = (/*error*/) => {
            URL.revokeObjectURL(url)
            reject(new Error('Failed to load image.'))
        }

        img.src = url
    })
}

// Esquema de validación con Yup
export const federateRequestValidationSchema = Yup.object().shape({
    frontDni: Yup.mixed<File>()
        .required('Se requiere la imagen del anverso del DNI')
        .test('fileType', 'El archivo debe ser una imagen (png, jpg, jpeg, avif, webp)', (value) => {
            return value ? ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp'].includes(value.type) : false
        })
        .test('fileSize', 'El archivo es muy grande (máx. 10MB)', function (value) {
            // Only check file size if fileType is valid
            if (this.parent.frontDni?.type && ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp'].includes(this.parent.frontDni.type)) {
                return value ? value.size <= MAX_FILE_SIZE : false
            }
            return true // Skip if the file type is invalid
        })
        .test('resolution', 'La resolución es muy alta (máx. 2000x2000 px)', async function (value) {
            // Only check resolution if fileType is valid
            if (this.parent.frontDni?.type && ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp'].includes(this.parent.frontDni.type)) {
                if (!value) return true // If no value, validation passes
                try {
                    const img = await getImageDimensions(value)
                    return img.width <= MAX_RESOLUTION.width && img.height <= MAX_RESOLUTION.height
                } catch (error) {
                    return false // Return false if there was an error
                }
            }
            return true // Skip if the file type is invalid
        }),

    backDni: Yup.mixed<File>()
        .required('Se requiere la imagen del reverso del DNI')
        .test('fileType', 'El archivo debe ser una imagen (png, jpg, jpeg, avif, webp)', (value) => {
            return value ? ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp'].includes(value.type) : false
        })
        .test('fileSize', 'El archivo es muy grande (máx. 10MB)', function (value) {
            if (this.parent.backDni?.type && ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp'].includes(this.parent.backDni.type)) {
                return value ? value.size <= MAX_FILE_SIZE : false
            }
            return true // Skip if the file type is invalid
        })
        .test('resolution', 'La resolución es muy alta (máx. 2000x2000 px)', async function (value) {
            if (this.parent.backDni?.type && ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp'].includes(this.parent.backDni.type)) {
                if (!value) return true // If no value, validation passes
                try {
                    const img = await getImageDimensions(value)
                    return img.width <= MAX_RESOLUTION.width && img.height <= MAX_RESOLUTION.height
                } catch (error) {
                    return false // Return false if there was an error
                }
            }
            return true // Skip if the file type is invalid
        })
})

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as Yup from 'yup'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_RESOLUTION = { width: 2000, height: 2000 }

// Obtener dimensiones de la imagen
const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = URL.createObjectURL(file)
        img.onload = () => {
            resolve({ width: img.width, height: img.height })
        }
        img.onerror = (error) => reject(error)
    })
}

export const uploadFormValidationSchema = Yup.object().shape({
    profileImage: Yup.mixed<File>()
        .required('Se requiere la imagen del anverso del DNI')
        .test('fileType', 'El archivo debe ser una imagen (png, jpg, jpeg, avif, webp)', (value) => {
            return value ? ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp'].includes(value.type) : false
        })
        .test('fileSize', 'El archivo es muy grande (máx. 10MB)', function (value) {
            if (
                this.parent.profileImage?.type &&
                ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp'].includes(this.parent.profileImage.type)
            ) {
                return value ? value.size <= MAX_FILE_SIZE : false
            }
            return true
        })
        .test('resolution', 'La resolución es muy alta (máx. 2000x2000 px)', async function (value) {
            if (
                this.parent.profileImage?.type &&
                ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp'].includes(this.parent.profileImage.type)
            ) {
                if (!value) return true
                try {
                    const img = await getImageDimensions(value)
                    return img.width <= MAX_RESOLUTION.width && img.height <= MAX_RESOLUTION.height
                } catch (error) {
                    return false
                }
            }
            return true
        })
})

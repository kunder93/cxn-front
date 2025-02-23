import { getImageDimensions, MAX_FILE_SIZE, MAX_RESOLUTION } from 'components/Activities/FormValidations'
import * as Yup from 'yup'

export const dniValidationSchema = Yup.object().shape({
    frontDni: Yup.mixed<File>()
        .required('Se requiere la imagen del anverso del DNI')
        .test('fileType', 'El archivo debe ser una imagen (png, jpg, jpeg, avif, webp)', (value) => {
            return value ? ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp'].includes(value.type) : false
        })
        .test('fileSize', 'El archivo es muy grande (máx. 10MB)', function (value) {
            if (this.parent.frontDni?.type && ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp'].includes(this.parent.frontDni.type)) {
                return value ? value.size <= MAX_FILE_SIZE : false
            }
            return true
        })
        .test('resolution', 'La resolución es muy alta (máx. 2000x2000 px)', async function (value) {
            if (this.parent.frontDni?.type && ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp'].includes(this.parent.frontDni.type)) {
                if (!value) return true
                try {
                    const img = await getImageDimensions(value)
                    return img.width <= MAX_RESOLUTION.width && img.height <= MAX_RESOLUTION.height
                } catch (error) {
                    return false
                }
            }
            return true
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
            return true
        })
        .test('resolution', 'La resolución es muy alta (máx. 2000x2000 px)', async function (value) {
            if (this.parent.backDni?.type && ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp'].includes(this.parent.backDni.type)) {
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

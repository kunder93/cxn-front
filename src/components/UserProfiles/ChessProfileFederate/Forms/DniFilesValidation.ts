import { getImageDimensions, MAX_FILE_SIZE, MAX_RESOLUTION } from 'components/Activities/FormValidations'
import * as Yup from 'yup'

export const dniValidationSchema = Yup.object().shape({
    frontDni: Yup.mixed<File>()
        .required('Se requiere la imagen del anverso del DNI')
        .test('fileType', 'El archivo debe ser una imagen (png, jpg, jpeg, avif, webp)', (value: File | null) =>
            value ? ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp'].includes(value.type) : false
        )
        .test('fileSize', 'El archivo es muy grande (máx. 10MB)', function (value: File | null) {
            const parent = this.parent as { frontDni?: File }
            if (!value || !parent.frontDni) return false
            return value.size <= MAX_FILE_SIZE
        })
        .test('resolution', 'La resolución es muy alta (máx. 2000x2000 px)', async function (value: File | null) {
            if (!value) return true
            try {
                const img = await getImageDimensions(value)
                return img.width <= MAX_RESOLUTION.width && img.height <= MAX_RESOLUTION.height
            } catch {
                return false
            }
        }),

    backDni: Yup.mixed<File>()
        .required('Se requiere la imagen del reverso del DNI')
        .test('fileType', 'El archivo debe ser una imagen (png, jpg, jpeg, avif, webp)', (value: File | null) =>
            value ? ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp'].includes(value.type) : false
        )
        .test('fileSize', 'El archivo es muy grande (máx. 10MB)', function (value: File | null) {
            const parent = this.parent as { backDni?: File }
            if (!value || !parent.backDni) return false
            return value.size <= MAX_FILE_SIZE
        })
        .test('resolution', 'La resolución es muy alta (máx. 2000x2000 px)', async function (value: File | null) {
            if (!value) return true
            try {
                const img = await getImageDimensions(value)
                return img.width <= MAX_RESOLUTION.width && img.height <= MAX_RESOLUTION.height
            } catch {
                return false
            }
        })
})

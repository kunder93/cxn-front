import { getImageDimensions, MAX_FILE_SIZE, MAX_RESOLUTION } from 'components/Activities/FormValidations'
import * as Yup from 'yup'

export const uploadFormValidationSchema = Yup.object().shape({
    profileImage: Yup.mixed<File>()
        .required('Se requiere la imagen del anverso del DNI')
        .test('fileType', 'El archivo debe ser una imagen (png, jpg, jpeg, avif, webp)', (value) => {
            return ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp'].includes(value.type)
        })

        .test('fileSize', 'El archivo es muy grande (máx. 10MB)', function (value) {
            const parent = this.parent as { profileImage?: File }
            const profileImage = parent.profileImage
            if (profileImage?.type && ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/webp'].includes(profileImage.type)) {
                return value.size <= MAX_FILE_SIZE
            }
            return true
        })
        .test('resolution', 'La resolución es muy alta (máx. 2000x2000 px)', async function (value) {
            try {
                const img = await getImageDimensions(value)
                return img.width <= MAX_RESOLUTION.width && img.height <= MAX_RESOLUTION.height
            } catch {
                return false
            }
        })
})

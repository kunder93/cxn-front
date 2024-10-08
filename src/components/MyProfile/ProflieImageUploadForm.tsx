import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Button } from 'react-bootstrap'
import axios, { AxiosError } from 'axios'
import { useAppSelector } from '../../store/hooks'
import { UserProfileImage } from '../../store/types/userTypes'
import { setProfileImage } from '../../store/slices/user'
import { useDispatch } from 'react-redux'
import { useNotificationContext } from '../../components/Common/NotificationContext'
import { NotificationType } from '../../components/Common/hooks/useNotification'

const validationSchema = Yup.object().shape({
    profileImage: Yup.mixed()
        .required('La imagen es requerida')
        .test(
            'fileSize',
            'El archivo es muy grande',
            (value) => value && value instanceof File && value.size <= 4 * 1024 * 1024 // Tamaño máximo de 4MB
        )
        .test(
            'fileType',
            'Formato no soportado',
            (value) => value && value instanceof File && ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/avif'].includes(value.type)
        )
        .test(
            'fileDimensions',
            'Las dimensiones de la imagen deben ser 500x500 píxeles o menos',
            (value) =>
                new Promise((resolve) => {
                    if (!value || !(value instanceof File)) {
                        return resolve(false) // Validamos que sea un File antes de continuar
                    }

                    const img = new Image()
                    const objectUrl = URL.createObjectURL(value as Blob) // Aseguramos que 'value' es un Blob

                    img.src = objectUrl
                    img.onload = () => {
                        const { width, height } = img
                        URL.revokeObjectURL(objectUrl) // Liberar memoria después de la carga
                        resolve(width <= 500 && height <= 500)
                    }
                })
        )
})

const ProfileImageUploadForm: React.FC = () => {
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const { showNotification } = useNotificationContext()
    const dispatch = useDispatch()
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
        const file = event.currentTarget.files?.[0]
        if (file) {
            setFieldValue('profileImage', file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (values: { profileImage: File | null }) => {
        if (!values.profileImage) return

        const formData = new FormData()
        formData.append('file', values.profileImage)

        try {
            const response = await axios.patch<UserProfileImage>('http://localhost:8080/api/user/uploadProfileImageFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userJwt}`
                }
            })
            const updatedUserProfileImage: UserProfileImage = response.data
            updatedUserProfileImage.file = preview as string
            showNotification('Imagen de perfil actualizada', NotificationType.Success)
            dispatch(setProfileImage(updatedUserProfileImage))
        } catch (error) {
            if (error instanceof AxiosError) {
                showNotification('Error al actualizar la imagen de perfil: ' + error.message, NotificationType.Error)
            } else {
                showNotification('Ocurrió un error inesperado.', NotificationType.Error)
            }
        }
    }

    return (
        <Formik initialValues={{ profileImage: null }} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ setFieldValue, errors, touched }) => (
                <Form>
                    <div className="mb-3">
                        <label htmlFor="profileImage" className="form-label">
                            Máximo 4Mb. Máximo 500 x 500 pixeles. Formatos admitidos: Jpeg, jpg, png , webp y avif.
                        </label>
                        <input
                            id="profileImage"
                            name="profileImage"
                            type="file"
                            accept="image/*"
                            className="form-control"
                            onChange={(event) => handleImageChange(event, setFieldValue)}
                        />
                        {errors.profileImage && touched.profileImage && <div className="text-danger">{errors.profileImage}</div>}
                    </div>

                    {preview && (
                        <div className="mb-3">
                            <img src={preview as string} alt="Vista previa" width={100} height={100} />
                        </div>
                    )}

                    <Button variant="success" type="submit">
                        Cambiar
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default ProfileImageUploadForm

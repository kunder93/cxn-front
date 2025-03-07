import React, { useRef, useState } from 'react'
import { Formik, Form, FormikTouched, FormikErrors } from 'formik'
import { Form as BootstrapForm, Spinner, Button, Image } from 'react-bootstrap'
import axios, { AxiosError } from 'axios'
import { useAppSelector } from '../../store/hooks'
import { UserProfileImage } from '../../store/types/userTypes'
import { setProfileImage } from '../../store/slices/user'
import { useDispatch } from 'react-redux'
import { useNotificationContext } from '../../components/Common/NotificationContext'
import { NotificationType } from '../../components/Common/hooks/useNotification'
import { UPLOAD_PROFILE_IMAGE_FILE_URL } from '../../resources/server_urls'
import { FileInput } from '../../components/UserProfiles/ChessProfileFederate/Forms/Common/FormComponents'
import { uploadFormValidationSchema } from './ProfileImage/FormValidations'
import styled from 'styled-components'

export const SubmitButton = styled(Button)`
    @media (max-width: 768px) {
        width: 100%; /* Botones ocupan el 100% del ancho en móviles */
        font-size: 1.4em;
    }
`

export const StyledPreviewRow = styled.div`
    display: flex;

    gap: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    flex-wrap: nowrap;
    max-width: 100%;
    align-items: center;
    justify-content: center; /* Centra la imagen horizontalmente */
    align-content: center;

    div {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center; /* Asegura que el contenido interno también esté centrado */
        align-items: center;
        align-content: center;
        padding-top: 1em;
    }
    img {
        width: 50%;
        border-radius: 8px;
        height: auto;
        aspect-ratio: 1 / 1;
    }
    @media (max-width: 768px) {
        gap: 5px;
    }
`

interface ProfileImageFormValues {
    profileImage: File | null
}

const initialFormValues: ProfileImageFormValues = { profileImage: null }

const ProfileImageUploadForm: React.FC = () => {
    const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null)
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const { showNotification } = useNotificationContext()
    const dispatch = useDispatch()
    const profileImageInputRef = useRef<HTMLInputElement | null>(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = (values: ProfileImageFormValues) => {
        setLoading(true)
        const formData = new FormData()
        if (values.profileImage) {
            formData.append('profileImage', values.profileImage) // Only append if it's not null
        }

        axios
            .patch<UserProfileImage>(UPLOAD_PROFILE_IMAGE_FILE_URL, formData, {
                headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${userJwt ?? ''}` }
            })
            .then((response) => {
                const updatedUserProfileImage: UserProfileImage = response.data
                if (profileImagePreview) {
                    updatedUserProfileImage.file = profileImagePreview
                }
                showNotification('Imagen de perfil actualizada', NotificationType.Success)
                dispatch(setProfileImage(updatedUserProfileImage))
            })
            .catch((error: unknown) => {
                if (error instanceof AxiosError) {
                    showNotification('Error al actualizar la imagen de perfil: ' + error.message, NotificationType.Error)
                } else {
                    showNotification('Ocurrió un error inesperado.', NotificationType.Error)
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleImagePreview = (file: File, setPreview: (value: string | null) => void) => {
        const reader = new FileReader()
        reader.onload = () => {
            setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: File | null, shouldValidate?: boolean) => Promise<void>,
        setTouched: (touched: FormikTouched<ProfileImageFormValues>) => void,
        validateForm: () => Promise<FormikErrors<ProfileImageFormValues>>,
        field: keyof ProfileImageFormValues,
        setPreview: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
        const file = event.currentTarget.files?.[0] ?? null
        void setFieldValue(field, file).then(() => {
            setTouched({ [field]: true })
            void validateForm().then((validationErrors: FormikErrors<ProfileImageFormValues>) => {
                if (file && !validationErrors[field]) {
                    handleImagePreview(file, setPreview)
                }
            })
        })
    }

    return (
        <Formik initialValues={initialFormValues} validationSchema={uploadFormValidationSchema} onSubmit={handleSubmit}>
            {({ setFieldValue, errors, touched, isValid, dirty, setTouched, validateForm }) => (
                <BootstrapForm as={Form}>
                    <FileInput
                        label="Imagen del perfil:"
                        inputRef={profileImageInputRef}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            handleFileChange(
                                event,
                                setFieldValue as (field: string, value: File | null) => Promise<void>,
                                () => setTouched,
                                validateForm,
                                'profileImage',
                                setProfileImagePreview
                            )
                        }}
                        isInvalid={!!errors.profileImage && touched.profileImage}
                        errorMessage={errors.profileImage}
                    />

                    <StyledPreviewRow>
                        {profileImagePreview && (
                            <div className="mb-3">
                                <Image src={profileImagePreview} alt="Vista previa" width={100} height={100} roundedCircle />
                                <p>Previsualización</p>
                            </div>
                        )}
                    </StyledPreviewRow>

                    <SubmitButton variant="success" type="submit" disabled={loading || !isValid || !dirty}>
                        {loading ? (
                            <>
                                <Spinner animation="border" size="sm" /> Cambiando...
                            </>
                        ) : (
                            'Cambiar'
                        )}
                    </SubmitButton>
                </BootstrapForm>
            )}
        </Formik>
    )
}

export default ProfileImageUploadForm

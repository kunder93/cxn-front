import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setProfileImage } from '../../store/slices/user'
import { UserProfileImage } from '../../store/types/userTypes'
import styled from 'styled-components'
import axios, { AxiosError } from 'axios'
import { UPDATE_PROFILE_IMAGE_URL } from '../../resources/server_urls'
import UploadProfileImageButton from './UploadProfileImageButton'
import { useNotificationContext } from '../../components/Common/NotificationContext'
import { NotificationType } from '../../components/Common/hooks/useNotification'

// Sample image URLs
const imageUrlList: string[] = Array.from({ length: 16 }, (_, i) => `/User/ProfileImagesExample/Image${i + 1}.webp`)

const ImageStyled = styled(Image)<{ selected: boolean }>`
    padding: 0.33em;
    border: ${({ selected }) => (selected ? '3px solid #28a745' : '2px solid transparent')};
    border-radius: 8px;
    transition:
        transform 0.2s ease,
        border 0.2s ease;

    &:hover {
        transform: scale(1.1);
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: scale(1.05);
    }

    // Responsive image size for mobile
    @media (max-width: 768px) {
        width: 75px;
        height: 75px;
    }
`

const ModalHeaderStyled = styled(Modal.Header)`
    font-size: 150%;
    font-weight: bold;
    background-color: #007bff; // Bootstrap primary color
    color: white; // Text color
    border-bottom: 1px solid #0056b3; // Darker border for emphasis
`

const ModalBodyStyled = styled(Modal.Body)`
    background-color: #f8f9fa;
    padding: 2rem;

    // Adjust padding for mobile devices
    @media (max-width: 768px) {
        padding: 1rem;
    }

    // Make images scrollable in a flex container for smaller screens
    div {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        max-height: 300px; // Limit height on mobile
        overflow-y: auto; // Enable scrolling on mobile
    }
`

const ModalFooterStyled = styled(Modal.Footer)`
    display: flex;
    justify-content: space-between;
    background-color: #f1f1f1;
    border-top: 1px solid #dee2e6;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px; // Add space between buttons on mobile
        button {
            width: 100%; // Make buttons full-width on mobile
        }
    }
`

const StyledButton = styled(Button)`
    border: none;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #218838;
    }

    // Make buttons more responsive for mobile
    @media (max-width: 768px) {
        width: 100%;
    }
`

const PersonalImageButtonChanger = (): JSX.Element => {
    const [changeProfileImage, setChangeProfileImage] = React.useState(false)
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null) // Track selected image
    const { showNotification } = useNotificationContext()
    const dispatch = useAppDispatch()
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)

    const handleChangeProfileImage = () => {
        setSelectedImage(null)
        setChangeProfileImage(!changeProfileImage)
    }

    const handleImageSelect = (url: string) => {
        setSelectedImage(url)
    }

    const handleChangeProfileImagePersist = () => {
        if (selectedImage) {
            axios
                .patch<UserProfileImage>(
                    UPDATE_PROFILE_IMAGE_URL,
                    { profileImageUrl: selectedImage.toString() },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${userJwt}`
                        }
                    }
                )
                .then((response) => {
                    const updatedUserProfileImage: UserProfileImage = response.data
                    showNotification('Imagen de perfil actualizada', NotificationType.Success)
                    dispatch(setProfileImage(updatedUserProfileImage))
                })
                .catch((error) => {
                    if (error instanceof AxiosError) {
                        showNotification('Error al actualizar la imagen de perfil: ' + error.message, NotificationType.Error)
                    } else {
                        showNotification('Ocurrió un error inesperado.', NotificationType.Error)
                    }
                })
        }
    }

    return (
        <>
            <Button variant="success" onClick={handleChangeProfileImage}>
                Imagen de perfil
            </Button>
            <Modal aria-labelledby="contained-modal-title-vcenter" centered show={changeProfileImage} onHide={handleChangeProfileImage}>
                <ModalHeaderStyled closeButton>Selecciona una de las imágenes:</ModalHeaderStyled>
                <ModalBodyStyled>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {imageUrlList.map((url, index) => (
                            <ImageStyled
                                key={index}
                                src={url}
                                thumbnail
                                selected={selectedImage === url}
                                onClick={() => handleImageSelect(url)}
                                style={{ width: '100px', height: '100px' }}
                            />
                        ))}
                    </div>
                </ModalBodyStyled>
                <ModalFooterStyled>
                    <UploadProfileImageButton />
                    <StyledButton variant="success" onClick={handleChangeProfileImagePersist} disabled={!selectedImage}>
                        Cambiar
                    </StyledButton>
                    <Button variant="danger" onClick={handleChangeProfileImage}>
                        Cerrar
                    </Button>
                </ModalFooterStyled>
            </Modal>
        </>
    )
}

export default PersonalImageButtonChanger

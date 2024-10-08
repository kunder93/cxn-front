import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setProfileImage } from '../../store/slices/user'
import { UserProfileImage } from '../../store/types/userTypes'
import styled from 'styled-components'
import axios from 'axios'
import { UPDATE_PROFILE_IMAGE_URL } from '../../resources/server_urls'
import UploadProfileImageButton from './UploadProfileImageButton'
const imageUrlList: string[] = Array.from({ length: 16 }, (_, i) => `/User/ProfileImagesExample/Image${i + 1}.webp`)

// Styled Image component with hover and click effects
const ImageStyled = styled(Image)<{ selected: boolean }>`
    padding: 0.33em;
    border: ${({ selected }) => (selected ? '2px solid #28a745' : '2px solid transparent')};
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
`
const ModalHeaderStyled = styled(Modal.Header)`
    font-size: 150%;
    font-weight: bold;
`

const PersonalImageButtonChanger = (): JSX.Element => {
    const [changeProfileImage, setChangeProfileImage] = React.useState(false)
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null) // Track selected image
    const dispatch = useAppDispatch()
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const handleChangeProfileImage = () => {
        setSelectedImage(null)
        setChangeProfileImage(!changeProfileImage)
    }

    const handleImageSelect = (url: string) => {
        setSelectedImage(url)
        console.log(`Selected image: ${url}`)
    }

    const handleChangeProfileImagePersist = () => {
        if (selectedImage) {
            console.log('SELECTED IMAGE IS: ' + selectedImage)
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
                    const updatedUserProfileImage: UserProfileImage = response.data // Assuming the response contains the updated user profile
                    dispatch(setProfileImage(updatedUserProfileImage))
                })
                .catch((error) => {
                    console.error('Error updating profile image: ', error)
                })
        }
    }

    return (
        <>
            <Button variant="success" onClick={handleChangeProfileImage}>
                Imagen de perfil
            </Button>
            <Modal show={changeProfileImage} onHide={handleChangeProfileImage}>
                <ModalHeaderStyled closeButton>Selecciona una de las imágenes:</ModalHeaderStyled>
                <Modal.Body>
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
                </Modal.Body>
                <Modal.Footer>
                    <UploadProfileImageButton></UploadProfileImageButton>

                    <Button onClick={() => handleChangeProfileImagePersist()} variant="success">
                        Cambiar
                    </Button>
                    <Button variant="secondary" onClick={handleChangeProfileImage}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default PersonalImageButtonChanger

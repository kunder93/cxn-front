import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { UserProfileImage } from '../../../store/types/userTypes'
import { setProfileImage } from '../../../store/slices/user'
import { useAppSelector } from '../../../store/hooks'

// Hook para obtener la imagen de perfil
export const useFetchProfileImage = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)

    useEffect(() => {
        const fetchProfileImage = async () => {
            setLoading(true)
            try {
                const response = await axios.get<UserProfileImage>('http://localhost:8080/api/user/obtainProfileImage', {
                    headers: {
                        Authorization: `Bearer ${userJwt}`
                    }
                })

                if (response.data) {
                    const profileImageData: UserProfileImage = {
                        imageExtension: response.data.imageExtension,
                        stored: response.data.stored,
                        url: response.data.url,
                        file: response.data.file // Si es necesario
                    }

                    // Actualiza el estado en el store
                    dispatch(setProfileImage(profileImageData))
                }
            } catch (err) {
                setError('Error al obtener la imagen de perfil')
            } finally {
                setLoading(false)
            }
        }

        void fetchProfileImage()
    }, [dispatch])

    return { loading, error }
}

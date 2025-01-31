import { useState, useEffect } from 'react'
import axios from 'axios'
import { GET_USER_DNI_URL } from 'resources/server_urls'
import { useAppSelector } from 'store/hooks'

interface DniImages {
    frontImage: string
    backImage: string
}

interface UseDniImagesResult {
    dniImages: DniImages | null
    isLoading: boolean
    error: string | null
}

export const useDniImages = (userDni: string): UseDniImagesResult => {
    const [dniImages, setDniImages] = useState<DniImages | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)

    useEffect(() => {
        const fetchDniImages = async () => {
            setIsLoading(true)
            setError(null)

            try {
                const response = await axios.get<DniImages>(`${GET_USER_DNI_URL}/dni/${userDni}`, {
                    responseType: 'json',
                    headers: {
                        Authorization: `Bearer ${userJwt}`
                    }
                })

                setDniImages(response.data)
            } catch (err) {
                console.error('Error fetching DNI images:', err)
                setError('Error cargando imágenes del DNI.')
            } finally {
                setIsLoading(false)
            }
        }

        void fetchDniImages()
    }, [userDni, userJwt])

    return { dniImages, isLoading, error }
}

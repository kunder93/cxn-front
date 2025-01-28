import axios from 'axios'
import { useEffect, useState } from 'react'
import { RESOURCES_BOOK_URL, RESOURCES_MAGAZINE_URL } from 'resources/server_urls'

export const useBookCover = (isbn: string | null, jwtToken: string | null) => {
    const [image, setImage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (isbn && jwtToken) {
            setIsLoading(true)
            setError(null)

            axios
                .get(`${RESOURCES_BOOK_URL}/${isbn}/coverImage`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    },
                    responseType: 'blob'
                })
                .then((response) => {
                    const reader = new FileReader()
                    reader.readAsDataURL(response.data as Blob)
                    reader.onload = () => {
                        setImage(reader.result as string)
                        setIsLoading(false)
                    }
                })
                .catch((err) => {
                    console.error('Error fetching book cover:', err)
                    setError('Failed to load image')
                    setIsLoading(false)
                })
        }
    }, [isbn, jwtToken])

    return { image, isLoading, error }
}

export const useMagazineImageLoader = (issn: string | undefined, jwtToken: string | null) => {
    const [image, setImage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (issn) {
            setIsLoading(true) // Reset loading state
            setError(null) // Reset error state
            axios
                .get(`${RESOURCES_MAGAZINE_URL}/${issn}/coverImage`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    },
                    responseType: 'blob'
                })
                .then((response) => {
                    const reader = new FileReader()
                    reader.readAsDataURL(response.data as Blob)
                    reader.onload = () => {
                        setImage(reader.result as string)
                        setIsLoading(false)
                    }
                })
                .catch((error) => {
                    console.error('Error loading Magazine cover image:', error)
                    setError('Failed to load the cover image. Please try again later.')
                    setIsLoading(false) // Stop loading even in case of an error
                })
        }
    }, [issn, jwtToken])

    return { image, isLoading, error }
}

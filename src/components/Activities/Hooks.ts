// hooks/useFetchActivities.ts
import { useState, useCallback, useEffect } from 'react'
import axios, { AxiosError } from 'axios'
import { IActivity } from 'components/Activities/Types'
import { ACTIVITIES_URL } from 'resources/server_urls'

export const useFetchActivities = () => {
    const [activities, setActivities] = useState<IActivity[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const fetchActivities = useCallback(async () => {
        setLoading(true)
        try {
            const response = await axios.get<IActivity[]>(ACTIVITIES_URL, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setActivities(response.data)
            setError(null)
        } catch (err) {
            console.error('Failed to fetch activities:', err)
            setError('Failed to fetch activities')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchActivities()
    }, [fetchActivities])

    const addLocalActivity = (activity: IActivity) => {
        setActivities((prev) => [...prev, activity])
    }

    return {
        activities,
        error,
        loading,
        refetch: fetchActivities,
        addLocalActivity
    }
}

// Helper function to convert ArrayBuffer to base64 string
const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    const byteArray = new Uint8Array(buffer)
    let binary = ''
    for (const byte of byteArray) {
        binary += String.fromCharCode(byte)
    }
    return window.btoa(binary)
}

const CATEGORY_DEFAULT_IMAGES: Record<string, string> = {
    TORNEO: '/activities/default-torneo.avif',
    ENTRENAMIENTO: '/activities/default-entrenamiento.avif',
    CLASES: '/activities/default-clases.avif',
    INFORMAL: '/activities/default-informal.avif',
    OTRO: '/activities/default-otro.avif'
}

const getDefaultImage = (category: string | null) => {
    if (!category) return '/images/default.png'
    return CATEGORY_DEFAULT_IMAGES[category] || '/images/default.png'
}

export const useActivityImage = (activity: IActivity) => {
    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get<ArrayBuffer>(`${ACTIVITIES_URL}/${activity.title}/image`, {
                    responseType: 'arraybuffer'
                })
                const contentType = (response.headers['content-type'] as string) ?? 'image/jpeg'
                if (response.status === 204) {
                    // Use category-based default image
                    setImage(getDefaultImage(activity.category))
                    setError(null)
                } else {
                    // Convert the response to a base64-encoded string
                    const base64Image = arrayBufferToBase64(response.data)
                    setImage(`data:${contentType};base64,${base64Image}`)
                    setError(null)
                }
            } catch (err) {
                const axiosError = err as AxiosError
                console.error('Failed to fetch activity image:', err)
                setError('Failed to load activity image: ' + axiosError.message)
            } finally {
                setLoading(false)
            }
        }
        void fetchImage()
    }, [activity])

    return { loading, image, error }
}

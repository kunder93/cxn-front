import axios from 'axios'
import { useEffect, useState } from 'react'
import { RESOURCES_BOOK_URL, RESOURCES_MAGAZINE_URL } from 'resources/server_urls'
import { Book, Magazine } from './Types'
import { NotificationType } from 'components/Common/hooks/useNotification'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { useAppSelector } from 'store/hooks'

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
                .catch((err: unknown) => {
                    if (axios.isAxiosError(err)) {
                        setError('Failed to load image: ' + err.message)
                    } else {
                        setError('Failed to load image')
                    }
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
                        Authorization: `Bearer ${jwtToken ?? ''}`
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
                .catch((error: unknown) => {
                    console.error('Error loading Magazine cover image:', error)
                    setError('Failed to load the cover image. Please try again later.')
                    setIsLoading(false) // Stop loading even in case of an error
                })
        }
    }, [issn, jwtToken])

    return { image, isLoading, error }
}

export const useMagazines = () => {
    const [magazines, setMagazines] = useState<Magazine[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { showNotification } = useNotificationContext()
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)

    useEffect(() => {
        if (!userJwt) return // Skip if JWT is not available
        const fetchMagazines = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await axios.get<Magazine[]>(RESOURCES_MAGAZINE_URL, {
                    headers: { Authorization: `Bearer ${userJwt}` }
                })
                setMagazines(response.data)
            } catch (err) {
                console.error('Error fetching magazines:', err)
                setError(err instanceof Error ? err.message : 'An unknown error occurred')
            } finally {
                setLoading(false)
            }
        }
        void fetchMagazines()
    }, [userJwt]) // Depend on userJwt to refetch when it changes

    // Function to add a new magazine to the list
    const addMagazine = (newMagazine: Magazine) => {
        setMagazines((prevMagazines) => [...prevMagazines, newMagazine])
    }

    // Function to remove a magazine from the list
    const removeMagazine = async (magazine: Magazine): Promise<void> => {
        try {
            // Make the API call to remove the magazine
            await axios.delete(`${RESOURCES_MAGAZINE_URL}/${magazine.issn}`, {
                headers: { Authorization: `Bearer ${userJwt ?? ''}` }
            })

            // Remove the magazine from the state
            setMagazines((prevMagazines) => prevMagazines.filter((m) => m.issn !== magazine.issn))

            // Optionally, show a notification here (you can replace this with your own notification handler)
            showNotification('Revista eliminada exitosamente', NotificationType.Success)
        } catch (error) {
            console.error('Error removing magazine:', error)
            // Optionally handle the error (e.g., show an error notification)
        }
    }

    return { magazines, loading, error, addMagazine, removeMagazine }
}

export const useFetchBooks = () => {
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const { showNotification } = useNotificationContext()
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)

    useEffect(() => {
        const fetchBooks = async () => {
            if (!userJwt) {
                setError('No JWT provided')
                return
            }

            setLoading(true)
            setError(null)
            try {
                const response = await axios.get<Book[]>(RESOURCES_BOOK_URL, {
                    headers: { Authorization: `Bearer ${userJwt}` }
                })
                setBooks(response.data)
            } catch (error) {
                setError('Error fetching books')
                console.error('Error fetching books:', error)
            } finally {
                setLoading(false)
            }
        }

        void fetchBooks()
    }, [userJwt])

    // Function to add a new book to the list
    const addBook = (newBook: Book) => {
        setBooks((prevMagazines) => [...prevMagazines, newBook])
    }

    const removeBook = async (book: Book): Promise<void> => {
        try {
            // Make the API call to remove the book (you may need to adjust this to your actual endpoint)
            await axios.delete(`${RESOURCES_BOOK_URL}/${book.isbn}`, {
                headers: { Authorization: `Bearer ${userJwt ?? ''}` }
            })

            // Remove the book from the state
            setBooks((prevBooks) => prevBooks.filter((b) => b.isbn !== book.isbn))
            showNotification('Libro eliminado exitosamente', NotificationType.Success)
        } catch (error) {
            console.error('Error removing book:', error)
        }
    }

    return { books, loading, error, addBook, removeBook }
}

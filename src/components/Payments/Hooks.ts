import axios, { AxiosError } from 'axios'
import { ReceivedCreatedPayment } from 'components/Types/Types'
import { useState } from 'react'
import { PAYMENT_URL } from 'resources/server_urls'
import { useAppSelector } from 'store/hooks'

export const useCancelPayment = () => {
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<AxiosError | null>(null)

    const cancelPayment = async (paymentId: string) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.patch<ReceivedCreatedPayment>(
                `${PAYMENT_URL}/${paymentId}/cancel`,
                {},
                {
                    headers: { Authorization: `Bearer ${userJwt}` },
                    signal: AbortSignal.timeout(5000) // Auto-cancel after 5s
                }
            )
            return Promise.resolve(response.data)
        } catch (err) {
            setError(err as AxiosError)
            return Promise.reject(err)
        } finally {
            setIsLoading(false)
        }
    }

    return { cancelPayment, isLoading, error }
}

export const useConfirmPayment = () => {
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<AxiosError | null>(null)

    const confirmPayment = async (paymentId: string) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.patch<ReceivedCreatedPayment>(
                `${PAYMENT_URL}/${paymentId}/pay`,
                {},
                {
                    headers: { Authorization: `Bearer ${userJwt}` }
                }
            )
            return response.data
        } catch (err) {
            setError(err as AxiosError)
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return { confirmPayment, isLoading, error }
}

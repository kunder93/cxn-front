import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { useAppSelector } from 'store/hooks'
import { FederateStateExtendedResponse } from './usersFederateStateData'
import { CONFIR_CANCEL_FEDERATE_URL } from 'resources/server_urls'

export const useFederateActions = () => {
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const confirmCancelFederate = async (userDni: string) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.patch<FederateStateExtendedResponse>(
                CONFIR_CANCEL_FEDERATE_URL,
                { userDni },
                {
                    headers: {
                        Authorization: `Bearer ${userJwt ?? ''}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            return response.data
        } catch (err) {
            const axiosError = err as AxiosError
            setError(axiosError.message)
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return { confirmCancelFederate, isLoading, error }
}

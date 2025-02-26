import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { useAppSelector } from 'store/hooks'
import { FederateStateResponse } from './getFederateState'
import { FEDERATE_USER_URL } from 'resources/server_urls'

export const useFederateRequest = () => {
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<AxiosError | null>(null)

    const submitFederateRequest = async (values: { frontDni: File | null; backDni: File | null; autoRenewal: boolean }) => {
        setIsLoading(true)
        setError(null)

        try {
            const formData = new FormData()
            if (values.frontDni) formData.append('frontDni', values.frontDni)
            if (values.backDni) formData.append('backDni', values.backDni)
            formData.append('autoRenewal', values.autoRenewal.toString())

            const response = await axios.post<FederateStateResponse>(FEDERATE_USER_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userJwt ?? ''}`
                }
            })

            return response.data
        } catch (err) {
            setError(err as AxiosError)
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return { submitFederateRequest, isLoading, error }
}

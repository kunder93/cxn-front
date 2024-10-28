import { useState, useEffect } from 'react'
import axios, { AxiosError } from 'axios'
import { useAppSelector } from '../../../../store/hooks'
import { FEDERATE_USER_URL } from '../../../../resources/server_urls'

export enum FederateState {
    /**
     * The player is federated and can participate in official chess competitions.
     */
    FEDERATE = 'FEDERATE',

    /**
     * The player is not federated and cannot participate in official chess competitions.
     */
    NO_FEDERATE = 'NO_FEDERATE',

    /**
     * The player's federate status is in the process of being updated or renewed.
     */
    IN_PROGRESS = 'IN_PROGRESS'
}

export interface FederateStateResponse {
    state: FederateState
    autoRenew: boolean
    dniLastUpdate: string
}

export const noFederateState: FederateStateResponse = {
    state: FederateState.NO_FEDERATE,
    autoRenew: false,
    dniLastUpdate: ''
}

export const useFederateState = () => {
    const [federateState, setFederateState] = useState<FederateStateResponse>(noFederateState)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    useEffect(() => {
        const fetchFederateState = async () => {
            try {
                const response = await axios.get<FederateStateResponse>(FEDERATE_USER_URL, {
                    headers: {
                        Authorization: `Bearer ${userJwt}`
                    }
                })
                setFederateState(response.data)
            } catch (err) {
                const error = err as AxiosError
                setError('Error fetching federate state: ' + error.message)
            } finally {
                setLoading(false)
            }
        }

        void fetchFederateState()
    }, [userJwt])

    return { federateState, loading, error }
}

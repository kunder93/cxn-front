import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAppSelector } from '../../../../store/hooks'
import { FederateState } from './getFederateState'
import { GET_ALL_FEDERATE_STATE_MEMBERS } from '../../../../resources/server_urls'

export interface FederateStateExtendedResponse {
    dni: string
    state: FederateState
    autoRenew: boolean
    dniLastUpdate: string
}
export interface FederateStateExtendedResponseList {
    federateStateMembersList: FederateStateExtendedResponse[]
}

const useFederateStateUsersData = () => {
    // Estado inicial debe coincidir con la estructura de FederateStateExtendedResponseList
    const [data, setData] = useState<FederateStateExtendedResponseList>({
        federateStateMembersList: []
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)

    useEffect(() => {
        const fetchFederateData = async () => {
            try {
                const response = await axios.get<FederateStateExtendedResponseList>(GET_ALL_FEDERATE_STATE_MEMBERS, {
                    headers: { Authorization: `Bearer ${userJwt}` }
                })
                setData(response.data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
        }

        if (userJwt) {
            void fetchFederateData()
        }
    }, [userJwt])

    return { data, loading, error }
}

export default useFederateStateUsersData

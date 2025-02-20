import axios from 'axios'
import { FederateStateResponse } from 'components/UserProfiles/ChessProfileFederate/Hooks/getFederateState'
import { useEffect, useState } from 'react'
import { FEDERATE_USER_URL } from 'resources/server_urls'
import { useAppSelector } from 'store/hooks'

const useFederateData = (userDni?: string) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [federateData, setFederateData] = useState<FederateStateResponse | null>(null)

    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)

    useEffect(() => {
        if (!userDni || !userJwt) return

        const fetchData = async () => {
            setLoading(true)
            setError(null)

            try {
                const response = await axios.get<FederateStateResponse>(`${FEDERATE_USER_URL}/${userDni}`, {
                    headers: {
                        Authorization: `Bearer ${userJwt}`
                    }
                })
                setFederateData(response.data)
            } catch (err) {
                setError('Error fetching federate data')
            } finally {
                setLoading(false)
            }
        }

        void fetchData() // ✅ Evita el warning de ESLint
    }, [userDni, userJwt])

    return [loading, error, federateData] as const
}

export default useFederateData

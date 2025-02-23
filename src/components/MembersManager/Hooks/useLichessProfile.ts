import axios from 'axios'
import { LichessProfileResponse } from 'components/UserProfiles/ChessProfileLichess/lichess'
import { useEffect, useState } from 'react'
import { LICHESS_PROFILE_URL } from 'resources/server_urls'
import { useAppSelector } from 'store/hooks'

const useLichessProfile = (userDni: string) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [lichessProfile, setLichessProfile] = useState<LichessProfileResponse | null>(null)

    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)

    useEffect(() => {
        if (!userDni || !userJwt) return

        let isMounted = true // Evita actualizar el estado si el componente se desmonta

        const fetchData = async () => {
            setLoading(true)
            setError(null)

            try {
                const response = await axios.get<LichessProfileResponse>(`${LICHESS_PROFILE_URL}/${userDni}`, {
                    headers: {
                        Authorization: `Bearer ${userJwt}`
                    }
                })
                if (isMounted) {
                    setLichessProfile(response.data)
                }
            } catch (err) {
                if (isMounted) {
                    setError('Error fetching federate data')
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        void fetchData()

        return () => {
            isMounted = false
        }
    }, [userDni, userJwt])

    return { loading, error, lichessProfile }
}

export default useLichessProfile

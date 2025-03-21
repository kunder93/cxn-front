import { useEffect, useState } from 'react'
import { emptyLichessProfile, LichessProfileListResponse, LichessProfileResponse } from './lichess'
import { GET_ALL_LICHESS_PROFILES, GET_MY_LICHESS_PROFILE } from '../../../resources/server_urls'
import axios from 'axios'
import { useAppSelector } from '../../../store/hooks'

/**
 * Custom hook to fetch the user's Lichess profile.
 *
 * @returns {{lichessProfile: LichessProfileResponse, loading: boolean, error: string | null}}
 *          Object containing the Lichess profile, loading state, and error state.
 *
 * @example
 * const { lichessProfile, loading, error } = useLichessProfile(userJwt);
 */
export const useLichessProfile = (): { lichessProfile: LichessProfileResponse; loading: boolean; error: string | null } => {
    const [lichessProfile, setLichessProfile] = useState<LichessProfileResponse>(emptyLichessProfile)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)

    useEffect(() => {
        const fetchLichessProfile = async () => {
            try {
                const response = await axios.get<LichessProfileResponse>(GET_MY_LICHESS_PROFILE, {
                    headers: {
                        Authorization: `Bearer ${userJwt ?? ''}`
                    }
                })
                setLichessProfile(response.data)
            } catch (error) {
                setError('Error fetching Lichess profile')
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        if (userJwt) {
            void fetchLichessProfile()
        }
    }, [userJwt])

    return { lichessProfile, loading, error }
}

export const useLichessProfileNow = (fetchNow: number): { lichessProfile: LichessProfileResponse; loading: boolean; error: string | null } => {
    const [lichessProfile, setLichessProfile] = useState<LichessProfileResponse>(emptyLichessProfile)
    const [loading, setLoading] = useState<boolean>(false) // Initially not loading
    const [error, setError] = useState<string | null>(null)
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)

    useEffect(() => {
        const fetchLichessProfile = async () => {
            setLoading(true) // Start loading when the fetch is initiated
            try {
                const response = await axios.get<LichessProfileResponse>(GET_MY_LICHESS_PROFILE, {
                    headers: {
                        Authorization: `Bearer ${userJwt ?? ''}`
                    }
                })
                setLichessProfile(response.data)
            } catch (error) {
                setError('Error fetching Lichess profile')
                console.error(error)
            } finally {
                setLoading(false) // Stop loading when the fetch is complete
            }
        }

        if (userJwt && fetchNow) {
            void fetchLichessProfile()
        }
    }, [userJwt, fetchNow]) // Fetch profile whenever fetchNow changes

    return { lichessProfile, loading, error }
}

/**
 * Custom hook to fetch the list of Lichess profiles.
 *
 * @returns {{players: LichessProfileListResponse, loading: boolean, error: string | null}}
 *          Object containing the list of Lichess profiles, loading state, and error state.
 *
 * @example
 * const { players, loading, error } = useLichessProfiles(userJwt);
 */
export const useLichessProfiles = (myLichessProfile: LichessProfileResponse) => {
    const [players, setPlayers] = useState<LichessProfileListResponse>({ profilesList: [] })
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)

    useEffect(() => {
        const fetchLichessProfiles = async () => {
            try {
                const response = await axios.get<LichessProfileListResponse>(GET_ALL_LICHESS_PROFILES, {
                    headers: {
                        Authorization: `Bearer ${userJwt ?? ''}`
                    }
                })
                setPlayers(response.data)
            } catch (error) {
                setError('Error fetching Lichess profiles')
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        if (userJwt) {
            void fetchLichessProfiles()
        }
    }, [myLichessProfile, userJwt])

    return { players, loading, error }
}

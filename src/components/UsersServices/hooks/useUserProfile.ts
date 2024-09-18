import { useEffect, useState } from 'react'
import axios from 'axios'
import { UserProfile } from '../../../store/types/userTypes'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setUserProfile } from '../../../store/slices/user'
import { GET_USER_PROFILE_URL } from './../../../resources/server_urls'

const useUserProfile = () => {
    const userJwt = useAppSelector((state) => state.users.jwt)
    const dispatch = useAppDispatch()
    const [userProfile, setUserProfileState] = useState<UserProfile | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (userJwt) {
            const fetchUserProfile = async () => {
                try {
                    const response = await axios.get<UserProfile>(GET_USER_PROFILE_URL, {
                        headers: {
                            Authorization: `Bearer ${userJwt}`,
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }
                    })
                    const profile = response.data
                    setUserProfileState(profile)
                    dispatch(setUserProfile(profile))
                } catch (error) {
                    setError('Error al obtener datos del usuario')
                    console.error('Error al obtener datos del usuario', error)
                }
            }
            void fetchUserProfile()
        }
    }, [userJwt, dispatch])

    return { userProfile, error }
}

export default useUserProfile

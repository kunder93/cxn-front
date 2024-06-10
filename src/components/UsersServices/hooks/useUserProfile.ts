import { useEffect, useState } from 'react'
import axios from 'axios'
import { UserProfile } from '../../../store/types/userTypes'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setUserProfile } from '../../../store/slices/user'

const useUserProfile = () => {
    const userJwt = useAppSelector((state) => state.users.jwt)
    const dispatch = useAppDispatch()
    const [userProfile, setUserProfileState] = useState<UserProfile | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (userJwt) {
            const fetchUserProfile = async () => {
                try {
                    const response = await axios.get<UserProfile>('https://xadreznaron.es:4443/api/user', {
                        headers: {
                            Authorization: `Bearer ${userJwt}`,
                            'Access-Control-Allow-Origin': '*' //  CORS
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

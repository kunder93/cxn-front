import axios from 'axios'
import { useEffect, useState } from 'react'
import { GET_ALL_USERS_URL } from 'resources/server_urls'
import { useAppSelector } from 'store/hooks'
import { UserData } from 'store/types/userTypes'

interface usersAxiosValue {
    usersList: UserData[]
}

export const useGetAllUsers = () => {
    const [users, setUsers] = useState<UserData[]>([])
    const [loadedUsers, setLoadedUsers] = useState<boolean>(false)
    const [loadUsersError, setLoadUsersError] = useState<boolean>(false)
    const userJwt = useAppSelector<string>((state) => state.users.jwt)

    useEffect(() => {
        axios
            .get<usersAxiosValue>(GET_ALL_USERS_URL, {
                headers: { Authorization: `Bearer ${userJwt}` }
            })
            .then((response) => {
                setUsers(response.data.usersList)
                setLoadedUsers(true)
            })
            .catch(() => {
                setLoadUsersError(true)
            })
    }, [userJwt])

    return { users, loadedUsers, loadUsersError }
}

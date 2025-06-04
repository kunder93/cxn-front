import axios from 'axios'
import { useEffect, useState } from 'react'
import { GET_ALL_USERS_URL } from 'resources/server_urls'
import { useAppSelector } from 'store/hooks'
import { UserData } from 'store/types/userTypes'

/**
 * Interface for the expected response from the `GET_ALL_USERS_URL` endpoint.
 */
interface UsersAxiosValue {
    /** List of all users returned from the backend */
    usersList: UserData[]
}

/**
 * Custom React hook to fetch all users from the backend API.
 *
 * This hook performs a GET request to the `GET_ALL_USERS_URL` endpoint using the
 * authenticated user's JWT token and returns the list of users along with loading and error state.
 *
 * @returns An object containing:
 * - `users`: The list of users returned from the API.
 * - `loadedUsers`: A boolean flag indicating whether the data was successfully loaded.
 * - `loadUsersError`: A boolean flag indicating whether there was an error during the fetch.
 *
 * @example
 * ```tsx
 * const { users, loadedUsers, loadUsersError } = useGetAllUsers();
 * ```
 */
export const useGetAllUsers = () => {
    const [users, setUsers] = useState<UserData[]>([])
    const [loadedUsers, setLoadedUsers] = useState<boolean>(false)
    const [loadUsersError, setLoadUsersError] = useState<boolean>(false)
    const userJwt = useAppSelector<string>((state) => state.users.jwt)

    useEffect(() => {
        axios
            .get<UsersAxiosValue>(GET_ALL_USERS_URL, {
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

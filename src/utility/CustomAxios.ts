import axios, { AxiosRequestConfig, Method, AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import {
    CHESS_QUESTION_URL,
    CHANGE_MEMBER_EMAIL_URL,
    CHANGE_MEMBER_ROLES_URL,
    CHANGE_KIND_MEMBER_URL,
    GET_SUBCOUNTRIES_URL,
    GET_ALL_COUNTRIES_URL,
    GET_ALL_USERS_URL,
    GET_ALL_TOURNAMENT_PARTICIPANTS,
    GET_ALL_USERS_PAYMENTS_URL,
    GET_USER_PAYMENTS_URL,
    GET_USER_PROFILE_URL
} from '../resources/server_urls'
import { LoginFormValues } from '../components/LoginForm'
import { ChangeKindMemberValues } from '../components/MembersManager/ChangeKindMember/ChangeKindMemberForm'
import { ChangeMemberRolesValues } from '../components/MembersManager/ChangeMemberRole/ChangeMemberRolesForm'
import { ChangeEmailAxiosValues } from '../components/MyProfile/ChangeEmail/ChangeUserEmailResultAlert'
import {
    IBook,
    ICountryData,
    IPaymentDetails,
    ISubCountryData,
    ITournamentParticipant,
    IUsersListData,
    IUsersListPaymentsData
} from '../components/Types/Types'
import { UserProfile } from '../store/types/userTypes'
import { useAppSelector } from './../store/hooks'

interface AxiosResponseData<T> {
    data: T | null
    loaded: boolean
    error: AxiosError | null
}

const useAxios = <T>(url: string, method: Method = 'GET', payload?: unknown) => {
    const userJwt = useAppSelector<string>((state) => state.users.jwt)
    const [response, setResponse] = useState<AxiosResponseData<T>>({
        data: null,
        loaded: false,
        error: null
    })

    useEffect(() => {
        const fetchData = async () => {
            if (payload === null) return
            try {
                const axiosConfig: AxiosRequestConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        ...(userJwt && { Authorization: 'Bearer ' + userJwt })
                    },
                    method,
                    url,
                    data: payload
                }
                // No necesitas incluir el cuerpo de la solicitud si es DELETE
                if (method === 'DELETE') {
                    delete axiosConfig.data
                }
                const result = await axios(axiosConfig)
                setResponse({ data: result.data as T, loaded: true, error: null })
            } catch (error) {
                const axiosError = error as AxiosError
                setResponse({ data: null, loaded: true, error: axiosError })
            }
        }
        void fetchData()
    }, [url, method, payload, userJwt])

    return response
}

export interface IChessQuestion {
    id: number
    email: string
    category: string
    topic: string
    message: string
    date: Date
    seen: boolean
}

export interface IChessQuestionsList {
    chessQuestionList: IChessQuestion[]
}

export interface SubCountriesListAxiosResponse {
    subCountryList: ISubCountryData[]
}

export interface BooksAxiosResponse {
    bookList: IBook[]
}

export interface CountriesListAxiosResponse {
    countryList: ICountryData[]
}

export const useAxiosGetChessQuestions = () => {
    return useAxios<IChessQuestionsList>(CHESS_QUESTION_URL)
}

export const useAxiosChangeUserEmail = (payload: ChangeEmailAxiosValues) => {
    return useAxios<UserProfile>(CHANGE_MEMBER_EMAIL_URL, 'PATCH', payload)
}

export const useAxiosChangeMemberRoles = (payload: ChangeMemberRolesValues) => {
    return useAxios<UserProfile>(CHANGE_MEMBER_ROLES_URL, 'PATCH', payload)
}

export const useAxiosChangeKindMember = (payload: ChangeKindMemberValues) => {
    return useAxios<UserProfile>(CHANGE_KIND_MEMBER_URL, 'PATCH', payload)
}

export const useAxiosGetSubCountriesList = (countryNumericCode: number) => {
    return useAxios<SubCountriesListAxiosResponse>(`${GET_SUBCOUNTRIES_URL}/${countryNumericCode.toString()}`)
}

export const useAxiosGetCountriesList = () => {
    return useAxios<CountriesListAxiosResponse>(GET_ALL_COUNTRIES_URL)
}

export const useAxiosPostLogin = (url: string, payload: LoginFormValues) => {
    return useAxios<string>(url, 'POST', payload)
}

export const useAxiosGetAllUsersData = () => {
    return useAxios<IUsersListData>(GET_ALL_USERS_URL)
}

export const useAxiosGetAllTournamentParticipants = () => {
    return useAxios<ITournamentParticipant[]>(GET_ALL_TOURNAMENT_PARTICIPANTS)
}

export const useAxiosGetBooks = (url: string) => {
    return useAxios<BooksAxiosResponse>(url)
}

export const useAxiosGetAllMembersPaymentsData = () => {
    return useAxios<IUsersListPaymentsData>(GET_ALL_USERS_PAYMENTS_URL)
}

export const useAxiosGetUserPayments = (userDni: string) => {
    return useAxios<IPaymentDetails[]>(GET_USER_PAYMENTS_URL + userDni)
}

export const useAxiosGetUserData = (userDni: string) => {
    const [data, setData] = useState<UserProfile | null>(null)
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const userJwt = useAppSelector<string>((state) => state.users.jwt)
    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try {
                const response = await axios.get<UserProfile>(`${GET_USER_PROFILE_URL}/${userDni}`, {
                    headers: { Authorization: 'Bearer ' + userJwt }
                })
                if (isMounted) {
                    setData(response.data)
                    setLoaded(true)
                }
            } catch (err) {
                if (isMounted) {
                    setError(err as Error)
                    setLoaded(true)
                }
            }
        }

        setLoaded(false)
        setError(null)
        void fetchData()

        return () => {
            isMounted = false
        }
    }, [userDni, userJwt]) // Ensure userDni is in dependency array

    return { data, loaded, error }
}

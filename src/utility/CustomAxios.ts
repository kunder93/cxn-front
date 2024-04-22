import axios from 'axios'
import { useEffect, useState } from 'react'
import { IBook, ICountryData, IInvoice, IPaymentSheet, ISubCountryData, IUserData, IUsersListData } from '../components/Types/Types'
import { CHANGE_KIND_MEMBER_URL, GET_ALL_COUNTRIES_URL, GET_SUBCOUNTRIES_URL } from '../resources/server_urls'
import { ICompany } from '../components/Companies/Types'
import { LoginFormValues } from '../components/LoginForm'
import { ChangeKindMemberFormData } from 'components/MembersManager/ChangeKindMemberForm'

interface companiesAxiosResponse {
    companiesList: ICompany[]
}

interface invoicesAxiosResponse {
    invoicesList: IInvoice[]
}

interface booksAxiosResponse {
    bookList: IBook[]
}

interface paymentSheetsAxiosResponse {
    paymentSheetsList: IPaymentSheet[]
}

export const useAxiosGetCompanies = (url: string) => {
    const [data, setData]: [companiesAxiosResponse, (data: companiesAxiosResponse) => void] = useState<companiesAxiosResponse>({ companiesList: [] })
    const [loaded, setLoaded]: [boolean, (loading: boolean) => void] = useState<boolean>(false)
    const [error, setError]: [string, (error: string) => void] = useState('')

    useEffect(() => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // Asegúrate de que coincida con la configuración de CORS en el backend
            }
        }
        axios
            .get(url, axiosConfig)
            .then((response) => setData(response.data as companiesAxiosResponse))
            .catch((error: string) => setError(error))
            .finally(() => setLoaded(true))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { data, error, loaded }
}

export const useAxiosGetInvoices = (url: string) => {
    const [data, setData]: [invoicesAxiosResponse, (data: invoicesAxiosResponse) => void] = useState<invoicesAxiosResponse>({ invoicesList: [] })
    const [loaded, setLoaded]: [boolean, (loading: boolean) => void] = useState<boolean>(false)
    const [error, setError]: [string, (error: string) => void] = useState('')

    useEffect(() => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // Asegúrate de que coincida con la configuración de CORS en el backend
            }
        }
        axios
            .get(url, axiosConfig)
            .then((response) => setData(response.data as invoicesAxiosResponse))
            .catch((error: string) => setError(error))
            .finally(() => setLoaded(true))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { data, error, loaded }
}

export const useAxiosGetBooks = (url: string) => {
    const [data, setData]: [booksAxiosResponse, (data: booksAxiosResponse) => void] = useState<booksAxiosResponse>({ bookList: [] })
    const [loaded, setLoaded]: [boolean, (loading: boolean) => void] = useState<boolean>(false)
    const [error, setError]: [string, (error: string) => void] = useState('')

    useEffect(() => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // Asegúrate de que coincida con la configuración de CORS en el backend
            }
        }
        axios
            .get(url, axiosConfig)
            .then((response) => setData(response.data as booksAxiosResponse))
            .catch((error: string) => setError(error))
            .finally(() => setLoaded(true))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { data, error, loaded }
}

export const useAxiosGetPaymentSheets = (url: string) => {
    const [data, setData]: [paymentSheetsAxiosResponse, (data: paymentSheetsAxiosResponse) => void] = useState<paymentSheetsAxiosResponse>({
        paymentSheetsList: []
    })
    const [loaded, setLoaded]: [boolean, (loading: boolean) => void] = useState<boolean>(false)
    const [error, setError]: [string, (error: string) => void] = useState('')

    useEffect(() => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // Asegúrate de que coincida con la configuración de CORS en el backend
            }
        }
        axios
            .get(url, axiosConfig)
            .then((response) => {
                setData(response.data as paymentSheetsAxiosResponse)
            })
            .catch((error: string) => setError(error))
            .finally(() => setLoaded(true))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { data, error, loaded }
}

export const useAxiosGetAllUsersData = (url: string) => {
    const [data, setData]: [IUsersListData, (data: IUsersListData) => void] = useState<IUsersListData>({ usersList: [] })
    const [loaded, setLoaded]: [boolean, (loading: boolean) => void] = useState<boolean>(false)
    const [error, setError]: [string, (error: string) => void] = useState('')

    useEffect(() => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // Asegúrate de que coincida con la configuración de CORS en el backend
            }
        }
        axios
            .get(url, axiosConfig)
            .then((response) => {
                setData(response.data as IUsersListData)
            })
            .catch((error: string) => setError(error))
            .finally(() => setLoaded(true))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { data, error, loaded }
}

export const useAxiosPostLogin = (url: string, payload: LoginFormValues) => {
    const [data, setData]: [string, (data: string) => void] = useState<string>('')
    const [loaded, setLoaded]: [boolean, (loading: boolean) => void] = useState<boolean>(false)
    const [error, setError]: [string, (error: string) => void] = useState('')

    useEffect(() => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // Asegúrate de que coincida con la configuración de CORS en el backend
            }
        }
        axios
            .post(url, payload, axiosConfig)
            .then((response) => setData(response.data as string))
            .catch((error: string) => setError(error))
            .finally(() => setLoaded(true))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { data, error, loaded }
}

interface countriesListAxiosResponse {
    countryList: ICountryData[]
}

export const useAxiosGetCountriesList = () => {
    const [data, setData] = useState<countriesListAxiosResponse>({
        countryList: []
    })
    const [loaded, setLoaded]: [boolean, (loading: boolean) => void] = useState<boolean>(false)
    const [error, setError]: [string, (error: string) => void] = useState('')

    useEffect(() => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // Asegúrate de que coincida con la configuración de CORS en el backend
            }
        }
        axios
            .get<countriesListAxiosResponse>(GET_ALL_COUNTRIES_URL, axiosConfig)
            .then((response) => setData(response.data))
            .catch((error: string) => setError(error))
            .finally(() => setLoaded(true))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { data, error, loaded }
}

interface subCountriesListAxiosResponse {
    subCountryList: ISubCountryData[]
}

export const useAxiosGetSubCountriesList = (countryNumericCode: number) => {
    const [data, setData] = useState<subCountriesListAxiosResponse>({
        subCountryList: []
    })
    const [loaded, setLoaded]: [boolean, (loading: boolean) => void] = useState<boolean>(false)
    const [error, setError]: [string, (error: string) => void] = useState('')

    useEffect(() => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // Asegúrate de que coincida con la configuración de CORS en el backend
            }
        }
        axios
            .get<subCountriesListAxiosResponse>(GET_SUBCOUNTRIES_URL + '/' + countryNumericCode, axiosConfig)
            .then((response) => setData(response.data))
            .catch((error: string) => setError(error))
            .finally(() => setLoaded(true))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { data, error, loaded }
}

export const useAxiosChangeKindMember = (payload: ChangeKindMemberFormData) => {
    const [data, setData] = useState<IUserData>()
    const [loaded, setLoaded]: [boolean, (loading: boolean) => void] = useState<boolean>(false)
    const [error, setError]: [string, (error: string) => void] = useState('')
    useEffect(() => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' //coincide con configuración de CORS en el backend
            }
        }
        axios
            .patch<IUserData>(CHANGE_KIND_MEMBER_URL, payload, axiosConfig)
            .then((response) => setData(response.data))
            .catch((error: string) => setError(error))
            .finally(() => setLoaded(true))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { data, error, loaded }
}

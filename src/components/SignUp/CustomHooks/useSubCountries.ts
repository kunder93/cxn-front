import axios from 'axios'
import { ISubCountriesList } from '../../../components/Types/Types'
import { useEffect, useState } from 'react'
import { GET_SUBCOUNTRIES_URL } from '../../../resources/server_urls'

const useSubCountries = (countryNumber?: number) => {
    const [subCountriesList, setSubCountriesList] = useState<ISubCountriesList>({ subCountryList: [] })
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true
        if (countryNumber) {
            setLoading(true)
            setError(null)

            const fetchSubCountries = async () => {
                try {
                    const response = await axios.get<ISubCountriesList>(`${GET_SUBCOUNTRIES_URL}/${countryNumber}`)
                    if (isMounted) {
                        setSubCountriesList(response.data)
                    }
                } catch (error) {
                    if (isMounted) {
                        setError('Error fetching subcountries')
                    }
                } finally {
                    if (isMounted) {
                        setLoading(false)
                    }
                }
            }

            void fetchSubCountries()
        }

        return () => {
            isMounted = false
        }
    }, [countryNumber])

    return { subCountriesList, loading, error }
}

export default useSubCountries

import { useNavigate } from 'react-router'
import { AxiosErrorResponseData, SignUpFormValues, UserFormData } from '../SignUpFormTypes'
import { FormikHelpers } from 'formik'
import { ROUTES } from '../../../resources/routes-constants'
import { SIGN_UP_URL } from '../../../resources/server_urls'
import axios, { AxiosError } from 'axios'

const useFormSubmit = (setAlertMessage: React.Dispatch<React.SetStateAction<string>>) => {
    const navigate = useNavigate()

    const handleSubmit = async (values: SignUpFormValues, actions: FormikHelpers<SignUpFormValues>) => {
        const userData: UserFormData = {
            email: values.email,
            password: values.password,
            dni: values.dni,
            name: values.name,
            firstSurname: values.firstSurname,
            secondSurname: values.secondSurname,
            gender: values.gender,
            birthDate: values.birthDate,
            postalCode: values.postalCode,
            apartmentNumber: values.apartmentNumber,
            building: values.building,
            street: values.street,
            city: values.city,
            countryNumericCode: values.countryNumericCode,
            countrySubdivisionName: values.countrySubdivisionName
        }

        try {
            await axios.post<UserFormData>(SIGN_UP_URL, userData)
            navigate(ROUTES.HOMEPAGE_ROUTE)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<AxiosErrorResponseData>
                const errorMessage =
                    axiosError.response?.data?.content ??
                    (axiosError.request ? 'Error: no hay respuesta.' : 'Error: algo inesperado. Recarga o intentalo más tarde.')
                setAlertMessage(errorMessage)
            } else {
                setAlertMessage('Error: algo inesperado. Recarga o intentalo más tarde.')
            }
        } finally {
            actions.setSubmitting(false)
        }
    }

    return handleSubmit
}

export default useFormSubmit

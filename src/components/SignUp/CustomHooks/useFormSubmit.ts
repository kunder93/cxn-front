import { useNavigate } from 'react-router'
import { AxiosErrorResponseData, SignUpFormValues, UserFormData } from '../SignUpFormTypes'
import { FormikHelpers } from 'formik'
import { ROUTES } from '../../../resources/routes-constants'
import { SIGN_UP_URL } from '../../../resources/server_urls'
import axios, { AxiosError } from 'axios'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { NotificationType } from 'components/Common/hooks/useNotification'

const useFormSubmit = () => {
    const navigate = useNavigate()
    const { showNotification } = useNotificationContext()

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
            const response = await axios.post<UserFormData>(SIGN_UP_URL, userData)
            // Ensure successful response before proceeding
            if (response.status >= 200 && response.status < 300) {
                // Navigate first to avoid UI flickering
                await navigate(ROUTES.HOMEPAGE_ROUTE)
                showNotification('¡Registro exitoso!', NotificationType.Success)
                // Show notification after navigation
            }
        } catch (error) {
            let errorMessage = 'Error: algo inesperado. Recarga o intentalo más tarde.'

            if (axios.isAxiosError(error)) {
                // Type the error response explicitly
                const axiosError = error as AxiosError<AxiosErrorResponseData>
                // Type-safe access with optional chaining and type guard
                const serverError = typeof axiosError.response?.data.content === 'string' ? axiosError.response.data.content : undefined
                errorMessage = serverError ?? (axiosError.request ? 'Error: no hay respuesta del servidor.' : 'Error: algo inesperado')
            }
            showNotification(errorMessage, NotificationType.Error)
        } finally {
            actions.setSubmitting(false)
        }
    }
    return handleSubmit
}

export default useFormSubmit

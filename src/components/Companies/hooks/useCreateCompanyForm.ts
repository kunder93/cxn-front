import { useFormik, FormikProps } from 'formik'
import axios, { AxiosError } from 'axios'
import { COMPANIES_URL } from '../../../resources/server_urls'
import { CreateCompanyValidationSchema } from '../../../pages/validation/FormValidationSchemas'
import { CreateCompanyFormValues, ICompany } from '../Types'
import { useNotificationContext } from '../../../components/Common/NotificationContext'
import { NotificationType } from '../../../components/Common/hooks/useNotification'
import { useAppSelector } from '../../../store/hooks' // Asumiendo que este hook selecciona datos del estado

export const useCreateCompanyForm = (updateCompaniesList: (newCompany: ICompany) => void): FormikProps<CreateCompanyFormValues> => {
    const initialValues: CreateCompanyFormValues = { nif: '', name: '', address: '' }
    const { showNotification } = useNotificationContext()
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt) // Obtener el JWT del estado

    return useFormik({
        initialValues,
        validationSchema: CreateCompanyValidationSchema,
        validateOnChange: true,
        validateOnMount: true,
        onSubmit: async (values, actions) => {
            try {
                // Verificar si userJwt existe
                if (!userJwt) {
                    showNotification('Usuario no autenticado', NotificationType.Error)
                    actions.setStatus({ error: 'Usuario no autenticado' })
                    actions.setSubmitting(false)
                    return
                }

                const response = await axios.post<ICompany>(COMPANIES_URL, values, {
                    headers: {
                        Authorization: `Bearer ${userJwt}`, // Incluir el token JWT en la cabecera
                        'Content-Type': 'application/json'
                    }
                })
                showNotification('Empresa registrada con éxito.', NotificationType.Success)
                updateCompaniesList(response.data)
                actions.setStatus({ success: true })
                actions.resetForm()
            } catch (error) {
                const axiosError = error as AxiosError
                let alertMessage = 'Error: algo inesperado. Recarga o intentalo más tarde.'
                showNotification(axiosError.message, NotificationType.Error)
                if (axiosError.response?.data) {
                    // Verificar si el error tiene un mensaje personalizado
                    const responseData = axiosError.response.data as { message?: string }
                    if (responseData.message) {
                        alertMessage = responseData.message
                    } else {
                        alertMessage = axiosError.message
                    }
                } else if (axiosError.request) {
                    alertMessage = 'Error: no hay respuesta.'
                }
                actions.setStatus({ error: alertMessage })
            }
            actions.setSubmitting(false)
        }
    })
}

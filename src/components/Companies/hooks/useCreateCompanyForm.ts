import { useFormik, FormikProps } from 'formik'
import axios, { AxiosError } from 'axios'
import { COMPANIES_URL } from '../../../resources/server_urls'
import { CreateCompanyValidationSchema } from '../../../pages/validation/FormValidationSchemas'
import { CreateCompanyFormValues, ICompany } from '../Types'

export const useCreateCompanyForm = (updateCompaniesList: (newCompany: ICompany) => void): FormikProps<CreateCompanyFormValues> => {
    const initialValues: CreateCompanyFormValues = { nif: '', name: '', address: '' }

    return useFormik({
        initialValues,
        validationSchema: CreateCompanyValidationSchema,
        validateOnChange: true,
        validateOnMount: true,
        onSubmit: async (values, actions) => {
            try {
                const response = await axios.post<ICompany>(COMPANIES_URL, values)
                updateCompaniesList(response.data)
                actions.setStatus({ success: true })
            } catch (error) {
                const axiosError = error as AxiosError
                let alertMessage = 'Error: algo inesperado. Recarga o intentalo más tarde.'

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

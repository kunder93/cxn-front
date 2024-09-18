import { useFormik, FormikProps } from 'formik'
import axios, { AxiosError } from 'axios'
import { INVOICES_URL } from '../../../resources/server_urls'
import { IInvoice } from '../../../components/Types/Types'
import { CreateInvoiceValidationSchema } from '../../../pages/validation/FormValidationSchemas'
import { useNotificationContext } from '../../../components/Common/NotificationContext'
import { NotificationType } from '../../../components/Common/hooks/useNotification'


export const useCreateInvoiceForm = (updateInvoicesList: (newInvoice: IInvoice) => void): FormikProps<IInvoice> => {
    const { showNotification } = useNotificationContext()
    const initialValues: IInvoice = {
        number: 0,
        series: '',
        expeditionDate: new Date(),
        advancePaymentDate: new Date(),
        taxExempt: false,
        sellerNif: '',
        buyerNif: ''
    }
    return useFormik({
        initialValues,
        validationSchema: CreateInvoiceValidationSchema,
        validateOnChange: true,
        validateOnMount: true,
        onSubmit: async (values, actions) => {
            try {
                const response = await axios.post<IInvoice>(INVOICES_URL, values)
                showNotification('La factura se ha añadido correctamente.', NotificationType.Success)
                updateInvoicesList(response.data)
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

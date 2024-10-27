import { withFormik } from 'formik'
import * as Yup from 'yup'
import InnerForm, { EmailChangeFormProps, ChangeEmailFormValues } from './InnerForm'

const validationSchema = Yup.object().shape({
    newEmail: Yup.string().required('Debes ingresar un nuevo email').email('Debe ser un email válido').min(4, 'El email debe tener al menos 4 caracteres'),
    confirmNewEmail: Yup.string()
        .required('Debes confirmar el nuevo email')
        .oneOf([Yup.ref('newEmail')], 'Los emails no coinciden')
})

const ChangeEmailForm = withFormik<EmailChangeFormProps, ChangeEmailFormValues>({
    mapPropsToValues: ({ initialEmail }) => ({
        currentEmail: initialEmail,
        newEmail: '',
        confirmNewEmail: ''
    }),
    validationSchema: validationSchema,
    handleSubmit: (values, { setSubmitting, resetForm }) => {
        console.log(values)
        setSubmitting(false)
        resetForm()
    },
    validateOnMount: true
})(InnerForm)

export default ChangeEmailForm

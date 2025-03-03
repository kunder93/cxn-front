import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { Formik, Form, FormikState, FormikErrors, FormikTouched } from 'formik'
import axios from 'axios'
import { Form as BootstrapForm, Spinner } from 'react-bootstrap'
import { dniValidationSchema } from './DniFilesValidation'
import { ButtonsWrapper, ResetButton, SubmitButton } from './Common/styles'
import { DniPreviewRow, FileInput } from './Common/FormComponents'
import { NotificationType } from 'components/Common/hooks/useNotification'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { FederateStateResponse } from '../Hooks/getFederateState'
import { UPDATE_DNI_URL } from 'resources/server_urls'
import { useAppSelector } from 'store/hooks'

// Tipo de los archivos a enviar
interface DniFormValues {
    frontDni: File | null
    backDni: File | null
}

interface UpdateDniRequestFormProps {
    setFederateState: Dispatch<SetStateAction<FederateStateResponse>>
    closeModal: () => void
}

const UpdateDniForm = ({ setFederateState, closeModal }: UpdateDniRequestFormProps): React.JSX.Element => {
    const [frontDniPreview, setFrontDniPreview] = useState<string | null>(null)
    const [backDniPreview, setBackDniPreview] = useState<string | null>(null)
    const frontDniInputRef = useRef<HTMLInputElement | null>(null)
    const backDniInputRef = useRef<HTMLInputElement | null>(null)
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const { showNotification } = useNotificationContext()
    const initialValues: DniFormValues = { frontDni: null, backDni: null }

    const handleSubmit = (values: DniFormValues) => {
        const formData = new FormData()
        if (values.frontDni) {
            formData.append('frontDni', values.frontDni)
        }
        if (values.backDni) {
            formData.append('backDni', values.backDni)
        }

        axios
            .patch<FederateStateResponse>(UPDATE_DNI_URL, formData, {
                headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${userJwt ?? ''}` }
            })
            .then((response) => {
                setFederateState(response.data)
                closeModal()
                showNotification('El DNI se ha actualizado correctamente.', NotificationType.Success)
            })
            .catch((error: unknown) => {
                if (axios.isAxiosError(error)) {
                    showNotification('Ha sucedido un error: ' + error.message, NotificationType.Error)
                } else {
                    showNotification('Ha sucedido un error inesperado. ', NotificationType.Error)
                }
            })
    }

    const resetFormAndImages = (resetForm: (nextState?: Partial<FormikState<DniFormValues>>) => void) => {
        resetForm()
        setFrontDniPreview(null)
        setBackDniPreview(null)
        // reset file fields
        if (frontDniInputRef.current) {
            frontDniInputRef.current.value = ''
        }
        if (backDniInputRef.current) {
            backDniInputRef.current.value = ''
        }
    }

    const handleImagePreview = (file: File, setPreview: (value: string | null) => void) => {
        const reader = new FileReader()
        reader.onload = () => {
            setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: File | null, shouldValidate?: boolean) => Promise<void>,
        setTouched: (touched: FormikTouched<DniFormValues>) => void,
        validateForm: () => Promise<FormikErrors<DniFormValues>>,
        field: keyof DniFormValues,
        setPreview: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
        const file = event.currentTarget.files?.[0] ?? null
        void setFieldValue(field, file).then(() => {
            setTouched({ [field]: true })
            void validateForm().then((validationErrors: FormikErrors<DniFormValues>) => {
                if (file && !validationErrors[field]) {
                    handleImagePreview(file, setPreview)
                }
            })
        })
    }
    return (
        <>
            <span> Máximo 10MB y 2000x2000 píxeles.</span>
            <Formik
                initialValues={initialValues}
                validationSchema={dniValidationSchema}
                onSubmit={handleSubmit}
                validateOnChange
                validateOnMount
                validateOnBlur
            >
                {({ setFieldValue, resetForm, errors, touched, setTouched, validateForm, dirty, isSubmitting, isValid }) => {
                    return (
                        <BootstrapForm as={Form}>
                            <FileInput
                                label="Anverso del DNI:"
                                inputRef={frontDniInputRef}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleFileChange(
                                        event,
                                        setFieldValue as (field: string, value: File | null) => Promise<void>,
                                        () => setTouched, // Pasa `setTouched` directamente
                                        validateForm,
                                        'frontDni',
                                        setFrontDniPreview
                                    )
                                }}
                                isInvalid={!!errors.frontDni && touched.frontDni}
                                errorMessage={errors.frontDni}
                            />

                            <FileInput
                                label="Reverso del DNI:"
                                inputRef={backDniInputRef}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleFileChange(
                                        event,
                                        setFieldValue as (field: string, value: File | null) => Promise<void>,
                                        () => setTouched, // Pasa `setTouched` directamente
                                        validateForm,
                                        'backDni',
                                        setBackDniPreview
                                    )
                                }}
                                isInvalid={!!errors.backDni && touched.backDni}
                                errorMessage={errors.backDni}
                            />

                            <DniPreviewRow
                                frontDniPreview={frontDniPreview}
                                frontDniErrors={errors.frontDni}
                                backDniPreview={backDniPreview}
                                backDniErrors={errors.backDni}
                            />
                            <ButtonsWrapper>
                                <SubmitButton variant="primary" type="submit" disabled={isSubmitting || !isValid || !dirty}>
                                    {isSubmitting ? (
                                        <>
                                            <Spinner animation="border" size="sm" /> Actualizando...
                                        </>
                                    ) : (
                                        'Actualizar DNI'
                                    )}
                                </SubmitButton>
                                <ResetButton
                                    variant="secondary"
                                    onClick={() => {
                                        resetFormAndImages(resetForm)
                                    }}
                                >
                                    Restablecer formulario
                                </ResetButton>
                            </ButtonsWrapper>
                        </BootstrapForm>
                    )
                }}
            </Formik>
        </>
    )
}

export default UpdateDniForm

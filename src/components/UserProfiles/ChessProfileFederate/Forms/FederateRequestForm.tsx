/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { Formik, Form, FormikState, FormikErrors, FormikTouched } from 'formik'
import axios, { AxiosError } from 'axios'
import { Form as BootstrapForm } from 'react-bootstrap'
import { ToggleOff, ToggleOn } from 'react-bootstrap-icons'
import { useAppSelector } from '../../../../store/hooks'
import { FEDERATE_USER_URL } from '../../../../resources/server_urls'
import { FederateStateResponse } from '../Hooks/getFederateState'
import { federateRequestValidationSchema } from '../federateValidations'
import { useNotificationContext } from '../../../Common/NotificationContext'
import { NotificationType } from '../../../Common/hooks/useNotification'
import { ButtonsWrapper, ResetButton, StyledLabel, SubmitButton } from './Common/styles'
import { DniPreviewRow, FileInput } from './Common/FormComponents'

interface DniFormValues {
    frontDni: File | null
    backDni: File | null
    autoRenewal: boolean
}

interface FederateRequestFormProps {
    setFederateState: Dispatch<SetStateAction<FederateStateResponse>>
    closeModal: () => void
}

const FederateRequestForm: React.FC<FederateRequestFormProps> = ({ setFederateState, closeModal }) => {
    const [frontDniPreview, setFrontDniPreview] = useState<string | null>(null)
    const [backDniPreview, setBackDniPreview] = useState<string | null>(null)
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const { showNotification } = useNotificationContext()
    // File inputs refs
    const frontDniInputRef = useRef<HTMLInputElement | null>(null)
    const backDniInputRef = useRef<HTMLInputElement | null>(null)

    const initialValues: DniFormValues = {
        frontDni: null,
        backDni: null,
        autoRenewal: false
    }

    const resetFormAndImages = (resetForm: (nextState?: Partial<FormikState<DniFormValues>> | undefined) => void) => {
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

    const handleSubmit = (values: DniFormValues) => {
        const formData = new FormData()

        if (values.frontDni) {
            formData.append('frontDni', values.frontDni)
        }

        if (values.backDni) {
            formData.append('backDni', values.backDni)
        }
        formData.append('autoRenewal', values.autoRenewal.toString())

        axios
            .post<FederateStateResponse>(FEDERATE_USER_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userJwt}`
                }
            })
            .then((response) => {
                setFederateState(response.data)
                closeModal()
                showNotification('Petición de federarse realizada correctamente, Gracias!', NotificationType.Success)
            })
            .catch((error) => {
                const axiosError = error as AxiosError
                showNotification('Error al subir las imágenes: ' + axiosError.message, NotificationType.Error)
            })
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
        validateForm: () => Promise<any>,
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

            <Formik initialValues={initialValues} validationSchema={federateRequestValidationSchema} onSubmit={handleSubmit}>
                {({ setFieldValue, resetForm, values, errors, touched, setTouched, validateForm }) => {
                    return (
                        <BootstrapForm as={Form}>
                            <FileInput
                                label="Anverso del DNI:"
                                inputRef={frontDniInputRef}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleFileChange(
                                        event,
                                        setFieldValue as (field: string, value: File | null) => Promise<void>,
                                        () => setTouched,
                                        validateForm,
                                        'frontDni',
                                        setFrontDniPreview
                                    )
                                }
                                isInvalid={!!errors.frontDni && touched.frontDni}
                                errorMessage={errors.frontDni}
                            />

                            <FileInput
                                label="Reverso del DNI:"
                                inputRef={backDniInputRef}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleFileChange(
                                        event,
                                        setFieldValue as (field: string, value: File | null) => Promise<void>,
                                        () => setTouched,
                                        validateForm,
                                        'backDni',
                                        setBackDniPreview
                                    )
                                }
                                isInvalid={!!errors.backDni && touched.backDni}
                                errorMessage={errors.backDni}
                            />
                            <BootstrapForm.Group controlId="autoRenewal" className="mt-3">
                                <StyledLabel>Renovación automática</StyledLabel>
                                <div
                                    onClick={() => void setFieldValue('autoRenewal', !values.autoRenewal)}
                                    style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                                >
                                    {values.autoRenewal ? <ToggleOn size={30} /> : <ToggleOff size={30} />}
                                    <span className="ms-2">{values.autoRenewal ? 'Activado' : 'Desactivado'}</span>
                                </div>
                            </BootstrapForm.Group>

                            <DniPreviewRow
                                frontDniPreview={frontDniPreview}
                                frontDniErrors={errors.frontDni}
                                backDniPreview={backDniPreview}
                                backDniErrors={errors.backDni}
                            />
                            <ButtonsWrapper>
                                <SubmitButton variant="success" type="submit">
                                    Enviar
                                </SubmitButton>

                                <ResetButton variant="secondary" type="button" onClick={() => resetFormAndImages(resetForm)}>
                                    Reestablecer
                                </ResetButton>
                            </ButtonsWrapper>
                        </BootstrapForm>
                    )
                }}
            </Formik>
        </>
    )
}

export default FederateRequestForm

import React from 'react'
import { Formik, Field, Form, FormikValues, FormikProps } from 'formik'
import { KindMember, UserProfile } from '../../../store/types/userTypes'
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { renderKindMember } from '../../../utility/userUtilities'
import { Form as BootstrapForm } from 'react-bootstrap'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { CHANGE_KIND_MEMBER_URL } from '../../../resources/server_urls'
import useNotification, { NotificationType } from '../../../components/Common/hooks/useNotification'
import FloatingNotificationA from '../../../components/Common/FloatingNotificationA'

export interface ChangeKindMemberValues extends FormikValues {
    email: string
    kindMember: KindMember
}

export interface ChangeKindMemberFormProps {
    formData: ChangeKindMemberValues
    formikRef: React.RefObject<FormikProps<ChangeKindMemberValues>>
    updateLocalKindMember: (newKindMember: KindMember) => void
    setBlockButton: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ChangeKindMemberFormRef {
    submitForm: () => void
}

const ChangeKindMemberForm: React.FC<ChangeKindMemberFormProps> = ({ formikRef, formData, updateLocalKindMember, setBlockButton }) => {
    const { kindMember, email } = formData
    const { notification, showNotification, hideNotification } = useNotification()

    const handleSubmit = async (values: { kindMember: KindMember; email: string }) => {
        try {
            setBlockButton(true)
            const response: AxiosResponse<UserProfile> = await axios.patch(CHANGE_KIND_MEMBER_URL, {
                email: values.email,
                kindMember: values.kindMember
            })
            showNotification('Se han cambiado el tipo de socio correctamente.', NotificationType.Success)
            updateLocalKindMember(response.data.kindMember)
        } catch (error) {
            const axiosError = error as AxiosError
            const message = axiosError.message
            showNotification(message, NotificationType.Error)
        } finally {
            setBlockButton(false)
        }
    }

    return (
        <Formik innerRef={formikRef} initialValues={{ kindMember, email }} onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (
                <>
                    <BootstrapForm as={Form}>
                        <FormGroup>
                            <FormLabel htmlFor="email">
                                <strong>Email:</strong>
                            </FormLabel>
                            <FormControl as={Field} id="email" name="email" type="text" value={values.email} readOnly />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="kindMember">
                                <strong>Tipo de socio:</strong>
                            </FormLabel>
                            <BootstrapForm.Select
                                id="kindMember"
                                name="kindMember"
                                value={values.kindMember}
                                onChange={(e) => {
                                    const selectedKindMember = e.target.value as KindMember
                                    void setFieldValue('kindMember', selectedKindMember)
                                }}
                                aria-label="Seleccion tipo de socio."
                            >
                                {Object.values(KindMember).map((member) => (
                                    <option key={member} value={member}>
                                        {renderKindMember(member)}
                                    </option>
                                ))}
                            </BootstrapForm.Select>
                        </FormGroup>
                        <FloatingNotificationA notification={notification} hideNotification={hideNotification} />
                    </BootstrapForm>
                </>
            )}
        </Formik>
    )
}

export default ChangeKindMemberForm

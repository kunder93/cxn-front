import React from 'react'
import { Formik, Field, Form, FormikProps } from 'formik'
import { UserRole } from '../../../store/types/userTypes'
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { Form as BootstrapForm } from 'react-bootstrap'
import styled from 'styled-components'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { CHANGE_MEMBER_ROLES_URL } from '../../../resources/server_urls'
import useNotification, { NotificationType } from '../../../components/Common/hooks/useNotification'
import FloatingNotificationA from '../../../components/Common/FloatingNotificationA'
import { useAppSelector } from '../../../store/hooks'

const CheckBoxesGroup = styled(FormGroup)`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
`

const CheckBoxLabel = styled(FormLabel)`
    display: flex;
    align-items: center;
    font-weight: bold;
    margin-right: 1rem;
    & > input {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
    }
`

const FormGroupTitle = styled.div`
    font-weight: bolder;
    font-size: 130%;
    padding-bottom: 1em;
`

export interface ChangeMemberRolesValues {
    email: string
    userRoles: UserRole[]
}

export interface ChangeMemberRolesFormProps {
    initialFormData: ChangeMemberRolesValues
    formikRef: React.RefObject<FormikProps<ChangeMemberRolesValues>>
    updateLocalMemberRoles: (newUserRoles: UserRole[]) => void
    setBlockButton: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangeMemberRolesForm: React.FC<ChangeMemberRolesFormProps> = ({ formikRef, initialFormData, updateLocalMemberRoles, setBlockButton }) => {
    const { userRoles, email } = initialFormData
    const { notification, showNotification, hideNotification } = useNotification()
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const handleSubmit = async (values: ChangeMemberRolesValues) => {
        try {
            setBlockButton(true)

            // Verificar si userJwt existe
            if (!userJwt) {
                showNotification('Usuario no autenticado', NotificationType.Error)
                return
            }

            const response: AxiosResponse<{ userName: string; userRoles: UserRole[] }> = await axios.patch(
                CHANGE_MEMBER_ROLES_URL,
                {
                    email: values.email,
                    userRoles: values.userRoles
                },
                {
                    headers: {
                        Authorization: `Bearer ${userJwt}`, // Incluir el token JWT en la cabecera
                        'Content-Type': 'application/json'
                    }
                }
            )
            showNotification('Se han cambiado los roles correctamente.', NotificationType.Success)
            updateLocalMemberRoles(response.data.userRoles)
        } catch (error) {
            const axiosError = error as AxiosError
            const message = axiosError.message
            showNotification(message, NotificationType.Error)
        } finally {
            setBlockButton(false)
        }
    }

    return (
        <Formik innerRef={formikRef} initialValues={{ userRoles, email }} onSubmit={handleSubmit}>
            {({ values }) => (
                <>
                    <BootstrapForm as={Form}>
                        <FormGroup>
                            <FormLabel htmlFor="email" hidden>
                                <>Email:</>
                            </FormLabel>
                            <FormControl as={Field} id="email" name="email" type="text" value={values.email} readOnly hidden />
                        </FormGroup>
                        <FormGroupTitle>Asignación de roles:</FormGroupTitle>
                        <CheckBoxesGroup>
                            {Object.values(UserRole).map((role) => (
                                <CheckBoxLabel key={role}>
                                    {role}
                                    <Field type="checkbox" name="userRoles" value={role} />
                                </CheckBoxLabel>
                            ))}
                        </CheckBoxesGroup>
                        <FloatingNotificationA notification={notification} hideNotification={hideNotification} />
                    </BootstrapForm>
                </>
            )}
        </Formik>
    )
}

export default ChangeMemberRolesForm

import React from 'react'
import { Formik, Field, Form, FormikValues, FormikProps } from 'formik'
import { UserRole } from '../../../store/types/userTypes'
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { Form as BootstrapForm } from 'react-bootstrap'
import ChangeMemberRolesSubmitResultAlert from './ChangeMemberRoleSubmitResultAlert'
import styled from 'styled-components'

const CheckBoxesGroup = styled(FormGroup)`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
`

const CheckBoxLabel = styled(FormLabel)`
    & > input {
        margin-left: 0.5rem; /* Ajusta el valor según necesites */
    }
`

export interface ChangeMemberRolesValues extends FormikValues {
    email: string
    userRoles: UserRole[]
}

export interface ChangeMemberRolesFormProps {
    formData: ChangeMemberRolesValues
    formikRef: React.RefObject<FormikProps<ChangeMemberRolesValues>>
    updateMemberRoles: (newUserRoles: UserRole[]) => void
}

export interface ChangeKindMemberFormRef {
    submitForm: () => void
}

const ChangeMemberRolesForm: React.FC<ChangeMemberRolesFormProps> = ({ formikRef, formData, updateMemberRoles }) => {
    const { userRoles, email } = formData
    const [visibleAlert, setVisibleAlert] = React.useState(false)
    const [alertValues, setAlertValues] = React.useState<ChangeMemberRolesValues>({ email: '', userRoles: [] })
    return (
        <Formik
            innerRef={formikRef}
            initialValues={{ userRoles, email }}
            onSubmit={(values) => {
                setVisibleAlert(true)
                setAlertValues({ userRoles: values.userRoles, email: values.email })
            }}
        >
            {({ values }) => (
                <>
                    {visibleAlert && (
                        <ChangeMemberRolesSubmitResultAlert
                            visibleParam={visibleAlert}
                            closeFunction={setVisibleAlert}
                            formData={{ userRoles: alertValues.userRoles, email: alertValues.email }}
                            updateMemberRoles={updateMemberRoles}
                        />
                    )}
                    <BootstrapForm as={Form}>
                        <FormGroup>
                            <FormLabel htmlFor="email">
                                <strong>Email:</strong>
                            </FormLabel>
                            <FormControl as={Field} id="email" name="email" type="text" value={values.email} readOnly />
                        </FormGroup>
                        <div>
                            <strong>Roles asignados:</strong>
                            <CheckBoxesGroup>
                                <CheckBoxLabel>
                                    <strong>ADMIN</strong>
                                    <Field type="checkbox" name="userRoles" value={UserRole.ADMIN} />
                                </CheckBoxLabel>
                                <CheckBoxLabel>
                                    <strong>PRESIDENTE</strong>
                                    <Field type="checkbox" name="userRoles" value={UserRole.PRESIDENTE} />
                                </CheckBoxLabel>
                                <CheckBoxLabel htmlFor="kindMember">
                                    <strong>SECRETARIO</strong>
                                    <Field type="checkbox" name="userRoles" value={UserRole.SECRETARIO} />
                                </CheckBoxLabel>
                                <CheckBoxLabel htmlFor="kindMember">
                                    <strong>TESORERO</strong>
                                    <Field type="checkbox" name="userRoles" value={UserRole.TESORERO} />
                                </CheckBoxLabel>
                                <CheckBoxLabel htmlFor="kindMember">
                                    <strong>SOCIO</strong>
                                    <Field type="checkbox" name="userRoles" value={UserRole.SOCIO} />
                                </CheckBoxLabel>
                                <CheckBoxLabel htmlFor="kindMember">
                                    <strong>SOCIO CANDIDATO</strong>
                                    <Field type="checkbox" name="userRoles" value={UserRole.SOCIO_CANDIDATO} />
                                </CheckBoxLabel>
                            </CheckBoxesGroup>
                        </div>
                    </BootstrapForm>
                </>
            )}
        </Formik>
    )
}

export default ChangeMemberRolesForm

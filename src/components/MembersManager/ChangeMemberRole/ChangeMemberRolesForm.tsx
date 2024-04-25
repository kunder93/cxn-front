import React from 'react'
import { Formik, Field, Form, FormikValues, FormikProps } from 'formik'
import { UserRole } from '../../../store/types/userTypes'
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { Form as BootstrapForm } from 'react-bootstrap'
import ChangeMemberRolesSubmitResultAlert from './ChangeMemberRoleSubmitResultAlert'

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
    console.log('MEMBER ROLES FORM RENDERING')
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
                        <FormGroup>
                            <h2>Roles asignados:</h2>
                            <FormLabel >
                                <strong>ADMIN</strong>
                                <Field type="checkbox" name="userRoles" value={UserRole.ADMIN} />
                            </FormLabel>
                            <br/>
                            <FormLabel >
                                <strong>PRESIDENTE</strong>
                                <Field type="checkbox" name="userRoles" value={UserRole.PRESIDENTE} />
                            </FormLabel>
                            <br/>
                            <FormLabel htmlFor="kindMember">
                                <strong>SECRETARIO</strong>
                                <Field type="checkbox" name="userRoles" value={UserRole.SECRETARIO} />
                            </FormLabel>
                            <br/>
                            <FormLabel htmlFor="kindMember">
                                <strong>TESORERO</strong>
                                <Field type="checkbox" name="userRoles" value={UserRole.TESORERO} />
                            </FormLabel>
                            <br/>
                            <FormLabel htmlFor="kindMember">
                                <strong>SOCIO</strong>
                                <Field type="checkbox" name="userRoles" value={UserRole.SOCIO} />
                            </FormLabel>
                        </FormGroup>
                    </BootstrapForm>
                </>
            )}
        </Formik>
    )
}

export default ChangeMemberRolesForm

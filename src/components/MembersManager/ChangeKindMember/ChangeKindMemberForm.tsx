import React from 'react'
import { Formik, Field, Form, FormikValues, FormikProps } from 'formik'
import { KindMember } from '../../../store/types/userTypes'
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { renderKindMember } from '../../../utility/userUtilities'
import { Form as BootstrapForm } from 'react-bootstrap'
import ChangeKindMemberSubmitResultAlert from './ChangeKindMemberSubmitResultAlert'

export interface ChangeKindMemberValues extends FormikValues {
    email: string
    kindMember: KindMember
}

export interface ChangeKindMemberFormProps {
    formData: ChangeKindMemberValues
    formikRef: React.RefObject<FormikProps<ChangeKindMemberValues>>
    updateKindMember: (newKindMember: KindMember) => void
}

export interface ChangeKindMemberFormRef {
    submitForm: () => void
}

const ChangeKindMemberForm: React.FC<ChangeKindMemberFormProps> = ({ formikRef, formData, updateKindMember }) => {
    const { kindMember, email } = formData
    const [visibleAlert, setVisibleAlert] = React.useState(false)
    const [alertValues, setAlertValues] = React.useState<ChangeKindMemberValues>({ email: '', kindMember: KindMember.SOCIO_NUMERO })
    return (
        <Formik
            innerRef={formikRef}
            initialValues={{ kindMember, email }}
            onSubmit={(values) => {
                setVisibleAlert(true)
                setAlertValues({ kindMember: values.kindMember, email: values.email })
            }}
        >
            {({ values, setFieldValue }) => (
                <>
                    {visibleAlert && (
                        <ChangeKindMemberSubmitResultAlert
                            visibleParam={visibleAlert}
                            closeFunction={setVisibleAlert}
                            formData={{ email: alertValues.email, kindMember: alertValues.kindMember }}
                            updateKindMember={updateKindMember}
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
                    </BootstrapForm>
                </>
            )}
        </Formik>
    )
}

export default ChangeKindMemberForm

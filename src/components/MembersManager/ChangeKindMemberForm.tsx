import React from 'react'
import { Formik, Field, Form } from 'formik'
import { KindMember } from '../../store/types/userTypes'
import { Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { renderKindMember } from '../../utility/userUtilities'
import { Form as BootstrapForm } from 'react-bootstrap'
import ChangeKindMemberSubmitResultAlert from './ChangeKindMemberSubmitResultAlert'

export interface ChangeKindMemberFormData {
    email: string
    kindMember: KindMember
}

export interface ChangeKindMemberFormProps {
    formData: ChangeKindMemberFormData
    updateKindMember: ( newKindMember: KindMember) => void;
}



const ChangeKindMemberForm: React.FC<ChangeKindMemberFormProps> = ({ formData, updateKindMember }) => {
    const { kindMember, email } = formData;
    const [visibleAlert, setVisibleAlert] = React.useState(false)
    return (
        <Formik
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            initialValues={{ kindMember, email }}
            onSubmit={() => setVisibleAlert(true)}
        >
            {({ values, setFieldValue }) => (
                <>
                {visibleAlert && <ChangeKindMemberSubmitResultAlert 
                        visibleParam={visibleAlert} closeFunction={setVisibleAlert}
                         formData={{email: values.email, kindMember: values.kindMember}} 
                         updateKindMember={updateKindMember} />}
            
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
                        <div style={{ paddingTop: '1em' }}>
                            <Button variant="success" type="submit">
                                Cambiar
                            </Button>
                        </div>
                    </BootstrapForm>
                </>
            )}
        </Formik>
    )
}

export default ChangeKindMemberForm

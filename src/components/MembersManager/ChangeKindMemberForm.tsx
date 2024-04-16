import { Field, Form, Formik } from 'formik'
import React from 'react'
import { KindMember } from '../../store/types/userTypes'
import { Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { renderKindMember } from '../../utility/userUtilities'
import { Form as BootstrapForm } from 'react-bootstrap'

interface InitialValuesProps {
    dni: string
    kindMember: KindMember // Supongamos que kindMember es de tipo enum
}

const ChangeKindMemberForm: React.FC<InitialValuesProps> = (initialValuesProps) => {
    return (
        <Formik
            initialValues={initialValuesProps}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2))
                    setSubmitting(false)
                }, 500)
            }}
        >
            {({ values }) => (
                <BootstrapForm as={Form}>
                    <FormGroup>
                        <FormLabel htmlFor="dni">< strong>DNI:</strong></FormLabel>
                        <FormControl as={Field} id="dni" name="dni" type="text" value={values.dni} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="kindMember"><strong>Tipo de socio:</strong></FormLabel>
                        <BootstrapForm.Select as={Field} id="kindMember" name="kindMember" value={values.kindMember}   aria-label="Seleccion tipo de socio." readOnly>
                            {Object.values(KindMember).map((key: KindMember) => (
                                <option key={key} value={key}>
                                    {renderKindMember(key)}
                                </option>
                            ))}
                        </BootstrapForm.Select>
                    </FormGroup>
                    <div style={{ paddingTop: '1em' }}>
                        <Button variant="success" type="submit">
                            Submit
                        </Button>
                    </div>
                </BootstrapForm>
            )}
        </Formik>
    )
}

export default ChangeKindMemberForm

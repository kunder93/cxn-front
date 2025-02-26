import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal, { ModalProps } from 'react-bootstrap/Modal'
import { KindMember } from '../../../store/types/userTypes'
import ChangeKindMemberForm, { ChangeKindMemberValues } from './ChangeKindMemberForm'
import styled from 'styled-components'
import { FormikProps } from 'formik'
import { Spinner } from 'react-bootstrap'

interface ChangeKindMemberProps extends ModalProps {
    memberEmail: string
    memberName: string
    memberFirstSurname: string
    memberSecondSurname: string
    kindMember: KindMember
    updateKindMember: (newKindMember: KindMember) => void
}

const StyledModalFooter = styled(Modal.Footer)`
    justify-content: space-between !important; /* Distribuye los elementos a lo largo del contenedor */
`

const ChangeKindMemberModal: React.FC<ChangeKindMemberProps> = ({
    updateKindMember,
    memberName,
    memberEmail,
    memberFirstSurname,
    memberSecondSurname,
    kindMember,
    ...props
}) => {
    // Attach this to your <Formik>
    const formRef = useRef<FormikProps<ChangeKindMemberValues>>(null)
    const [blockButton, setBlockButton] = useState(false)
    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.handleSubmit()
        }
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Cambiar el tipo de socio de: <strong>{memberName + ' ' + memberFirstSurname + ' ' + memberSecondSurname}</strong>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ChangeKindMemberForm
                    formikRef={formRef}
                    formData={{ email: memberEmail, kindMember: kindMember }}
                    updateLocalKindMember={updateKindMember}
                    setBlockButton={setBlockButton}
                ></ChangeKindMemberForm>
            </Modal.Body>
            <StyledModalFooter>
                <Button variant="success" onClick={handleSubmit}>
                    {blockButton ? <Spinner animation="border" size="sm" /> : 'Cambiar'}
                </Button>
                <Button variant="danger" onClick={props.onHide}>
                    Cerrar
                </Button>
            </StyledModalFooter>
        </Modal>
    )
}

export default ChangeKindMemberModal

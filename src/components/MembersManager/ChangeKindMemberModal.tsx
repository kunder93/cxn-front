/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Modal, { ModalProps } from 'react-bootstrap/Modal'
import { KindMember } from '../../store/types/userTypes'
import ChangeKindMemberForm from './ChangeKindMemberForm'
import styled from 'styled-components'
import { FormikProps, FormikValues } from 'formik'

interface ChangeKindMemberProps extends ModalProps {
    memberEmail: string | undefined
    memberName: string | undefined
    memberFirstSurname: string | undefined
    memberSecondSurname: string | undefined
    kindMember: KindMember | undefined
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
const formRef = useRef<FormikProps<FormikValues>>(null)

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
                {kindMember && memberEmail && (
                    <ChangeKindMemberForm  formikRef={formRef} formData={{ email: memberEmail, kindMember: kindMember }} updateKindMember={updateKindMember}></ChangeKindMemberForm>
                )}
            </Modal.Body>
            <StyledModalFooter>
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access*/}
                <Button variant="success" onClick={handleSubmit}>
                    Cambiar
                </Button>
                <Button variant="danger" onClick={props.onHide}>
                    Cerrar
                </Button>
            </StyledModalFooter>
        </Modal>
    )
}

export default ChangeKindMemberModal

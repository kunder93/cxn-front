/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal, { ModalProps } from 'react-bootstrap/Modal'
import { KindMember } from '../../store/types/userTypes'
import ChangeKindMemberForm from './ChangeKindMemberForm'

interface ChangeKindMemberProps extends ModalProps {
    memberEmail: string | undefined
    memberName: string | undefined
    memberFirstSurname: string | undefined
    memberSecondSurname: string | undefined
    kindMember: KindMember | undefined
    updateKindMember: ( newKindMember: KindMember) => void;
}

const ChangeKindMemberModal: React.FC<ChangeKindMemberProps> = ({ updateKindMember, memberName, memberEmail, memberFirstSurname, memberSecondSurname, kindMember, ...props }) => {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Cambiar el tipo de socio de: <strong>{memberName + ' ' + memberFirstSurname + ' ' + memberSecondSurname}</strong>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{kindMember && memberEmail && <ChangeKindMemberForm  formData={{ email: memberEmail, kindMember: kindMember }} updateKindMember={updateKindMember}  ></ChangeKindMemberForm>}</Modal.Body>
            <Modal.Footer>
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access*/}
                <Button variant="danger" onClick={props.onHide}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ChangeKindMemberModal

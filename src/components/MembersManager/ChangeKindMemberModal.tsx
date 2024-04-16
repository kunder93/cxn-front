/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal, { ModalProps } from 'react-bootstrap/Modal'
import { KindMember } from '../../store/types/userTypes'
import ChangeKindMemberForm from './ChangeKindMemberForm'

interface ChangeKindMemberProps extends ModalProps {
    memberDni: string | undefined
    memberName: string | undefined
    memberFirstSurname: string | undefined
    memberSecondSurname: string | undefined
    kindMember: KindMember | undefined
}

const ChangeKindMemberModal: React.FC<ChangeKindMemberProps> = ({ memberName, memberFirstSurname, memberSecondSurname, memberDni,kindMember, ...props }) => {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Cambiar el tipo de socio de: <strong>{memberName + ' ' + memberFirstSurname + ' ' + memberSecondSurname}</strong>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {kindMember && memberDni && <ChangeKindMemberForm dni={memberDni} kindMember={kindMember}></ChangeKindMemberForm>}
            </Modal.Body>
            <Modal.Footer>
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access*/}
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ChangeKindMemberModal

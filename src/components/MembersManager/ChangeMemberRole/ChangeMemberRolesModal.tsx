import React from 'react'
import { Button, Modal, ModalProps, Spinner } from 'react-bootstrap'
import { UserRole } from 'store/types/userTypes'
import styled from 'styled-components'
import ChangeMemberRolesForm, { ChangeMemberRolesValues } from './ChangeMemberRolesForm'
import { FormikProps } from 'formik'

const StyledModalFooter = styled(Modal.Footer)`
    justify-content: space-between !important; /* Distribuye los elementos a lo largo del contenedor */
`

interface ChangeMemberRolesModalProps extends ModalProps {
    memberEmail: string
    memberName: string | undefined
    memberFirstSurname: string | undefined
    memberSecondSurname: string | undefined
    memberRoles: UserRole[]
    updateMemberRoles: (newUserRoles: UserRole[]) => void
}

const ChangeMemberRolesModal = ({
    memberName,
    memberEmail,
    memberFirstSurname,
    memberSecondSurname,
    memberRoles,
    updateMemberRoles,
    ...props
}: ChangeMemberRolesModalProps): JSX.Element => {
    // Formik form ref for use submit when click Button.
    const formRef = React.useRef<FormikProps<ChangeMemberRolesValues>>(null)
    const [blockButton, setBlockButton] = React.useState(false)
    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.handleSubmit()
        }
    }
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Cambiar el rol de: <strong>{memberName + ' ' + memberFirstSurname + ' ' + memberSecondSurname}</strong>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ChangeMemberRolesForm
                    initialFormData={{ email: memberEmail, userRoles: memberRoles }}
                    formikRef={formRef}
                    updateLocalMemberRoles={updateMemberRoles}
                    setBlockButton={setBlockButton}
                ></ChangeMemberRolesForm>
            </Modal.Body>
            <StyledModalFooter>
                <Button variant="success" onClick={handleSubmit} disabled={blockButton}>
                    {blockButton ? <Spinner animation="border" size="sm" /> : 'Cambiar'}
                </Button>
                <Button variant="danger" onClick={props.onHide}>
                    Cerrar
                </Button>
            </StyledModalFooter>
        </Modal>
    )
}

export default ChangeMemberRolesModal

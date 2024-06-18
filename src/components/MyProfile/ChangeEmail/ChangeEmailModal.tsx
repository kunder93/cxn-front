import React, { useRef } from 'react'
import { Button, Modal, ModalProps } from 'react-bootstrap'
import EmailChangeForm, { ChangeEmailFormValues } from './ChangeEmailForm'
import styled from 'styled-components'
import { FormikProps } from 'formik'
interface ChangeEmailModalProps extends ModalProps {
    userEmail: string
    name: string
    firstSurname: string
    secondSurname: string
}

const ModalBody = styled(Modal.Body)`
    padding-top: 0px !important;
`

const ModalFooter = styled(Modal.Footer)`
    justify-content: space-between !important; /* Distribuye los elementos a lo largo del contenedor */
`

const ChangeEmailModal: React.FC<ChangeEmailModalProps> = (props) => {
    const [buttonDisabled, setButtonDisabled] = React.useState(true)
    const formRef = useRef<FormikProps<ChangeEmailFormValues>>(null)
    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.handleSubmit()
        }
    }
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h2>Cambiar email de: {props.name + ' ' + props.firstSurname + ' ' + props.secondSurname}</h2>
                </Modal.Title>
            </Modal.Header>
            <ModalBody>
                <EmailChangeForm formikRef={formRef} initialEmail={props.userEmail} buttonDisabledHandler={setButtonDisabled}></EmailChangeForm>
            </ModalBody>
            <ModalFooter>
                <Button variant="success" onClick={handleSubmit} disabled={buttonDisabled}>
                    Cambiar
                </Button>
                <Button variant="danger" onClick={props.onHide}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ChangeEmailModal

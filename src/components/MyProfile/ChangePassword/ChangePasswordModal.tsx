import React, { useRef } from 'react'
import { Button, Modal, ModalProps } from 'react-bootstrap'

import styled from 'styled-components'
import { FormikProps } from 'formik'
import PasswordChangeForm, { ChangePasswordFormValues } from './PasswordChangeForm'

interface ChangePasswordModalProps extends ModalProps {
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

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = (props) => {
    const formRef = useRef<FormikProps<ChangePasswordFormValues>>(null)
    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.handleSubmit()
        }
    }
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h2>Cambiar contraseña de: {props.name + ' ' + props.firstSurname + ' ' + props.secondSurname}</h2>
                </Modal.Title>
            </Modal.Header>
            <ModalBody>
                <PasswordChangeForm formikRef={formRef} userEmail={props.userEmail} ></PasswordChangeForm>
            </ModalBody>
            <ModalFooter>
                <Button variant="success" onClick={handleSubmit}>
                    Cambiar
                </Button>
                <Button variant="danger" onClick={props.onHide}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ChangePasswordModal

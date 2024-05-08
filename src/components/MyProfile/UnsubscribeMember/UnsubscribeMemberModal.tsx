import React, { useRef } from 'react'
import { Button, Modal, ModalProps } from 'react-bootstrap'

import styled from 'styled-components'
import { FormikProps } from 'formik'
import UnsubscribeMemberForm, { UnsubscribeMemberFormValues } from './UnsubscribeMemberForm'

interface UnsubscribeMemberModalProps extends ModalProps {
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

const UnsubscribeMemberModal: React.FC<UnsubscribeMemberModalProps> = (props) => {
    const formRef = useRef<FormikProps<UnsubscribeMemberFormValues>>(null)
    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.handleSubmit()
        }
    }
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h2>Darse de baja como socio: </h2>
                    <h2>{props.name + ' ' + props.firstSurname + ' ' + props.secondSurname}</h2>
                </Modal.Title>
            </Modal.Header>
            <ModalBody>
                <UnsubscribeMemberForm formikRef={formRef} userEmail={props.userEmail} ></UnsubscribeMemberForm>
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

export default UnsubscribeMemberModal

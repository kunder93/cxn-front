/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import CreatePaymentSheetForm from './CreatePaymentSheetForm'

const CreatePaymentSheetModal: React.FC<any> = (props: any) => {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Create payment sheet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CreatePaymentSheetForm></CreatePaymentSheetForm>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreatePaymentSheetModal

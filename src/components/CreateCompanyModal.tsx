import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import React from 'react'
import CreateCompanyForm from './CreateCompanyForm'

function MyVerticallyCenteredModal(props: any) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Create company</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CreateCompanyForm></CreateCompanyForm>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} variant="danger">
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MyVerticallyCenteredModal

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import React from 'react'
import InvoiceForm from './CreateInvoiceForm'
import { ICreateInvoiceModal } from './InvoiceTypes'
import { Container } from 'react-bootstrap'

const CreateInvoiceModal: React.FC<ICreateInvoiceModal> = (props: ICreateInvoiceModal) => {
    return (
        <Container>
            {' '}
            <Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Crear factura:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InvoiceForm data={props.data} addInvoice={props.addInvoice}></InvoiceForm>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default CreateInvoiceModal

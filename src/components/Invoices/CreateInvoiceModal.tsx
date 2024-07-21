import Button from 'react-bootstrap/Button'
import Modal, { ModalProps } from 'react-bootstrap/Modal'
import React from 'react'
import { Container } from 'react-bootstrap'
import { useCreateInvoiceForm } from './hooks/useCreateInvoiceForm'
import { IInvoice } from 'components/Types/Types'
import CreateInvoiceForm from './CreateInvoiceForm'

interface ICreateInvoiceModal {
    updateInvoicesList: (newInvoice: IInvoice) => void
}

const CreateInvoiceModal: React.FC<ICreateInvoiceModal & ModalProps> = (props) => {
    const formik = useCreateInvoiceForm(props.updateInvoicesList)
    const handleExit = () => {
        formik.resetForm()
    }

    return (
        <Container>
            {' '}
            <Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onExit={handleExit}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Crear factura:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateInvoiceForm formik={formik}></CreateInvoiceForm>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => void formik.submitForm()} disabled={!formik.isValid}>
                        <strong>Añadir nueva factura</strong>
                    </Button>
                    <Button variant="danger" onClick={props.onHide}>
                        <strong>Cerrar</strong>
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default CreateInvoiceModal

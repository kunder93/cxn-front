import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal, { ModalProps } from 'react-bootstrap/Modal'

import { ICompany } from './Types'
import CreateCompanyForm from './CreateCompanyForm'
import { useCreateCompanyForm } from './hooks/useCreateCompanyForm'
import { Spinner } from 'react-bootstrap'

interface ICreateCompanyModal {
    updateCompaniesList: (newCompany: ICompany) => void
}

const CreateCompanyModal: React.FC<ICreateCompanyModal & ModalProps> = (props) => {
    const formik = useCreateCompanyForm(props.updateCompaniesList)

    const handleCreateCompanyClick = () => {
        formik.handleSubmit()
    }

    return (
        <Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Registrar empresa:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CreateCompanyForm formik={formik} />
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" onClick={handleCreateCompanyClick} variant="success" disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}>
                    {formik.isSubmitting ? (
                        <>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Creando...
                        </>
                    ) : (
                        <strong>Añadir empresa</strong>
                    )}
                </Button>
                <Button onClick={props.onHide} variant="danger">
                    <strong>Salir</strong>
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateCompanyModal

import Button from 'react-bootstrap/Button'
import Modal, { ModalProps } from 'react-bootstrap/Modal'
import React from 'react'
import CreateCompanyForm from './CreateCompanyForm'
import { ICompany } from './Types'


interface ICreateCompanyModal {
    updateCompaniesList:(newCompany: ICompany) => void
}


const CrateCompanyModal: React.FC<ICreateCompanyModal & ModalProps> = (props) => {

    return (
            <Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Registrar empresa:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateCompanyForm updateCompaniesList = {props.updateCompaniesList}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} variant="danger">
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
    )
}

export default CrateCompanyModal

import React from 'react'
import { Modal, Button, Col, Container, Row } from "react-bootstrap"
import EditCompanyForm from "./EditCompanyForm"

function EditCompanyModal(props: any) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Editar Company</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container >
                    <Row >
                        <Col><span>Cif - Nif: </span></Col>
                        <Col><span>{props.row.nif} </span></Col>
                    </Row >
                    <Row>
                        <Col><span>Name:</span></Col>
                        <Col><span>{props.row.name} </span></Col>
                    </Row>

                    <Row>
                        <Col><span>Address:</span></Col>
                        <Col><span>{props.row.address} </span></Col>
                    </Row>
                </Container>
                <EditCompanyForm></EditCompanyForm>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} variant="danger" >Cerrar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditCompanyModal
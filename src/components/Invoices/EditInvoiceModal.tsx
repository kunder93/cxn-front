import React from 'react'
import { Container, Modal, Row, Col, Button } from 'react-bootstrap'
import EditInvoiceForm from './EditInvoiceForm'

function EditInvoiceModal(props: any) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Editar Factura</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Actual data: </h4>
                <Container fluid>
                    <Row>
                        <Col>
                            <div>Número:</div>
                        </Col>
                        <Col>
                            <span>{props.row.number}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>Serie:</div>
                        </Col>
                        <Col>
                            <span>{props.row.series}</span>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div>Fecha de expedición:</div>
                        </Col>
                        <Col>
                            <span>{props.row.expeditionDate}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>Fecha de pago anticipado:</div>
                        </Col>
                        <Col>
                            <span>{props.row.advancePaymentDate}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>Nif del comprador:</div>
                        </Col>
                        <Col>
                            <span>{props.row.buyerNif}</span>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div>Nif del vendedor:</div>
                        </Col>
                        <Col>
                            <span>{props.row.sellerNif}</span>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div>Exención de impuestos:</div>
                        </Col>
                        <Col>
                            <span>{props.row.taxExempt ? 'Si' : 'No'}</span>
                        </Col>
                    </Row>
                </Container>
                <h4>New data:</h4>
                <EditInvoiceForm></EditInvoiceForm>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditInvoiceModal
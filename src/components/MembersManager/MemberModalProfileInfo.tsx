import React from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const MemberModalProfileInfo = (props: any) => {
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Informacion sobre socio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
              <Row>
                  <Col>
                      <span>D:N:I:</span>
                  </Col>
                  <Col>
                      <span>{props.row.dni}</span>
                  </Col>
              </Row>
              <Row>
                  <Col>
                      <span>Nombre completo:</span>
                  </Col>
                  <Col>
                      <span>{props.row.name + " " + props.row.firstSurname + " " + props.row.secondSurname} </span>
                  </Col>
              </Row>

              <Row>
                  <Col>
                      <span>Email:</span>
                  </Col>
                  <Col>
                      <span>{props.row.email} </span>
                  </Col>
              </Row>
              <Row>
                  <Col>
                      <span>Categoria de socio:</span>
                  </Col>
                  <Col>
                      <span>{props.row.userRoles} </span>
                  </Col>
              </Row>
              <Row>
                  <Col>
                      <span>Estado de socio:</span>
                  </Col>
                  <Col>
                      <span>{"Todo correcto/falta pagar/ pendiente aprobacion..."} </span>
                  </Col>
              </Row>

      </Modal.Body>
      <Modal.Footer>
          <Button onClick={props.onHide} variant="danger">
              Cerrar
          </Button>
      </Modal.Footer>
  </Modal>
    )
}

export default MemberModalProfileInfo

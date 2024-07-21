import React from 'react'
import { Accordion, Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal, { ModalProps } from 'react-bootstrap/Modal'
import { UserProfile } from '../../store/types/userTypes'
import { renderKindMember, renderUserRoles } from '../../utility/userUtilities'

interface props extends ModalProps {
    row: UserProfile | undefined
}

const MemberModalProfileInfo: React.FC<props> = (props) => {
    return (
        <>
            {props.row ? (
                <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Informacion sobre socio</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <span>
                                    <strong>Nombre completo:</strong>
                                </span>
                            </Col>
                            <Col>
                                <span>{props.row.name + ' ' + props.row.firstSurname + ' ' + props.row.secondSurname} </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span>
                                    <strong>DNI</strong>:
                                </span>
                            </Col>
                            <Col>
                                <span>{props.row.dni}</span>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <span>
                                    <strong>Email:</strong>
                                </span>
                            </Col>
                            <Col>
                                <span>{props.row.email} </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span>
                                    <strong>Categoria de socio:</strong>
                                </span>
                            </Col>
                            <Col>
                                <span>{renderUserRoles(props.row.userRoles)} </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span>
                                    <strong>Estado de socio:</strong>
                                </span>
                            </Col>
                            <Col>
                                <span>{renderKindMember(props.row.kindMember)} </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span>
                                    <strong>Fecha de nacimiento:</strong>
                                </span>
                            </Col>
                            <Col>
                                <span>{props.row.birthDate.toLocaleString()} </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span>
                                    <strong>Género:</strong>
                                </span>
                            </Col>
                            <Col>
                                <span>{props.row.gender} </span>
                            </Col>
                        </Row>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <strong>Dirección</strong>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Row>
                                        <Col>
                                            <span>
                                                <strong>Género:</strong>
                                            </span>
                                        </Col>
                                        <Col>
                                            <span>{props.row.gender} </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <span>
                                                <strong>Ciudad:</strong>
                                            </span>
                                        </Col>
                                        <Col>
                                            <span>{props.row.userAddress.city} </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <span>
                                                <strong>País:</strong>
                                            </span>
                                        </Col>
                                        <Col>
                                            <span>{props.row.userAddress.countryName} </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <span>
                                                <strong>Provincia:</strong>
                                            </span>
                                        </Col>
                                        <Col>
                                            <span>{props.row.userAddress.subCountryName} </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <span>
                                                <strong>Calle:</strong>
                                            </span>
                                        </Col>
                                        <Col>
                                            <span>{props.row.userAddress.street} </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <span>
                                                <strong>Código Postal:</strong>
                                            </span>
                                        </Col>
                                        <Col>
                                            <span>{props.row.userAddress.postalCode} </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <span>
                                                <strong>Tipo vivienda:</strong>
                                            </span>
                                        </Col>
                                        <Col>
                                            <span>{props.row.userAddress.building} </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <span>
                                                <strong>Número:</strong>
                                            </span>
                                        </Col>
                                        <Col>
                                            <span>{props.row.userAddress.apartmentNumber} </span>
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={props.onHide} variant="danger">
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            ) : (
                <></>
            )}
        </>
    )
}

export default MemberModalProfileInfo

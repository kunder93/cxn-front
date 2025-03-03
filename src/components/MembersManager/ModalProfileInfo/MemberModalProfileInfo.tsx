import { Accordion, Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal, { ModalProps } from 'react-bootstrap/Modal'
import { UserProfile } from '../../../store/types/userTypes'
import { renderGenderValues, renderKindMember, renderUserRoles } from '../../../utility/userUtilities'

import AccordionItemFederateInfo from './AccordionItemFederateInfo'
import AccordionItemLichessInfo from './AccordionItemLichessInfo'

interface MemberModalProfileInfoProps extends ModalProps {
    row: UserProfile | undefined
}

const MemberModalProfileInfo = (props: MemberModalProfileInfoProps): React.JSX.Element => {
    return (
        <>
            {props.row ? (
                <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Información sobre socio</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Información personal</Accordion.Header>
                                <Accordion.Body>
                                    <Row>
                                        <Col>
                                            <span>
                                                <strong>Nombre y apellidos:</strong>
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
                                                <strong>Rol en el club:</strong>
                                            </span>
                                        </Col>
                                        <Col>
                                            <span>{renderUserRoles(props.row.userRoles)} </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <span>
                                                <strong>Tipo de socio:</strong>
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
                                            <span>{renderGenderValues(props.row.gender)} </span>
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Dirección</Accordion.Header>
                                <Accordion.Body>
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
                            <AccordionItemFederateInfo eventKey="2" userDni={props.row.dni}></AccordionItemFederateInfo>
                            <AccordionItemLichessInfo eventKey="3" userDni={props.row.dni}></AccordionItemLichessInfo>
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

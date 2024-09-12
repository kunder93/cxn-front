import React, { useState } from 'react'
import { Button, Col, Container, Modal, ModalProps, Row } from 'react-bootstrap'
import { Check2 } from 'react-bootstrap-icons'
import Accordion from 'react-bootstrap/Accordion'
import AddFoodHousingForm from './AddFoodHousingForm'
import AddRegularTransportForm from './AddRegularTransportForm'
import AddSelfVehicleForm from './AddSelfVehicleForm'
import { IFoodHousing, IPaymentSheet, ISelfVehicle } from 'components/Types/Types'
import styled from 'styled-components'

const FirstColumn = styled(Col)`
    font-weight: bold;
`

const SecondColumn = styled(Col)``

const PaymentSheetDataContainer = styled(Container)``
const PaymentSheetDataRow = styled(Row)``

interface AddDataPaymentSheetModalProps extends ModalProps {
    row: IPaymentSheet
    addPaymentSheetSelfVehicle: (paymentSheetId: number, selfVehicleData: ISelfVehicle) => void
    addPaymentSheetFoodHousing: (paymentSheetId: number, foodHousingData: IFoodHousing) => void
}

interface PaymentSheetDataRowComponentProps {
    label: string
    value: string
}

const PaymentSheetDataRowComponent: React.FC<PaymentSheetDataRowComponentProps> = ({ label, value }) => {
    return (
        <PaymentSheetDataRow>
            <FirstColumn md={3}>
                <span>{label}</span>
            </FirstColumn>
            <SecondColumn md={9}>
                <span>{value}</span>
            </SecondColumn>
        </PaymentSheetDataRow>
    )
}

const AddDataPaymentSheetModal: React.FC<AddDataPaymentSheetModalProps> = ({ row, addPaymentSheetSelfVehicle, addPaymentSheetFoodHousing, ...modalProps }) => {
    const [activeKey, setActiveKey] = useState<string | null>(null)

    const handleAccordionClick = (key: string) => {
        setActiveKey(activeKey === key ? null : key)
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString()
    }
    const startDate = new Date(row.startDate)
    const endDate = new Date(row.endDate)

    return (
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered {...modalProps}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Añadir datos a hoja de pago.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <PaymentSheetDataContainer>
                        <PaymentSheetDataRowComponent label={'Hoja de pagos ID:'} value={row.paymentSheetIdentifier.toString()} />
                        <PaymentSheetDataRowComponent
                            label={'Nombre completo:'}
                            value={row.userName + ' ' + row.userFirstSurname + ' ' + row.userSecondSurname}
                        />
                        <PaymentSheetDataRowComponent label={'Razón:'} value={row.reason} />
                        <PaymentSheetDataRowComponent label={'Lugar:'} value={row.place} />
                        <PaymentSheetDataRowComponent label={'Fechas:'} value={'Inicio: ' + formatDate(startDate) + ' - -  Fin: ' + formatDate(endDate)} />
                    </PaymentSheetDataContainer>
                    <Container>
                        <Accordion activeKey={activeKey}>
                            {row.selfVehicle ? (
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header onClick={() => handleAccordionClick('0')}>
                                        {' '}
                                        <Check2 /> <span>Ruta con vehiculo propio añadida. -- Ver ruta:</span>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row>
                                            <Col>
                                                <span>Distancia:</span>
                                            </Col>
                                            <Col>{row.selfVehicle.distance + ' Km.'}</Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <span>Precio:</span>
                                            </Col>
                                            <Col>{row.selfVehicle.kmPrice + ' €.'}</Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <span>Lugares recorridos:</span>
                                            </Col>
                                            <Col>{row.selfVehicle.places}</Col>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ) : (
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header onClick={() => handleAccordionClick('0')}>Añadir vehículo propio:</Accordion.Header>
                                    <Accordion.Body>
                                        <AddSelfVehicleForm
                                            paymentSheetId={row.paymentSheetIdentifier}
                                            addPaymentSheetSelfVehicle={addPaymentSheetSelfVehicle}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                            )}
                            {row.foodHousing ? (
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header onClick={() => handleAccordionClick('1')}>
                                        <Check2 /> <span>Manutención y/o alojamiento añadido. -- Ver información:</span>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row>
                                            <Col>
                                                <span>Cantidad de días:</span>
                                            </Col>
                                            <Col>{row.foodHousing.amountDays}</Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <span>Precio por día:</span>
                                            </Col>
                                            <Col>{row.foodHousing.dayPrice}</Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <span>Pernocta:</span>
                                            </Col>
                                            <Col>{row.foodHousing.overnight ? 'Si' : 'No'}</Col>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ) : (
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header onClick={() => handleAccordionClick('1')}>Añadir manutención - alojamiento:</Accordion.Header>
                                    <Accordion.Body>
                                        <AddFoodHousingForm
                                            paymentSheetIdentifier={row.paymentSheetIdentifier}
                                            addPaymentSheetFoodHousing={addPaymentSheetFoodHousing}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                            )}
                            {row.regularTransportList ? (
                                <Container>
                                    <Check2 /> <span>Ruta con transporte regular añadido.</span>
                                </Container>
                            ) : (
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header onClick={() => handleAccordionClick('2')}>Añadir transporte regular:</Accordion.Header>
                                    <Accordion.Body>
                                        <AddRegularTransportForm paymentSheetId={row.paymentSheetIdentifier} />
                                    </Accordion.Body>
                                </Accordion.Item>
                            )}
                        </Accordion>
                    </Container>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={modalProps.onHide} variant="danger">
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddDataPaymentSheetModal

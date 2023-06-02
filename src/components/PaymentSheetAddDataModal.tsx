import React from 'react'
import { Modal, Button, Col, Container, Row } from "react-bootstrap"
import AddSelfVehicleForm from './AddSelfVehicleForm'
import { Check2 } from 'react-bootstrap-icons';
import AddFoodHousingForm from './AddFoodHousingForm';
import AddRegularTransportForm from './AddRegularTransportForm';
function AddDataPaymentSheetModal(props: any) {
    console.log(props)
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Añadir datos a hoja de pago.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container >
                <Row >
                        <Col><span>Hoja de pagos ID: </span></Col>
                        <Col><span>{props.row.paymentSheetIdentifier} </span></Col>
                    </Row >
                    <Row >
                        <Col><span>Nombre completo: </span></Col>
                        <Col><span>{props.row.userName + " " + props.row.userFirstSurname + " " + props.row.userSecondSurname} </span></Col>
                    </Row >
                    <Row>
                        <Col><span>Razon:</span></Col>
                        <Col><span>{props.row.reason} </span></Col>
                    </Row>
                    <Row>
                        <Col><span>Lugar:</span></Col>
                        <Col><span>{props.row.place} </span></Col>
                    </Row>
                    <Row>
                        <Col><span>Fechas:</span></Col>
                        <Col><span>{"Inicio: " + props.row.startDate + " - -  Fin: " + props.row.endDate} </span></Col>
                    </Row>
                </Container>
                <Container>
                    {props.row.selfVehicle ?   <> <Check2></Check2> <span>Ruta con vehiculo propio ya añadida.</span></> : <AddSelfVehicleForm data = {props.row.paymentSheetIdentifier}>
                            
                            </AddSelfVehicleForm>}
                <Container>

                <Container>
                    {props.row.foodHousing ?   <> <Check2></Check2> <span>Ruta con comida y/o alojamiento añadido.</span></> : <AddFoodHousingForm data = {props.row.paymentSheetIdentifier}>
                            
                            </AddFoodHousingForm>}
                </Container>
                <Container>
                    {props.row.regularTransport ?   <> <Check2></Check2> <span>Ruta con comida y/o alojamiento añadido.</span></> : 
                    <AddRegularTransportForm data = {props.row.paymentSheetIdentifier}>    
                    </AddRegularTransportForm>}
                </Container>        
                    

                    </Container>
                </Container>
                
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} variant="danger" >Cerrar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddDataPaymentSheetModal
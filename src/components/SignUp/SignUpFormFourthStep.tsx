import { Field } from 'formik'
import React, { useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import BootstrapForm from 'react-bootstrap/Form'
import { FormConditionsModalProps, SignUpFormFourthStepData, UserAceptanceModalOption } from './SignUpFormTypes'
import {
    CesionDatosContainer,
    CesionDatosModalTittle,
    CompromisoConfidencialidadContainer,
    ComrpomisoConfidencialidadModalTittle,
    RelativoSociosModalTittle,
    RelativoSociosTextContainer
} from './UserAceptanceTextStyle'

const UserAceptanceModal: React.FC<FormConditionsModalProps> = ({ show, onClose, userAceptanceOption }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {userAceptanceOption === UserAceptanceModalOption.CesionDatos && <CesionDatosModalTittle></CesionDatosModalTittle>}
                    {userAceptanceOption === UserAceptanceModalOption.CompromisoConfidencialidad && (
                        <ComrpomisoConfidencialidadModalTittle></ComrpomisoConfidencialidadModalTittle>
                    )}
                    {userAceptanceOption === UserAceptanceModalOption.NormasSocios && <RelativoSociosModalTittle></RelativoSociosModalTittle>}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {userAceptanceOption === UserAceptanceModalOption.CesionDatos && <CesionDatosContainer></CesionDatosContainer>}
                {userAceptanceOption === UserAceptanceModalOption.CompromisoConfidencialidad && (
                    <CompromisoConfidencialidadContainer></CompromisoConfidencialidadContainer>
                )}
                {userAceptanceOption === UserAceptanceModalOption.NormasSocios && <RelativoSociosTextContainer></RelativoSociosTextContainer>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

const SignUpFormFourthStep = (data: SignUpFormFourthStepData) => {
    const [selectedAceptanceOption, setSelectedAceptanceOption] = useState<UserAceptanceModalOption>(UserAceptanceModalOption.CesionDatos)
    // NormasSocios modal open/close state constant and functions
    const [userAceptanceModalOpen, setUserAceptanceModalOpen] = useState(false)

    const handleUserAceptanceModalClose = () => {
        setUserAceptanceModalOpen(false)
    }


    const handleCesionDatosModalOpen = () => {
        setSelectedAceptanceOption(UserAceptanceModalOption.CesionDatos)
        setUserAceptanceModalOpen(true)
    }
    const handleNormasSociosModalOpen = () => {
        setSelectedAceptanceOption(UserAceptanceModalOption.NormasSocios)
        setUserAceptanceModalOpen(true)
    }
    const handleCompromisoConfidencialidadModalOpen = () => {
        setSelectedAceptanceOption(UserAceptanceModalOption.CompromisoConfidencialidad)
        setUserAceptanceModalOpen(true)
    }



    return (
        <Container>
            <UserAceptanceModal show={userAceptanceModalOpen} onClose={handleUserAceptanceModalClose} userAceptanceOption={selectedAceptanceOption} />
            <Row className="mb-3">
                <Col>
                    <BootstrapForm.Label style={{ fontSize: '30px' }}>Normas socio:</BootstrapForm.Label>

                    <Field type="checkbox" name="membersTerms" style={{ width: '25px', height: '25px' }} />
                    {/*`${values.toggle}`*/}
                    <BootstrapForm.Text style={{ fontSize: '30px' }} className="text-muted">
                        He leido y acepto las condiciones.
                    </BootstrapForm.Text>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button variant="link" onClick={handleNormasSociosModalOpen}>
                        Ver las condiciones sobre normas de los socios.
                    </Button>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <BootstrapForm.Label style={{ fontSize: '30px' }}>Proteccion datos:</BootstrapForm.Label>
                    <Field type="checkbox" name="privacyTerms" style={{ width: '25px', height: '25px' }} />
                    {/*`${values.toggle}`*/}
                    <BootstrapForm.Text style={{ fontSize: '30px' }} className="text-muted">
                        He leido y acepto las condiciones.
                    </BootstrapForm.Text>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="link" onClick={handleCesionDatosModalOpen}>
                        Ver las condiciones sobre proteccion de datos.
                    </Button>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <BootstrapForm.Label style={{ fontSize: '30px' }}>Compromiso de confidencialidad:</BootstrapForm.Label>
                    <Field type="checkbox" name="confidencialityTerms" style={{ width: '25px', height: '25px' }} />
                    {/*`${values.toggle}`*/}
                    <BootstrapForm.Text style={{ fontSize: '30px' }} className="text-muted">
                        He leido y acepto las condiciones.
                    </BootstrapForm.Text>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="link" onClick={handleCompromisoConfidencialidadModalOpen}>
                        Ver las condiciones sobre el compromiso de confidencialidad.
                    </Button>
                </Col>
            </Row>

            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment*/}
            <Button variant="primary" onClick={data.previousStepFunction}>
                Atras
            </Button>

            <Button type="submit" disabled={!data.formikProps.dirty || !data.formikProps.isValid}>
                Registrarse
            </Button>
        </Container>
    )
}

export default SignUpFormFourthStep

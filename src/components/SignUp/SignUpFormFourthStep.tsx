import { Field } from 'formik'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import BootstrapForm from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import { FormConditionsModalProps, SignUpFormStepProps, UserAceptanceModalOption } from './SignUpFormTypes'
import {
    CesionDatosContainer,
    CesionDatosModalTittle,
    CompromisoConfidencialidadContainer,
    ComrpomisoConfidencialidadModalTittle,
    RelativoSociosModalTittle,
    RelativoSociosTextContainer
} from './UserAceptanceTextStyle'
import styled from 'styled-components'

const ButtonRow = styled(Row)`
    display: flex;
    padding-top: 0.5em;
    padding-bottom: 1em;
`
const ButtonCol = styled(Col)`
    display: flex;
    flex-direction: row-reverse;
`
const MainContainer = styled(Container)`
    padding-top: 1em;
    padding-bottom: 10em;
`

const FormStyledContainer = styled.div`
    background-color: rgba(250, 238, 168, 0.219);
    box-shadow:
        0 0.5em 0.5em -0.3em rgba(0, 0, 0, 0.3),
        0.5em 0 0.5em -0.3em rgba(0, 0, 0, 0.3);
    padding: 1em;
    padding-left: 14em;
    padding-right: 14em;
    border-radius: 5px;
`

const UserAceptanceModal: React.FC<FormConditionsModalProps> = ({ show, onClose, userAceptanceOption }) => {
    const renderModalContent = useMemo(() => {
        switch (userAceptanceOption) {
            case UserAceptanceModalOption.CesionDatos:
                return <CesionDatosContainer />
            case UserAceptanceModalOption.CompromisoConfidencialidad:
                return <CompromisoConfidencialidadContainer />
            case UserAceptanceModalOption.NormasSocios:
                return <RelativoSociosTextContainer />
            default:
                return null
        }
    }, [userAceptanceOption])

    const renderModalTitle = useMemo(() => {
        switch (userAceptanceOption) {
            case UserAceptanceModalOption.CesionDatos:
                return <CesionDatosModalTittle />
            case UserAceptanceModalOption.CompromisoConfidencialidad:
                return <ComrpomisoConfidencialidadModalTittle />
            case UserAceptanceModalOption.NormasSocios:
                return <RelativoSociosModalTittle />
            default:
                return null
        }
    }, [userAceptanceOption])

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{renderModalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{renderModalContent}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

const StyledLabel = styled(BootstrapForm.Label)`
    font-weight: bold;
`
const StyledRow = styled(Row)``

const CheckBoxWithLabel: React.FC<{ name: string; label: string }> = ({ name, label }) => (
    <StyledRow class="container-sm">
        <Col>
            <StyledLabel>{label}</StyledLabel>
        </Col>
        <Col>
            <Field type="checkbox" name={name} className="checkbox-style" />
            <BootstrapForm.Text className="text-muted text-label">He leído y acepto las condiciones.</BootstrapForm.Text>
        </Col>
    </StyledRow>
)

const SignUpFormFourthStep: React.FC<SignUpFormStepProps> = ({ formikProps, previousStepFunction }) => {
    const [selectedAceptanceOption, setSelectedAceptanceOption] = useState<UserAceptanceModalOption>(UserAceptanceModalOption.CesionDatos)
    const [userAceptanceModalOpen, setUserAceptanceModalOpen] = useState(false)

    const handleUserAceptanceModalClose = useCallback(() => setUserAceptanceModalOpen(false), [])
    const handleModalOpen = useCallback((option: UserAceptanceModalOption) => {
        setSelectedAceptanceOption(option)
        setUserAceptanceModalOpen(true)
    }, [])

    const { dirty, isValid, isSubmitting } = formikProps

    return (
        <MainContainer>
            <FormStyledContainer>
                <UserAceptanceModal show={userAceptanceModalOpen} onClose={handleUserAceptanceModalClose} userAceptanceOption={selectedAceptanceOption} />
                <CheckBoxWithLabel name="membersTerms" label="Normas del socio:" />
                <StyledRow class="container-sm">
                    <Col>
                        <Button variant="link" onClick={() => handleModalOpen(UserAceptanceModalOption.NormasSocios)}>
                            Ver las condiciones sobre normas de los socios.
                        </Button>
                    </Col>
                </StyledRow>
                <CheckBoxWithLabel name="privacyTerms" label="Protección datos:" />
                <StyledRow class="container-sm">
                    <Col>
                        <Button variant="link" onClick={() => handleModalOpen(UserAceptanceModalOption.CesionDatos)}>
                            Ver las condiciones sobre protección de datos.
                        </Button>
                    </Col>
                </StyledRow>
                <CheckBoxWithLabel name="confidencialityTerms" label="Compromiso de confidencialidad:" />
                <StyledRow class="container-sm">
                    <Col>
                        <Button variant="link" onClick={() => handleModalOpen(UserAceptanceModalOption.CompromisoConfidencialidad)}>
                            Ver las condiciones sobre el compromiso de confidencialidad.
                        </Button>
                    </Col>
                </StyledRow>
                <ButtonRow>
                    <ButtonCol>
                        <Button variant="primary" onClick={previousStepFunction}>
                            Atrás
                        </Button>
                    </ButtonCol>
                    <Col></Col>
                    <Col>
                        <Button type="submit" variant="success" disabled={!dirty || !isValid || isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Enviando...
                                </>
                            ) : (
                                'Registrarse'
                            )}
                        </Button>
                    </Col>
                </ButtonRow>
            </FormStyledContainer>
        </MainContainer>
    )
}

export default SignUpFormFourthStep

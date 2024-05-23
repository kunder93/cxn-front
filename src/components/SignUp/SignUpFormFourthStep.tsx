import { Field } from 'formik'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import BootstrapForm from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import { ButtonCol, ButtonRow, FormStyledContainer, MainContainer } from './CommonStyles'
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
    <StyledRow className="container-sm">
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
                <StyledRow className="container-sm">
                    <Col>
                        <Button variant="link" onClick={() => handleModalOpen(UserAceptanceModalOption.NormasSocios)}>
                            Ver las condiciones sobre normas de los socios.
                        </Button>
                    </Col>
                </StyledRow>
                <CheckBoxWithLabel name="privacyTerms" label="Protección datos:" />
                <StyledRow className="container-sm">
                    <Col>
                        <Button variant="link" onClick={() => handleModalOpen(UserAceptanceModalOption.CesionDatos)}>
                            Ver las condiciones sobre protección de datos.
                        </Button>
                    </Col>
                </StyledRow>
                <CheckBoxWithLabel name="confidencialityTerms" label="Compromiso de confidencialidad:" />
                <StyledRow className="container-sm">
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

import React, { useMemo } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FormConditionsModalProps, UserAceptanceModalOption } from './SignUpFormTypes'
import {
    CesionDatosContainer,
    CompromisoConfidencialidadContainer,
    RelativoSociosTextContainer,
    CesionDatosModalTittle,
    ComrpomisoConfidencialidadModalTittle,
    RelativoSociosModalTittle
} from './UserAceptanceTextStyle'

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

export default UserAceptanceModal

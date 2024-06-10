import React from 'react'
import { ListGroup } from 'react-bootstrap'

// enum for benefit options
export enum MembersBenefitOption {
    COMPETICION_FEDERADA,
    MATERIAL_AJEDREZ,
    TUTORIZACION
}

// type for the component props
interface MembersBenefitsProps {
    benefitOption: MembersBenefitOption
}

// benefit messages
const benefitMessages: { [key in MembersBenefitOption]: React.ReactNode } = {
    [MembersBenefitOption.COMPETICION_FEDERADA]: (
        <>
            <ListGroup.Item>
                <strong>Ficha federativa:</strong> Participa en las competiciones. ¡Obtén elo tanto nacional como internacional!
            </ListGroup.Item>
            <ListGroup.Item>
                <strong>Competiciones por equipos:</strong> Participa como integrante del equipo CXN en la Liga o competiciones autonómicas por equipos.
            </ListGroup.Item>
        </>
    ),
    [MembersBenefitOption.MATERIAL_AJEDREZ]: (
        <>
            <ListGroup.Item>
                <strong>Material de ajedrez:</strong> Obtén acceso a material de ajedrez de alta calidad, incluyendo tableros, piezas y relojes.
            </ListGroup.Item>
            <ListGroup.Item>
                <strong>Libros y programas: </strong>Libros, revistas, programas de ajedrez, asesoramiento sobre su uso.</ListGroup.Item>
        </>
    ),
    [MembersBenefitOption.TUTORIZACION]: (
        <>
            <ListGroup.Item>
                <strong>Tutorización:</strong> Accede a tutorización personalizada con entrenadores expertos para mejorar tu juego.
            </ListGroup.Item>
            <ListGroup.Item>
                <strong>Clases y talleres:</strong> Participa en clases y talleres organizados por el club para todos los niveles.
            </ListGroup.Item>
        </>
    )
}

// MembersBenefits component definition
const MembersBenefits: React.FC<MembersBenefitsProps> = ({ benefitOption }) => {
    return (
        <>
            <h3>
                <strong>Hacerte socio tiene muchas ventajas:</strong>
            </h3>
            <ListGroup variant="flush">
                {benefitMessages[benefitOption]}
            </ListGroup>
        </>
    )
}

export default MembersBenefits

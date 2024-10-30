import React from 'react'
import { ListGroup } from 'react-bootstrap'
import FederateConditionsCard from './FederateConditionsCard'

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
    [MembersBenefitOption.COMPETICION_FEDERADA]: <FederateConditionsCard></FederateConditionsCard>,
    [MembersBenefitOption.MATERIAL_AJEDREZ]: (
        <>
            <ListGroup.Item>
                <strong>Material de ajedrez:</strong> Obtén acceso a material de ajedrez de alta calidad, incluyendo tableros, piezas y relojes.
            </ListGroup.Item>
            <ListGroup.Item>
                <strong>Libros y programas: </strong>Libros, revistas, programas de ajedrez, asesoramiento sobre su uso.
            </ListGroup.Item>
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
            <h3>Hacerte socio tiene muchas ventajas:</h3>
            <ListGroup variant="flush">{benefitMessages[benefitOption]}</ListGroup>
        </>
    )
}

export default MembersBenefits

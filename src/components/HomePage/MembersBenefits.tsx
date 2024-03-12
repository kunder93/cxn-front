import React from 'react'
import { ListGroup } from 'react-bootstrap'

const MembersBenefits: React.FC = () => {
    return (
        <>
            <h3>
                <strong>Hacerte socio tiene muchas ventajas:</strong>
            </h3>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    {' '}
                    <strong>Ficha federativa: </strong> Participa en las competiciones; Compite y obten elo tanto nacional como internacional !
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Compite en competiciones por equipos: </strong> Participa como integrante del equipo CXN en la Liga o competiciones autonómicas por
                    equipos.{' '}
                </ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            </ListGroup>
        </>
    )
}

export default MembersBenefits

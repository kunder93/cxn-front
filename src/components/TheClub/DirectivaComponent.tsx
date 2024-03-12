import React from 'react'
import { Card, Container } from 'react-bootstrap'
import styled from 'styled-components'
import { PersonSquare } from 'react-bootstrap-icons'

const CardStyled = styled(Card)`
    width: 200px;
    justify-self: center;
`

const ContainerStyled = styled(Container)`
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto;
    gap: 20px;
    @media only screen and (max-width: 1250px) {
        grid-template-columns: auto auto;
 
    @media only screen and (max-width: 850px) {
        grid-template-columns: auto;
    }
}
`

const PersonSquareStyled = styled(PersonSquare)`
    width: auto;
    height: auto;
    padding-left: 0.5em;
    padding-right: 0.5em;
    padding-top: 0.5em;
`

const CardTitle = styled.h3`
    font-size: 150%;
`
interface DirectivaCardProps {
    title: string
    person: string
}
const DirectivaCard: React.FC<DirectivaCardProps> = ({ title, person }) => (
    <CardStyled>
        <Card.Header>
            <CardTitle>{title}</CardTitle>
        </Card.Header>
        <Card.Img as={PersonSquareStyled} />
        <Card.Body>
            <Card.Title>{person}</Card.Title>
        </Card.Body>
    </CardStyled>
)

const DirectivaComponent: React.FC = () => {
    const directivaData: { title: string; person: string }[] = [
        { title: 'Presidente', person: 'Juan Manuel Caneiro Couto' },
        { title: 'Secretario', person: 'Pablo Fernandez Lopez' },
        { title: 'Tesorero', person: 'Santiago Paz Pérez' },
        { title: 'Vicepresidente', person: 'Luisa' },
        { title: 'Vocal', person: 'Almudena' },
        { title: 'Vocal', person: 'Raul' }
    ]

    return (
        <ContainerStyled>
            {directivaData.map((item, index) => (
                <DirectivaCard key={index} title={item.title} person={item.person} />
            ))}
        </ContainerStyled>
    )
}

export default DirectivaComponent

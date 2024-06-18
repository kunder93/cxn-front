import React from 'react'
import { Card, Container } from 'react-bootstrap'
import styled from 'styled-components'
//import { PersonSquare } from 'react-bootstrap-icons'

const CardStyled = styled(Card)`
    width: 200px;
    justify-self: center;
    border-radius: 0% !important;
    border: 1px solid #695839 !important;
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

const PersonImage = styled(Card.Img)`
    height: 200px;
    object-fit: cover; /* Evita que la imagen se estire */
    border-radius: 0% !important;
`

const CardTitle = styled.h3`
    font-size: 130%;
    font-weight: bold;
`
interface DirectivaCardProps {
    title: string
    person: string
    imageSrc: string
    imageAlt: string
}
const DirectivaCard: React.FC<DirectivaCardProps> = ({ title, person, imageSrc, imageAlt }) => (
    <CardStyled>
        <Card.Header style={{ backgroundColor: '#9e9e9e ', borderRadius: '0%' }}>
            <CardTitle>{title}</CardTitle>
        </Card.Header>
        <PersonImage src={imageSrc} alt={imageAlt} />
        <Card.Body style={{ backgroundColor: 'grey' }}>
            <Card.Title style={{ fontWeight: 'bold' }}>{person}</Card.Title>
        </Card.Body>
    </CardStyled>
)

const DirectivaComponent: React.FC = () => {
    const directivaData: { title: string; person: string; imageSrc: string; imageAlt: string }[] = [
        { title: 'Presidente', person: 'Juan Manuel Caneiro Couto', imageSrc: '/TheClub/JuanCaneiro.avif', imageAlt: 'Presidente Juan Manuel Caneiro Couto' },
        { title: 'Secretario', person: 'Pablo Fernández López', imageSrc: '/TheClub/PabloFernandez.avif', imageAlt: 'Secretario Pablo Fernández López' },
        { title: 'Tesorero', person: 'David Roca', imageSrc: '/TheClub/DavidRoca.avif', imageAlt: 'Tesorero David Roca' },
        { title: 'Vicepresidenta', person: 'Luisa', imageSrc: '/TheClub/Luisa.avif', imageAlt: 'Vicepresidenta Luisa' },
        { title: 'Vocal', person: 'Almudena', imageSrc: '/TheClub/femaleGenericProfile.avif', imageAlt: 'Vocal Almudena' },
        { title: 'Vocal', person: 'Raul', imageSrc: '/TheClub/maleGenericProfile.avif', imageAlt: 'Vocal Raul' },
        { title: 'Vocal', person: 'Santiago Paz Pérez', imageSrc: '/TheClub/maleGenericProfile.avif', imageAlt: 'Vocal Santiago Paz Pérez' }
    ]

    return (
        <ContainerStyled>
            {directivaData.map((item, index) => (
                <DirectivaCard key={index} title={item.title} person={item.person} imageSrc={item.imageSrc} imageAlt={item.imageAlt} />
            ))}
        </ContainerStyled>
    )
}

export default DirectivaComponent

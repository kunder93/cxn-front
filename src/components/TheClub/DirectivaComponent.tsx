import React from 'react'
import { Card, Container } from 'react-bootstrap'
import styled from 'styled-components'

/**
 * Styled Card component with custom width, alignment, and border styles.
 */
const CardStyled = styled(Card)`
    width: 200px;
    justify-self: center;
    border-radius: 0% !important;
    border: 1px solid #695839 !important;
`

/**
 * Styled Container component using CSS Grid layout.
 * The grid adapts to screen size with responsive design breakpoints.
 */
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

/**
 * Styled component for images inside the Card.
 * Ensures the image fits properly and doesn't stretch.
 */
const PersonImage = styled(Card.Img)`
    height: 200px;
    object-fit: cover; /* Prevents image from stretching */
    border-radius: 0% !important;
`

/**
 * Styled component for card titles with custom font size and weight.
 */
const CardTitle = styled.h3`
    font-size: 130%;
    font-weight: bold;
`

/**
 * Props for the DirectivaCard component.
 * @typedef {Object} DirectivaCardProps
 * @property {string} title - The role/title of the person in the directive.
 * @property {string} person - The name of the person.
 * @property {string} imageSrc - The source path for the person's image.
 * @property {string} imageAlt - The alt text for the person's image.
 */
interface DirectivaCardProps {
    title: string
    person: string
    imageSrc: string
    imageAlt: string
}

/**
 * DirectivaCard component represents a single card for a directive member.
 * Displays their role, name, and image.
 *
 * @param {DirectivaCardProps} props - The props for the component.
 * @returns {React.JSX.Element} The rendered card component for a directive member.
 */
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

/**
 * DirectivaComponent is a container component that renders a list of DirectivaCard components.
 * It displays the directive team of the club using a responsive grid layout.
 *
 * @returns {React.JSX.Element} The container with all directive members' cards.
 */
const DirectivaComponent: React.FC = () => {
    // Data for directive members including title, name, and image details
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

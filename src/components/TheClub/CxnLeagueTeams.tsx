import React from 'react'
import { Card } from 'react-bootstrap'
import styled from 'styled-components'

/**
 * Main container of accordion Teams section.
 */
const TeamsMainContainer = styled.section`
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto auto;
    grid-template-areas:
        ' teamsHeader teamsHeader teamsHeader '
        ' teamsContent teamsContent teamsContent '
        ' advertisingDateText advertisingDateText advertisingDateText ';
    gap: 2vw;
    padding-left: 1vw;
    padding-right: 1vw;
`
/**
 * Header section, contains image and title.
 */
const TeamsSectionHeaderContainer = styled.div`
    grid-area: teamsHeader;
`

/**
 * Body of the main section where is the cards info about cxn teams.
 */
const BodyContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    grid-area: teamsContent;
    gap: 1.5em;
    background-color: #d8cdba;
    justify-content: center; /* Centra horizontalmente los elementos */
    /* Establece el ancho máximo de las cards */
    & > article {
        width: 50%; /* Ocupa máximo el 50% del contenedor */
        max-width: 300px; /* Ancho máximo */
    }
`

/**
 * Footer of main section. Explain details about teams competition initial and end dates.
 */
const AdvertisingLeagueDate = styled.div`
    grid-area: advertisingDateText;
`

/**
 * Header image style.
 */
const LogoFegaxa = styled.img`
    height: 180px;
`

/**
 * Propiedades que se esperan para el componente TeamCard.
 * @interface TeamCardProps
 * @property {string} teamName - Nombre del equipo.
 * @property {string} division - División a la que pertenece el equipo.
 * @property {string} description - Descripción o información adicional sobre el equipo.
 */
interface TeamCardProps {
    teamName: string
    division: string
    description: string
}


const MyCard = styled(Card)`
    aspect-ratio: 1.2;
`

/**
 * Componente que representa la información de un equipo.
 * @param {TeamCardProps} teamName - Nombre del equipo.
 * @param {TeamCardProps} division - División a la que pertenece el equipo.
 * @param {TeamCardProps} description - Descripción o información adicional sobre el equipo.
 */
const TeamInfoCard: React.FC<TeamCardProps> = ({ teamName, division, description }: TeamCardProps) => (
    <article>
        <MyCard>
            <Card.Header>
                <h3>{teamName}</h3>
            </Card.Header>
            <Card.Body>
                <Card.Title>{division}</Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </MyCard>
    </article>
)

const teamsInfo: TeamCardProps[] = [
    {
        teamName: 'NARONTEC CXN.',
        division: 'Equipo en 1ª división.',
        description: 'Destinado a ajedrecistas con un nivel Elo 1700-2000 puntos.'
    },
    {
        teamName: 'NARONTEC CXN B',
        division: 'Equipo en 2ª división.',
        description: 'Destinado a ajedrecistas con un nivel Elo 1400-1700 puntos'
    },
    {
        teamName: 'NARONTEC CXN C',
        division: 'Equipo en 3ª división.',
        description: 'Destinado a ajedrecistas sin Elo o inferior a 1400 puntos.'
    },
    {
        teamName: 'NARONTEC CXN FEMININO',
        division: 'Equipo en 3º división',
        description: 'Nuestro equipo femenino, de momento en 3ª división.'
    },
    {
        teamName: 'CXN IES TERRA DE TRASANCOS',
        division: 'En 3ª división luchando por el ascenso.',
        description: 'Equipo formado por estudiantes del IES Terra de Trasancos.'
    },
    {
        teamName: 'Naron CXN Promesas',
        division: 'Equipo en 3ª división.',
        description: 'Equipo formado por los mas peques de la escuela.'
    }
]

const StyledLink = styled.a`
    height: auto;
    width: auto;
    &:focus {
        outline: 4px solid blue !important; // Estilo del borde de foco
    }
    /* Estilo de enfoque cuando se navega con el teclado */
    &:focus:not(:focus-visible) {
        outline: none; // Eliminar el borde predeterminado
    }


`
const TeamInfoCardStyled = styled(TeamInfoCard)`

`
const AAA = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; /* Centra verticalmente los elementos */
    align-items: center; /* Centra horizontalmente los elementos */
    height: 100%;

`

const CxnLeagueTeams: React.FC = () => {
    const leagueStartDate = 'Febrero'
    const leagueEndDate = 'Junio'
    return (
        <TeamsMainContainer>
            <TeamsSectionHeaderContainer>
                <AAA>
                    <StyledLink href={'https://www.fegaxa.org'} target="_blank" rel="noopener noreferrer" aria-description="Federacion Galega Xadrez link">
                        <LogoFegaxa src="/logo_fegaxa.avif" alt="Federacion Galega Xadrez Logo"></LogoFegaxa>
                    </StyledLink>{' '}
                    <h2 style={{paddingTop:'0.5em'}}>
                        Equipos en liga gallega:
                    </h2>
                </AAA>
            </TeamsSectionHeaderContainer>
            <BodyContainer>
                {teamsInfo.map((team, index) => (
                    <TeamInfoCardStyled key={index} teamName={team.teamName} division={team.division} description={team.description} />
                ))}
            </BodyContainer>
            <AdvertisingLeagueDate>
                <p style={{ fontSize: '1.5em' }} >
                    La liga comienza en {leagueStartDate} y finaliza en {leagueEndDate}.
                    <br /> Los enfrentamientos se realizan los sábados a las 17:30. <br />
                </p>
            </AdvertisingLeagueDate>
        </TeamsMainContainer>
    )
}

export default CxnLeagueTeams

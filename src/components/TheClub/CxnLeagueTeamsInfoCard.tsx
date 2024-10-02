import React from 'react'
import { Card } from 'react-bootstrap'
import styled from 'styled-components'

/**
 * Styled component for the Card with a fixed aspect ratio.
 */
const MyCard = styled(Card)`
    aspect-ratio: 1.2;
`

/**
 * Interface that defines the structure for each team card.
 * @interface ITeamCard
 * @property {string} teamName - The name of the team.
 * @property {string} division - The division in which the team plays.
 * @property {string} description - A description or additional information about the team.
 */
interface ITeamCard {
    teamName: string
    division: string
    description: string
}

/**
 * Component that renders information about several teams in a card format.
 *
 * The teams' information is stored in an array and mapped to generate individual
 * cards for each team, displaying the team name, division, and a description.
 *
 * @returns {JSX.Element} - A React component that renders a list of teams as cards.
 */
const CxnLeagueTeamsInfoCard: React.FC = () => {
    // List of teams and their corresponding information.
    const teamsInfoList: ITeamCard[] = [
        {
            teamName: 'NARONTEC CXN',
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
            description: 'Equipo formado por los más peques de la escuela.'
        }
    ]

    return (
        <>
            {/* Maps each team to generate a card with team details */}
            {teamsInfoList.map((team, index) => (
                <article key={index}>
                    <MyCard>
                        <Card.Header>
                            <h3>{team.teamName}</h3>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{team.division}</Card.Title>
                            <Card.Text>{team.description}</Card.Text>
                        </Card.Body>
                    </MyCard>
                </article>
            ))}
        </>
    )
}

export default CxnLeagueTeamsInfoCard

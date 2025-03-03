import React from 'react'
import styled from 'styled-components'
import CxnLeagueTeamsInfoCard from './CxnLeagueTeamsInfoCard'

/**
 * Main container for the Teams section, styled with CSS grid.
 * It includes header, content (team cards), and footer for advertising league dates.
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
 * Header container of the Teams section, contains the image and title.
 */
const TeamsSectionHeaderContainer = styled.div`
    grid-area: teamsHeader;
`

/**
 * Body container of the Teams section where team cards are displayed.
 * It uses Flexbox for layout and ensures cards are responsive.
 */
const BodyContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    grid-area: teamsContent;
    gap: 1.5em;
    background-color: #d8cdba;
    justify-content: center; /* Horizontally center the cards */
    & > article {
        width: 50%; /* Each card takes up to 50% of the container */
        max-width: 300px; /* Maximum card width */
    }
`

/**
 * Footer container that displays information about the league's start and end dates.
 */
const AdvertisingLeagueDate = styled.div`
    grid-area: advertisingDateText;
`

/**
 * Styled component for the league logo image in the header section.
 */
const LogoFegaxa = styled.img`
    height: 180px;
`

/**
 * Styled link component that includes focus and accessibility styles.
 */
const StyledLink = styled.a`
    height: auto;
    width: auto;
    &:focus {
        outline: 4px solid blue !important; /* Focus border style */
    }
    &:focus:not(:focus-visible) {
        outline: none; /* Removes default outline when not focused via keyboard */
    }
`

/**
 * Wrapper component for centering content within its container.
 * Uses Flexbox to center both horizontally and vertically.
 */
const WrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; /* Vertically center elements */
    align-items: center; /* Horizontally center elements */
    height: 100%;
`

/**
 * Functional component that renders the main teams section with header, content (team cards), and footer.
 *
 * The content includes:
 * - Header with an image and title.
 * - A list of team information cards.
 * - Footer with league start and end dates.
 *
 * @returns {React.JSX.Element} - A React component that displays the teams in the league and their details.
 */
const CxnLeagueTeams: React.FC = () => {
    const leagueStartDate = 'Febrero'
    const leagueEndDate = 'Junio'

    return (
        <TeamsMainContainer>
            {/* Header section with logo and title */}
            <TeamsSectionHeaderContainer>
                <WrapperStyled>
                    <StyledLink href={'https://www.fegaxa.org'} target="_blank" rel="noopener noreferrer" aria-description="Federacion Galega Xadrez link">
                        <LogoFegaxa src="/logo_fegaxa.avif" alt="Federacion Galega Xadrez Logo" />
                    </StyledLink>
                    <h2 style={{ paddingTop: '0.5em' }}>Equipos en liga gallega:</h2>
                </WrapperStyled>
            </TeamsSectionHeaderContainer>

            {/* Body section with team information cards */}
            <BodyContainer>
                <CxnLeagueTeamsInfoCard />
            </BodyContainer>

            {/* Footer section with league date information */}
            <AdvertisingLeagueDate>
                <p style={{ fontSize: '1.5em' }}>
                    La liga comienza en {leagueStartDate} y finaliza en {leagueEndDate}.
                    <br /> Los enfrentamientos se realizan los sábados a las 17:30. <br />
                </p>
            </AdvertisingLeagueDate>
        </TeamsMainContainer>
    )
}

export default CxnLeagueTeams

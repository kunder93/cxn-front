import React from 'react'
import styled from 'styled-components'
import { ContadorFechaFundacionClub, ContadorSocios } from './CounterBar'

// Styled component for the main title of the page
const PageTitle = styled.h1`
    padding-top: 0.5em;
    padding-left: 0.5em;
    padding-bottom: 0.1em;
`

// Styled component for the container holding the info data bars
const InfoDataBarContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    column-gap: 50px;
    padding-left: 1.25em;
    padding-bottom: 1em;
`

// Styled component for the first block container
const FirstBlockContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
`

/**
 * HeaderInfoClubBar component displays the title and important information about the club.
 * It includes the foundation year and the number of members.
 *
 * @returns {React.JSX.Element} The rendered header information for the club.
 */
const HeaderInfoClubBar: React.FC = () => {
    return (
        <header>
            <PageTitle>Circulo Xadrez Naron</PageTitle>
            <InfoDataBarContainer>
                <FirstBlockContainer>
                    <h2 style={{ fontSize: '150%' }}>
                        Desde
                        <ContadorFechaFundacionClub />
                        impulsando el ajedrez.
                    </h2>
                </FirstBlockContainer>
                <FirstBlockContainer>
                    <h2 style={{ fontSize: '150%' }}>
                        {' '}
                        Somos:
                        <ContadorSocios />
                        socios.
                    </h2>
                </FirstBlockContainer>
            </InfoDataBarContainer>
        </header>
    )
}

export default HeaderInfoClubBar

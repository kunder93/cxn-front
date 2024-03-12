import React from 'react'
import styled from 'styled-components'
import { ContadorFechaFundacionClub, ContadorSocios } from './CounterBar'


const PageTitle = styled.h1`
    padding-top: 0.5em;
    padding-left: 0.5em;
    padding-bottom: 0.1em;
`
const InfoDataBarContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    column-gap: 50px;
    padding-left: 1.25em;
    padding-bottom: 1em;
`
const FirstBlockContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
`
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
                        <ContadorSocios></ContadorSocios>
                        socios.
                    </h2>
                </FirstBlockContainer>
            </InfoDataBarContainer>
        </header>
    )
}

export default HeaderInfoClubBar
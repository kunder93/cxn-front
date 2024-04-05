import TheClubInfoAccordion from '../components/TheClub/TheClubInfoAccordion'
import React from 'react'
import { HeaderPicture, MainContainerStyled, MainContentContainer, PageHeaderImage } from '../components/Common/CommonStyles'

import { SetPageTitle } from '../utility/functions'
import HeaderInfoClubBar from '../components/TheClub/HeaderInfoClubBar'
import { useLocation } from 'react-router'

const FotoTemporalPortadaClub = '/TheClub//TheClubHeader.avif'

interface LocationState {
    accordionItemToOpen: string
}

const TheClubPage: React.FC = () => {
    SetPageTitle('CXN El club')
    const location = useLocation()
    //location.state is object not null and type of LocationState
    const state: LocationState | undefined = typeof location.state === 'object' && location.state !== null ? (location.state as LocationState) : undefined
    // Extraer el valor de 'accordionItemToOpen' del objeto state
    const initialOpenElement = state ? state.accordionItemToOpen : '0'
    // Ahora, state contiene los datos pasados desde el componente anterior
    return (
        <MainContainerStyled>
            <HeaderPicture>
                <source srcSet={FotoTemporalPortadaClub} type="image/avif" />
                <PageHeaderImage src={FotoTemporalPortadaClub} alt="Clase vacia" title="Clase vacia" />
            </HeaderPicture>
            <MainContentContainer>
                <HeaderInfoClubBar />
                <TheClubInfoAccordion initialOpenElement={initialOpenElement}></TheClubInfoAccordion>
            </MainContentContainer>
        </MainContainerStyled>
    )
}

export default TheClubPage

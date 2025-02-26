import React from 'react'
import { useLocation } from 'react-router'
import TheClubInfoAccordion from '../components/TheClub/TheClubInfoAccordion'
import { HeaderPicture, MainContainerStyled, MainContentContainer, PageHeaderImage } from '../components/Common/CommonStyles'
import HeaderInfoClubBar from '../components/TheClub/HeaderInfoClubBar'
import usePageTitle from '../components/Common/hooks/usePageTitle'

// Path to the club header image
const FotoTemporalPortadaClub = '/TheClub/TheClubHeader.avif'

// Interface for location state passed through the router
interface LocationState {
    /**
     * The ID of the accordion item to be opened by default.
     * @type {string}
     */
    accordionItemToOpen: string
}

/**
 * TheClubPage component displays the club's information.
 * It uses the router's location state to determine which accordion item to open initially.
 *
 * @returns {React.JSX.Element} The rendered component.
 */
const TheClubPage: React.FC = () => {
    usePageTitle('CXN El club')

    // Get the current location from the router
    const location = useLocation() // No type argument here

    // Type the state explicitly
    const state = location.state as LocationState | undefined

    // Use optional chaining to get the initial open element
    const initialOpenElement = state?.accordionItemToOpen ?? '0'

    return (
        <MainContainerStyled>
            <HeaderPicture>
                <source srcSet={FotoTemporalPortadaClub} type="image/avif" />
                <PageHeaderImage src={FotoTemporalPortadaClub} alt="Clase vacia" title="Clase vacia" />
            </HeaderPicture>
            <MainContentContainer>
                <HeaderInfoClubBar />
                <TheClubInfoAccordion initialOpenElement={initialOpenElement} />
            </MainContentContainer>
        </MainContainerStyled>
    )
}

export default TheClubPage

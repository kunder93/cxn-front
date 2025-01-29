import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import { backGroundColor, backgroundImageUrl } from '../components/Common/CommonStyles'
import usePageTitle from '../components/Common/hooks/usePageTitle'
import ActivitiesCarousel from 'components/Activities/ActivitiesCarousel'

const MainContainer = styled.div`
    background-color: ${backGroundColor};
    background-image: url(${backgroundImageUrl});
    align-items: center;
    padding-top: 1.5em;
    padding-bottom: 1em;
`

const pageTitleMsg = 'Próximas actividades a realizar:'

const PageTitle = styled.h1`
    color: white;
    text-align: center;
    font-size: 270%;
    background-color: #212529;
    margin-bottom: 0;
    padding-bottom: 1em;
`

const StyledContainer = styled(Container)``

/**
 * ActivitiesPage component that displays a list of upcoming activities.
 *
 * This component fetches and renders multiple activity cards,
 * along with a title for the page.
 *
 * @returns {JSX.Element} The rendered Activities page component.
 */
const ActivitiesPage = (): JSX.Element => {
    usePageTitle('CXN Actividades')
    return (
        <MainContainer>
            <StyledContainer>
                <PageTitle>{pageTitleMsg}</PageTitle>
                <ActivitiesCarousel />
            </StyledContainer>
        </MainContainer>
    )
}

export default ActivitiesPage

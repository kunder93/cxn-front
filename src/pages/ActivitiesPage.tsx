import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import { backGroundColor, backgroundImageUrl } from '../components/Common/CommonStyles'
import usePageTitle from '../components/Common/hooks/usePageTitle'
import ActivitiesCarousel from 'components/Activities/ActivitiesCarousel'
import { useCallback, useEffect, useState } from 'react'
import { IActivityWithImageUrl } from 'components/Activities/Types'
import { ACTIVITIES_URL } from 'resources/server_urls'
import axios from 'axios'

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
    const [activities, setActivities] = useState<IActivityWithImageUrl[]>([])
    const fetchActivities = useCallback(async () => {
        try {
            const response = await axios.get(ACTIVITIES_URL, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const activitiesData: IActivityWithImageUrl[] = response.data.map((activity: any) => ({
                title: activity.title,
                description: activity.description,
                startDate: activity.startDate ? new Date(activity.startDate).toISOString() : null,
                endDate: activity.endDate ? new Date(activity.endDate).toISOString() : null,
                category: activity.category,
                imageUrl: activity.image ? `data:image/jpeg;base64,${activity.image}` : 'default-image.jpg'
            }))

            setActivities(activitiesData) // Set the fetched activities directly
        } catch (error) {
            console.error('Failed to fetch activities:', error)
        }
    }, [])

    useEffect(() => {
        void fetchActivities()
    }, [fetchActivities])

    usePageTitle('CXN Actividades')
    return (
        <MainContainer>
            <StyledContainer>
                <PageTitle>{pageTitleMsg}</PageTitle>
                <ActivitiesCarousel activitiesList={activities} />
            </StyledContainer>
        </MainContainer>
    )
}

export default ActivitiesPage

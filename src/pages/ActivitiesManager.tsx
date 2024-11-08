import axios from 'axios'
import ActivitiesCarousel from 'components/Activities/ActivitiesCarousel'
import AddActivityModalForm from 'components/Activities/AddActivityModalForm'
import { IActivityWithImageUrl } from 'components/Activities/Types'
import { useCallback, useEffect, useState } from 'react'
import { PiPlusSquareFill } from 'react-icons/pi'
import { ACTIVITIES_URL } from 'resources/server_urls'
import { useAppSelector } from 'store/hooks'
import styled from 'styled-components'

const AddActivityIcon = styled(PiPlusSquareFill)`
    fill: blue;
    cursor: pointer;
    font-size: 4rem;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.2);
    }
`

const ActivitiesManager = () => {
    const [activities, setActivities] = useState<IActivityWithImageUrl[]>([])
    const [showModal, setShowModal] = useState(false)
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)

    // Function to add a new activity
    const addActivity = (activity: IActivityWithImageUrl) => {
        setActivities((prevActivities) => [...prevActivities, activity])
    }

    // Function to fetch activities from the API
    const fetchActivities = useCallback(async () => {
        try {
            const response = await axios.get(ACTIVITIES_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userJwt}`
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
    }, [userJwt])

    useEffect(() => {
        void fetchActivities()
    }, [fetchActivities])

    return (
        <div id="activities-manager">
            <AddActivityIcon onClick={() => setShowModal(true)} />
            <AddActivityModalForm show={showModal} onHide={() => setShowModal(false)} addActivity={addActivity} />
            <ActivitiesCarousel activitiesList={activities} />
        </div>
    )
}

export default ActivitiesManager

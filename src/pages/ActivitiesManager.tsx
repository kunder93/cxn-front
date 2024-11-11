// ActivitiesManager.tsx
import { useState } from 'react'
import ActivitiesCarousel from 'components/Activities/ActivitiesCarousel'
import AddActivityModalForm from 'components/Activities/AddActivityModalForm'
import { IActivityWithImageUrl } from 'components/Activities/Types'
import { PiPlusSquareFill } from 'react-icons/pi'
import styled from 'styled-components'
import { useFetchActivities } from 'components/Activities/Hooks'

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
    const { activities, error, addLocalActivity } = useFetchActivities()
    const [showModal, setShowModal] = useState(false)

    // Function to handle adding a new activity
    const handleAddActivity = (newActivity: IActivityWithImageUrl) => {
        addLocalActivity(newActivity) // Add activity locally without fetching
        setShowModal(false) // Close modal after adding activity
    }

    return (
        <div id="activities-manager">
            <AddActivityIcon onClick={() => setShowModal(true)} />
            <AddActivityModalForm show={showModal} onHide={() => setShowModal(false)} addActivity={handleAddActivity} />
            {error && <p>{error}</p>}
            <ActivitiesCarousel activitiesList={activities} />
        </div>
    )
}

export default ActivitiesManager

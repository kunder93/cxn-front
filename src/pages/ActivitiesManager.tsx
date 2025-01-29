// ActivitiesManager.tsx
import { useState } from 'react'
import ActivitiesCarousel from 'components/Activities/ActivitiesCarousel'
import AddActivityModalForm from 'components/Activities/AddActivityModalForm'
import { PiPlusSquareFill } from 'react-icons/pi'
import styled from 'styled-components'
import { useFetchActivities } from 'components/Activities/Hooks'
import { IActivity } from 'components/Activities/Types'

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
    const { addLocalActivity } = useFetchActivities()
    const [showModal, setShowModal] = useState(false)

    // Function to handle adding a new activity
    const handleAddActivity = (newActivity: IActivity) => {
        addLocalActivity(newActivity) // Add activity locally without fetching
        setShowModal(false) // Close modal after adding activity
    }

    return (
        <div id="activities-manager">
            <AddActivityIcon onClick={() => setShowModal(true)} />
            <AddActivityModalForm show={showModal} onHide={() => setShowModal(false)} addActivity={handleAddActivity} />
            <ActivitiesCarousel />
        </div>
    )
}

export default ActivitiesManager

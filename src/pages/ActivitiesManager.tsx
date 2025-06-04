// ActivitiesManager.tsx
import { useState } from 'react'
import ActivitiesCarousel from 'components/Activities/ActivitiesCarousel'
import AddActivityModalForm from 'components/Activities/AddActivity/AddActivityModalForm'
import { PiPlusSquareFill, PiTrash } from 'react-icons/pi'
import styled from 'styled-components'
import { useFetchActivities } from 'components/Activities/Hooks'
import { IActivity } from 'components/Activities/Types'
import RemoveActivityModalFormProps from 'components/Activities/RemoveActivity/RemoveActivityModal'

/**
 * Styled component for the "Add Activity" icon.
 *
 * - Displays a blue plus-square icon.
 * - Enlarges on hover.
 * - Opens the "Add Activity" modal when clicked.
 */
const AddActivityIcon = styled(PiPlusSquareFill)`
    fill: blue;
    cursor: pointer;
    font-size: 4rem;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.2);
    }
`

/**
 * Styled component for the "Remove Activity" icon.
 *
 * - Displays a red trash icon.
 * - Enlarges on hover.
 * - Opens the "Remove Activity" modal when clicked.
 */
const RemoveActivityIcon = styled(PiTrash)`
    fill: red;
    cursor: pointer;
    font-size: 4rem;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.2);
    }
`

/**
 * ActivitiesManager is a component that provides an interface to manage activities.
 *
 * It allows the user to:
 * - Add a new activity using a modal form.
 * - Remove an existing activity using a confirmation modal.
 * - View a list of activities using a carousel display.
 *
 * It uses internal state to toggle modals and local cache for adding/removing activities without refreshing the list from the server.
 *
 * @component
 */
const ActivitiesManager = () => {
    // State to control whether the "Add Activity" modal is visible
    const [addActivityModal, setAddActivityModal] = useState(false)

    // State to control whether the "Remove Activity" modal is visible
    const [removeActivityModal, setRemoveActivityModal] = useState(false)

    // Custom hook to fetch and locally manage activity data
    const { activities, error, loading, addLocalActivity, removeLocalActivity } = useFetchActivities()

    /**
     * Handles the logic for adding a new activity.
     *
     * Adds the activity to the local cache and closes the modal.
     *
     * @param newActivity - The new activity object to be added.
     */
    const handleAddActivity = (newActivity: IActivity) => {
        addLocalActivity(newActivity)
        setAddActivityModal(false)
    }

    /**
     * Handles the logic for removing an existing activity.
     *
     * Removes the activity from the local cache and closes the modal.
     *
     * @param activityTitle - The title of the activity to be removed.
     */
    const handleRemoveActivity = (activityTitle: string) => {
        removeLocalActivity(activityTitle)
        setRemoveActivityModal(false)
    }

    return (
        <div id="activities-manager">
            <AddActivityIcon
                onClick={() => {
                    setAddActivityModal(true)
                }}
            />
            <RemoveActivityIcon
                onClick={() => {
                    setRemoveActivityModal(true)
                }}
            />
            <AddActivityModalForm
                show={addActivityModal}
                onHide={() => {
                    setAddActivityModal(false)
                }}
                addActivity={handleAddActivity}
            />
            <RemoveActivityModalFormProps
                show={removeActivityModal}
                onHide={() => {
                    setRemoveActivityModal(false)
                }}
                removeActivity={handleRemoveActivity}
                activitiesList={activities}
            />
            <ActivitiesCarousel activities={activities} error={error} loading={loading} />
        </div>
    )
}

export default ActivitiesManager

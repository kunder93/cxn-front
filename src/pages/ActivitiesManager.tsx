import ActivitiesCarousel from 'components/Activities/ActivitiesCarousel'
import AddActivityModalForm from 'components/Activities/AddActivityModalForm'
import { useState } from 'react'
import { PiPlusSquareFill } from 'react-icons/pi'
import styled from 'styled-components'

const AddActivityIcon = styled(PiPlusSquareFill)`
    fill: blue;
    cursor: pointer;
    font-size: 4rem;
    transition: transform 0.3s ease; /* Transición suave */

    &:hover {
        transform: scale(1.2); /* Aumenta el tamaño al pasar el ratón */
    }
`

const ActivitiesManager = () => {
    const [showModal, setShowModal] = useState(false)
    return (
        <div id="activities-manager">
            {' '}
            <AddActivityIcon onClick={() => setShowModal(true)} />
            <AddActivityModalForm show={showModal} onHide={() => setShowModal(false)}></AddActivityModalForm>
            <ActivitiesCarousel></ActivitiesCarousel>
        </div>
    )
}

export default ActivitiesManager

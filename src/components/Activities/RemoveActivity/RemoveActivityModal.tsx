import React from 'react'
import { Button, Modal, ModalProps } from 'react-bootstrap'

//import { useNotificationContext } from 'components/Common/NotificationContext'

import 'react-datepicker/dist/react-datepicker.css'
import { ActivitiesList } from '../Types'
import RemoveActivityForm from './RemoveActivityForm'

/**
 * Props para el componente `RemoveActivityModal`.
 *
 * Extiende las props de `Modal` de React-Bootstrap.
 */
interface RemoveActivityModalProps extends ModalProps {
    removeActivity: (activityTitle: string) => void
    activitiesList: ActivitiesList
}

/**
 * `RemoveActivityModal` is a React component that displays a modal dialog
 * for selecting and confirming the deletion of an activity.
 *
 * It wraps the `RemoveActivityForm` component and includes a close button
 * in the footer to dismiss the modal.
 *
 * @component
 *
 * @param props - Props inherited from `react-bootstrap`'s `ModalProps` and custom ones.
 * @param props.show - Boolean indicating whether the modal is visible.
 * @param props.onHide - Function to call when the modal should be closed.
 * @param props.removeActivity - Callback function to remove the selected activity.
 * @param props.activitiesList - List of activities available to select from.
 *
 * @returns A Bootstrap `Modal` with a form to remove an activity.
 */
const RemoveActivityModal: React.FC<RemoveActivityModalProps> = (props: RemoveActivityModalProps) => {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar actividad</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RemoveActivityForm activitiesList={props.activitiesList} removeActivity={props.removeActivity}></RemoveActivityForm>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RemoveActivityModal

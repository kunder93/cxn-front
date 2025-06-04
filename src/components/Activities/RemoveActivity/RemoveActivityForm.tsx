import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { Button, Form as BootstrapForm, Modal } from 'react-bootstrap'
import { ActivitiesList } from '../Types'
import { useAppSelector } from 'store/hooks'
import { ACTIVITIES_URL } from 'resources/server_urls'
import axios from 'axios'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { NotificationType } from 'components/Common/hooks/useNotification'
import styled from 'styled-components'

/**
 * Styled component que envuelve el contenido de fondo del modal.
 * Aplica un efecto de difuminado (`blur`) cuando el modal está activo.
 *
 * @param isBlurred - Indica si se debe aplicar el difuminado.
 */
const ContentWrapper = styled.div<{ isBlurred: boolean }>`
    filter: ${({ isBlurred }) => (isBlurred ? 'blur(4px)' : 'none')};
    transition: filter 0.3s ease-in-out;
`

/**
 * Props para el componente `RemoveActivityForm`.
 */
interface IRemoveActivityFormProps {
    /**
     * Lista de actividades disponibles para eliminar.
     */
    activitiesList: ActivitiesList

    /**
     * Función callback que se ejecuta cuando se elimina una actividad con éxito.
     *
     * @param activityTitle - Título de la actividad a eliminar.
     */
    removeActivity: (activityTitle: string) => void
}

/**
 * `RemoveActivityForm` es un componente que permite al usuario seleccionar
 * y confirmar la eliminación de una actividad existente.
 *
 * Utiliza `Formik` para el manejo del formulario y `react-bootstrap` para la interfaz modal.
 * Aplica un efecto visual de difuminado al contenido de fondo mientras el modal está abierto.
 *
 * Además, envía una solicitud DELETE al backend para eliminar la actividad,
 * y muestra notificaciones en caso de éxito o error.
 *
 * @component
 *
 * @param activitiesList - Lista de actividades disponibles para ser eliminadas.
 * @param removeActivity - Función para actualizar el estado local tras la eliminación.
 *
 * @returns Un formulario para seleccionar una actividad y un modal para confirmar su eliminación.
 */
const RemoveActivityForm: React.FC<IRemoveActivityFormProps> = ({ activitiesList, removeActivity }) => {
    const [showModal, setShowModal] = useState(false)
    const [selectedActivityTitle, setSelectedActivityTitle] = useState<string>('')
    const userJwt = useAppSelector<string>((state) => state.users.jwt)
    const { showNotification } = useNotificationContext()

    const handleDelete = () => {
        try {
            // Enviar solicitud al servidor
            void axios.delete(`${ACTIVITIES_URL}/${encodeURIComponent(selectedActivityTitle)}`, {
                headers: { Authorization: `Bearer ${userJwt}` }
            })

            // Actualizar estado
            removeActivity(selectedActivityTitle)
            setSelectedActivityTitle('')
            showNotification(`La actividad ${selectedActivityTitle} ha sido eliminada correctamente.`, NotificationType.Success)
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                showNotification(`Error al eliminar la actividad ${selectedActivityTitle}: ${err.message}`, NotificationType.Error)
            } else {
                showNotification(`Error al eliminar la actividad ${selectedActivityTitle}.`, NotificationType.Error)
            }
        }
        setShowModal(false)
    }

    return (
        <>
            <Formik
                initialValues={{ activityTitle: '' }}
                onSubmit={(values) => {
                    setSelectedActivityTitle(values.activityTitle)
                    setShowModal(true)
                }}
            >
                {({ values, handleChange }) => (
                    <Form>
                        <BootstrapForm.Group controlId="activityTitle">
                            <BootstrapForm.Label>Selecciona una actividad</BootstrapForm.Label>
                            <BootstrapForm.Select name="activityTitle" value={values.activityTitle} onChange={handleChange}>
                                <option value="">-- Selecciona --</option>
                                {activitiesList.map((activity) => (
                                    <option key={activity.title} value={activity.title}>
                                        {activity.title}
                                    </option>
                                ))}
                            </BootstrapForm.Select>
                        </BootstrapForm.Group>
                        <Button type="submit" variant="danger" className="mt-3" disabled={!values.activityTitle}>
                            Borrar actividad
                        </Button>
                    </Form>
                )}
            </Formik>

            <ContentWrapper isBlurred={showModal}>
                <Modal
                    show={showModal}
                    onHide={() => {
                        setShowModal(false)
                    }}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar eliminación</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ¿Estás seguro de que deseas eliminar la actividad: <strong>{selectedActivityTitle} ?</strong>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setShowModal(false)
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </ContentWrapper>
        </>
    )
}

export default RemoveActivityForm

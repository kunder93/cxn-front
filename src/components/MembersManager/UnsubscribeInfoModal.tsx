import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { UserProfile } from 'store/types/userTypes'

interface UnsubscribeInfoModalProps {
    /** Indicates whether the modal is visible */
    show: boolean
    /** Function to handle modal close */
    onHide: () => void
    /** User profile data of the member who initiated unsubscribe */
    rowData: UserProfile | null
}

/**
 * Adds a number of days to a string date in dd/mm/yyyy format.
 * @param dateStr - The input date string (dd/mm/yyyy)
 * @param days - The number of days to add
 * @returns The resulting date in dd/mm/yyyy format
 */
const addDaysToDateString = (dateStr: string, days: number): string => {
    const [day, month, year] = dateStr.split('/').map(Number)
    const date = new Date(year, month - 1, day)
    date.setDate(date.getDate() + days)
    const newDay = String(date.getDate()).padStart(2, '0')
    const newMonth = String(date.getMonth() + 1).padStart(2, '0')
    const newYear = date.getFullYear()
    return `${newDay}/${newMonth}/${String(newYear)}`
}

/**
 * Modal that informs admin users that a member has initiated the unsubscribe process.
 * Displays full name, email, unsubscribe start date and deletion date (15 days later).
 */
const UnsubscribeInfoModal: React.FC<UnsubscribeInfoModalProps> = ({ show, onHide, rowData }) => {
    const unsubscribeDate = rowData?.unsubscribeDate ?? null
    const deletionDate = unsubscribeDate ? addDaysToDateString(unsubscribeDate, 15) : null

    return (
        <Modal show={show} onHide={onHide} aria-labelledby="unsubscribe-info-modal-title" centered>
            <Modal.Header closeButton>
                <Modal.Title id="unsubscribe-info-modal-title">{rowData ? 'Baja iniciada' : 'Error al cargar datos'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {rowData ? (
                    <>
                        <p>
                            <strong>Nombre completo:</strong> {rowData.name} {rowData.firstSurname} {rowData.secondSurname}
                        </p>
                        <p>
                            <strong>Correo electrónico:</strong> {rowData.email}
                        </p>
                        {unsubscribeDate && deletionDate && (
                            <>
                                <p>
                                    <strong>Fecha de inicio del proceso de baja:</strong> {unsubscribeDate}
                                </p>
                                <p>
                                    <strong>Fecha de eliminación definitiva:</strong> {deletionDate}
                                </p>
                            </>
                        )}
                        <p>El usuario será eliminado automáticamente si no revierte el proceso en los próximos 15 días.</p>
                    </>
                ) : (
                    <p>No se pudo cargar la información del socio.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UnsubscribeInfoModal

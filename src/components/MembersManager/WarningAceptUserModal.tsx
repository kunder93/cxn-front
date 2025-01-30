import { Field, Form, Formik } from 'formik'
import React from 'react'
import { Modal, Button, Form as BootstrapForm, Spinner } from 'react-bootstrap'
import axios, { AxiosError } from 'axios'
import { UserProfile, UserRole } from 'store/types/userTypes'
import { ACEPT_USER_URL } from 'resources/server_urls'
import { useAppSelector } from 'store/hooks'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { NotificationType } from 'components/Common/hooks/useNotification'
import styled from 'styled-components'

const SpinnerTextWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`

interface WarningAceptUserModalProps {
    show: boolean
    onHide: () => void
    rowData: UserProfile | null
    updateMemberRoles: (newUserRoles: UserRole[]) => void
}

interface FormValues {
    userDni: string
}

const WarningAceptUserModal: React.FC<WarningAceptUserModalProps> = ({ show, onHide, rowData, updateMemberRoles }) => {
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const { showNotification } = useNotificationContext()

    const handleAcceptMember = async (values: FormValues) => {
        if (!values.userDni) {
            console.error('User DNI is missing')
            return
        }

        try {
            await axios.patch(
                `${ACEPT_USER_URL}/${values.userDni}`,
                {}, // An empty request body for the PATCH request
                {
                    headers: {
                        Authorization: `Bearer ${userJwt}`
                    }
                }
            )

            // Update the user's roles after a successful response
            updateMemberRoles([UserRole.SOCIO])

            showNotification('Usuario ' + rowData?.name + ' ' + rowData?.firstSurname + ' ' + 'aceptado como socio !', NotificationType.Success)
            onHide() // Close the modal after success
        } catch (error) {
            const axErr = error as AxiosError
            showNotification('Surgio un error: ' + axErr.message, NotificationType.Error)
        }
    }

    return (
        <Modal show={show} onHide={onHide} aria-labelledby="warning-modal-title" centered>
            <Modal.Header closeButton>
                <Modal.Title id="warning-modal-title">{rowData ? 'Aceptar miembro' : 'Error al cargar datos'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {rowData ? (
                    <>
                        <Formik initialValues={{ userDni: rowData.dni }} onSubmit={handleAcceptMember}>
                            {({ isSubmitting }) => (
                                <Form>
                                    <BootstrapForm.Group controlId="userDni">
                                        <BootstrapForm.Label>DNI del usuario:</BootstrapForm.Label>
                                        <Field
                                            name="userDni"
                                            type="text"
                                            className="form-control"
                                            disabled // Read-only, as it's pre-filled
                                        />
                                    </BootstrapForm.Group>
                                    <p>
                                        <strong>Nombre:</strong> {`${rowData.name} ${rowData.firstSurname} ${rowData.secondSurname}`}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {rowData.email}
                                    </p>
                                    <p>Puede aceptar la solicitud de este usuario presionando el botón "Aceptar".</p>
                                    <div className="mt-3">
                                        <Button type="submit" variant="success" disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <SpinnerTextWrapper>
                                                    <Spinner size="sm"></Spinner>Cargando...
                                                </SpinnerTextWrapper>
                                            ) : (
                                                <>Aceptar petición</>
                                            )}
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </>
                ) : (
                    <p>No se encontraron detalles del usuario.</p>
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

export default WarningAceptUserModal

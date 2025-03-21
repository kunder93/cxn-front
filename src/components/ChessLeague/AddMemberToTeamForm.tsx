import React from 'react'
import { Form, Formik } from 'formik'
import { Form as BootstrapForm, Button, Col, ListGroup, Spinner } from 'react-bootstrap'
import { useGetAllUsers } from './Hooks/useGetAllUsers'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { TeamMember } from './types'
import { NotificationType } from 'components/Common/hooks/useNotification'
import * as Yup from 'yup'

interface MemberToTeamRequest {
    teamName: string
    userEmail: string
}

interface AddMemberToTeamFormProps {
    teamName: string
    members: TeamMember[]
    addMemberToTeam: (userEmail: string, teamName: string) => Promise<void>
}

const AddMemberToTeamValidationSchema = Yup.object().shape({
    teamName: Yup.string().required('El nombre del equipo es obligatorio'),
    userEmail: Yup.string().email('El email debe ser válido').required('Debes seleccionar un usuario')
})

const AddMemberToTeamForm: React.FC<AddMemberToTeamFormProps> = (props) => {
    const { showNotification } = useNotificationContext()
    const [teamMembers, setTeamMembers] = React.useState<TeamMember[]>(props.members)

    // Sincroniza el estado local si cambia la prop members
    React.useEffect(() => {
        setTeamMembers(props.members)
    }, [props.members])

    const initialValues: MemberToTeamRequest = {
        teamName: props.teamName,
        userEmail: ''
    }
    const { users, loadedUsers, loadUsersError } = useGetAllUsers()

    // Filtra usuarios disponibles: sin asignar a un equipo y que no estén ya en el equipo local
    const availableUsers = loadedUsers
        ? users.filter((user) => user.assignedTeamName == null && !teamMembers.find((member) => member.email === user.email))
        : []

    return (
        <Formik
            validationSchema={AddMemberToTeamValidationSchema}
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                props
                    .addMemberToTeam(values.userEmail, values.teamName)
                    .then(() => {
                        // Busca el usuario añadido (suponiendo que el listado de usuarios está actualizado)
                        const addedUser = users.find((u) => u.email === values.userEmail)
                        if (addedUser) {
                            setTeamMembers((prevMembers) => [...prevMembers, addedUser])
                        }
                        showNotification('Miembro añadido al equipo.', NotificationType.Success)
                    })
                    .catch(() => {
                        showNotification('Error al añadir miembro al equipo.', NotificationType.Error)
                    })
                    .finally(() => {
                        actions.setSubmitting(false)
                    })
            }}
        >
            {(formik) => (
                <Form>
                    <BootstrapForm.Group as={Col} md="6" className="mb-3" controlId="userEmail">
                        <BootstrapForm.Label>Seleccione usuario a añadir:</BootstrapForm.Label>
                        <BootstrapForm.Select
                            name="userEmail"
                            value={formik.values.userEmail}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.userEmail && !!formik.errors.userEmail}
                            disabled={!loadedUsers || !!loadUsersError}
                        >
                            {(() => {
                                if (loadUsersError) {
                                    return (
                                        <option value="" disabled>
                                            Error al cargar usuarios
                                        </option>
                                    )
                                }
                                if (!loadedUsers) {
                                    return (
                                        <option value="" disabled>
                                            Cargando usuarios...
                                        </option>
                                    )
                                }
                                return <option value="">Seleccionar usuario</option>
                            })()}
                            {loadedUsers &&
                                availableUsers.map((user) => (
                                    <option key={user.email} value={user.email}>
                                        {`${user.name} ${user.firstSurname} ${user.secondSurname}`}
                                    </option>
                                ))}
                        </BootstrapForm.Select>
                        <BootstrapForm.Control.Feedback type="invalid">{formik.errors.userEmail}</BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>

                    <Button type="submit" variant="primary" disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}>
                        {formik.isSubmitting ? (
                            <>
                                <Spinner as="span" animation="border" size="sm" aria-hidden="true" /> <output>Añadiendo...</output>
                            </>
                        ) : (
                            'Añadir'
                        )}
                    </Button>

                    {teamMembers.length > 0 ? <h5>Participantes del equipo:</h5> : ''}

                    <ListGroup numbered className="mt-3">
                        {teamMembers.length > 0 ? (
                            teamMembers.map((member) => (
                                <ListGroup.Item key={member.email}>{`${member.name} ${member.firstSurname} ${member.secondSurname}`}</ListGroup.Item>
                            ))
                        ) : (
                            <ListGroup.Item>No hay miembros en el equipo</ListGroup.Item>
                        )}
                    </ListGroup>
                </Form>
            )}
        </Formik>
    )
}

export default AddMemberToTeamForm

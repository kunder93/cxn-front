import React from 'react'
import { Form, Formik } from 'formik'
import { Form as BootstrapForm, Button, Col, ListGroup, Spinner } from 'react-bootstrap'
import { useGetAllUsers } from './Hooks/useGetAllUsers'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { TeamMember } from './types'
import { NotificationType } from 'components/Common/hooks/useNotification'
import * as Yup from 'yup'
import { FederateState } from 'components/UserProfiles/ChessProfileFederate/Hooks/getFederateState'

/**
 * Shape of the data submitted to add a member to a team.
 */
interface MemberToTeamRequest {
    /** Name of the team to which the user is being added. */
    teamName: string

    /** Email of the user to be added to the team. */
    userEmail: string
}

/**
 * Props for the {@link AddMemberToTeamForm} component.
 */
interface AddMemberToTeamFormProps {
    /**
     * Name of the team the member will be added to.
     */
    teamName: string

    /**
     * Current list of team members.
     */
    members: TeamMember[]

    /**
     * Function to add a member to the team.
     * @param userEmail - Email of the user to add.
     * @param teamName - Name of the team.
     */
    addMemberToTeam: (userEmail: string, teamName: string) => Promise<void>
}

/**
 * Validation schema for the form using Yup.
 */
const AddMemberToTeamValidationSchema = Yup.object().shape({
    teamName: Yup.string().required('El nombre del equipo es obligatorio'),
    userEmail: Yup.string().email('El email debe ser válido').required('Debes seleccionar un usuario')
})

/**
 * Form component that allows adding a federated user (not already assigned to a team)
 * to a given team. The form includes a user selection dropdown, and displays
 * the current list of team members.
 *
 * The available users are filtered to show only:
 * - Users who are federated (`federateState === 'FEDERATE'`)
 * - Users who are not yet assigned to any team
 * - Users who are not already in the current team
 *
 * Upon successful submission, the member is added to the team list locally and a success
 * notification is shown. On failure, an error notification appears.
 *
 * @param props - The props including team name, current members, and `addMemberToTeam` callback.
 * @returns A React form to add federated users to a team.
 *
 * @example
 * ```tsx
 * <AddMemberToTeamForm
 *   teamName="Sub18"
 *   members={teamMembers}
 *   addMemberToTeam={handleAddMember}
 * />
 * ```
 */
const AddMemberToTeamForm: React.FC<AddMemberToTeamFormProps> = (props) => {
    const { showNotification } = useNotificationContext()
    const [teamMembers, setTeamMembers] = React.useState<TeamMember[]>(props.members)

    // Sync local state if prop members change
    React.useEffect(() => {
        setTeamMembers(props.members)
    }, [props.members])

    const initialValues: MemberToTeamRequest = {
        teamName: props.teamName,
        userEmail: ''
    }

    const { users, loadedUsers, loadUsersError } = useGetAllUsers()

    /**
     * Filters users to only include federated users who:
     * - Are not assigned to any team
     * - Are not already in the current team
     */
    const availableUsers = loadedUsers
        ? users.filter(
              (user) =>
                  user.assignedTeamName == null && user.federateState === FederateState.FEDERATE && !teamMembers.find((member) => member.email === user.email)
          )
        : []

    return (
        <Formik
            validationSchema={AddMemberToTeamValidationSchema}
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                props
                    .addMemberToTeam(values.userEmail, values.teamName)
                    .then(() => {
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

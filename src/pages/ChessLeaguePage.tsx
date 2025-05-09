import AddMemberTeamModal from 'components/ChessLeague/AddMemberTeamModal'
import CreateTeamModal from 'components/ChessLeague/CreateTeamModal'
import { useTeams } from 'components/ChessLeague/Hooks/useTeams'
import RemoveMemberFromTeamModal from 'components/ChessLeague/RemoveMemberFromTeamModal'
import RemoveTeamModal from 'components/ChessLeague/RemoveTeamModal'
import { TeamWithMembers, TeamMember } from 'components/ChessLeague/types'
import UserTeamPreferencesTable from 'components/ChessLeague/UserTeamPreferencesTable'
import React from 'react'
import { Accordion, Button, ListGroup } from 'react-bootstrap'
import { FaTrash, FaUserPlus } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { UserRole } from 'store/types/userTypes'
import axios from 'axios'
import { USER_TEAM_PREFERENCES } from 'resources/server_urls'
import { setPreferredTeamName } from 'store/slices/user'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { NotificationType } from 'components/Common/hooks/useNotification'
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io'
import { shallowEqual } from 'react-redux'
import styled from 'styled-components'
import { PiPlusSquareFill } from 'react-icons/pi'
import { FederateState } from 'components/UserProfiles/ChessProfileFederate/Hooks/getFederateState'

const CreateTeamButtonWrapper = styled.div``
const AddPaymentIcon = styled(PiPlusSquareFill)`
    fill: blue;
    cursor: pointer;
    transition: transform 0.3s ease;
    &:hover {
        transform: scale(1.2);
    }
`

interface SetPreferredTeamResponse {
    dni: string
    email: string
    name: string
    firstSurname: string
    secondSurname: string
    gender: string
    birthDate: string
    assignedTeam: string | null
    preferredTeam: string | null
}

/**
 * `ChessLeaguePage` is the main component for managing league teams in the CXN (Círculo Xadrez Narón) system.
 *
 * This page allows federated users or users with admin roles to:
 * - View a list of all existing league teams
 * - Create a new team (for `PRESIDENTE`, `ADMIN`, or `SECRETARIO` roles)
 * - Add federated members to teams
 * - Remove members from teams
 * - Delete teams
 * - Mark a team as "preferred"
 * - View a table of user preferences (admins only)
 *
 * Access to this page is restricted to:
 * - Federated users (`userProfile.federateState === FederateState.FEDERATE`)
 * - Or users with the role: `PRESIDENTE`, `ADMIN`, or `SECRETARIO`
 *
 * Internally, the component handles state for selected teams, modal visibility,
 * and dispatches Redux actions to update preferred team settings.
 *
 * @returns The complete chess league management interface or an access restriction message.
 *
 * @example
 * ```tsx
 * <Route path="/liga" element={<ChessLeaguePage />} />
 * ```
 */
const ChessLeaguePage = () => {
    // Modals state
    const [createTeamModal, setCreateTeamModal] = React.useState(false)
    const [addMemberModal, setAddMemberModal] = React.useState(false)
    const [removeTeamModal, setRemoveTeamModal] = React.useState(false)
    const [removeMemberFromTeamModal, setRemoveMemberFromTeamModal] = React.useState(false)

    // Selected entities
    const [selectedTeam, setSelectedTeam] = React.useState<TeamWithMembers | null>(null)
    const [selectedMemberForRemove, setSelectedMemberForRemove] = React.useState<TeamMember | null>(null)

    // Hooks and state
    const { teams, addTeam, removeTeam, addMemberToTeam, removeMemberFromTeam } = useTeams()
    const userProfile = useAppSelector((state) => state.users.userProfile, shallowEqual)
    const jwt = useAppSelector((state) => state.users.jwt)
    const dispatch = useAppDispatch()
    const { showNotification } = useNotificationContext()

    /**
     * Sends a PATCH request to set a preferred team for the logged-in user.
     *
     * Updates Redux state on success or shows a notification on failure.
     *
     * @param team - The team to be set as preferred.
     */
    const handleSetPreferredTeam = (team: TeamWithMembers) => {
        axios
            .patch<SetPreferredTeamResponse>(USER_TEAM_PREFERENCES + '/' + team.name, {}, { headers: { Authorization: `Bearer ${jwt}` } })
            .then((response) => {
                console.log(response)
                dispatch(setPreferredTeamName(response.data.preferredTeam))
            })
            .catch((error: unknown) => {
                if (axios.isAxiosError(error)) {
                    const errorMessage = error.message || 'Error desconocido en la petición'
                    showNotification(`Error al establecer el equipo preferido: ${errorMessage}`, NotificationType.Error)
                } else {
                    showNotification('Error inesperado al establecer el equipo preferido', NotificationType.Error)
                }
            })
    }

    // Authorization check
    const isAuthorized =
        userProfile.federateState === FederateState.FEDERATE ||
        userProfile.userRoles.includes(UserRole.PRESIDENTE) ||
        userProfile.userRoles.includes(UserRole.ADMIN) ||
        userProfile.userRoles.includes(UserRole.SECRETARIO)

    if (!isAuthorized) {
        return <div>Debes estar federado para unirte a equipos de liga.</div>
    }

    return userProfile.federateState === FederateState.FEDERATE ||
        userProfile.userRoles.includes(UserRole.PRESIDENTE) ||
        userProfile.userRoles.includes(UserRole.ADMIN) ||
        userProfile.userRoles.includes(UserRole.SECRETARIO) ? (
        <div>
            {createTeamModal && (
                <CreateTeamModal
                    show={createTeamModal}
                    onHide={() => {
                        setCreateTeamModal(false)
                    }}
                    addTeam={addTeam}
                />
            )}
            {removeTeamModal && selectedTeam && (
                <RemoveTeamModal
                    show={removeTeamModal}
                    onHide={() => {
                        setRemoveTeamModal(false)
                    }}
                    selectedTeam={selectedTeam}
                    removeTeam={removeTeam}
                />
            )}

            <div>
                <h1>Equipos liga gallega CXN</h1>
                {(userProfile.userRoles.includes(UserRole.PRESIDENTE) ||
                    userProfile.userRoles.includes(UserRole.ADMIN) ||
                    userProfile.userRoles.includes(UserRole.SECRETARIO)) && (
                    <CreateTeamButtonWrapper>
                        <button
                            onClick={() => {
                                setCreateTeamModal(true)
                            }}
                            title="Crear equipo de liga."
                            style={{ background: 'none', border: 'none', cursor: 'pointer', margin: 0, padding: 0 }}
                            aria-label="Crear equipo de liga."
                        >
                            <AddPaymentIcon size={60} />
                        </button>
                    </CreateTeamButtonWrapper>
                )}

                <Accordion>
                    {teams.map((team) => (
                        <Accordion.Item key={team.name} eventKey={team.name}>
                            <Accordion.Header>
                                {team.name} - {team.category}
                            </Accordion.Header>
                            <Accordion.Body>
                                <>
                                    <span>Descripción:</span>
                                    <p>{team.description}</p>
                                </>
                                {(userProfile.userRoles.includes(UserRole.PRESIDENTE) ||
                                    userProfile.userRoles.includes(UserRole.ADMIN) ||
                                    userProfile.userRoles.includes(UserRole.SECRETARIO)) && (
                                    <>
                                        <Button
                                            variant="primary"
                                            onClick={() => {
                                                setSelectedTeam(team)
                                                setAddMemberModal(true)
                                            }}
                                        >
                                            <FaUserPlus />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                setSelectedTeam(team)
                                                setRemoveTeamModal(true)
                                            }}
                                            className="ms-2"
                                        >
                                            <FaTrash />
                                        </Button>
                                    </>
                                )}
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        setSelectedTeam(team)
                                        handleSetPreferredTeam(team)
                                    }}
                                    className="ms-2"
                                >
                                    {userProfile.preferredTeamName == team.name ? <IoMdHeart /> : <IoMdHeartEmpty />}
                                </Button>

                                <ListGroup numbered variant="flush" className="mt-3">
                                    {team.members.length > 0 && <span>Integrantes:</span>}
                                    {team.members.map((member) => (
                                        <ListGroup.Item key={member.dni}>
                                            {member.name} {member.firstSurname} {member.secondSurname} - {member.email}{' '}
                                            {(userProfile.userRoles.includes(UserRole.PRESIDENTE) ||
                                                userProfile.userRoles.includes(UserRole.ADMIN) ||
                                                userProfile.userRoles.includes(UserRole.SECRETARIO)) && (
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => {
                                                        // Seleccionamos el equipo y el miembro a eliminar
                                                        setSelectedTeam(team)
                                                        setSelectedMemberForRemove(member)
                                                        setRemoveMemberFromTeamModal(true)
                                                    }}
                                                >
                                                    <ImCross />
                                                </Button>
                                            )}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
                <AddMemberTeamModal
                    show={addMemberModal}
                    onHide={() => {
                        setAddMemberModal(false)
                    }}
                    team={selectedTeam}
                    addMemberToTeam={addMemberToTeam}
                />
                <RemoveMemberFromTeamModal
                    show={removeMemberFromTeamModal}
                    onHide={() => {
                        setRemoveMemberFromTeamModal(false)
                    }}
                    team={selectedTeam}
                    removeMemberFromTeam={removeMemberFromTeam}
                    memberEmail={selectedMemberForRemove ? selectedMemberForRemove.email : ''}
                />
            </div>

            {(userProfile.userRoles.includes(UserRole.PRESIDENTE) ||
                userProfile.userRoles.includes(UserRole.ADMIN) ||
                userProfile.userRoles.includes(UserRole.SECRETARIO)) && <UserTeamPreferencesTable></UserTeamPreferencesTable>}
        </div>
    ) : (
        <div>Debes estar federado para unirte a equipos de liga.</div>
    )
}

export default ChessLeaguePage

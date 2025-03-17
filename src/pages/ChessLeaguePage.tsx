import AddMemberTeamModal from 'components/ChessLeague/AddMemberTeamModal'
import CreateTeamModal from 'components/ChessLeague/CreateTeamModal'
import { useTeams } from 'components/ChessLeague/Hooks/useTeams'
import RemoveMemberFromTeamModal from 'components/ChessLeague/RemoveMemberFromTeamModal'
import RemoveTeamModal from 'components/ChessLeague/RemoveTeamModal'
import { TeamWithMembers, TeamMember } from 'components/ChessLeague/types'
import React from 'react'
import { Accordion, Button, ListGroup } from 'react-bootstrap'
import { FaTrash, FaUserPlus } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { useAppSelector } from 'store/hooks'
import { UserRole } from 'store/types/userTypes'

const ChessLeaguePage = () => {
    const [createTeamModal, setCreateTeamModal] = React.useState(false)
    const [addMemberModal, setAddMemberModal] = React.useState(false)
    const [removeTeamModal, setRemoveTeamModal] = React.useState(false)
    const [removeMemberFromTeamModal, setRemoveMemberFromTeamModal] = React.useState(false)
    const [selectedTeam, setSelectedTeam] = React.useState<TeamWithMembers | null>(null)
    const [selectedMemberForRemove, setSelectedMemberForRemove] = React.useState<TeamMember | null>(null)
    const { teams, addTeam, removeTeam, addMemberToTeam, removeMemberFromTeam } = useTeams()
    const userProfile = useAppSelector((state) => state.users.userProfile)
    return (
        <>
            {(userProfile.userRoles.includes(UserRole.PRESIDENTE) ||
                userProfile.userRoles.includes(UserRole.ADMIN) ||
                userProfile.userRoles.includes(UserRole.SECRETARIO)) && (
                <Button
                    variant="success"
                    onClick={() => {
                        setCreateTeamModal(true)
                    }}
                >
                    Crear equipo
                </Button>
            )}

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
                <h1>Equipos liga gallega:</h1>
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
        </>
    )
}

export default ChessLeaguePage

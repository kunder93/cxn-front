import React from 'react'
import { Table, Spinner, Alert } from 'react-bootstrap'
import { useGetAllUsers } from './Hooks/useGetAllUsers'
import { FederateState } from 'components/UserProfiles/ChessProfileFederate/Hooks/getFederateState'

/**
 * React component that displays a table of federated users, showing their personal information
 * and assigned/preferred team names.
 *
 * This component fetches all users using the `useGetAllUsers` hook, filters them to include
 * only those with a `federateState` of `FEDERATE`, and renders them in a responsive Bootstrap table.
 *
 * If the users are still loading, a spinner is shown. If there's an error loading users,
 * an alert is displayed instead.
 *
 * @component
 *
 * @example
 * ```tsx
 * <UserTeamPreferencesTable />
 * ```
 *
 * @returns A table with federated user data or appropriate loading/error messages.
 */
const UserTeamPreferencesTable: React.FC = () => {
    const { users, loadedUsers, loadUsersError } = useGetAllUsers()

    // Show loading spinner while fetching user data
    if (!loadedUsers) {
        return (
            <div className="text-center my-3">
                <Spinner animation="border" aria-hidden="true" />
                <output>Cargando usuarios...</output>
            </div>
        )
    }

    // Show error alert if fetch failed
    if (loadUsersError) {
        return (
            <Alert variant="danger" className="my-3">
                Error al cargar los usuarios: {loadUsersError}
            </Alert>
        )
    }

    // Filter federated users for display
    const federatedUsers = users.filter((user) => user.federateState === FederateState.FEDERATE)
    return (
        <div>
            <h1>Socios y equipos preferidos / asignados</h1>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Nombre Completo</th>
                        <th>Email</th>
                        <th>DNI</th>
                        <th>Equipo Asignado</th>
                        <th>Equipo Preferido</th>
                    </tr>
                </thead>
                <tbody>
                    {federatedUsers.length > 0 ? (
                        federatedUsers.map((user) => (
                            <tr key={user.dni}>
                                <td>{`${user.name} ${user.firstSurname} ${user.secondSurname}`}</td>
                                <td>{user.email}</td>
                                <td>{user.dni}</td>
                                <td>{user.assignedTeamName ?? '-'}</td>
                                <td>{user.preferredTeamName ?? '-'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center">
                                No hay usuarios federados disponibles
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default UserTeamPreferencesTable

import React from 'react'
import { Table, Spinner, Alert } from 'react-bootstrap'
import { useGetAllUsers } from './Hooks/useGetAllUsers'

const UserTeamPreferencesTable: React.FC = () => {
    const { users, loadedUsers, loadUsersError } = useGetAllUsers()

    if (!loadedUsers) {
        return (
            <div className="text-center my-3">
                <Spinner animation="border" aria-hidden="true" />
                <output>Cargando usuarios...</output>
            </div>
        )
    }

    if (loadUsersError) {
        return (
            <Alert variant="danger" className="my-3">
                Error al cargar los usuarios: {loadUsersError}
            </Alert>
        )
    }

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
                    {users.length > 0 ? (
                        users.map((user) => (
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
                                No hay usuarios disponibles
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default UserTeamPreferencesTable

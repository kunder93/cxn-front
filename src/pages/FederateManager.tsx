import React, { useState, useEffect } from 'react'
import { useTable, Column } from 'react-table'
import useFederateStateUsersData, { FederateStateExtendedResponse } from '../components/UserProfiles/ChessProfileFederate/Hooks/usersFederateStateData'
import { FederateState } from '../components/UserProfiles/ChessProfileFederate/Hooks/getFederateState'
import { Button, Table } from 'react-bootstrap'
import axios from 'axios'
import { useAppSelector } from '../store/hooks'
import { CONFIR_CANCEL_FEDERATE_URL } from '../resources/server_urls'

const federateStateTranslations: Record<FederateState, string> = {
    [FederateState.FEDERATE]: 'Federado',
    [FederateState.NO_FEDERATE]: 'No federado',
    [FederateState.IN_PROGRESS]: 'En proceso'
}

export const FederateManager = (): JSX.Element => {
    const { data, loading, error } = useFederateStateUsersData()
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)

    const [federateStateMembersList, setFederateStateMembersList] = useState<FederateStateExtendedResponse[]>([])

    useEffect(() => {
        if (data) {
            setFederateStateMembersList(data.federateStateMembersList || [])
        }
    }, [data])

    const confirmCancelFederate = async (userDni: string) => {
        try {
            const response = await axios.patch<FederateStateExtendedResponse>(
                CONFIR_CANCEL_FEDERATE_URL,
                { userDni },
                {
                    headers: {
                        Authorization: `Bearer ${userJwt}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            const updatedMember = { ...response.data, userDni }
            setFederateStateMembersList((prevList) => prevList.map((member) => (member.dni === userDni ? updatedMember : member)))
        } catch (error) {
            console.error('Error confirming federate:', error)
        }
    }

    const columns: Column<FederateStateExtendedResponse>[] = React.useMemo(
        () => [
            { Header: 'DNI', accessor: 'dni' },
            {
                Header: 'Estado federativo',
                accessor: 'state',
                Cell: ({ value, row }) => (
                    <span>
                        {federateStateTranslations[value as FederateState]}
                        {value === FederateState.IN_PROGRESS && (
                            <Button variant="success" onClick={() => void confirmCancelFederate(row.original.dni)} style={{ marginLeft: '10px' }}>
                                Confirmar
                            </Button>
                        )}
                        {value === FederateState.FEDERATE && (
                            <Button variant="danger" onClick={() => void confirmCancelFederate(row.original.dni)} style={{ marginLeft: '10px' }}>
                                Desfederar
                            </Button>
                        )}
                    </span>
                )
            },
            { Header: 'Renovación automática', accessor: 'autoRenew', Cell: ({ value }) => (value ? 'SI' : 'NO') },
            { Header: 'DNI: Última actualización', accessor: 'dniLastUpdate' }
        ],
        []
    )

    const tableInstance = useTable({ columns, data: federateStateMembersList })
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (federateStateMembersList.length === 0) return <div>No federate state data available.</div>

    return (
        <Table striped bordered hover variant="dark" {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()} key={column.id}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} key={row.id}>
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()} key={cell.column.id} style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default FederateManager

import React, { useState, useEffect } from 'react'
import { useTable, Column } from 'react-table'
import useFederateStateUsersData, { FederateStateExtendedResponse } from '../components/UserProfiles/ChessProfileFederate/Hooks/usersFederateStateData'
import { FederateState } from '../components/UserProfiles/ChessProfileFederate/Hooks/getFederateState'
import { Button, Spinner, Table } from 'react-bootstrap'
import { useFederateActions } from 'components/UserProfiles/ChessProfileFederate/Hooks/useFederateActions'

const federateStateTranslation: Record<FederateState, string> = {
    [FederateState.FEDERATE]: 'Federado',
    [FederateState.NO_FEDERATE]: 'No federado',
    [FederateState.IN_PROGRESS]: 'En proceso'
}

export const FederateManager = (): JSX.Element => {
    const { data, loading, error } = useFederateStateUsersData()
    const { confirmCancelFederate, isLoading: isActionLoading } = useFederateActions()
    const [federateStateMembersList, setFederateStateMembersList] = useState<FederateStateExtendedResponse[]>([])

    useEffect(() => {
        if (data) {
            setFederateStateMembersList(data.federateStateMembersList || [])
        }
    }, [data])

    // Wrap handleConfirmCancel with useCallback
    const handleConfirmCancel = React.useCallback(
        async (userDni: string) => {
            try {
                const updatedMember = await confirmCancelFederate(userDni)
                setFederateStateMembersList((prevList) => prevList.map((member) => (member.dni === userDni ? { ...updatedMember, dni: userDni } : member)))
            } catch (error) {
                console.error('Error updating federate state:', error)
            }
        },
        [confirmCancelFederate]
    ) // Add dependencies here

    const columns: Column<FederateStateExtendedResponse>[] = React.useMemo(
        () => [
            { Header: 'DNI', accessor: 'dni' },
            {
                Header: 'Estado federativo',
                accessor: 'state',
                Cell: ({ value, row }) => (
                    <span>
                        {federateStateTranslation[value as FederateState]}
                        {value === FederateState.IN_PROGRESS && (
                            <Button
                                variant="success"
                                onClick={() => void handleConfirmCancel(row.original.dni)}
                                disabled={isActionLoading}
                                style={{ marginLeft: '10px' }}
                            >
                                {isActionLoading ? (
                                    <>
                                        <Spinner size="sm" />
                                        Confirmando...
                                    </>
                                ) : (
                                    'Confirmar'
                                )}
                            </Button>
                        )}
                        {value === FederateState.FEDERATE && (
                            <Button
                                variant="danger"
                                onClick={() => void handleConfirmCancel(row.original.dni)}
                                disabled={isActionLoading}
                                style={{ marginLeft: '10px' }}
                            >
                                {isActionLoading ? (
                                    <>
                                        <Spinner size="sm" />
                                        Desfederando...
                                    </>
                                ) : (
                                    'Desfederar'
                                )}
                            </Button>
                        )}
                    </span>
                )
            },
            { Header: 'Renovación automática', accessor: 'autoRenew', Cell: ({ value }) => (value ? 'SI' : 'NO') },
            { Header: 'DNI: Última actualización', accessor: 'dniLastUpdate' }
        ],
        [isActionLoading] // Now properly memoized
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
                                <td
                                    {...cell.getCellProps()}
                                    key={`${row.id}-${cell.column.id}`}
                                    style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}
                                >
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

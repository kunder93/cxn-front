import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useTable, Column, Row } from 'react-table'
import useFederateStateUsersData, { FederateStateExtendedResponse } from '../components/UserProfiles/ChessProfileFederate/Hooks/usersFederateStateData'
import { FederateState } from '../components/UserProfiles/ChessProfileFederate/Hooks/getFederateState'
import { Button, Spinner, Table } from 'react-bootstrap'
import { useFederateActions } from 'components/UserProfiles/ChessProfileFederate/Hooks/useFederateActions'
import { UserDataInfoPopover } from 'components/Payments/UserDataInfoPopover'

const federateStateTranslation: Record<FederateState, string> = {
    [FederateState.FEDERATE]: 'Federado',
    [FederateState.NO_FEDERATE]: 'No federado',
    [FederateState.IN_PROGRESS]: 'En proceso'
}

const FederateStateCell: React.FC<{ state: FederateState; dni: string; isLoading: boolean; onAction: () => void }> = ({ state, isLoading, onAction }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>{federateStateTranslation[state]}</span>
            {(state === FederateState.IN_PROGRESS || state === FederateState.FEDERATE) && (
                <Button variant={state === FederateState.FEDERATE ? 'danger' : 'success'} onClick={onAction} disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Spinner size="sm" />
                            {state === FederateState.FEDERATE ? ' Desfederando...' : ' Confirmando...'}
                        </>
                    ) : state === FederateState.FEDERATE ? (
                        'Desfederar'
                    ) : (
                        'Confirmar'
                    )}
                </Button>
            )}
        </div>
    )
}

export const FederateManager = (): JSX.Element => {
    const { data, loading, error } = useFederateStateUsersData()
    const { confirmCancelFederate, isLoading: isActionLoading } = useFederateActions()
    const [federateStateMembersList, setFederateStateMembersList] = useState<FederateStateExtendedResponse[]>([])

    useEffect(() => {
        if (data?.federateStateMembersList) {
            setFederateStateMembersList(data.federateStateMembersList)
        }
    }, [data])

    const handleConfirmCancel = useCallback(
        async (userDni: string) => {
            try {
                const updatedMember = await confirmCancelFederate(userDni)
                setFederateStateMembersList((prevList) => prevList.map((member) => (member.dni === userDni ? { ...updatedMember, dni: userDni } : member)))
            } catch (error) {
                console.error('Error updating federate state:', error)
            }
        },
        [confirmCancelFederate]
    )

    const columns: Column<FederateStateExtendedResponse>[] = useMemo(
        () => [
            {
                Header: 'DNI',
                accessor: 'dni',
                Cell: ({ row }: { row: Row<FederateStateExtendedResponse> }) => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{row.original.dni}</span>
                        <UserDataInfoPopover userDni={row.original.dni} />
                    </div>
                )
            },
            {
                Header: 'Estado federativo',
                accessor: 'state',
                Cell: ({ value, row }: { value: FederateState; row: Row<FederateStateExtendedResponse> }) => (
                    <FederateStateCell
                        state={value}
                        dni={row.original.dni}
                        isLoading={isActionLoading}
                        onAction={() => void handleConfirmCancel(row.original.dni)}
                    />
                )
            },
            { Header: 'Renovación automática', accessor: 'autoRenew', Cell: ({ value }) => (value ? 'SI' : 'NO') },
            { Header: 'DNI: Última actualización', accessor: 'dniLastUpdate' }
        ],
        [isActionLoading] // WIth handleConfirmCancel as dependency, loop rendering occurs
    )

    const tableInstance = useTable({ columns, data: federateStateMembersList })
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

    if (loading) return <Spinner animation="border" role="status" />
    if (error) return <div>Error: {error}</div>
    if (federateStateMembersList.length === 0) return <div>No federate state data available.</div>

    return (
        <Table striped bordered hover variant="dark" {...getTableProps()} style={{ marginTop: '40px' }}>
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
                                <td {...cell.getCellProps()} key={`${row.id}-${cell.column.id}`} style={{ padding: '8px', textAlign: 'center' }}>
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

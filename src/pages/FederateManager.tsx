import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useTable, Column, Row } from 'react-table'
import useFederateStateUsersData, { FederateStateExtendedResponse } from '../components/UserProfiles/ChessProfileFederate/Hooks/usersFederateStateData'
import { FederateState } from '../components/UserProfiles/ChessProfileFederate/Hooks/getFederateState'
import { Button, Spinner, Table } from 'react-bootstrap'
import { useFederateActions } from 'components/UserProfiles/ChessProfileFederate/Hooks/useFederateActions'
import { UserDataInfoPopover } from 'components/Payments/UserDataInfoPopover'
import { FaIdCard } from 'react-icons/fa'
import { UserDniViewModal } from 'components/UserProfiles/ChessProfileFederate/UserDniViewModal'
import styled from 'styled-components'

const DniActionButton = styled.button`
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s;
    background: none;
    border: none;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    &:focus {
        outline: 2px solid #007bff;
        outline-offset: 2px;
    }
`

const StyledFaIdCard = styled(FaIdCard)`
    font-size: 1.2rem;
    opacity: 0.8;

    &:hover {
        opacity: 1;
    }
`

const federateStateTranslation: Record<FederateState, string> = {
    [FederateState.FEDERATE]: 'Federado',
    [FederateState.NO_FEDERATE]: 'No federado',
    [FederateState.IN_PROGRESS]: 'En proceso'
}

const FederateStateCell: React.FC<{ state: FederateState; dni: string; isLoading: boolean; onAction: () => void }> = ({ state, dni, isLoading, onAction }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span aria-live="polite">{federateStateTranslation[state]}</span>
            {(state === FederateState.IN_PROGRESS || state === FederateState.FEDERATE) && (
                <Button
                    variant={state === FederateState.FEDERATE ? 'danger' : 'success'}
                    onClick={onAction}
                    disabled={isLoading}
                    aria-label={state === FederateState.FEDERATE ? `Desfederar usuario con DNI ${dni}` : `Confirmar federación para DNI ${dni}`}
                    aria-live="polite"
                >
                    {isLoading ? (
                        <>
                            <Spinner size="sm" aria-hidden="true" />
                            <span>{state === FederateState.FEDERATE ? ' Desfederando...' : ' Confirmando...'}</span>
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
    const [dniModal, setDniModal] = useState(false)
    const [selectedDni, setSelectedDni] = useState<string | null>(null)

    useEffect(() => {
        if (data?.federateStateMembersList) {
            setFederateStateMembersList(data.federateStateMembersList)
        }
    }, [data])

    // **Optimized Action Handler**
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
            {
                Header: 'DNI: Última actualización',
                accessor: 'dniLastUpdate',
                Cell: ({ row }: { row: Row<FederateStateExtendedResponse> }) => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{row.original.dniLastUpdate}</span>
                        {(row.original.state === FederateState.IN_PROGRESS || row.original.state === FederateState.FEDERATE) && (
                            <DniActionButton
                                tabIndex={0}
                                aria-label={`Ver imágenes del DNI ${row.original.dni}`}
                                onClick={() => {
                                    setSelectedDni(row.original.dni)
                                    setDniModal(true) // Aseguramos que el modal se abre
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        setSelectedDni(row.original.dni)
                                        setDniModal(true) // Aseguramos que el modal se abre con teclado
                                    }
                                }}
                            >
                                <StyledFaIdCard aria-hidden="true" />
                            </DniActionButton>
                        )}
                    </div>
                )
            }
        ],
        [isActionLoading]
    )

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: federateStateMembersList })

    return (
        <>
            {loading ? (
                <Spinner animation="border" aria-live="polite" />
            ) : error ? (
                <div role="alert">{error}</div>
            ) : (
                <Table striped bordered hover {...getTableProps()} style={{ marginTop: '40px' }}>
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
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            )}
            {selectedDni && <UserDniViewModal show={dniModal} onHide={() => setDniModal(false)} userDni={selectedDni} />}
        </>
    )
}
export default FederateManager

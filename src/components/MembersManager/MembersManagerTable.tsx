import React, { useMemo, useState, useCallback } from 'react'
import { Column, useTable, useSortBy, useGlobalFilter, useRowSelect, Row } from 'react-table'
import { Button, Table } from 'react-bootstrap'
import { Gear, InfoCircle, PersonGear } from 'react-bootstrap-icons'
import ChangeKindMemberModal from './ChangeKindMember/ChangeKindMemberModal'
import ChangeMemberRolesModal from './ChangeMemberRole/ChangeMemberRolesModal'
import { KindMember, UserProfile, UserRole } from 'store/types/userTypes'
import styled from 'styled-components'
import { renderKindMember, renderUserRoles } from '../../utility/userUtilities'
import { BsFillTrash3Fill } from 'react-icons/bs'
import DeleteMemberModal from './ChangeMemberRole/DeleteMemberModal'
import { IoIosWarning } from 'react-icons/io'
import WarningAceptUserModal from './WarningAceptUserModal'
import MemberModalProfileInfo from './ModalProfileInfo/MemberModalProfileInfo'

const TableFilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    padding-bottom: 0.5em;
`

const RoleCell = styled.div`
    display: flex;
    align-items: center;
`
const AmountRegistersBox = styled.div`
    padding-left: 4em;
`

const FilterInputLabel = styled.label`
    padding-right: 1em;
`

const ActionButtonsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`

const WarningCandidateIcon = styled(IoIosWarning)`
    color: orange;
    min-width: 14px;
    min-height: 14px;
`

const ActionButtons: React.FC<{
    row: Row<UserProfile>
    onInfoClick: (row: Row<UserProfile>) => void
    onEditKindClick: (row: Row<UserProfile>) => void
    onEditRoleClick: (row: Row<UserProfile>) => void
    onDeleteButtonClickHandler: (row: Row<UserProfile>) => void
}> = ({ row, onInfoClick, onEditKindClick, onEditRoleClick, onDeleteButtonClickHandler }) => (
    <ActionButtonsContainer>
        <Button
            variant="info"
            onClick={() => {
                onInfoClick(row)
            }}
        >
            <InfoCircle aria-label="Datos completos" title="Información" />
        </Button>
        <Button
            variant="info"
            onClick={() => {
                onEditKindClick(row)
            }}
        >
            <PersonGear aria-label="Modificar el estado del socio" title="Editar estado" />
        </Button>
        <Button
            variant="info"
            onClick={() => {
                onEditRoleClick(row)
            }}
        >
            <Gear aria-label="Modificar rol del socio" title="Editar roles" />
        </Button>
        <Button
            variant="danger"
            onClick={() => {
                onDeleteButtonClickHandler(row)
            }}
            aria-label="Eliminar socio"
            title="Eliminar socio"
        >
            <BsFillTrash3Fill />
        </Button>
    </ActionButtonsContainer>
)

interface Props {
    usersData: UserProfile[]
}

const MembersManagerTable = ({ usersData }: Props): React.JSX.Element => {
    const [data, setData] = useState<UserProfile[]>(useMemo(() => usersData, [usersData]))
    const [memberInfoModal, setMemberInfoModal] = useState(false)
    const [changeKindMemberModal, setChangeKindMemberModal] = useState(false)
    const [changeMemberRoleModal, setChangeMemberRoleModal] = useState(false)
    const [deleteMemberModal, setDeleteMemberModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState<UserProfile | undefined>()
    const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null)

    const [warningModalVisible, setWarningModalVisible] = useState(false)
    const [warningRowData, setWarningRowData] = useState<UserProfile | null>(null)

    const openWarningModal = useCallback(
        (row: Row<UserProfile>) => {
            setSelectedRow(data[row.index])
            setSelectedRowIndex(row.index)

            setWarningRowData(data[row.index])
            setWarningModalVisible(true)
        },
        [data]
    )

    const updateKindMember = useCallback(
        (newKindMember: KindMember) => {
            if (selectedRowIndex !== null) {
                setData((prevData) => {
                    const newData = [...prevData]
                    newData[selectedRowIndex].kindMember = newKindMember
                    return newData
                })
            }
        },
        [selectedRowIndex]
    )

    const updateMemberRoles = useCallback(
        (newUserRoles: UserRole[]) => {
            if (selectedRowIndex !== null) {
                setData((prevData) => {
                    const newData = [...prevData]
                    newData[selectedRowIndex].userRoles = newUserRoles
                    return newData
                })
            }
        },
        [selectedRowIndex]
    )

    const deleteRow = useCallback((email: string) => {
        setData((prevData) => prevData.filter((user) => user.email !== email))
        setDeleteMemberModal(false) // Close the modal after deletion
    }, [])

    const renderUserRolesCell = useCallback(
        (row: Row<UserProfile>): React.JSX.Element => {
            return (
                <RoleCell>
                    <div> {renderUserRoles(row.original.userRoles)}</div>
                    {row.original.userRoles.length === 1 && row.original.userRoles[0] === UserRole.SOCIO_CANDIDATO && (
                        <Button
                            variant="link"
                            onClick={() => {
                                openWarningModal(row)
                            }} // Pass the entire row to the modal
                            style={{ padding: 0, border: 'none', background: 'none' }}
                            aria-label="Candidato a socio"
                        >
                            <WarningCandidateIcon size={24} title="Candidato a socio" />
                        </Button>
                    )}
                </RoleCell>
            )
        },
        [openWarningModal]
    )

    const columns: Column<UserProfile>[] = useMemo(
        () => [
            { Header: 'D.N.I.', accessor: 'dni' },
            { Header: 'Nombre', accessor: 'name' },
            { Header: 'Apellidos', accessor: (d) => `${d.firstSurname} ${d.secondSurname}` },
            {
                Header: 'Rol del socio',
                accessor: 'userRoles',
                Cell: ({ row }) => renderUserRolesCell(row)
            },
            { Header: 'Estado', accessor: (d) => renderKindMember(d.kindMember) }
        ],
        [renderUserRolesCell]
    )

    const InfoButtonClickHandler = useCallback(
        (row: Row<UserProfile>) => {
            setSelectedRow(data[row.index])
            setMemberInfoModal(true)
        },
        [data]
    )

    const EditKindMemberButtonClickHandler = useCallback(
        (row: Row<UserProfile>) => {
            setSelectedRow(data[row.index])
            setSelectedRowIndex(row.index)
            setChangeKindMemberModal(true)
        },
        [data]
    )

    const EditMemberRoleButtonClickHandler = useCallback(
        (row: Row<UserProfile>) => {
            setSelectedRow(data[row.index])
            setSelectedRowIndex(row.index)
            setChangeMemberRoleModal(true)
        },
        [data]
    )

    const DeleteMemberButtonClickHandler = useCallback(
        (row: Row<UserProfile>) => {
            setSelectedRow(data[row.index])
            setSelectedRowIndex(row.index)
            setDeleteMemberModal(true)
        },
        [data]
    )

    const renderActionButtons = (row: Row<UserProfile>): React.JSX.Element => {
        return (
            <ActionButtons
                row={row}
                onInfoClick={InfoButtonClickHandler}
                onEditKindClick={EditKindMemberButtonClickHandler}
                onEditRoleClick={EditMemberRoleButtonClickHandler}
                onDeleteButtonClickHandler={DeleteMemberButtonClickHandler}
            />
        )
    }

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, preGlobalFilteredRows, setGlobalFilter, state } = useTable<UserProfile>(
        { columns, data },
        useGlobalFilter,
        useSortBy,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                ...columns,
                {
                    id: 'selection',
                    Header: <>GESTIONAR</>,
                    Cell: ({ row }) => renderActionButtons(row)
                }
            ])
        }
    )
    const globalFilterStatus = state.globalFilter as string | number | readonly string[] | undefined
    return (
        <>
            <TableFilterContainer>
                <FilterInputLabel htmlFor="filterInput">Busca socios:</FilterInputLabel>
                <input
                    id="filterInput"
                    type="text"
                    value={globalFilterStatus ?? ''}
                    onChange={(event) => {
                        setGlobalFilter(event.target.value)
                    }}
                    aria-label="Buscar empresas"
                />
                <AmountRegistersBox>
                    Total de registros: {preGlobalFilteredRows.length} (Mostrando: {rows.length})
                </AmountRegistersBox>
            </TableFilterContainer>
            <Table striped bordered hover responsive {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => {
                        const { key: headerGroupKey, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps()
                        return (
                            <tr key={headerGroupKey} {...restHeaderGroupProps}>
                                {headerGroup.headers.map((column) => {
                                    const { key: columnKey, ...restColumnProps } = column.getHeaderProps(column.getSortByToggleProps())
                                    return (
                                        <th key={columnKey} {...restColumnProps}>
                                            {column.render('Header')}
                                            <span>
                                                {(() => {
                                                    if (!column.isSorted) return ''
                                                    return column.isSortedDesc ? ' 🔽' : ' 🔼'
                                                })()}
                                            </span>
                                        </th>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        const { key: rowKey, ...rowProps } = row.getRowProps()
                        return (
                            <tr key={rowKey} {...rowProps}>
                                {row.cells.map((cell, cellIndex) => {
                                    const { key: cellKey, ...cellProps } = cell.getCellProps()
                                    return (
                                        <td key={cellKey || cellIndex} {...cellProps}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            {selectedRow && (
                <>
                    <MemberModalProfileInfo
                        show={memberInfoModal}
                        onHide={() => {
                            setMemberInfoModal(false)
                        }}
                        row={selectedRow}
                    />
                    <ChangeKindMemberModal
                        show={changeKindMemberModal}
                        updateKindMember={updateKindMember}
                        onHide={() => {
                            setChangeKindMemberModal(false)
                        }}
                        memberFirstSurname={selectedRow.firstSurname}
                        memberSecondSurname={selectedRow.secondSurname}
                        memberEmail={selectedRow.email}
                        memberName={selectedRow.name}
                        kindMember={selectedRow.kindMember}
                        aria-label="Modal de cambio de estado de socio"
                    />
                    <ChangeMemberRolesModal
                        show={changeMemberRoleModal}
                        updateMemberRoles={updateMemberRoles}
                        onHide={() => {
                            setChangeMemberRoleModal(false)
                        }}
                        memberFirstSurname={selectedRow.firstSurname}
                        memberSecondSurname={selectedRow.secondSurname}
                        memberEmail={selectedRow.email}
                        memberName={selectedRow.name}
                        memberRoles={selectedRow.userRoles}
                        aria-label="Modal de cambio de roles de socio"
                    />
                    <DeleteMemberModal
                        show={deleteMemberModal}
                        updateMemberRoles={updateMemberRoles}
                        onHide={() => {
                            setDeleteMemberModal(false)
                        }}
                        memberFirstSurname={selectedRow.firstSurname}
                        memberSecondSurname={selectedRow.secondSurname}
                        memberEmail={selectedRow.email}
                        memberName={selectedRow.name}
                        memberRoles={selectedRow.userRoles}
                        aria-label="Modal para borrar definitivamente un socio."
                        onDeleteSuccess={deleteRow}
                    />
                </>
            )}
            {warningModalVisible && (
                <WarningAceptUserModal
                    updateMemberRoles={updateMemberRoles}
                    show={warningModalVisible}
                    onHide={() => {
                        setWarningModalVisible(false)
                    }}
                    rowData={warningRowData}
                />
            )}
        </>
    )
}

export default MembersManagerTable

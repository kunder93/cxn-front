/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useMemo, useState } from 'react'
import { Column, useTable, useSortBy, useGlobalFilter, useRowSelect } from 'react-table'
import { Button } from 'react-bootstrap'
import { InfoCircle, PersonGear } from 'react-bootstrap-icons'
import { Table } from 'react-bootstrap'
import { IUserData } from '../Types/Types'
import MemberModalProfileInfo from './MemberModalProfileInfo'
import { renderKindMember } from '../../utility/userUtilities'
import ChangeKindMemberModal from './ChangeKindMemberModal'
import { KindMember } from 'store/types/userTypes'

interface Props {
    usersData: IUserData[]
}

/**
 * Component that displays a table with members data and actions to modify them.
 * @param props The users data.
 * @returns Component with Table that contains members data and actions for modify members.
 */
const MembersManagerTable: React.FC<Props> = ({ usersData }: Props) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [data, setData] = useState<IUserData[]>(useMemo(() => usersData, [])) //Caching data
    const [memberInfoModal, setMemberInfoModal] = useState(false)
    const [changeKindMemberModal, setChangeKindMemberModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState<IUserData | undefined>() // Updated typing here
    const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);



    const updateKindMember = (newKindMember: KindMember) => {
        if (selectedRowIndex !== null) {
            setData(prevData => {
                const newData = [...prevData];
                newData[selectedRowIndex].kindMember = newKindMember;
                return newData;
            });
        }
    };

    const columns: Column<IUserData>[] = useMemo(
        () => [
            {
                Header: 'D.N.I.',
                accessor: (d: IUserData) => d.dni
            },
            {
                Header: 'Nombre',
                accessor: (d: IUserData) => d.name
            },
            {
                Header: 'Apellidos',
                accessor: (d: IUserData) => d.firstSurname + ' ' + d.secondSurname
            },
            {
                Header: 'Rol del socio',
                accessor: (d: IUserData) => /**renderUserRoles**/ d.userRoles
            },
            {
                Header: 'Estado',
                accessor: (d: IUserData) => renderKindMember(d.kindMember)
            }
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [data]
    )

    const InfoButtonClickHandler = (props: {
        row: {
            index: number
        }
    }) => {
        if (props.row) {
            const clone = [...data]
            const selRow = clone[props.row.index]
            setSelectedRow(selRow)
            setMemberInfoModal(true)
        }
    }

    const EditKindMemberButtonClickHandler = (props: {
        row: {
            index: number
        }
    }) => {
        if (props.row) {
            const clone = [...data]
            const selRow = clone[props.row.index]
            setSelectedRow(selRow)
            setSelectedRowIndex(props.row.index); // Set the selected row index
            setChangeKindMemberModal(true)
        }
    }



    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, preGlobalFilteredRows, setGlobalFilter, state } = useTable<IUserData>(
        { columns, data },
        useGlobalFilter,
        useSortBy,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                ...columns,
                {
                    id: 'selection',
                    Header: () => <>GESTIONAR</>,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    Cell: (tableProps: any) => (
                        <div>
                            <Button variant="info" onClick={() => InfoButtonClickHandler(tableProps)}>
                                <InfoCircle aria-description="Datos completos" />
                            </Button>
                            <Button variant="info" onClick={() => EditKindMemberButtonClickHandler(tableProps)}>
                                <PersonGear aria-description="Modificar rol del socio" />
                            </Button>
                        </div>
                    )
                }
            ])
        }
    )

    return (
        <>
            <Table striped bordered hover responsive {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <div>
                <p> Total de registros: {preGlobalFilteredRows.length}</p>
            </div>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment*/}
            <input type="text" value={state.globalFilter} onChange={(event) => setGlobalFilter(event.target.value)} />
            <MemberModalProfileInfo show={memberInfoModal} onHide={() => setMemberInfoModal(false)} row={selectedRow ?? {}} />
            <ChangeKindMemberModal
                show={changeKindMemberModal}
                updateKindMember={updateKindMember}
                onHide={() => setChangeKindMemberModal(false)}
                memberFirstSurname={selectedRow?.firstSurname}
                memberSecondSurname={selectedRow?.secondSurname}
                memberEmail={selectedRow?.email}
                memberName={selectedRow?.name}
                kindMember={selectedRow?.kindMember}
            />
        </>
    )
}

export default MembersManagerTable

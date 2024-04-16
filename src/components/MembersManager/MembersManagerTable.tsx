/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useMemo, useState } from 'react'
import { Column, useTable, useSortBy, useGlobalFilter, useRowSelect } from 'react-table'
import { Button } from 'react-bootstrap'
import { InfoCircle, PersonGear } from 'react-bootstrap-icons'
import { Table } from 'react-bootstrap'
import { IUserData } from '../Types/Types'
import MemberModalProfileInfo from './MemberModalProfileInfo'
import { renderKindMember, renderUserRoles } from '../../utility/userUtilities'
import { UserProfile } from '../../store/types/userTypes'
import ChangeKindMemberModal from './ChangeKindMemberModal'

interface Props {
    usersData: IUserData[]
}

/**
 * Component that displays a table with members data and actions to modify them.
 * @param props The users data.
 * @returns Component with Table that contains members data and actions for modify members.
 */
const MembersManagerTable: React.FC<Props> = ({ usersData }: Props) => {
    const [data] = useState<IUserData[]>(useMemo(() => usersData, [])) //Caching data
    const [memberInfoModal, setMemberInfoModal] = useState(false)
    const [changeKindMemberModal, setChangeKindMemberModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState<IUserData | undefined>() // Updated typing here

    const columns: Column<any>[] = useMemo(
        () => [
            {
                Header: 'D.N.I.',
                accessor: (d) => d.dni
            },
            {
                Header: 'Nombre',
                accessor: (d) => d.name
            },
            {
                Header: 'Apellidos',
                accessor: (d) => d.firstSurname + ' ' + d.secondSurname
            },
            {
                Header: 'Rol del socio',
                accessor: (d: UserProfile) => renderUserRoles(d.userRoles)
            },
            {
                Header: 'Estado',
                accessor: (d: UserProfile) => renderKindMember(d.kindMember)
            }
        ],
        [data]
    )

    const InfoButtonClickHandler = (props: any) => {
        if (props.row) {
            const clone = [...data];
            const selRow = clone[props.row.index];
            setSelectedRow(selRow);
            setMemberInfoModal(true);
        }
    }

    const EditKindMemberButtonClickHandler = (props:any) => {
        if (props.row) {
            const clone = [...data];
            const selRow = clone[props.row.index];
            setSelectedRow(selRow);
            setChangeKindMemberModal(true)
        }
    }


    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, preGlobalFilteredRows, setGlobalFilter, state } = useTable(
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
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody> 
            </Table>
            <div>
                <p> Total de registros: {preGlobalFilteredRows.length}</p>
            </div>
            <input type="text" value={state.globalFilter} onChange={(event) => setGlobalFilter(event.target.value)} />
            <MemberModalProfileInfo show={memberInfoModal} onHide={() => setMemberInfoModal(false)} row={selectedRow ?? {}} />
            <ChangeKindMemberModal show={changeKindMemberModal} onHide={() => setChangeKindMemberModal(false)} memberFirstSurname={selectedRow?.firstSurname} memberSecondSurname={selectedRow?.secondSurname} memberName={selectedRow?.name} kindMember={selectedRow?.kindMember} memberDni={selectedRow?.dni}/>
        </>
    )
}

export default MembersManagerTable

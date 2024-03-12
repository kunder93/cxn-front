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
import MemberActionsModal from './MemberActionsModal'

interface Props {
    data: IUserData[]
}

const MembersManagerTable: React.FC<Props> = (props: Props) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [data /*, setData*/] = useState<IUserData[]>(useMemo(() => props.data, [])) //Caching data
    const [memberInfoModal, setMemberInfoModal] = useState(false)
    const [memberActionsModal, setMemberActionsModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState({})

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
                accessor: (d) => d.userRoles
            },
            {
                Header: 'Estado',
                accessor: (d) => d.kindMember
            }
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [data]
    )

    function InfoButtonClickHandler(props: any) {
        // eslint-disable-next-line prefer-const
        let clone = [...data]
        const selRow = clone[props.row.index]
        setSelectedRow(selRow)
        setMemberInfoModal(true)
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
                                <InfoCircle title="Más info" />
                            </Button>
                            <Button variant="info" onClick={() => setMemberActionsModal(true)}>
                                <PersonGear title="Acciones" />
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
                    {
                        // Loop over the header rows
                        headerGroups.map((headerGroup) => (
                            // Apply the header row props
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    // Loop over the headers in each row
                                    headerGroup.headers.map((column) => (
                                        // Apply the header cell props
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {
                                                // Render the header
                                                column.render('Header')
                                            }
                                            <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        // Loop over the table rows
                        rows.map((row) => {
                            // Prepare the row for display
                            prepareRow(row)
                            return (
                                // Apply the row props
                                <tr {...row.getRowProps()}>
                                    {
                                        // Loop over the rows cells
                                        row.cells.map((cell) => {
                                            // Apply the cell props
                                            return (
                                                <td {...cell.getCellProps()}>
                                                    {
                                                        // Render the cell contents
                                                        cell.render('Cell')
                                                    }
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <div>
                <p> Total de registros: {preGlobalFilteredRows.length}</p>
            </div>
            <input type="text" value={state.globalFilter} onChange={(event) => setGlobalFilter(event.target.value)} />
            <MemberModalProfileInfo show={memberInfoModal} onHide={() => setMemberInfoModal(false)} row={selectedRow} />
            <MemberActionsModal show={memberActionsModal} onHide={() => setMemberActionsModal(false)} row={selectedRow} />
        </>
    )
}
export default MembersManagerTable

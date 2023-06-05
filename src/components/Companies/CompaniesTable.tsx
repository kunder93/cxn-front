/* eslint-disable react/jsx-key */
import React, { useMemo, useState } from 'react'

import { Column, useTable, useSortBy, useGlobalFilter, useRowSelect } from 'react-table'
import { Button } from 'react-bootstrap'
import { COMPANIES_URL } from '../../resources/server_urls'
import axios from 'axios'
import EditCompanyModal from './EditCompanyModal'
import { Trash3, Pencil } from 'react-bootstrap-icons'
import {Table} from 'react-bootstrap'
import { CompanyTableProps, ICompany } from './Types'





function CompanyTable(props: CompanyTableProps) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [data, setData] = useState(useMemo(() => props.data, [])) //Caching data
    const [editModal, setEditModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState({})
    const columns: Column<ICompany>[] = useMemo(
        () => [
            {
                Header: 'NIF',
                accessor: 'nif'
            },
            {
                Header: 'Nombre',
                accessor: 'name'
            },
            {
                Header: 'Dirección',
                accessor: 'address'
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        ],
        [data]
    )

    function DeleteButtonClickHandler(props: any) {
        // eslint-disable-next-line prefer-const
        let clone = [...data]
        const modifiedClone: ICompany[] = clone.splice(props.row.index, 1)
        const row = modifiedClone[0]
        axios
            .delete(COMPANIES_URL + '/' + row.nif)
            .then((response) => {
                setData(clone)
            })
            .catch((error) => '')
            .finally(() => '')
    }

    function EditButtonClickHandler(props: any) {
        // eslint-disable-next-line prefer-const
        let clone = [...data]
        const a = clone[props.row.index]
        setSelectedRow(a)
        setEditModal(true)
        /*
                    axios
                    .delete(COMPANIES_URL + '/' + row.nifCif)
                    .then((response) => {setData(clone)
                        console.log(response)})
                    .catch((error) => console.log(error))
                    .finally(() => console.log('final'));
                    */
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
                    Header: () => <div> OPTIONS</div>,
                    Cell: (tableProps: any) => (
                        <div>
                            <Button variant="info" onClick={() => EditButtonClickHandler(tableProps)}>
                                <Pencil title="Editar"/>
                            </Button>
                            <Button variant="danger" onClick={() => DeleteButtonClickHandler(tableProps)}>
                                <Trash3 title="Borrar" />
                            </Button>
                        </div>
                    )
                }
            ])
        }
    )
    return (
        <>
             <Table  striped bordered hover responsive {...getTableProps()}>
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
                                        // eslint-disable-next-line react/jsx-key
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
            <EditCompanyModal show={editModal} onHide={() => setEditModal(false)} row={selectedRow} />
        </>
    )
}
export default CompanyTable

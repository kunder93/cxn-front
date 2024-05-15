/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useMemo, useState } from 'react'

import { Column, useTable, useSortBy, useGlobalFilter, useRowSelect } from 'react-table'
import {  Button} from 'react-bootstrap'
import { Trash3, Pencil } from 'react-bootstrap-icons'
import { Table } from 'react-bootstrap'
import { IChessQuestion, IChessQuestionsList } from '../../utility/CustomAxios'

interface ChessQuestionsTableProps{
    data:IChessQuestionsList
}

const CompanyTable:React.FC<ChessQuestionsTableProps>= (props)=>  {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [data, setData] = useState(useMemo(() => props.data.chessQuestionList, [])) //Caching data


    // data state is being updated when the props.data changes.
    useEffect(() => {
        setData(props.data.chessQuestionList)
    }, [props.data])


    const columns: Column<IChessQuestion>[] = useMemo(
        () => [
            {
                Header: 'Correo',
                accessor: 'email'
            },
            {
                Header: 'Fecha',
                accessor: 'date'
            },
            {
                Header: 'Categoria',
                accessor: 'category'
            },
            {
                Header: 'Título',
                accessor: 'topic'
            },
            {
                Header: 'Mensaje',
                accessor: 'message'
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [data]
    )

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
                    Cell: (/*tableProps: any*/) => (
                        <div>
                            <Button variant="info" onClick={()=> console.log('H')/*() => EditButtonClickHandler(tableProps)*/}>
                                <Pencil title="Editar" />
                            </Button>
                            <Button variant="danger" onClick={()=> console.log('Y')/*() => DeleteButtonClickHandler(tableProps)*/}>
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
        </>
    )
}
export default CompanyTable

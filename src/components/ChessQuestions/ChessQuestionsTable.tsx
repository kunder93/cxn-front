/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useMemo, useState } from 'react'
import { Column, useTable, useSortBy, useGlobalFilter, useRowSelect } from 'react-table'
import { Button } from 'react-bootstrap'
import { Trash3, Eye, EyeSlash } from 'react-bootstrap-icons'
import { Table } from 'react-bootstrap'
import { IChessQuestion, IChessQuestionsList } from '../../utility/CustomAxios'
import axios from 'axios'
import { CHESS_QUESTION_CHANGE_SEEN_STATE } from '../../resources/server_urls'
import { format, parseISO } from 'date-fns'

interface ChessQuestionsTableProps {
    data: IChessQuestionsList
}

const ChessQuestionsTable: React.FC<ChessQuestionsTableProps> = (props) => {
    const [data, setData] = useState(useMemo(() => props.data.chessQuestionList, [])) // Caching data

    // Data state is being updated when the props.data changes.
    useEffect(() => {
        setData(props.data.chessQuestionList)
    }, [props.data])

    const ChangeSeenState = (rowIndex: number) => {
        const clone = [...data]
        const row = clone[rowIndex]
        axios
            .post<IChessQuestion>(
                CHESS_QUESTION_CHANGE_SEEN_STATE,
                { id: row.id },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then((response) => {
                // Update the specific row data with the response
                clone[rowIndex] = response.data
                // Update the state with the new data
                setData(clone)
            })
            .catch((error) => console.log(error))
            .finally(() => console.log('final'))
    }

    const columns: Column<IChessQuestion>[] = useMemo(
        () => [
/*            {
                Header: 'Identificador',
                accessor: 'id'
            },
 */           {
                Header: 'Correo',
                accessor: 'email'
            },
            {
                Header: 'Fecha',
                accessor: 'date',
                Cell: ({ value }) => {
                    const formattedDate = format(parseISO(value.toString()), 'dd-MM-yyyy - HH:mm')
                    return <span>{formattedDate}</span>
                }
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
            },
            {
                Header: 'Visto',
                accessor: 'seen',
                Cell: ({ row }) => (
                    <div className="d-flex w-100">
                    <Button className="w-100" variant="info" onClick={() => ChangeSeenState(row.index)}>
                      {row.original.seen ? <Eye color='green' size={30} title="Visto" /> : <EyeSlash size={30} color='red' title="No visto" />}
                    </Button>
                  </div>
                )
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
                    Header: () => <div>BORRAR</div>,
                    Cell: (/*tableProps: any*/) => (
                        <div>
                            <Button variant="danger" onClick={() => console.log('Y')}>
                                <Trash3 size={30} title="Borrar" />
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

export default ChessQuestionsTable

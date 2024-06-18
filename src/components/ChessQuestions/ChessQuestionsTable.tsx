/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { Column, useTable, useSortBy, useGlobalFilter, useRowSelect, CellProps } from 'react-table'
import { Button, Table } from 'react-bootstrap'
import { Trash3, Eye, EyeSlash } from 'react-bootstrap-icons'
import axios from 'axios'
import { format } from 'date-fns'
import { IChessQuestion, IChessQuestionsList } from '../../utility/CustomAxios'
import { CHESS_QUESTION_CHANGE_SEEN_STATE, CHESS_QUESTION_DELETE } from '../../resources/server_urls'

interface ChessQuestionsTableProps {
    data: IChessQuestionsList
}

function handleDeleteButton(id: number, onDeleteSuccess: (id: number) => void) {
    axios
        .delete(`${CHESS_QUESTION_DELETE}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            onDeleteSuccess(id)
        })
        .catch((error) => {
            console.error('There was an error deleting the question:', error)
        })
}

const ChessQuestionsTable: React.FC<ChessQuestionsTableProps> = ({ data: initialData }) => {
    const [data, setData] = useState<IChessQuestion[]>([])

    useEffect(() => {
        setData(initialData.chessQuestionList)
    }, [initialData])

    const handleDeleteButtonWrapper = useCallback((id: number) => {
        handleDeleteButton(id, (deletedId) => {
            setData((prevData) => prevData.filter((question) => question.id !== deletedId))
        })
    }, [])

    const changeSeenState = useCallback(
        (rowIndex: number) => {
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
                    clone[rowIndex] = response.data
                    setData(clone)
                })
                .catch((error) => console.error(error))
        },
        [data]
    )

    const columns: Column<IChessQuestion>[] = useMemo(
        () => [
            {
                Header: 'Correo',
                accessor: 'email'
            },
            {
                Header: 'Fecha',
                accessor: 'date',
                Cell: ({ value }: CellProps<IChessQuestion>) => {
                    const formattedDate = format(value, 'dd-MM-yyyy - HH:mm')
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
                Cell: ({ row }: CellProps<IChessQuestion>) => (
                    <div className="d-flex w-100">
                        <Button className="w-100" variant="info" onClick={() => changeSeenState(row.index)}>
                            {row.original.seen ? <Eye color="green" size={30} title="Visto" /> : <EyeSlash size={30} color="red" title="No visto" />}
                        </Button>
                    </div>
                )
            }
        ],
        [changeSeenState]
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
                    Cell: ({ row }: CellProps<IChessQuestion>) => (
                        <div>
                            <Button variant="danger" onClick={() => handleDeleteButtonWrapper(row.original.id)}>
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
                <p>Total de registros: {preGlobalFilteredRows.length}</p>
            </div>
            <input type="text" value={state.globalFilter ?? ''} onChange={(event) => setGlobalFilter(event.target.value)} placeholder="Buscar..." />
        </>
    )
}

export default ChessQuestionsTable

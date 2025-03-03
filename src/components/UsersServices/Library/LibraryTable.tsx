import React, { useEffect, useMemo, useState } from 'react'
import { Column, useTable, useGlobalFilter, useSortBy, useRowSelect, CellProps, ColumnInstance } from 'react-table'
import axios from 'axios'
import { Trash3 } from 'react-bootstrap-icons'
import { Button, Table } from 'react-bootstrap'
import { IBook } from '../../Types/Types'
import { LIBRARY_URL } from '../../../resources/server_urls'

interface LibraryTableProps {
    data: IBook[]
}

const LibraryTable: React.FC<LibraryTableProps> = ({ data: initialData }) => {
    const [data, setData] = useState<IBook[]>(initialData)

    useEffect(() => {
        setData(initialData)
    }, [initialData])

    const columns = useMemo<Column<IBook>[]>(
        () => [
            { Header: 'ISBN', accessor: 'isbn' },
            { Header: 'Titulo', accessor: 'title' },
            { Header: 'Genero', accessor: 'gender' }, // Fixed from 'gender' to 'genre' if that's the correct property name
            { Header: 'Fecha publicacion', accessor: 'publishYear' },
            { Header: 'Idioma', accessor: 'language' }
        ],
        []
    )

    const handleDelete = async (isbn: string, index: number) => {
        try {
            await axios.delete(`${LIBRARY_URL}/${isbn}`)
            setData((prev) => prev.filter((_, i) => i !== index))
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Delete error:', error.message)
            } else {
                console.error('Unexpected error:', error)
            }
        }
    }

    const tableInstance = useTable<IBook>({ columns, data }, useGlobalFilter, useSortBy, useRowSelect, (hooks) => {
        hooks.visibleColumns.push((columns) => [
            ...columns,
            {
                id: 'actions',
                Header: 'Opciones',
                Cell: ({ row }: CellProps<IBook>) => (
                    <Button
                        variant="danger"
                        onClick={() => async () => {
                            await handleDelete(row.original.isbn, row.index)
                        }}
                    >
                        <Trash3 title="Borrar" />
                    </Button>
                )
            }
        ])
    })

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, preGlobalFilteredRows, setGlobalFilter, state } = tableInstance

    const getSortIndicator = (col: ColumnInstance<IBook>) => {
        if (!col.isSorted) return ''
        return col.isSortedDesc ? ' 🔽' : ' 🔼'
    }

    return (
        <>
            <input
                type="text"
                value={(state.globalFilter as string) || ''}
                onChange={(e) => {
                    setGlobalFilter(e.target.value)
                }}
                placeholder="Buscar..."
            />

            <Table striped bordered hover responsive {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>{getSortIndicator(column)}</span>
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
        </>
    )
}

export default LibraryTable

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useMemo, useState } from 'react'
import { Column, useTable, useSortBy, useGlobalFilter, useRowSelect } from 'react-table'
import axios from 'axios'
import { Trash3 } from 'react-bootstrap-icons'
import {  Button,  Table } from 'react-bootstrap'
import { IBook } from '../../Types/Types'
import { LIBRARY_URL } from '../../../resources/server_urls'
interface LibraryTableProps {
    data: IBook[]
}


const LibraryTable:React.FC<LibraryTableProps> = (props) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [data, setData] = useState(useMemo(() => props.data, [])) //Caching data
    // data state is being updated when the props.data changes.
    useEffect(() => {
        setData(props.data)
    }, [props.data])

    const columns: Column<IBook>[] = useMemo(
        () => [
            {
                Header: 'ISBN',
                accessor: 'isbn'
            },
            {
                Header: 'Titulo',
                accessor: 'title'
            },
            {
                Header: 'Genero',
                accessor: 'gender'
            },
            {
                Header: 'Fecha publicacion',
                accessor: 'publishYear'
            },
            {
                Header: 'Idioma',
                accessor: 'language'
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [data]
    )

    const DeleteButtonClickHandler = async (props: any) => {
        // eslint-disable-next-line prefer-const
        let clone = [...data]
        const modifiedClone: IBook[] = clone.splice(props.row.index, 1)
        const row = modifiedClone[0]
        try {
            await axios.delete(LIBRARY_URL + '/' + row.isbn)
            
            setData(clone)
        } catch (error: any) {
      
            if (error.response?.data) {
                // Request made and server responded
               
            } else if (error.request) {
                // The request was made but no response was received
               
            } else {
                // Something happened in setting up the request that triggered an Error
               
            }
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
                    Header: () => <div> OPTIONS</div>,
                    Cell: (tableProps: any) => (
                        <div>
                            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises*/}
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
export default LibraryTable

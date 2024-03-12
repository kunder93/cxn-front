/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from 'react'
import { IInvoice } from '../Types/Types'
import { Column, useTable, useSortBy, useGlobalFilter, useRowSelect } from 'react-table'
import { Button, Container } from 'react-bootstrap'
import { INVOICES_URL } from '../../resources/server_urls'
import axios from 'axios'
import { Pencil, Trash3 } from 'react-bootstrap-icons'
import Table from 'react-bootstrap/Table'
import CreateInvoiceModal from './CreateInvoiceModal'
import EditInvoiceModal from './EditInvoiceModal'

interface Props {
    data: IInvoice[]
}

const InvoicesTable: React.FC<Props> = (props: Props) => {
    console.log(props.data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [data, setData] = useState(useMemo(() => props.data, [])) //Caching data
    const [editModal, setEditModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState({})
    const columns: Column<IInvoice>[] = useMemo(
        () => [
            {
                Header: 'Numero',
                accessor: 'number'
            },
            {
                Header: 'Serie',
                accessor: 'series'
            },
            {
                Header: 'Fecha expedición',
                accessor: 'expeditionDate'
            },
            {
                Header: 'Fecha pago anticipado',
                accessor: 'advancePaymentDate'
            },
            {
                Header: 'Exento impuestos',
                accessor: (d) => (d.taxExempt ? 'SI' : 'NO')
            },
            {
                Header: 'Vendedor NIF',
                accessor: 'sellerNif'
            },
            {
                Header: 'Comprador NIF',
                accessor: 'buyerNif'
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [data]
    )

    // Function to add invoice tp data
    const addInvoice = (newInvoice: IInvoice) => {
        setData([...data, newInvoice])
    }

    function DeleteButtonClickHandler(props: any) {
        // eslint-disable-next-line prefer-const
        let clone = [...data]
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        const modifiedClone: IInvoice[] = clone.splice(props.row.index, 1)
        const row = modifiedClone[0]
        axios
            .delete(INVOICES_URL + '/' + row.series + '/' + row.number)
            .then((/*response*/) => {
                setData(clone)
            })
            .catch((error) => console.log(error))
            .finally(() => console.log('final'))
    }

    function EditButtonClickHandler(props: any) {
        // eslint-disable-next-line prefer-const
        let clone = [...data]

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const a = clone[props.row.index]
        setSelectedRow(a)
        setEditModal(true)
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
                                <Pencil title="Editar" />
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
    const [modalShow, setModalShow] = useState(false)
    return (
        <Container>
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
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment*/}
            <input type="text" value={state.globalFilter} onChange={(event) => setGlobalFilter(event.target.value)} />
            <EditInvoiceModal show={editModal} onHide={() => setEditModal(false)} row={selectedRow} />
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Añadir nueva factura
            </Button>
            <CreateInvoiceModal show={modalShow} onHide={() => setModalShow(false)} data={data} addInvoice={addInvoice} />
        </Container>
    )
}

export default InvoicesTable

/* eslint-disable react/jsx-key */
import React, { useEffect, useMemo, useState } from 'react'

import { Column, useTable, useSortBy, useGlobalFilter, useRowSelect } from 'react-table'
import { Alert, Button, Collapse } from 'react-bootstrap'
import { COMPANIES_URL } from '../../resources/server_urls'
import axios from 'axios'
import EditCompanyModal from './EditCompanyModal'
import { Trash3, Pencil } from 'react-bootstrap-icons'
import { Table } from 'react-bootstrap'
import { CompanyTableProps, ICompany } from './Types'
import { FloatingNotificationContainer } from './CompaniesStyles'

const FloatingNotification: React.FC<{ message: string; variant: string; onClose: () => void }> = ({ message, variant, onClose }) => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
        }, 5000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    const handleExited = () => {
        onClose()
    }

    return (
        <Collapse in={visible} onExited={handleExited}>
            <FloatingNotificationContainer>
                <Alert variant={variant} onClose={onClose} dismissible>
                    {message}
                </Alert>
            </FloatingNotificationContainer>
        </Collapse>
    )
}

function CompanyTable(props: CompanyTableProps) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [data, setData] = useState(useMemo(() => props.data, [])) //Caching data
    const [editModal, setEditModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState({})

    const [deleteErrorMessage, setDeleteErrorMessage] = useState('')
    const [deleteSuccessNotification, setDeleteSuccessNotification] = useState(false)
    const [deleteErrorNotification, setDeleteErrorNotification] = useState(false)
    function changeSuccessNotificationState(): void {
        setDeleteSuccessNotification(false)
    }
    function changeErrorNotificationState(): void {
        setDeleteErrorNotification(false)
    }

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [data]
    )

    const DeleteButtonClickHandler = async (props: any) => {
        // eslint-disable-next-line prefer-const
        let clone = [...data]
        const modifiedClone: ICompany[] = clone.splice(props.row.index, 1)
        const row = modifiedClone[0]
        try {
            await axios.delete(COMPANIES_URL + '/' + row.nif)
            setDeleteSuccessNotification(true)
            setData(clone)
        } catch (error: any) {
            setDeleteErrorNotification(true)
            if (error.response && error.response.data) {
                // Request made and server responded
                setDeleteErrorMessage(error.response.data.content)
            } else if (error.request) {
                // The request was made but no response was received
                setDeleteErrorMessage('Error: no hay respuesta.')
            } else {
                // Something happened in setting up the request that triggered an Error
                setDeleteErrorMessage('Error: algo inesperado. Recarga o intentalo mas tarde.')
            }
        }
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
            {deleteSuccessNotification && (
                <FloatingNotification
                    message={'COMPAÑIA BORRADA CON EXITO'}
                    variant={'success'}
                    onClose={changeSuccessNotificationState}
                ></FloatingNotification>
            )}
            {deleteErrorNotification && (
                <FloatingNotification message={deleteErrorMessage} variant={'danger'} onClose={changeErrorNotificationState}></FloatingNotification>
            )}
        </>
    )
}
export default CompanyTable

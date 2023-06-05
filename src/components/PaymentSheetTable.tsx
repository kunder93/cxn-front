/* eslint-disable react/jsx-key */
import React, { useMemo, useState } from 'react'
import { ICompany, IPaymentSheet, IPaymentSheetList } from './Types/Types'
import { Column, useTable, useSortBy, useGlobalFilter, useRowSelect } from 'react-table'
import { Button } from 'react-bootstrap'
import { COMPANIES_URL } from '../resources/server_urls'
import axios from 'axios'
import EditCompanyModal from './Companies/EditCompanyModal'
import { Trash3, Pencil, FiletypePdf } from 'react-bootstrap-icons'
import styled from 'styled-components'
import {Table} from 'react-bootstrap'
import ReactPDF, { PDFViewer } from '@react-pdf/renderer'
import MyDocument from './PaymentSheetPDFGenerator'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../resources/routes-constants'
import AddDataPaymentSheetModal from './PaymentSheetAddDataModal'
type Props = {
    data: IPaymentSheet[]
}



function PaymentSheetTable(props: Props) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [data, setData] = useState(useMemo(() => props.data, [])) //Caching data
    const [addPaymentSheetDataModal, setAddPaymentSheetDataModal] = useState(false)
    const navigate = useNavigate()
    const [selectedRow, setSelectedRow] = useState({})
    console.log(props.data)
    // const columns: Column<IPaymentSheet>[] = useMemo(
    const columns: Column<any>[] = useMemo(
        () => [
            {
                Header: 'Id',
                accessor: 'paymentSheetIdentifier'
            },
            {
                Header: 'Nombre',
                accessor: 'userName'
            },
            {
                Header: 'Apellido 1',
                accessor: 'userFirstSurname'
            },
            {
                Header: 'Apellido 2',
                accessor: 'userSecondSurname'
            },
            {
                Header: 'DNI',
                accessor: 'userDNI'
            },
            {
                Header: 'Dirección',
                accessor: 'userDomicile'
            },
            {
                Header: 'Motivo',
                accessor: 'reason'
            },
            {
                Header: 'Lugar',
                accessor: 'place'
            },
            {
                Header: 'Fecha inicio',
                accessor: 'startDate'
            },
            {
                Header: 'Fecha fin',
                accessor: 'endDate'
            },
            {
                Header: 'Recorrido',
                accessor: 'selfVehicle.places'
            },
            {
                Header: 'Distancia',
                accessor: 'selfVehicle.distance'
            },
            {
                Header: 'Precio/Km',
                accessor: 'selfVehicle.kmPrice'
            },
            {
                Header: 'transporte regular:',
                accessor: 'regularTransportList.size()'
            },
            {
                Header: 'Food-Housing Days',
                accessor: 'foodHousing.amountDays'
            },
            {
                Header: 'Food-Housing day price',
                accessor: 'foodHousing.dayPrice'
            },
            {
                Header: 'Food-Housing overnight',
                accessor: (d) => d.foodHousing ? d.foodHousing.overnight.toString() : "False"
            }

            // eslint-disable-next-line react-hooks/exhaustive-deps
        ],
        [data]
    )

    function DeleteButtonClickHandler(props: any) {
        // eslint-disable-next-line prefer-const
        let clone = [...data]
        const modifiedClone: IPaymentSheet[] = clone.splice(props.row.index, 1)
        const row = modifiedClone[0]
        
        axios
            .delete(COMPANIES_URL + '/' + "row.nifCif")
            .then((response) => {
                setData(clone)
            })
            .catch((error) => console.log(error))
            .finally(() => console.log('final'))
    }

    function AddDataButtonClickHandler(props: any) {
        // eslint-disable-next-line prefer-const
        let clone = [...data]
        const a:IPaymentSheet = clone[props.row.index]
        setSelectedRow(a)
        setAddPaymentSheetDataModal(true)
        /*
                    axios
                    .delete(COMPANIES_URL + '/' + row.nifCif)
                    .then((response) => {setData(clone)
                        console.log(response)})
                    .catch((error) => console.log(error))
                    .finally(() => console.log('final'));
                    */
    }




    function ShowPDFButtonClickHandler(props: any)  {
        // eslint-disable-next-line prefer-const
        let clone = [...data]
        const modifiedClone: IPaymentSheet[] = clone.splice(props.row.index, 1)
        const row = modifiedClone[0]
        navigate(ROUTES.PDF_DOCUMENT, { state: {userName: row.userName, 
            userFirstSurname: row.userFirstSurname, userSecondSurname: row.userSecondSurname, 
            userDomicile: row.userDomicile, userDNI: row.userDNI,
            reason: row.reason, place: row.place, startDate: row.startDate, endDate: row.endDate,
            selfVehicle: row.selfVehicle, regularTransportList: row.regularTransportList,
            foodHousing: row.foodHousing            
        
        }})
        return ('')
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
                            <Button variant="info" onClick={() => AddDataButtonClickHandler(tableProps)}>
                                <Pencil title="Editar"/>
                            </Button>
                            <Button variant="danger" onClick={() => DeleteButtonClickHandler(tableProps)}>
                                <Trash3 title="Borrar" />
                            </Button>
                            <Button variant="secondary" onClick={() => ShowPDFButtonClickHandler(tableProps)}>
                                <FiletypePdf title="PDF" />
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
            <AddDataPaymentSheetModal show={addPaymentSheetDataModal} onHide={() => setAddPaymentSheetDataModal(false)} row={selectedRow} />
        </>
    )
}
export default PaymentSheetTable

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import axios, { AxiosError } from 'axios'
import { Button, Table } from 'react-bootstrap'
import { FiletypePdf, Pencil, Trash3 } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { Column, useGlobalFilter, useRowSelect, useSortBy, useTable } from 'react-table'
import { ROUTES } from '../../resources/routes-constants'
import { PAYMENT_SHEET_URL } from '../../resources/server_urls'
import { IFoodHousing, IPaymentSheet, ISelfVehicle } from '../Types/Types'
import AddDataPaymentSheetModal from './PaymentSheetAddDataModal'
import styled from 'styled-components'
import useNotification, { NotificationType } from '../../components/Common/hooks/useNotification'
import FloatingNotificationA from '../../components/Common/FloatingNotificationA'
import { useAppSelector } from '../../store/hooks'

const TableFilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    padding-bottom: 0.5em;
`

const AmountRegistersBox = styled.div`
    padding-left: 4em;
`

const FilterInputLabel = styled.label`
    padding-right: 1em;
`
const OptionsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

interface Props {
    initialData: IPaymentSheet[]
    deleteRow: (paymentSheetIdentifier: number) => void
}

const PaymentSheetTable: React.FC<Props> = ({ initialData, deleteRow }) => {
    const [data, setData] = useState<IPaymentSheet[]>(initialData)
    const dataRef = useRef<IPaymentSheet[]>(data)
    const [addPaymentSheetDataModal, setAddPaymentSheetDataModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState<IPaymentSheet | null>(null)
    const { notification, showNotification, hideNotification } = useNotification()
    const navigate = useNavigate()
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    //Update selected row with data
    useEffect(() => {
        if (selectedRow) {
            const updatedRow = data.find((item) => item.paymentSheetIdentifier === selectedRow.paymentSheetIdentifier)
            setSelectedRow(updatedRow ?? null)
        }
    }, [data, selectedRow])

    useEffect(() => {
        setData(initialData)
        dataRef.current = initialData
    }, [initialData])

    const columns: Column<IPaymentSheet>[] = useMemo(
        () => [
            { Header: 'Id', accessor: 'paymentSheetIdentifier' },
            {
                Header: 'Nombre',
                accessor: (d) => `${d.userName} ${d.userFirstSurname} ${d.userSecondSurname}`
            },
            { Header: 'DNI', accessor: 'userDNI' },
            { Header: 'Motivo', accessor: 'reason' },
            { Header: 'Lugar', accessor: 'place' },
            { Header: 'Fecha inicio', accessor: 'startDate' },
            { Header: 'Fecha fin', accessor: 'endDate' }
        ],
        []
    )

    const deleteButtonClickHandler = useCallback(
        (identifier: number) => {
            const paymentSheetForDelete = dataRef.current.find((item) => item.paymentSheetIdentifier === identifier)
            const jwt = userJwt
            if (paymentSheetForDelete) {
                axios
                    .delete(`${PAYMENT_SHEET_URL}/${paymentSheetForDelete.paymentSheetIdentifier}`, { headers: { Authorization: 'Bearer ' + jwt } })
                    .then(() => {
                        showNotification('ELIMINADA CORRECTAMENTE', NotificationType.Success)
                        deleteRow(paymentSheetForDelete.paymentSheetIdentifier)
                        setData((prevData) => prevData.filter((item) => item.paymentSheetIdentifier !== identifier))
                        dataRef.current = dataRef.current.filter((item) => item.paymentSheetIdentifier !== identifier)
                    })
                    .catch((error) => {
                        const axiosError = error as AxiosError
                        showNotification(axiosError.message, NotificationType.Error)
                    })
            }
        },
        [deleteRow, showNotification, userJwt]
    )

    const addDataButtonClickHandler = useCallback((identifier: number) => {
        const paymentSheet = dataRef.current.find((item) => item.paymentSheetIdentifier === identifier)
        setSelectedRow(paymentSheet ?? null)
        setAddPaymentSheetDataModal(true)
    }, [])

    const showPDFButtonClickHandler = useCallback(
        (identifier: number) => {
            const paymentSheet = dataRef.current.find((item) => item.paymentSheetIdentifier === identifier)
            if (paymentSheet) {
                navigate(ROUTES.PDF_DOCUMENT, { state: paymentSheet })
            }
        },
        [navigate]
    )

    const addPaymentSheetSelfVehicle = useCallback((paymentSheetId: number, selfVehicleData: ISelfVehicle) => {
        setData((prevData) => prevData.map((item) => (item.paymentSheetIdentifier === paymentSheetId ? { ...item, selfVehicle: selfVehicleData } : item)))
        setSelectedRow((prevRow) => (prevRow?.paymentSheetIdentifier === paymentSheetId ? { ...prevRow, selfVehicle: selfVehicleData } : prevRow))
    }, [])

    const addPaymentSheetFoodHousing = useCallback((paymentSheetId: number, foodHousingData: IFoodHousing) => {
        setData((prevData) => prevData.map((item) => (item.paymentSheetIdentifier === paymentSheetId ? { ...item, foodHousing: foodHousingData } : item)))
        setSelectedRow((prevRow) => (prevRow?.paymentSheetIdentifier === paymentSheetId ? { ...prevRow, foodHousing: foodHousingData } : prevRow))
    }, [])

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
                    Header: 'OPCIONES',
                    Cell: ({ row }) => (
                        <OptionsContainer>
                            <Button variant="info" onClick={() => addDataButtonClickHandler(row.original.paymentSheetIdentifier)}>
                                <Pencil title="Editar" />
                            </Button>
                            <Button variant="danger" onClick={() => deleteButtonClickHandler(row.original.paymentSheetIdentifier)}>
                                <Trash3 title="Borrar" />
                            </Button>
                            <Button variant="secondary" onClick={() => showPDFButtonClickHandler(row.original.paymentSheetIdentifier)}>
                                <FiletypePdf title="PDF" />
                            </Button>
                        </OptionsContainer>
                    )
                }
            ])
        }
    )

    const globalFilterStatus = state.globalFilter as string

    return (
        <>
            <TableFilterContainer>
                <FilterInputLabel htmlFor="filterInput">Busca hojas de liquidación:</FilterInputLabel>
                <input type="text" value={globalFilterStatus ?? ''} onChange={(event) => setGlobalFilter(event.target.value)} aria-label="Buscar empresas" />
                <AmountRegistersBox>
                    Total de registros: {preGlobalFilteredRows.length} (Mostrando: {rows.length})
                </AmountRegistersBox>
            </TableFilterContainer>
            <Table striped bordered hover responsive {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup, headerGroupIndex) => {
                        const { key: headerGroupKey, ...headerGroupProps } = headerGroup.getHeaderGroupProps()
                        return (
                            <tr key={headerGroupKey ?? headerGroupIndex} {...headerGroupProps}>
                                {headerGroup.headers.map((column, columnIndex) => {
                                    const { key: columnKey, ...columnProps } = column.getHeaderProps(column.getSortByToggleProps())
                                    return (
                                        <th key={columnKey ?? columnIndex} {...columnProps}>
                                            {column.render('Header')}
                                            <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                                        </th>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, rowIndex) => {
                        prepareRow(row)
                        const { key: rowKey, ...rowProps } = row.getRowProps()
                        return (
                            <tr key={rowKey ?? rowIndex} {...rowProps}>
                                {row.cells.map((cell, cellIndex) => {
                                    const { key: cellKey, ...cellProps } = cell.getCellProps()
                                    return (
                                        <td key={cellKey ?? cellIndex} {...cellProps}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <FloatingNotificationA notification={notification} hideNotification={hideNotification} />
            {selectedRow && (
                <AddDataPaymentSheetModal
                    show={addPaymentSheetDataModal}
                    onHide={() => setAddPaymentSheetDataModal(false)}
                    row={selectedRow}
                    addPaymentSheetSelfVehicle={addPaymentSheetSelfVehicle}
                    addPaymentSheetFoodHousing={addPaymentSheetFoodHousing}
                />
            )}
        </>
    )
}

export default PaymentSheetTable

import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { Column, useTable, useSortBy, useGlobalFilter, useRowSelect, CellProps } from 'react-table'
import { Alert, Button, Collapse, Table } from 'react-bootstrap'
import { COMPANIES_URL } from '../../resources/server_urls'
import { Trash3 } from 'react-bootstrap-icons'
import { CompanyTableProps, ICompany } from './Types'
import axios from 'axios'
import styled from 'styled-components'
import { FloatingNotificationContainer } from '../../components/Common/FloatingNotificationA'

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

const OptionsCell = styled.div`
    display: flex;
    justify-content: space-evenly;
`

interface FloatingNotificationProps {
    message: string
    variant: string
    onClose: () => void
}

const FloatingNotification: React.FC<FloatingNotificationProps> = ({ message, variant, onClose }) => {
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

const CompanyTable: React.FC<CompanyTableProps> = ({ data: initialData }) => {
    const [data, setData] = useState<ICompany[]>(useMemo(() => initialData, [initialData]))
    const [notification, setNotification] = useState<{ message: string; variant: string } | null>(null)

    useEffect(() => {
        setData(initialData)
    }, [initialData])

    const columns: Column<ICompany>[] = useMemo(
        () => [
            { Header: 'NIF', accessor: 'nif' },
            { Header: 'Nombre', accessor: 'name' },
            { Header: 'Dirección', accessor: 'address' }
        ],
        []
    )

    const handleDeleteButtonClick = useCallback(
        async (rowIndex: number) => {
            const companyToDelete = data[rowIndex]
            try {
                await axios.delete(`${COMPANIES_URL}/${companyToDelete.nif}`)
                setData((prevData) => prevData.filter((_, index) => index !== rowIndex))
                setNotification({ message: 'COMPAÑIA BORRADA CON EXITO', variant: 'success' })
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.data) {
                    setNotification({ message: 'Error: no hay respuesta del servidor.', variant: 'danger' })
                } else {
                    setNotification({ message: 'Error: algo inesperado. Recarga o intentalo más tarde.', variant: 'danger' })
                }
            }
        },
        [data]
    )

    // Function wrapper to avoid returning a promise directly
    const handleDeleteButtonClickWrapper = (rowIndex: number) => {
        handleDeleteButtonClick(rowIndex).catch((error) => {
            console.error('Error handling delete button click:', error)
        })
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
                    id: 'options',
                    Header: () => <div>OPCIONES</div>,
                    Cell: ({ row }: CellProps<ICompany>) => (
                        <OptionsCell>
                            <Button
                                variant="danger"
                                onClick={() => {
                                    handleDeleteButtonClickWrapper(row.index)
                                }}
                            >
                                <Trash3 title="Borrar" />
                            </Button>
                        </OptionsCell>
                    )
                }
            ])
        }
    )
    const globalFilterStatus = state.globalFilter as string | number | readonly string[] | undefined
    return (
        <>
            <TableFilterContainer>
                <FilterInputLabel htmlFor="filterInput">Busca empresas:</FilterInputLabel>
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
            {notification && <FloatingNotification message={notification.message} variant={notification.variant} onClose={() => setNotification(null)} />}
        </>
    )
}

export default CompanyTable

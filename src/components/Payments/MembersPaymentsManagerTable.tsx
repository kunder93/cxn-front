import { IUsersListPaymentsData, PaymentsCategory, PaymentsState } from 'components/Types/Types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import React, { useState, useCallback, useMemo } from 'react'
import { Table } from 'react-bootstrap'
import { useTable, Column, Row } from 'react-table'
import { formatCurrency, translatePaymentCategory, translatePaymentState } from 'utility/paymentsUtilities'
import { GiTakeMyMoney } from 'react-icons/gi'
import { ConfirmPaymentModal } from './ConfirmPaymentModal'
import { MdCancel } from 'react-icons/md'
import { CancelPaymentModal } from './CancelPaymentModal'
import { PaymentInfo } from './Types'

interface PaymentTableProps {
    data: IUsersListPaymentsData
}

const PaymentTable: React.FC<PaymentTableProps> = ({ data }) => {
    const [selectedPayment, setSelectedPayment] = useState<PaymentInfo | null>(null)
    const [modalShow, setModalShow] = useState(false)
    const [cancelModalShow, setCancelModalShow] = useState(false)

    // Memoize the modal handlers to avoid unnecessary re-creations
    const handleCloseModal = useCallback(() => setModalShow(false), [])
    const handleCloseCancelModal = useCallback(() => setCancelModalShow(false), [])

    const openConfirmModal = useCallback((row: Row<(typeof tableData)[number]>) => {
        setSelectedPayment({
            id: row.original.id,
            title: row.original.title,
            amount: row.original.amount,
            ownerDni: row.original.dni,
            createdAt: row.original.createdAt
        })
        setModalShow(true)
    }, [])

    const handleCancelPayment = useCallback((row: Row<(typeof tableData)[number]>) => {
        setSelectedPayment({
            id: row.original.id,
            title: row.original.title,
            amount: row.original.amount,
            ownerDni: row.original.dni,
            createdAt: row.original.createdAt
        })
        setCancelModalShow(true)
    }, [])

    const generateRowColor = useCallback((state: PaymentsState) => {
        switch (state) {
            case PaymentsState.CANCELLED:
                return 'table-danger' // Red for cancelled
            case PaymentsState.PAID:
                return 'table-success' // Green for paid
            case PaymentsState.UNPAID:
                return 'table-warning' // Yellow for unpaid
            default:
                return '' // Default, no class
        }
    }, [])

    // Memoize the table data transformation logic to avoid unnecessary recalculations
    const tableData = useMemo(() => {
        return Object.entries(data).flatMap(([dni, payments]) =>
            payments.length > 0
                ? payments.map((payment) => ({ dni, ...payment }))
                : [
                      {
                          dni,
                          id: 'N/A',
                          title: 'Sin pagos',
                          description: 'N/A',
                          category: PaymentsCategory.OTHER_PAYMENT,
                          amount: 0,
                          createdAt: '',
                          paidAt: null,
                          state: PaymentsState.CANCELLED
                      }
                  ]
        )
    }, [data])

    // Define columns and cells
    const columns: Column<(typeof tableData)[number]>[] = useMemo(
        () => [
            { Header: 'DNI', accessor: 'dni' },
            { Header: 'Título', accessor: 'title' },
            { Header: 'Descripción', accessor: 'description' },
            {
                Header: 'Cantidad (€)',
                accessor: 'amount',
                Cell: ({ value }: { value: number }) => formatCurrency(value)
            },
            {
                Header: 'Categoría',
                accessor: 'category',
                Cell: ({ value }: { value: PaymentsCategory }) => translatePaymentCategory(value)
            },
            {
                Header: 'Estado',
                accessor: 'state',
                Cell: ({ value }: { value: PaymentsState }) => translatePaymentState(value)
            },
            {
                Header: 'F. Creación',
                accessor: 'createdAt',
                Cell: ({ value }: { value: string }) => (value ? format(new Date(value), "dd '/' MM '/' yyyy", { locale: es }) : 'N/A')
            },
            {
                Header: 'F. Pago',
                accessor: 'paidAt',
                Cell: ({ value }: { value: string | null }) => (value ? format(new Date(value), "dd '/' MM '/' yyyy", { locale: es }) : 'N/A')
            },
            {
                Header: 'Acción',
                Cell: ({ row }: { row: Row<(typeof tableData)[number]> }) => (
                    <>
                        {row.original.state === PaymentsState.UNPAID && (
                            <button
                                onClick={() => handleCancelPayment(row)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                aria-label={`Cancelar pago con ID ${row.original.id}`}
                                title={`Cancelar pago con ID ${row.original.id}`}
                                aria-describedby={`payment-${row.original.id}`}
                            >
                                <MdCancel color="red" size={24} />
                            </button>
                        )}

                        {row.original.state === PaymentsState.UNPAID && (
                            <button
                                onClick={() => openConfirmModal(row)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                aria-label={`Marcar como pagado, ID ${row.original.id}`}
                                title={`Marcar como pagado, ID ${row.original.id}`}
                                aria-describedby={`payment-${row.original.id}`}
                            >
                                <GiTakeMyMoney color="green" size={24} />
                            </button>
                        )}
                    </>
                )
            }
        ],
        [handleCancelPayment, openConfirmModal]
    )

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: tableData
    })

    return (
        <>
            <Table striped bordered hover size="sm" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup, headerIndex) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={headerIndex}>
                            {headerGroup.headers.map((column, columnIndex) => (
                                <th {...column.getHeaderProps()} key={`${headerIndex}-${columnIndex}`}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, rowIndex) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} key={rowIndex} className={generateRowColor(row.original.state)}>
                                {row.cells.map((cell) => {
                                    const { key, ...cellProps } = cell.getCellProps() // Extract `key` from props
                                    return (
                                        <td key={key} {...cellProps}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <ConfirmPaymentModal show={modalShow} onHide={handleCloseModal} paymentinfo={selectedPayment} />
            <CancelPaymentModal show={cancelModalShow} onHide={handleCloseCancelModal} paymentinfo={selectedPayment} />
        </>
    )
}

export default PaymentTable

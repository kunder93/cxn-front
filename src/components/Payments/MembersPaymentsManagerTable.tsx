import { IPaymentDetails, IUsersListPaymentsData, PaymentsCategory, PaymentsState } from 'components/Types/Types'
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
import styled from 'styled-components'
import { PiPlusSquareFill } from 'react-icons/pi'
import CreateUserPaymentModal from './CreateUserPaymentModal'
import { UserDataInfoPopover } from './UserDataInfoPopover'

const AddUserPayment = styled.div``
const AddPaymentIcon = styled(PiPlusSquareFill)`
    fill: blue;
    cursor: pointer;
    transition: transform 0.3s ease;
    &:hover {
        transform: scale(1.2);
    }
`
interface PaymentTableProps {
    data: IUsersListPaymentsData
}

const PaymentTable: React.FC<PaymentTableProps> = ({ data }) => {
    const [selectedPayment, setSelectedPayment] = useState<PaymentInfo | null>(null)
    const [modalShow, setModalShow] = useState(false)
    const [cancelModalShow, setCancelModalShow] = useState(false)
    const [showCreatePaymentModal, setShowCreatePaymentModal] = useState(false)
    // Memoize the modal handlers to avoid unnecessary re-creations
    const handleCloseModal = useCallback(() => setModalShow(false), [])
    const handleCloseCancelModal = useCallback(() => setCancelModalShow(false), [])
    const [managedTableData, setManagedTableData] = useState<IUsersListPaymentsData>(data)

    // Función para añadir una nueva fila de pago
    const addPaymentRow = useCallback((userDni: string, payment: IPaymentDetails) => {
        // Verificar si el DNI ya tiene pagos registrados, si no, crear un nuevo array
        setManagedTableData((prevData) => {
            const updatedData = { ...prevData }

            // Si ya existen pagos para ese DNI, añadir el nuevo pago
            if (updatedData[userDni]) {
                updatedData[userDni].push(payment)
            } else {
                // Si no existen pagos, crear un array con el nuevo pago
                updatedData[userDni] = [payment]
            }

            return updatedData
        })
    }, [])

    const updatePaymentState = useCallback((userDni: string, paymentId: string, newState: PaymentsState) => {
        setManagedTableData((prevData) => {
            const updatedData = { ...prevData }

            // Check if the user exists
            if (updatedData[userDni]) {
                const paymentIndex = updatedData[userDni].findIndex((payment) => payment.id === paymentId)

                // If the payment exists, update its state
                if (paymentIndex !== -1) {
                    updatedData[userDni][paymentIndex] = {
                        ...updatedData[userDni][paymentIndex],
                        state: newState
                    }
                }
            }

            return updatedData
        })
    }, [])

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

    const handleCloseCreatePaymentModal = useCallback(() => setShowCreatePaymentModal(false), [])

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
        return Object.entries(managedTableData).flatMap(([dni, payments]) =>
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
    }, [managedTableData])

    // Define columns and cells
    const columns: Column<(typeof tableData)[number]>[] = useMemo(
        () => [
            {
                Header: 'DNI',
                accessor: 'dni',
                Cell: ({ value, row }: { value: string; row: Row<(typeof tableData)[number]> }) => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{value}</span>

                        <UserDataInfoPopover userDni={row.original.dni} />
                    </div>
                )
            },
            { Header: 'Título', accessor: 'title' },
            {
                Header: 'Descripción',
                accessor: 'description',
                Cell: ({ value }: { value: string }) => (
                    <div style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</div>
                )
            },
            {
                Header: 'Cantidad (€)',
                accessor: 'amount',
                Cell: ({ value }: { value: number }) => (value === 0 ? 'N/A' : formatCurrency(value))
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
        []
    )

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: tableData
    })

    return (
        <>
            <AddUserPayment>
                <button
                    onClick={() => setShowCreatePaymentModal(true)}
                    title="Añadir pago a socio"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', margin: 0, padding: 0 }}
                    aria-label="Añadir pago a socio"
                >
                    <AddPaymentIcon size={60} />
                </button>
            </AddUserPayment>
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

            <CreateUserPaymentModal show={showCreatePaymentModal} onHide={handleCloseCreatePaymentModal} addPaymentTableFunc={addPaymentRow} />
            <ConfirmPaymentModal show={modalShow} onHide={handleCloseModal} paymentinfo={selectedPayment} updatePaymentStateFunc={updatePaymentState} />
            <CancelPaymentModal
                show={cancelModalShow}
                onHide={handleCloseCancelModal}
                paymentinfo={selectedPayment}
                updatePaymentStateFunc={updatePaymentState}
            />
        </>
    )
}

export default PaymentTable

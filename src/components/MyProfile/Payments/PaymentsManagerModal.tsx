import { IPaymentDetails, PaymentsCategory, PaymentsState } from 'components/Types/Types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button, Modal, ModalProps, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useTable, Column } from 'react-table'
import styled from 'styled-components'
import { useAxiosGetUserPayments } from 'utility/CustomAxios'
import { formatCurrency, translatePaymentCategory, translatePaymentState } from 'utility/paymentsUtilities'

const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch; /* mejora el scroll en dispositivos táctiles */
`

const Title = styled.h1`
    font-size: 100%;
`
const TitleDescription = styled.p`
    font-size: 70%;
`

const ModalFooter = styled(Modal.Footer)`
    display: flex;
    justify-content: space-between;
`

interface PaymentsManagerModalProps extends ModalProps {
    userdni: string
    name: string
    firstsurname: string
    secondsurname: string
}

interface TruncatedCellProps {
    value: string
    maxWidth: string
}

const TruncatedCell: React.FC<TruncatedCellProps> = ({ value, maxWidth }) => {
    const cellRef = useRef<HTMLDivElement>(null)
    const [isOverflowed, setIsOverflowed] = useState(false)

    useEffect(() => {
        const el = cellRef.current
        if (el) {
            // Compara el scrollWidth (ancho total del contenido) con el clientWidth (ancho visible)
            setIsOverflowed(el.scrollWidth > el.clientWidth)
        }
    }, [value, maxWidth])

    const cellContent = (
        <div
            ref={cellRef}
            style={{
                maxWidth,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
            }}
        >
            {value}
        </div>
    )

    return isOverflowed ? <OverlayTrigger overlay={<Tooltip id="tooltip-descripcion">{value}</Tooltip>}>{cellContent}</OverlayTrigger> : cellContent
}

const PaymentsManagerModal = (props: PaymentsManagerModalProps): JSX.Element => {
    const { data, error, loaded } = useAxiosGetUserPayments(props.userdni)

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

    // Define the columns for react-table
    const columns: Column<IPaymentDetails>[] = useMemo(
        () => [
            {
                Header: 'Título',
                accessor: 'title',
                // Agregamos estilos para limitar el ancho
                Cell: ({ value }: { value: string }) => (
                    <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</div>
                ),
                // Puedes también agregar props para el header
                headerProps: { style: { maxWidth: '150px' } }
            },
            {
                Header: 'Descripción',
                accessor: 'description',
                Cell: ({ value }: { value: string }) => <TruncatedCell value={value} maxWidth="300px" />,
                headerProps: { style: { maxWidth: '300px' } }
            },
            {
                Header: 'Categoría',
                accessor: 'category',
                Cell: ({ value }: { value: PaymentsCategory }) => (
                    <div style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {translatePaymentCategory(value)}
                    </div>
                ),
                headerProps: { style: { maxWidth: '100px' } }
            },
            {
                Header: 'Cantidad (€)',
                accessor: 'amount',
                Cell: ({ value }: { value: number }) => (
                    <div style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{formatCurrency(value)}</div>
                ),
                headerProps: { style: { maxWidth: '120px' } }
            },
            {
                Header: 'Fecha Creación',
                accessor: 'createdAt',
                Cell: ({ value }: { value: string }) => (
                    <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {value ? format(new Date(value), "dd'-'MM'-'yyyy", { locale: es }) : 'N/A'}
                    </div>
                ),
                headerProps: { style: { maxWidth: '150px' } }
            },
            {
                Header: 'Fecha Pago',
                accessor: 'paidAt',
                Cell: ({ value }: { value: string | null }) => (
                    <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {value ? format(new Date(value), "dd'-'MM'-'yyyy", { locale: es }) : 'N/A'}
                    </div>
                ),
                headerProps: { style: { maxWidth: '150px' } }
            },
            {
                Header: 'Estado',
                accessor: 'state',
                Cell: ({ value }: { value: PaymentsState }) => (
                    <div style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{translatePaymentState(value)}</div>
                ),
                headerProps: { style: { maxWidth: '100px' } }
            }
        ],
        []
    )

    // Configure react-table
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: data ?? [] // Use data or an empty array while loading
    })

    // Extracted function to render modal body content
    const renderTableContent = () => {
        if (!loaded) {
            return <p>Cargando datos...</p>
        }
        if (error) {
            return <p>Error al cargar los datos: {error.message}</p>
        }
        if (data && data.length > 0) {
            return (
                <TableWrapper>
                    <table {...getTableProps()} className="table table-striped">
                        <thead>
                            {headerGroups.map((headerGroup) => {
                                const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps()
                                return (
                                    <tr key={key} {...restHeaderGroupProps}>
                                        {headerGroup.headers.map((column) => {
                                            const headerProps = column.getHeaderProps() || {}
                                            const { key, ...restHeaderProps } = column.getHeaderProps()
                                            return (
                                                <th key={key} {...restHeaderProps} style={headerProps.style}>
                                                    {column.render('Header')}
                                                </th>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row)
                                const paymentState = row.original.state // Debe ser 'paid' o 'unpaid'
                                console.log('Estado de fila:', paymentState)

                                const { key, ...restRowProps } = row.getRowProps()
                                return (
                                    <tr key={key} {...restRowProps} className={generateRowColor(row.original.state)}>
                                        {row.cells.map((cell) => {
                                            const { key, ...restCellProps } = cell.getCellProps()
                                            return (
                                                <td key={key} {...restCellProps}>
                                                    {cell.render('Cell')}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </TableWrapper>
            )
        }
        return <p>No hay datos de pagos disponibles.</p>
    }

    return (
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <Title>Historial de pagos:</Title>
                    <TitleDescription>Aquí podrás comprobar los pagos realizados y los que están pendientes.</TitleDescription>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{renderTableContent()}</Modal.Body>

            <ModalFooter>
                <div>
                    <p>Los pagos se efectúan realizando ingreso o transferencia en cuenta bancaria.</p>
                    <p>Poner como concepto el nombre y apellidos del socio.</p>
                </div>

                <Button variant="danger" onClick={props.onHide}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default PaymentsManagerModal

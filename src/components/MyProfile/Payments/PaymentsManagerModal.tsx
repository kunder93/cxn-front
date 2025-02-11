import { IPaymentDetails, PaymentsState } from 'components/Types/Types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Modal, ModalProps, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useTable, Column, CellProps } from 'react-table'
import styled from 'styled-components'
import { useAxiosGetUserPayments } from 'utility/CustomAxios'
import { formatCurrency, translatePaymentCategory, translatePaymentState } from 'utility/paymentsUtilities'

interface TruncatedCellProps {
    value: string
    maxWidth: string
}

const TruncatedCell: React.FC<TruncatedCellProps> = ({ value, maxWidth }) => {
    const isMobile = useMemo(() => window.matchMedia('(max-width: 768px)').matches, [])

    return (
        <OverlayTrigger overlay={<Tooltip id="tooltip-descripcion">{value}</Tooltip>} trigger={isMobile ? ['focus', 'hover'] : ['hover']}>
            <div
                style={{
                    maxWidth: isMobile ? '120px' : maxWidth,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}
            >
                {value}
            </div>
        </OverlayTrigger>
    )
}

const TruncatedCellComponent: React.FC<CellProps<IPaymentDetails, string>> = ({ value }) => {
    return <TruncatedCell value={value} maxWidth="150px" />
}

const SecondTruncatedCellComponent: React.FC<CellProps<IPaymentDetails, string>> = ({ value }) => {
    return <TruncatedCell value={value} maxWidth="300px" />
}

const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;

    table {
        min-width: 600px; /* Minimum width to maintain table structure */

        @media (max-width: 768px) {
            min-width: 150px;
            font-size: 12px;

            th {
            }

            td {
                padding: 8px;
                max-width: 100px; /* Adjust max-width for mobile */
            }

            th {
                white-space: nowrap; /* Prevent header wrapping */
                background-color: #f8f9fa; /* Add background for better readability */
                position: sticky;
                left: 0;
                z-index: 1;
            }
        }
    }
`

const Title = styled.h1`
    font-size: 100%;

    @media (max-width: 768px) {
        font-size: 90%;
    }
`

const TitleDescription = styled.p`
    font-size: 70%;

    @media (max-width: 768px) {
        font-size: 60%;
    }
`

const ModalFooter = styled(Modal.Footer)`
    display: flex;
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;

        div {
            order: 2;
            text-align: center;
        }

        button {
            order: 1;
            width: 100%;
        }
    }
`

interface PaymentsManagerModalProps extends ModalProps {
    userdni: string
    name: string
    firstsurname: string
    secondsurname: string
}

const PaymentsManagerModal = (props: PaymentsManagerModalProps): JSX.Element => {
    const { data, error, loaded } = useAxiosGetUserPayments(props.userdni)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const generateRowColor = useCallback((state: PaymentsState) => {
        switch (state) {
            case PaymentsState.CANCELLED:
                return 'table-danger'
            case PaymentsState.PAID:
                return 'table-success'
            case PaymentsState.UNPAID:
                return 'table-warning'
            default:
                return ''
        }
    }, [])

    const fullColumns: Column<IPaymentDetails>[] = useMemo(
        () => [
            { Header: 'Título', accessor: 'title', Cell: TruncatedCellComponent },
            { Header: 'Descripción', accessor: 'description', Cell: SecondTruncatedCellComponent },
            { Header: 'Categoría', accessor: 'category', Cell: ({ value }) => translatePaymentCategory(value) },
            { Header: 'Cantidad (€)', accessor: 'amount', Cell: ({ value }) => formatCurrency(value) },
            { Header: 'Fecha Creación', accessor: 'createdAt', Cell: ({ value }) => (value ? format(new Date(value), 'dd-MM-yyyy', { locale: es }) : 'N/A') },
            { Header: 'Fecha Pago', accessor: 'paidAt', Cell: ({ value }) => (value ? format(new Date(value), 'dd-MM-yyyy', { locale: es }) : 'N/A') },
            { Header: 'Estado', accessor: 'state', Cell: ({ value }) => translatePaymentState(value) }
        ],
        []
    )

    const mobileColumns: Column<IPaymentDetails>[] = useMemo(
        () => [
            { Header: 'Título', accessor: 'title', Cell: TruncatedCellComponent },
            { Header: 'Cantidad (€)', accessor: 'amount', Cell: ({ value }) => formatCurrency(value) },
            { Header: 'Estado', accessor: 'state', Cell: ({ value }) => translatePaymentState(value) }
        ],
        []
    )

    const columns = isMobile ? mobileColumns : fullColumns

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: data ?? []
    })

    return (
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <Title>Historial de pagos:</Title>
                    <TitleDescription>Aquí podrás comprobar los pagos realizados y los que están pendientes.</TitleDescription>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!loaded && <p>Cargando datos...</p>}
                {error && <p>Error: {error.message}</p>}
                {data && data.length > 0 ? (
                    <TableWrapper>
                        <table {...getTableProps()} className="table table-striped">
                            <thead>
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map((row) => {
                                    prepareRow(row)
                                    return (
                                        <tr {...row.getRowProps()} className={generateRowColor(row.original.state)}>
                                            {row.cells.map((cell) => (
                                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            ))}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </TableWrapper>
                ) : (
                    <p>No hay datos de pagos disponibles.</p>
                )}
            </Modal.Body>
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

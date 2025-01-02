import { IPaymentDetails, PaymentsCategory, PaymentsState } from 'components/Types/Types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useMemo } from 'react'
import { Button, Modal, ModalProps } from 'react-bootstrap'
import { useTable, Column } from 'react-table'
import styled from 'styled-components'
import { useAxiosGetUserPayments } from 'utility/CustomAxios'
import { formatCurrency, translatePaymentCategory, translatePaymentState } from 'utility/paymentsUtilities'

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

const PaymentsManagerModal = (props: PaymentsManagerModalProps): JSX.Element => {
    const { data, error, loaded } = useAxiosGetUserPayments(props.userdni)

    // Define las columnas para react-table
    const columns: Column<IPaymentDetails>[] = useMemo(
        () => [
            { Header: 'Título', accessor: 'title' },
            { Header: 'Descripción', accessor: 'description' },
            {
                Header: 'Categoría',
                accessor: 'category',
                Cell: ({ value }: { value: PaymentsCategory }) => translatePaymentCategory(value)
            },
            {
                Header: 'Cantidad (€)',
                accessor: 'amount',
                Cell: ({ value }: { value: number }) => formatCurrency(value)
            },
            {
                Header: 'Fecha Creación',
                accessor: 'createdAt',
                Cell: ({ value }: { value: string }) => (value ? format(new Date(value), "dd 'de' MMMM 'de' yyyy", { locale: es }) : 'N/A')
            },
            {
                Header: 'Fecha Pago',
                accessor: 'paidAt',
                Cell: ({ value }: { value: string | null }) => (value ? format(new Date(value), "dd 'de' MMMM 'de' yyyy", { locale: es }) : 'N/A')
            },
            {
                Header: 'Estado',
                accessor: 'state',
                Cell: ({ value }: { value: PaymentsState }) => translatePaymentState(value)
            }
        ],
        []
    )

    // Configura la tabla con react-table
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: data ?? [] // Pasa data o un array vacío mientras se cargan los datos
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
                {loaded ? (
                    error ? (
                        <p>Error al cargar los datos: {error.message}</p>
                    ) : data && data.length > 0 ? (
                        <table {...getTableProps()} className="table table-striped">
                            <thead>
                                {headerGroups.map((headerGroup) => {
                                    const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps()
                                    return (
                                        <tr key={key} {...restHeaderGroupProps}>
                                            {headerGroup.headers.map((column) => {
                                                const { key, ...restHeaderProps } = column.getHeaderProps()
                                                return (
                                                    <th key={key} {...restHeaderProps}>
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
                                    const { key, ...restRowProps } = row.getRowProps()
                                    return (
                                        <tr key={key} {...restRowProps}>
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
                    ) : (
                        <p>No hay datos de pagos disponibles.</p>
                    )
                ) : (
                    <p>Cargando datos...</p>
                )}
            </Modal.Body>
            <ModalFooter>
                <div>
                    <p>Los pagos se efectuan realizando ingreso o transferencia en cuenta bancaria.</p>
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

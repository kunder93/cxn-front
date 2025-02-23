import { useEffect, useMemo, useState, useCallback } from 'react'
import { Column, useTable, useSortBy, useGlobalFilter, useRowSelect, CellProps } from 'react-table'
import { Button, Table, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Trash3, Eye, EyeSlash, QuestionCircle } from 'react-bootstrap-icons'
import axios, { AxiosError } from 'axios'
import { format } from 'date-fns'
import { IChessQuestion, IChessQuestionsList } from '../../utility/CustomAxios'
import { CHESS_QUESTION_CHANGE_SEEN_STATE, CHESS_QUESTION_DELETE } from '../../resources/server_urls'
import styled from 'styled-components'
import { useAppSelector } from '../../store/hooks'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { NotificationType } from 'components/Common/hooks/useNotification'

interface FormattedDateCellProps extends CellProps<IChessQuestion> {} // Define props interface
const FormattedDateCell = ({ value }: FormattedDateCellProps): JSX.Element => {
    if (!value) {
        // Handle potential null or undefined values
        return <span>-</span> // Or some other default value
    }
    const formattedDate = format(new Date(value as string), 'dd-MM-yyyy - HH:mm')
    return <span>{formattedDate}</span>
}

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

interface ChessQuestionsTableProps {
    data: IChessQuestionsList
}

const ChessQuestionsTable = ({ data: initialData }: ChessQuestionsTableProps): JSX.Element => {
    const [data, setData] = useState<IChessQuestion[]>([])
    const [loadingRows, setLoadingRows] = useState<number[]>([])
    const [deletingRows, setDeletingRows] = useState<number[]>([])
    const { showNotification } = useNotificationContext()
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    useEffect(() => {
        setData(initialData.chessQuestionList)
    }, [initialData])

    const handleDeleteButton = useCallback(
        (id: number, onDeleteSuccess: (id: number) => void) => {
            axios
                .delete(`${CHESS_QUESTION_DELETE}/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userJwt}`
                    }
                })
                .then(() => {
                    onDeleteSuccess(id)
                    showNotification('Pregunta eliminada correctamente', NotificationType.Success)
                })
                .catch((error) => {
                    const axiosError = error as AxiosError
                    showNotification('Hubo un error al eliminar la pregunta: ' + axiosError.message, NotificationType.Error)
                })
        },
        [showNotification, userJwt]
    )

    const handleDeleteButtonWrapper = useCallback(
        (id: number) => {
            setDeletingRows((prevDeletingRows) => [...prevDeletingRows, id])
            handleDeleteButton(id, (deletedId) => {
                setData((prevData) => prevData.filter((question) => question.id !== deletedId))
                setDeletingRows((prevDeletingRows) => prevDeletingRows.filter((rowId) => rowId !== id))
            })
        },
        [handleDeleteButton]
    )

    const changeSeenState = useCallback(
        (rowIndex: number) => {
            const clone = [...data]
            const row = clone[rowIndex]
            setLoadingRows((prevLoadingRows) => [...prevLoadingRows, row.id])

            axios
                .post<IChessQuestion>(
                    CHESS_QUESTION_CHANGE_SEEN_STATE,
                    { id: row.id },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${userJwt}`
                        }
                    }
                )
                .then((response) => {
                    clone[rowIndex] = response.data
                    showNotification('Se ha cambiado correctamente.', NotificationType.Success)
                    setData(clone)
                })
                .catch((error) => showNotification('Ha habido un error: ' + error, NotificationType.Error))
                .finally(() => {
                    setLoadingRows((prevLoadingRows) => prevLoadingRows.filter((id) => id !== row.id))
                })
        },
        [data, showNotification, userJwt]
    )

    const columns: Column<IChessQuestion>[] = useMemo(
        () => [
            { Header: 'Correo', accessor: 'email' },
            {
                Header: 'Fecha',
                accessor: 'date',
                Cell: FormattedDateCell
            },
            { Header: 'Categoria', accessor: 'category' },
            { Header: 'Título', accessor: 'topic' },
            { Header: 'Mensaje', accessor: 'message' },
            {
                Header: (
                    <>
                        Visto
                        <OverlayTrigger overlay={<Tooltip id="tooltip">Verde = visto | Rojo / Tachado = no visto</Tooltip>} placement="top">
                            <QuestionCircle size={20} color="gray" style={{ marginLeft: '5px', cursor: 'pointer' }} />
                        </OverlayTrigger>
                    </>
                ),
                accessor: 'seen',
                Cell: ({ row }: CellProps<IChessQuestion>) => {
                    const isLoading = loadingRows.includes(row.original.id)
                    let buttonContent

                    if (isLoading) {
                        buttonContent = <Spinner animation="border" size="sm" />
                    } else if (row.original.seen) {
                        buttonContent = <Eye color="green" size={30} title="Visto" />
                    } else {
                        buttonContent = <EyeSlash color="red" size={30} title="No visto" />
                    }

                    return (
                        <div className="d-flex w-100">
                            <Button className="w-100" variant="info" onClick={() => changeSeenState(row.index)} disabled={isLoading}>
                                {buttonContent}
                            </Button>
                        </div>
                    )
                }
            },
            {
                id: 'deleteButton',
                Header: 'Borrar',
                accessor: 'id',
                Cell: ({ row }: CellProps<IChessQuestion>) => (
                    <div className="d-flex w-100">
                        <Button
                            className="w-100"
                            variant="danger"
                            onClick={() => handleDeleteButtonWrapper(row.original.id)}
                            disabled={deletingRows.includes(row.original.id)}
                        >
                            {deletingRows.includes(row.original.id) ? <Spinner animation="border" size="sm" /> : <Trash3 size={30} title="Borrar" />}
                        </Button>
                    </div>
                )
            }
        ],
        [changeSeenState, loadingRows, deletingRows]
    )

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, preGlobalFilteredRows, setGlobalFilter, state } = useTable(
        { columns, data },
        useGlobalFilter,
        useSortBy,
        useRowSelect
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
                    {headerGroups.map((headerGroup) => {
                        const { key: headerGroupKey, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps()
                        return (
                            <tr key={headerGroupKey} {...restHeaderGroupProps}>
                                {headerGroup.headers.map((column) => {
                                    const { key: columnKey, ...restColumnProps } = column.getHeaderProps(column.getSortByToggleProps())
                                    return (
                                        <th key={columnKey} {...restColumnProps}>
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
                    {rows.map((row) => {
                        prepareRow(row)
                        const { key: rowKey, ...restRowProps } = row.getRowProps()
                        return (
                            <tr key={rowKey} {...restRowProps}>
                                {row.cells.map((cell) => {
                                    const { key: cellKey, ...cellProps } = cell.getCellProps()
                                    return (
                                        <td key={cellKey} {...cellProps}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}

export default ChessQuestionsTable

import { useMemo, useState, useCallback } from 'react'
import { Form, FormControl, Table } from 'react-bootstrap'
import { CellProps, Column, useSortBy, useTable } from 'react-table'
import AddBookModal from './AddBookModal'
import { useAppSelector } from 'store/hooks'
import LoadingTableSpinnerContainer from 'components/Common/LoadingTableSpinnerContainer'
import RemoveBookModal from './RemoveBookModal'
import { UserRole } from 'store/types/userTypes'
import { Book } from './Types'
import BookDetailsModal from './BookDetailsModal'
import { useFetchBooks } from './hooks'
import { ActionsCell, ActionsHeader, AddBookIcon, OptionButton, SearchOptionsWrapper, TableActionsRow } from './styles'

const filterOptions: ('title' | 'description' | 'language')[] = ['title', 'description', 'language']

const FilterCheckboxList = ({ filters, onChange }: { filters: Record<string, boolean>; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <Form.Group>
        <SearchOptionsWrapper>
            {filterOptions.map((filter) => (
                <Form.Check
                    key={filter}
                    type="checkbox"
                    label={`Buscar por ${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
                    name={filter}
                    checked={filters[filter]}
                    onChange={onChange}
                />
            ))}
        </SearchOptionsWrapper>
    </Form.Group>
)

const BooksViewer = () => {
    const userProfile = useAppSelector((state) => state.users.userProfile)
    const { books, loading, error, addBook, removeBook } = useFetchBooks()

    const hasAccess = useMemo(
        () => [UserRole.ADMIN, UserRole.PRESIDENTE, UserRole.SECRETARIO].some((role) => userProfile.userRoles.includes(role)),
        [userProfile.userRoles]
    )

    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState({ title: true, description: true, language: true })
    const [modalState, setModalState] = useState<{ type: 'add' | 'remove' | 'details' | null; book: Book | null }>({ type: null, book: null })

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setFilters((prev) => ({ ...prev, [name]: checked }))
    }

    const openModal = useCallback((type: 'add' | 'remove' | 'details', book?: Book) => {
        setModalState({ type, book: book ?? null })
    }, [])

    const closeModal = useCallback(() => {
        setModalState({ type: null, book: null })
    }, [])

    const filteredBooks = useMemo(() => {
        return books.filter((book) => filterOptions.some((filter) => filters[filter] && book[filter].toLowerCase().includes(searchQuery.toLowerCase())))
    }, [books, searchQuery, filters])

    const columns: Column<Book>[] = useMemo(
        () => [
            { Header: 'Título', accessor: 'title' },
            { Header: 'Fecha de Publicación', accessor: 'publishDate' },
            { Header: 'Descripción', accessor: 'description' },
            { Header: 'Idioma', accessor: 'language' },
            {
                id: 'actions',
                Header: () => <ActionsHeader>Detalles</ActionsHeader>,
                Cell: ({ row }: CellProps<Book>) => (
                    <ActionsCell>
                        <OptionButton variant="info" onClick={() => { openModal('details', row.original); }}>
                            Ver más
                        </OptionButton>
                        {hasAccess && (
                            <OptionButton variant="danger" onClick={() => { openModal('remove', row.original); }}>
                                Borrar
                            </OptionButton>
                        )}
                    </ActionsCell>
                )
            }
        ],
        [hasAccess, openModal]
    )

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: filteredBooks }, useSortBy)

    if (loading) return <LoadingTableSpinnerContainer />
    if (error) return <div>Error: {error}</div>

    return (
        <div>
            <FilterCheckboxList filters={filters} onChange={handleFilterChange} />

            <TableActionsRow>
                {hasAccess && <AddBookIcon size={44} onClick={() => { openModal('add'); }} />}
                <FormControl type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); }} className="mb-3" />
            </TableActionsRow>

            <Table {...getTableProps()} striped bordered hover>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ cursor: 'pointer' }}>
                                    {column.render('Header')}
                                    <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            {modalState.book && modalState.type === 'details' && <BookDetailsModal showModal handleCloseModal={closeModal} selectedBook={modalState.book} />}
            {modalState.type === 'add' && <AddBookModal addBookFunction={addBook} showModal handleCloseModal={closeModal} />}
            {modalState.book && modalState.type === 'remove' && (
                <RemoveBookModal showModal handleCloseModal={closeModal} selectedBook={modalState.book} removeBookFunction={removeBook} />
            )}
        </div>
    )
}

export default BooksViewer

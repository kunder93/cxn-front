import { useMemo, useState, useCallback } from 'react'
import { Button, Form, FormControl, Table } from 'react-bootstrap'
import { CellProps, Column, useSortBy, useTable } from 'react-table'
import styled from 'styled-components'
import { FaRegPlusSquare } from 'react-icons/fa'
import AddBookModal from './AddBookModal'
import { useAppSelector } from 'store/hooks'
import LoadingTableSpinnerContainer from 'components/Common/LoadingTableSpinnerContainer'
import RemoveBookModal from './RemoveBookModal'
import { UserRole } from 'store/types/userTypes'
import { Book } from './Types'
import BookDetailsModal from './BookDetailsModal'
import { useFetchBooks } from './hooks'

const ActionsCell = styled.td`
    width: 100%;
    display: flex;
`

const ActionsHeader = styled.th`
    max-width: 250px;
`

const OptionButton = styled(Button)`
    width: 100%; /* Make the button take up 50% of the available width inside the cell */
    display: block;
    text-align: center;
`

const TableActionsRow = styled.div`
    display: flex;
    flex-wrap: nowrap;
    gap: 15px;
    padding-bottom: 0.3rem;
    align-items: center;
    input {
        margin-bottom: 0px !important;
    }
`

const AddBookIcon = styled(FaRegPlusSquare)`
    fill: blue;
    cursor: pointer;
    font-size: 4rem;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.2);
    }
`

const SearchOptionsWrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: nowrap;
`

const BooksViewer = () => {
    const userProfile = useAppSelector((state) => state.users.userProfile)
    const { books, loading, error, addBook, removeBook } = useFetchBooks()

    // Check if the current user has the required roles
    const hasAccess = useMemo(
        () => [UserRole.ADMIN, UserRole.PRESIDENTE, UserRole.SECRETARIO].some((role) => userProfile.userRoles.includes(role)),
        [userProfile.userRoles]
    )

    // States
    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState({ title: true, description: true, language: true })
    const [selectedBook, setSelectedBook] = useState<Book | null>(null)
    const [showModals, setShowModals] = useState({ add: false, remove: false, details: false })

    // Handle search filter change
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setFilters((prev) => ({
            ...prev,
            [name]: checked
        }))
    }

    // Handle modal visibility
    const toggleModal = useCallback((modal: 'add' | 'remove' | 'details', book?: Book) => {
        setSelectedBook(book ?? null)
        setShowModals((prev) => ({ ...prev, [modal]: !prev[modal] }))
    }, [])

    // Filter books based on search query and selected filters
    const filterOptions: ('title' | 'description' | 'language')[] = ['title', 'description', 'language']
    const filteredBooks = useMemo(() => {
        return books.filter((book) => {
            const matchesSearch =
                (filters.title && book.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (filters.description && book.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (filters.language && book.language.toLowerCase().includes(searchQuery.toLowerCase()))
            return matchesSearch
        })
    }, [books, searchQuery, filters])

    // Columns for the table
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
                        <OptionButton variant="info" onClick={() => toggleModal('details', row.original)}>
                            Ver más
                        </OptionButton>
                        {hasAccess && (
                            <OptionButton variant="danger" onClick={() => toggleModal('remove', row.original)}>
                                Borrar
                            </OptionButton>
                        )}
                    </ActionsCell>
                )
            }
        ],
        [hasAccess, toggleModal]
    )

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: filteredBooks }, useSortBy)

    if (loading) return <LoadingTableSpinnerContainer />
    if (error) return <div>Error: {error}</div>

    return (
        <div>
            {/* Search & Filters */}
            <Form.Group>
                <SearchOptionsWrapper>
                    {filterOptions.map((filter) => (
                        <Form.Check
                            key={filter}
                            type="checkbox"
                            label={`Buscar por ${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
                            name={filter}
                            checked={filters[filter]} // This should now be correctly typed
                            onChange={handleFilterChange}
                        />
                    ))}
                </SearchOptionsWrapper>
            </Form.Group>

            {/* Actions */}
            <TableActionsRow>
                {hasAccess && <AddBookIcon size={44} onClick={() => toggleModal('add')} />}
                <FormControl type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="mb-3" />
            </TableActionsRow>

            {/* Table */}
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

            {/* Modals */}
            {selectedBook && showModals.details && (
                <BookDetailsModal showModal={showModals.details} handleCloseModal={() => toggleModal('details')} selectedBook={selectedBook} />
            )}
            {showModals.add && <AddBookModal addBookFunction={addBook} showModal={showModals.add} handleCloseModal={() => toggleModal('add')} />}
            {selectedBook && showModals.remove && (
                <RemoveBookModal
                    showModal={showModals.remove}
                    handleCloseModal={() => toggleModal('remove')}
                    selectedBook={selectedBook}
                    removeBookFunction={removeBook}
                />
            )}
        </div>
    )
}

export default BooksViewer

import { useEffect, useMemo, useState } from 'react'
import { Button, Form, FormControl, Table } from 'react-bootstrap'
import { CellProps, Column, useSortBy, useTable } from 'react-table'
import styled from 'styled-components'
import BookDetailsModal from './BookDetaisModal'
import { FaRegPlusSquare } from 'react-icons/fa'
import AddBookModal from './AddBookModal'
import axios from 'axios'
import { RESOURCES_BOOK_URL } from 'resources/server_urls'
import { useAppSelector } from 'store/hooks'
import LoadingTableSpinnerContainer from 'components/Common/LoadingTableSpinnerContainer'

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

export interface Author {
    firstName: string
    lastName: string
}

export interface Book {
    isbn: string
    title: string
    description: string
    genre: string
    publishDate: string
    language: string
    authors: Author[]
}

const BooksViewer = () => {
    const [books, setBooks] = useState<Book[]>([])
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true)
            try {
                const response = await axios.get<Book[]>(RESOURCES_BOOK_URL, { headers: { Authorization: `Bearer ${userJwt}` } })
                setBooks(response.data)
            } catch (error) {
                console.error('Error fetching books:', error)
            } finally {
                setLoading(false)
            }
        }
        void fetchBooks()
    }, [userJwt])

    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState({
        title: true,
        description: true,
        language: true
    })
    const [showModal, setShowModal] = useState(false)
    const [selectedBook, setSelectedBook] = useState<Book | null>(null)
    const [addBookModal, setAddBookModal] = useState(false)
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((prev) => ({
            ...prev,
            [e.target.name]: e.target.checked
        }))
    }

    // Function to add a new book to the table
    const addBook = (newBook: Book) => {
        setBooks((prevBooks) => [...prevBooks, newBook])
    }

    const handleShowModal = (book: Book) => {
        setSelectedBook(book)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setSelectedBook(null)
    }

    const openAddBookModal = () => {
        setAddBookModal(true)
    }

    const filteredBooks = useMemo(() => {
        return books.filter((book) => {
            const matchesSearch =
                (filters.title && book.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (filters.description && book.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (filters.language && book.language.toLowerCase().includes(searchQuery.toLowerCase()))
            return matchesSearch
        })
    }, [books, searchQuery, filters])

    const columns: Column<Book>[] = useMemo(
        () => [
            {
                Header: 'Título',
                accessor: 'title'
            },
            {
                Header: 'Fecha de Publicación',
                accessor: 'publishDate'
            },
            {
                Header: 'Descripción',
                accessor: 'description'
            },
            {
                Header: 'Idioma',
                accessor: 'language'
            },
            {
                Header: 'Detalles',
                Cell: ({ row }: CellProps<Book>) => (
                    <Button variant="info" onClick={() => handleShowModal(row.original)}>
                        Ver Detalles
                    </Button>
                )
            }
        ],
        []
    )

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns,
            data: filteredBooks
        },
        useSortBy
    )

    return (
        <div>
            {loading ? (
                <LoadingTableSpinnerContainer></LoadingTableSpinnerContainer>
            ) : (
                <div>
                    {/* Sección de Checkboxes */}
                    <Form.Group>
                        <SearchOptionsWrapper>
                            <Form.Check type="checkbox" label="Buscar por Título" name="title" checked={filters.title} onChange={handleCheckboxChange} />
                            <Form.Check
                                type="checkbox"
                                label="Buscar por Descripción"
                                name="description"
                                checked={filters.description}
                                onChange={handleCheckboxChange}
                            />
                            <Form.Check type="checkbox" label="Buscar por Idioma" name="language" checked={filters.language} onChange={handleCheckboxChange} />
                        </SearchOptionsWrapper>
                    </Form.Group>
                    {/* Barra de Búsqueda */}
                    <FormControl type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="mb-3" />
                    {/* Tabla */}
                    <Table {...getTableProps()} striped bordered hover>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th
                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                            style={{
                                                cursor: 'pointer'
                                            }}
                                        >
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
                                        {row.cells.map((cell) => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    {selectedBook && <BookDetailsModal showModal={showModal} handleCloseModal={handleCloseModal} selectedBook={selectedBook} />}
                    <AddBookIcon size={44} onClick={openAddBookModal} />
                    {addBookModal && <AddBookModal addBookFunction={addBook} showModal={addBookModal} handleCloseModal={() => setAddBookModal(false)} />}
                </div>
            )}
        </div>
    )
}

export default BooksViewer

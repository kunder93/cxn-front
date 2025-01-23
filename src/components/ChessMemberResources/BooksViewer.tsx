import { useMemo, useState } from 'react'
import { Button, Form, FormControl, Table } from 'react-bootstrap'
import { CellProps, Column, useSortBy, useTable } from 'react-table'
import styled from 'styled-components'
import BookDetailsModal from './BookDetaisModal'
import { FaRegPlusSquare } from 'react-icons/fa'
import AddBookModal from './AddBookModal'

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

interface Author {
    name: string
    lastName: string
}

export interface Book {
    title: string
    description: string
    genre: string
    publishDate: string
    language: string
    coverSrc: string
    authors: Author[]
}

const books: Book[] = [
    {
        title: 'First slide',
        description: 'This is the first book.',
        genre: 'Fantasy',
        language: 'English',
        publishDate: '2025-01-01',
        coverSrc: 'https://marketplace.canva.com/EAFI171fL0M/1/0/1003w/canva-portada-de-libro-de-novela-ilustrado-color-azul-aqua-PQeWaiiK0aA.jpg',
        authors: [
            { name: 'John', lastName: 'Doe' },
            { name: 'Jane', lastName: 'Smith' }
        ]
    },
    {
        title: 'Second slide',
        description: 'This is the second book.',
        genre: 'Romance',
        publishDate: '2025-01-01',
        language: 'English',
        coverSrc:
            'https://marketplace.canva.com/EAFEL6G6JSU/1/0/1003w/canva-portada-de-libro-pdf-electr%C3%B3nico-digital-silueta-persona-rosa-azul-oS2hyQNbxmM.jpg',
        authors: [{ name: 'Alice', lastName: 'Johnson' }]
    },
    {
        title: 'Third slide',
        description: 'This is the third book.',
        genre: 'Thriller',
        publishDate: '2025-01-01',
        language: 'English',
        coverSrc: 'https://edit.org/photos/img/blog/wdn-editar-portadas-de-libros-gratis.jpg-840.jpg',
        authors: [{ name: 'Robert', lastName: 'Brown' }]
    }
]

const BooksViewer = () => {
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
    }, [searchQuery, filters])

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
            {addBookModal && <AddBookModal showModal={addBookModal} handleCloseModal={() => setAddBookModal(false)} />}
        </div>
    )
}

export default BooksViewer

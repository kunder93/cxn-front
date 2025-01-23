import React, { useMemo, useState } from 'react'
import { FormControl, Table, Form, Button } from 'react-bootstrap'
import { CellProps, Column, useSortBy, useTable } from 'react-table'
import styled from 'styled-components'
import MagazinesDetailsModal from './MagazinesDetailsModal'

export interface Author {
    name: string
    lastName: string
}

export interface Magazine {
    title: string
    publisher: string
    issueNumber: number
    publishDate: string
    description: string
    genre: string
    coverImageUrl: string
    pageCount: number
    authors: Author[]
    isbn: string
    language: string
}

const SearchOptionsWrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: nowrap;
`

const magazines: Magazine[] = [
    {
        title: 'Tech Today',
        publisher: 'Tech Media Co.',
        issueNumber: 101,
        publishDate: '2025-01-01',
        description: 'Latest trends and news in the tech world.',
        genre: 'Technology',
        coverImageUrl: 'https://www.mockofun.com/wp-content/uploads/2020/12/time-magazine-cover-template-4.jpg',
        pageCount: 120,
        authors: [
            { name: 'John Doe', lastName: 'Smith' },
            { name: 'Jane Smith', lastName: 'Jones' }
        ],
        isbn: '978-1234567890',
        language: 'English'
    },
    {
        title: 'Health & Wellness',
        publisher: 'Health Magazines Ltd.',
        issueNumber: 55,
        publishDate: '2025-02-01',
        description: 'Your go-to source for health tips and wellness advice.',
        genre: 'Health',
        coverImageUrl: 'https://static01.nyt.com/images/2016/02/04/fashion/04NOTED3/04NOTED3-superJumbo.jpg?quality=75&auto=webp',
        pageCount: 85,
        authors: [{ name: 'Alice Johnson', lastName: 'Williams' }],
        isbn: '978-0987654321',
        language: 'English'
    },
    {
        title: 'The Gourmet Chef',
        publisher: 'Foodies Inc.',
        issueNumber: 33,
        publishDate: '2025-03-01',
        description: 'Explore delicious recipes and cooking tips for every occasion.',
        genre: 'Food',
        coverImageUrl: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/e8976c89481967.5df660bcc54bc.jpg',
        pageCount: 110,
        authors: [
            { name: 'Robert Brown', lastName: 'Davis' },
            { name: 'Sarah Lee', lastName: 'Miller' }
        ],
        isbn: '978-1112223333',
        language: 'English'
    },
    {
        title: 'Global News',
        publisher: 'Global Media Group',
        issueNumber: 200,
        publishDate: '2025-04-01',
        description: 'A comprehensive roundup of global news and events.',
        genre: 'News',
        coverImageUrl: 'https://celebmafia.com/wp-content/uploads/2015/11/jennifer-lawrence-vogue-magazine-december-2015-cover_1.jpg',
        pageCount: 150,
        authors: [
            { name: 'James White', lastName: 'Taylor' },
            { name: 'Emily Clark', lastName: 'Roberts' }
        ],
        isbn: '978-3334445555',
        language: 'English'
    },
    {
        title: 'Sports Weekly',
        publisher: 'Sports Media LLC',
        issueNumber: 78,
        publishDate: '2025-05-01',
        description: 'The latest news, interviews, and highlights from the sports world.',
        genre: 'Sports',
        coverImageUrl: 'https://s3.envato.com/files/120051258/preview/4.jpg',
        pageCount: 100,
        authors: [
            { name: 'Chris Martin', lastName: 'Harris' },
            { name: 'Laura Garcia', lastName: 'Rodriguez' }
        ],
        isbn: '978-4445556666',
        language: 'English'
    }
]

const MagazinesViewer: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState({
        title: true,
        description: true,
        language: true
    })
    const [showModal, setShowModal] = useState(false)
    const [selectedMagazine, setSelectedMagazine] = useState<Magazine | null>(null)

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((prev) => ({
            ...prev,
            [e.target.name]: e.target.checked
        }))
    }

    const handleShowModal = (magazine: Magazine) => {
        setSelectedMagazine(magazine)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setSelectedMagazine(null)
    }

    const filteredMagazines = useMemo(() => {
        return magazines.filter((magazine) => {
            const matchesSearch =
                (filters.title && magazine.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (filters.description && magazine.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (filters.language && magazine.language.toLowerCase().includes(searchQuery.toLowerCase()))
            return matchesSearch
        })
    }, [searchQuery, filters])

    const columns: Column<Magazine>[] = useMemo(
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
                Header: 'Número de Páginas',
                accessor: 'pageCount'
            },
            {
                Header: 'Detalles',
                Cell: ({ row }: CellProps<Magazine>) => (
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
            data: filteredMagazines
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
            {selectedMagazine && <MagazinesDetailsModal showModal={showModal} handleCloseModal={handleCloseModal} selectedMagazine={selectedMagazine} />}
        </div>
    )
}

export default MagazinesViewer

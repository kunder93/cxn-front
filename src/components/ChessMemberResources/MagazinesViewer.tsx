import React, { useEffect, useMemo, useState } from 'react'
import { FormControl, Table, Form, Button } from 'react-bootstrap'
import { CellProps, Column, useSortBy, useTable } from 'react-table'
import styled from 'styled-components'
import MagazinesDetailsModal from './MagazinesDetailsModal'
import { FaRegPlusSquare } from 'react-icons/fa'
import AddMagazineModal from './AddMagazineModal'
import { useAppSelector } from 'store/hooks'
import { UserProfile, UserRole } from 'store/types/userTypes'
import axios from 'axios'
import { NotificationType } from 'components/Common/hooks/useNotification'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { RESOURCES_MAGAZINE_URL } from 'resources/server_urls'
import RemoveMagazineModal from './RemoveMagazineModal'
import LoadingTableSpinnerContainer from 'components/Common/LoadingTableSpinnerContainer'
import { Magazine } from './Types'

const OptionButton = styled(Button)`
    width: 100%;
`

const AddMagazineIcon = styled(FaRegPlusSquare)`
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

const MagazinesViewer: React.FC = () => {
    const [magazines, setMagazines] = useState<Magazine[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState({
        title: true,
        description: true,
        language: true
    })
    const [showModal, setShowModal] = useState(false)
    const [selectedMagazine, setSelectedMagazine] = useState<Magazine | null>(null)
    const [addMagazineModal, setAddMagazineModal] = useState(false)
    const [showRemoveMagazineModal, setShowRemoveMagazineModal] = useState(false)
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const userProfile: UserProfile = useAppSelector((state) => state.users.userProfile)
    const [loading, setLoading] = useState(false)
    const { showNotification } = useNotificationContext()
    const shouldShow =
        userProfile.userRoles.includes(UserRole.ADMIN) ||
        userProfile.userRoles.includes(UserRole.PRESIDENTE) ||
        userProfile.userRoles.includes(UserRole.SECRETARIO)

    useEffect(() => {
        const fetchMagazines = async () => {
            setLoading(true)
            try {
                const response = await axios.get<Magazine[]>(RESOURCES_MAGAZINE_URL, { headers: { Authorization: `Bearer ${userJwt}` } })
                setMagazines(response.data)
            } catch (error) {
                console.error('Error fetching books:', error)
            } finally {
                setLoading(false)
            }
        }
        void fetchMagazines()
    }, [userJwt])

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((prev) => ({
            ...prev,
            [e.target.name]: e.target.checked
        }))
    }

    const handleRemoveMagazine = async (magazine: Magazine): Promise<void> => {
        try {
            // Make the API call to remove the magazine
            await axios.delete(`${RESOURCES_MAGAZINE_URL}/${magazine.issn}`, {
                headers: { Authorization: `Bearer ${userJwt}` }
            })

            // Remove the magazine from the state
            setMagazines((prevMagazines) => prevMagazines.filter((b) => b.issn !== magazine.issn))
            showNotification('Revista eliminado exitosamente', NotificationType.Success)
        } catch (error) {
            console.error('Error removing book:', error)
        }
    }

    // Function to add a new magazine to the table
    const addMagazine = (newMagazine: Magazine) => {
        setMagazines((prevMagazines) => [...prevMagazines, newMagazine])
    }

    const handleCloseRemoveMagazineModal = () => {
        setShowRemoveMagazineModal(false)
        setSelectedMagazine(null)
    }

    const handleRemoveMagazineModal = (book: Magazine) => {
        setSelectedMagazine(book)
        setShowRemoveMagazineModal(true)
    }

    const openAddMagazineModal = () => {
        setAddMagazineModal(true)
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
    }, [magazines, filters.title, filters.description, filters.language, searchQuery])

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
                Header: 'Idioma',
                accessor: 'language'
            },
            {
                Header: 'Número de Páginas',
                accessor: 'pagesAmount'
            },
            {
                Header: 'Detalles',
                Cell: ({ row }: CellProps<Magazine>) => (
                    <>
                        <OptionButton variant="info" onClick={() => handleShowModal(row.original)}>
                            Ver Detalles
                        </OptionButton>
                        {shouldShow && (
                            <OptionButton variant="danger" style={{ width: '100%' }} onClick={() => handleRemoveMagazineModal(row.original)}>
                                Borrar
                            </OptionButton>
                        )}
                    </>
                )
            }
        ],
        [shouldShow]
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
                    {selectedMagazine && (
                        <MagazinesDetailsModal showModal={showModal} handleCloseModal={handleCloseModal} selectedMagazine={selectedMagazine} />
                    )}
                    {shouldShow && <AddMagazineIcon size={44} onClick={openAddMagazineModal} />}
                    {addMagazineModal && (
                        <AddMagazineModal addMagazineFunction={addMagazine} showModal={addMagazineModal} handleCloseModal={() => setAddMagazineModal(false)} />
                    )}
                    {selectedMagazine && (
                        <RemoveMagazineModal
                            showModal={showRemoveMagazineModal}
                            handleCloseModal={handleCloseRemoveMagazineModal}
                            selectedMagazine={selectedMagazine}
                            removeMagazineFunction={handleRemoveMagazine}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default MagazinesViewer

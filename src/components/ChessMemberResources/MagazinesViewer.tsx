import React, { useMemo, useState } from 'react'
import { FormControl, Table, Form, Button } from 'react-bootstrap'
import { CellProps, Column, useSortBy, useTable } from 'react-table'
import styled from 'styled-components'
import { FaRegPlusSquare } from 'react-icons/fa'
import { useAppSelector } from 'store/hooks'
import { UserRole } from 'store/types/userTypes'
import LoadingTableSpinnerContainer from 'components/Common/LoadingTableSpinnerContainer'
import { Magazine } from './Types'
import { useMagazines } from './hooks'
import MagazinesDetailsModal from './MagazinesDetailsModal'
import AddMagazineModal from './AddMagazineModal'
import RemoveMagazineModal from './RemoveMagazineModal'

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

const AddMagazineIcon = styled(FaRegPlusSquare)`
    fill: blue;
    cursor: pointer;
    font-size: 4rem;
    transition: transform 0.3s ease;
    &:hover {
        transform: scale(1.2);
    }
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

const SearchOptionsWrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: nowrap;
`

const MagazinesViewer: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState({
        title: true,
        language: true
    })
    const [showModal, setShowModal] = useState(false)
    const [selectedMagazine, setSelectedMagazine] = useState<Magazine | null>(null)
    const [addMagazineModal, setAddMagazineModal] = useState(false)
    const [showRemoveMagazineModal, setShowRemoveMagazineModal] = useState(false)

    const userProfile = useAppSelector((state) => state.users.userProfile)

    const { magazines, loading, error, addMagazine, removeMagazine } = useMagazines()

    const shouldShow = userProfile.userRoles.some((role) => [UserRole.ADMIN, UserRole.PRESIDENTE, UserRole.SECRETARIO].includes(role))

    // Handle checkbox changes for filters
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

    const handleShowRemoveMagazineModal = (magazine: Magazine) => {
        setSelectedMagazine(magazine)
        setShowRemoveMagazineModal(true)
    }

    const handleCloseRemoveMagazineModal = () => {
        setShowRemoveMagazineModal(false)
        setSelectedMagazine(null)
    }

    // Filtering logic
    const filteredMagazines = useMemo(() => {
        return magazines.filter((magazine) => {
            const matchesSearch =
                (filters.title && magazine.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (filters.language && magazine.language.toLowerCase().includes(searchQuery.toLowerCase()))
            return matchesSearch
        })
    }, [magazines, filters, searchQuery])

    // Table columns
    const columns: Column<Magazine>[] = useMemo(
        () => [
            { Header: 'Título', accessor: 'title' },
            { Header: 'Fecha de Publicación', accessor: 'publishDate' },
            { Header: 'Idioma', accessor: 'language' },
            { Header: 'Número de Páginas', accessor: 'pagesAmount' },
            {
                id: 'actions', // Add a unique id for the column
                Header: () => <ActionsHeader>Acciones</ActionsHeader>,
                Cell: ({ row }: CellProps<Magazine>) => (
                    <ActionsCell>
                        <OptionButton variant="info" onClick={() => { handleShowModal(row.original); }}>
                            Ver Detalles
                        </OptionButton>
                        {shouldShow && (
                            <OptionButton variant="danger" onClick={() => { handleShowRemoveMagazineModal(row.original); }}>
                                Borrar
                            </OptionButton>
                        )}
                    </ActionsCell>
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
                <LoadingTableSpinnerContainer />
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <div>
                    {/* Filter Options */}
                    <Form.Group>
                        <SearchOptionsWrapper>
                            <Form.Check type="checkbox" label="Buscar por Título" name="title" checked={filters.title} onChange={handleCheckboxChange} />
                            <Form.Check type="checkbox" label="Buscar por Idioma" name="language" checked={filters.language} onChange={handleCheckboxChange} />
                        </SearchOptionsWrapper>
                    </Form.Group>

                    {/* Action Buttons and Search Bar */}
                    <TableActionsRow>
                        {shouldShow && <AddMagazineIcon size={44} onClick={() => { setAddMagazineModal(true); }} />}
                        <FormControl
                            type="text"
                            placeholder="Buscar..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); }}
                            className="mb-3"
                        />
                    </TableActionsRow>

                    {/* Magazines Table */}
                    <Table {...getTableProps()} striped bordered hover>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                    {selectedMagazine && (
                        <MagazinesDetailsModal showModal={showModal} handleCloseModal={handleCloseModal} selectedMagazine={selectedMagazine} />
                    )}
                    {addMagazineModal && (
                        <AddMagazineModal addMagazineFunction={addMagazine} showModal={addMagazineModal} handleCloseModal={() => { setAddMagazineModal(false); }} />
                    )}
                    {selectedMagazine && (
                        <RemoveMagazineModal
                            showModal={showRemoveMagazineModal}
                            handleCloseModal={handleCloseRemoveMagazineModal}
                            selectedMagazine={selectedMagazine}
                            removeMagazineFunction={removeMagazine}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default MagazinesViewer

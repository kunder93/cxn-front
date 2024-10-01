import React from 'react'
import { useTable, useSortBy, Column } from 'react-table'
import Table from 'react-bootstrap/Table'
import { LichessProfileResponse } from './lichess'

/**
 * Columns definition for Lichess Players Table.
 * Each column represents a statistic from the Lichess profile, including username, ELO ratings, and the number of games.
 *
 * @constant
 * @type {Column<LichessProfileResponse>[]}
 */
const columns: Column<LichessProfileResponse>[] = [
    {
        Header: 'Nombre',
        accessor: 'userName'
    },
    {
        Header: 'Nick de Lichess',
        accessor: 'lichessUserName'
    },
    {
        Header: 'ELO Blitz',
        accessor: (row) => row.blitzGame.elo
    },
    {
        Header: 'Nº partidas Blitz',
        accessor: (row) => row.blitzGame.amountOfGames
    },
    {
        Header: 'ELO Bullet',
        accessor: (row) => row.bulletGame.elo
    },
    {
        Header: 'Nº partidas Bullet',
        accessor: (row) => row.bulletGame.amountOfGames
    },
    {
        Header: 'ELO Classical',
        accessor: (row) => row.classicalGame.elo
    },
    {
        Header: 'Nº partidas Classical',
        accessor: (row) => row.classicalGame.amountOfGames
    },
    {
        Header: 'ELO Rapid',
        accessor: (row) => row.rapidGame.elo
    },
    {
        Header: 'Nº partidas Rapid',
        accessor: (row) => row.rapidGame.amountOfGames
    },
    {
        Header: 'ELO Puzzle',
        accessor: (row) => row.puzzleGame.elo
    },
    {
        Header: 'Nº Puzzles realizados',
        accessor: (row) => row.puzzleGame.amountOfGames
    }
]

/**
 * Component to display a table of Lichess players with sortable columns.
 *
 * @component
 * @param {Object} props - Component props
 * @param {LichessProfileResponse[]} props.data - Array of Lichess profile data to display in the table.
 * @returns {JSX.Element} A table displaying Lichess player information such as usernames, ELO ratings, and game statistics.
 */
const LichessPlayersTable: React.FC<{ data: LichessProfileResponse[] }> = ({ data }) => {
    // Hook to create table instance with column definitions and data
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        { columns, data },
        useSortBy // Hook to enable sorting by columns
    )

    return (
        <Table striped bordered hover variant="dark" {...getTableProps()} style={{ width: '100%', border: '1px solid black' }}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                key={column.id}
                                style={{ padding: '10px', borderBottom: '1px solid black', cursor: 'pointer' }}
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
                        <tr {...row.getRowProps()} key={row.id}>
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()} key={cell.column.id} style={{ padding: '10px', borderBottom: '1px solid black' }}>
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default LichessPlayersTable

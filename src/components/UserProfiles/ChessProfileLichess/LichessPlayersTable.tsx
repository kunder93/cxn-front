import React from 'react'
import { useTable, useSortBy, Column } from 'react-table'
import Table from 'react-bootstrap/Table'
import { LichessProfileResponse } from './lichess'
import styled from 'styled-components'

const StyledTable = styled(Table)`
    width: 100%;
    border: 1px solid black;

    @media (max-width: 768px) {
        display: block; // Change to block layout for mobile

        thead {
            display: none; // Hide the header on small screens
        }

        tbody {
            display: flex;
            flex-direction: column; // Stack rows
            border: none;
        }

        tr {
            display: block; // Block display for each row
            margin-bottom: 10px; // Space between rows
            border: 1px solid #ccc; // Optional border for cards
            border-radius: 5px; // Rounded corners
            padding: 10px;
        }

        td {
            display: flex;
            justify-content: space-between; // Space between key and value
            padding: 5px;
            border-bottom: none; // No bottom border on mobile
        }

        td::before {
            content: attr(data-label); // Use data-label to show the header on mobile
            font-weight: bold;
            margin-right: 10px; // Space between label and value
        }
    }
`

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
        <StyledTable striped bordered hover variant="dark" {...getTableProps()}>
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
                                <td
                                    {...cell.getCellProps()}
                                    key={cell.column.id}
                                    data-label={cell.column.Header}
                                    style={{ padding: '10px', borderBottom: '1px solid black' }}
                                >
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    )
                })}
            </tbody>
        </StyledTable>
    )
}

export default LichessPlayersTable

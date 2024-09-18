import React, { useMemo, useState } from 'react'
import { Column, useTable, useSortBy, useGlobalFilter, useRowSelect, } from 'react-table'
import {Table } from 'react-bootstrap'

import styled from 'styled-components'

import { ITournamentParticipant,  } from './Types/Types'

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


interface Props {
    membersData: ITournamentParticipant[]
}

const TournamentParticipantsManagerTable: React.FC<Props> = ({ membersData }) => {
    const [data] = useState<ITournamentParticipant[]>(useMemo(() => membersData, [membersData]))


    const columns: Column<ITournamentParticipant>[] = useMemo(
        () => [
            { Header: 'Fide ID', accessor: 'fideId' },
            { Header: 'Nombre', accessor: 'name' },
            { Header: 'Club', accessor: 'club' },
            { Header: 'Fecha de nacimiento', accessor: (d) => `${d.birthDate.toString()}` },
            { Header: 'Categoria', accessor: (d) => d.category },
            { Header: 'Byes', accessor: 'byes' },
        ],
        []
    )






    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, preGlobalFilteredRows, setGlobalFilter, state } = useTable<ITournamentParticipant>(
        { columns, data },
        useGlobalFilter,
        useSortBy,
        useRowSelect, 
    )
    const globalFilterStatus = state.globalFilter as string | number | readonly string[] | undefined
    return (
        <>
            <TableFilterContainer>
                <FilterInputLabel htmlFor="filterInput">Busca participantes:</FilterInputLabel>
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
                        const { key: rowKey, ...rowProps } = row.getRowProps()
                        return (
                            <tr key={rowKey} {...rowProps}>
                                {row.cells.map((cell, cellIndex) => {
                                    const { key: cellKey, ...cellProps } = cell.getCellProps()
                                    return (
                                        <td key={cellKey ?? cellIndex} {...cellProps}>
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

export default TournamentParticipantsManagerTable

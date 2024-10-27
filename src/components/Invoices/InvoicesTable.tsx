import React, { useMemo, useState, useEffect } from 'react';
import { IInvoice } from '../Types/Types';
import { Column, useTable, useSortBy, useGlobalFilter, useRowSelect, CellProps } from 'react-table';
import { Button, Container } from 'react-bootstrap';
import { INVOICES_URL } from '../../resources/server_urls';
import axios from 'axios';
import { Trash3 } from 'react-bootstrap-icons';
import Table from 'react-bootstrap/Table';
import styled from 'styled-components';

const TableFilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    padding-bottom: 0.5em;
`;

const FilterInputLabel = styled.label`
    padding-right: 1em;
`;

const AmountRegistersBox = styled.div`
    padding-left: 4em;
`;

interface Props {
    data: IInvoice[];
}

const InvoicesTable: React.FC<Props> = ({ data: initialData }) => {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        setData(initialData); // Ensure data is updated when props change
    }, [initialData]);

    const columns: Column<IInvoice>[] = useMemo(
        () => [
            {
                Header: 'Numero',
                accessor: 'number'
            },
            {
                Header: 'Serie',
                accessor: 'series'
            },
            {
                Header: 'Fecha expedición',
                accessor: 'expeditionDate'
            },
            {
                Header: 'Fecha pago anticipado',
                accessor: 'advancePaymentDate'
            },
            {
                Header: 'Exento impuestos',
                accessor: (d) => (d.taxExempt ? 'SI' : 'NO')
            },
            {
                Header: 'Vendedor NIF',
                accessor: 'sellerNif'
            },
            {
                Header: 'Comprador NIF',
                accessor: 'buyerNif'
            }
        ],
        [] // Dependency array is empty because columns do not change based on data
    );

    function DeleteButtonClickHandler(props: CellProps<IInvoice>) {
        const clone = [...data];
        const modifiedClone: IInvoice[] = clone.splice(props.row.index, 1);
        const row = modifiedClone[0];
        axios
            .delete(`${INVOICES_URL}/${row.series}/${row.number}`)
            .then((/*response*/) => {
                setData(clone);
            })
            .catch((error) => console.log(error))
            .finally(() => console.log('final'));
    }

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, preGlobalFilteredRows, setGlobalFilter, state } = useTable(
        { columns, data },
        useGlobalFilter,
        useSortBy,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                ...columns,
                {
                    id: 'selection',
                    Header: () => <div> OPTIONS</div>,
                    Cell: (tableProps: CellProps<IInvoice>) => (
                        <div>
                            <Button variant="danger" onClick={() => DeleteButtonClickHandler(tableProps)}>
                                <Trash3 title="Borrar" />
                            </Button>
                        </div>
                    )
                }
            ]);
        }
    );

    const globalFilterState = state.globalFilter as string | number | readonly string[] | undefined;
    return (
        <Container>
            <TableFilterContainer>
                <FilterInputLabel htmlFor="filterInput">Busca facturas:</FilterInputLabel>
                <input
                    type="text"
                    value={globalFilterState ?? ''}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    aria-label="Buscar facturas"
                />
                <AmountRegistersBox>
                    Total de registros: {preGlobalFilteredRows.length} (Mostrando: {rows.length})
                </AmountRegistersBox>
            </TableFilterContainer>
            <Table striped bordered hover responsive {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup) => {
                            const { key: headerGroupKey, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
                            return (
                                <tr key={headerGroupKey} {...headerGroupProps}>
                                    {
                                        headerGroup.headers.map((column) => {
                                            const { key: columnKey, ...columnProps } = column.getHeaderProps(column.getSortByToggleProps());
                                            return (
                                                <th key={columnKey} {...columnProps}>
                                                    {column.render('Header')}
                                                    <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                                                </th>
                                            );
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map((row) => {
                            prepareRow(row);
                            const { key: rowKey, ...rowProps } = row.getRowProps();
                            return (
                                <tr key={rowKey} {...rowProps}>
                                    {
                                        row.cells.map((cell) => {
                                            const { key: cellKey, ...cellProps } = cell.getCellProps();
                                            return (
                                                <td key={cellKey} {...cellProps}>
                                                    {cell.render('Cell')}
                                                </td>
                                            );
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
};

export default InvoicesTable;

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Column, useTable, useSortBy, useGlobalFilter, useRowSelect, CellProps } from 'react-table';
import { Alert, Button, Collapse, Table } from 'react-bootstrap';
import { COMPANIES_URL } from '../../resources/server_urls';
import EditCompanyModal from './EditCompanyModal';
import { Trash3, Pencil } from 'react-bootstrap-icons';
import { CompanyTableProps, ICompany } from './Types';
import { FloatingNotificationContainer } from '../Common/FloatingNotificationContainer';
import axios from 'axios';

interface FloatingNotificationProps {
  message: string;
  variant: string;
  onClose: () => void;
}

const FloatingNotification: React.FC<FloatingNotificationProps> = ({ message, variant, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleExited = () => {
    onClose();
  };

  return (
    <Collapse in={visible} onExited={handleExited}>
      <FloatingNotificationContainer>
        <Alert variant={variant} onClose={onClose} dismissible>
          {message}
        </Alert>
      </FloatingNotificationContainer>
    </Collapse>
  );
};

const CompanyTable: React.FC<CompanyTableProps> = ({ data: initialData }) => {
  const [data, setData] = useState<ICompany[]>(useMemo(() => initialData, [initialData]));
  const [editModal, setEditModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ICompany | null>(null);
  const [notification, setNotification] = useState<{ message: string; variant: string } | null>(null);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const columns: Column<ICompany>[] = useMemo(
    () => [
      { Header: 'NIF', accessor: 'nif' },
      { Header: 'Nombre', accessor: 'name' },
      { Header: 'Dirección', accessor: 'address' },
    ],
    []
  );

  const handleDeleteButtonClick = useCallback(
    async (rowIndex: number) => {
      const companyToDelete = data[rowIndex];
      try {
        await axios.delete(`${COMPANIES_URL}/${companyToDelete.nif}`);
        setData((prevData) => prevData.filter((_, index) => index !== rowIndex));
        setNotification({ message: 'COMPAÑIA BORRADA CON EXITO', variant: 'success' });
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
          setNotification({ message: 'Error: no hay respuesta del servidor.', variant: 'danger' });
        } else {
          setNotification({ message: 'Error: algo inesperado. Recarga o intentalo mas tarde.', variant: 'danger' });
        }
      }
    },
    [data]
  );

  const handleEditButtonClick = useCallback(
    (rowIndex: number) => {
      setSelectedRow(data[rowIndex]);
      setEditModal(true);
    },
    [data]
  );


  // Function wrapper to avoid returning a promise directly
  const handleDeleteButtonClickWrapper = (rowIndex: number) => {
    handleDeleteButtonClick(rowIndex).catch((error) => {
      console.error('Error handling delete button click:', error);
    });
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, preGlobalFilteredRows, setGlobalFilter, state } = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          id: 'options',
          Header: () => <div>OPTIONS</div>,
          Cell: ({ row }: CellProps<ICompany>) => (
            <div>
              <Button variant="info" onClick={() => handleEditButtonClick(row.index)}>
                <Pencil title="Editar" />
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDeleteButtonClickWrapper(row.index);
                }}
              >
                <Trash3 title="Borrar" />
              </Button>
            </div>
          ),
        },
      ]);
    }
  );



  return (
    <>
      <Table striped bordered hover responsive {...getTableProps()}>
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
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div>
        <p>Total de registros: {preGlobalFilteredRows.length}</p>
      </div>
      <input type="text" value={state.globalFilter ?? ''} onChange={(event) => setGlobalFilter(event.target.value)} />
      {selectedRow && <EditCompanyModal show={editModal} onHide={() => setEditModal(false)} row={selectedRow} />}
      {notification && (
        <FloatingNotification
          message={notification.message}
          variant={notification.variant}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
};

export default CompanyTable;

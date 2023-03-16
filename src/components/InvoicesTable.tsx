/* eslint-disable react/jsx-key */
import React, { useMemo, useState } from 'react'
import { IInvoice } from './Types/Types'
import { Column, useTable, useSortBy, useGlobalFilter, useRowSelect } from 'react-table'
import { Button, Modal } from 'react-bootstrap'
import { INVOICES_URL } from '../resources/server_urls'
import axios from 'axios'
import EditCompanyForm from './EditCompanyForm'
import { Pencil, Trash3 } from 'react-bootstrap-icons'
import Table from 'react-bootstrap/Table';
type Props = {
    data: IInvoice[]
}

function EditCompanyModal(props:any) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Editar Invoice
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Actual data: </h4>
          
          <div>Number:</div>
          <span>
            {props.row.number}
          </span>

          <div>Series:</div>
          <span>
            {props.row.series}
          </span>

          <div>Expedition date:</div>
          <span>
            {props.row.expeditionDate}
          </span>

          <div>advance payment date:</div>
          <span>
            {props.row.advancePaymentDate}
          </span>

          <div>buyer nif cif:</div>
          <span>
            {props.row.buyerNifCif}
          </span>

          <div>seller nif cif:</div>
          <span>
            {props.row.sellerNifCif}
          </span>
          <div>tax exempt:</div>
          <span>
            {props.row.taxExempt}
          </span>

          <EditCompanyForm></EditCompanyForm>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }


function InvoicesTable(props: Props) {
    console.log(props.data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [data,setData] = useState(useMemo(() => props.data, [])) //Caching data
    const [editModal, setEditModal] = useState(false);
    const [selectedRow, setSelectedRow] =  useState({})
    const columns: Column<IInvoice>[] = useMemo ( ()=> [
        {
            Header: 'Number',
            accessor: 'number'
        },
        {
            Header: 'series',
            accessor: 'series'
        },
        {
            Header: 'expedition Date',
            accessor: 'expeditionDate'
        },
        {
            Header: 'advance Payment Date',
            accessor: 'advancePaymentDate'
            
        },
        {
            Header: 'Tax Exempt',
            accessor: d=>d.taxExempt.toString()
        },
        {
            Header: 'Seller',
            accessor: 'sellerNifCif'
        },
        {
            Header: 'Buyer',
            accessor: 'buyerNifCif'
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[data]) 

    function DeleteButtonClickHandler(props:any){
                    // eslint-disable-next-line prefer-const
                    let clone = [...data]
                    const modifiedClone:IInvoice[] = clone.splice(props.row.index,1)
                    const row = modifiedClone[0]
                    axios
                    .delete(INVOICES_URL + '/' + row.series + '/' + row.number)
                    .then((response) => {setData(clone)
                        })
                    .catch((error) => console.log(error))
                    .finally(() => console.log('final'));
    }

    function EditButtonClickHandler(props:any){
       
                    // eslint-disable-next-line prefer-const
                    let clone = [...data]

                    

                    const a = clone[props.row.index]
                    setSelectedRow(a)
                    setEditModal(true)
                    /*
                    axios
                    .delete(COMPANIES_URL + '/' + row.nifCif)
                    .then((response) => {setData(clone)
                        console.log(response)})
                    .catch((error) => console.log(error))
                    .finally(() => console.log('final'));
                    */
    }


    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, preGlobalFilteredRows, setGlobalFilter, state } = useTable({ columns, data }, useGlobalFilter, useSortBy,useRowSelect, hooks => {
        hooks.visibleColumns.push(columns => [
            ...columns,
            {
                id: 'selection',
                Header: () => (<div> OPTIONS</div>),
                Cell: ( tableProps:any ) => (
                    
                    <div>
                    <Button variant="info" onClick={() => EditButtonClickHandler(tableProps)}>
                        <Pencil title="Editar"/>
                    </Button>
                    <Button variant="danger" onClick={() => DeleteButtonClickHandler(tableProps)}>
                        <Trash3 title="Borrar" />
                    </Button>
                </div>

                ),
            }
       
        ])
    })
    return (
        <>
        <Table  striped bordered hover responsive {...getTableProps()}>
            <thead>
                {
                    // Loop over the header rows
                    headerGroups.map((headerGroup) => (
                        // Apply the header row props
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                // Loop over the headers in each row
                                headerGroup.headers.map((column) => (
                                    // Apply the header cell props
                                    // eslint-disable-next-line react/jsx-key
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {
                                            // Render the header
                                            column.render('Header')
                                        }
                                        <span>
                                            {column.isSorted
                                              ? column.isSortedDesc
                                              ? ' 🔽'
                                              : ' 🔼'
                                            : "" }
                                        </span>
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    // Loop over the table rows
                    rows.map((row) => {
                        // Prepare the row for display
                        prepareRow(row)
                        return (
                            // Apply the row props
                            <tr {...row.getRowProps()}>
                                {
                                    // Loop over the rows cells
                                    row.cells.map((cell) => {
                                        // Apply the cell props
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {
                                                    // Render the cell contents

                                                    cell.render('Cell')
                                                }
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        <div>
            <p> Total de registros: {preGlobalFilteredRows.length}</p>
        </div>
        <input
            type="text"
            value={state.globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}/>
        <EditCompanyModal
        show={editModal}
        onHide={() => setEditModal(false)}
        row = {selectedRow}
        
      />
    </>
    )
}

export default InvoicesTable
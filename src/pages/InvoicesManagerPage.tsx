import React, { useEffect, useState } from 'react';
import InvoicesTable from '../components/Invoices/InvoicesTable';
import { INVOICES_URL } from '../resources/server_urls';
import { useAxiosGetInvoices } from '../utility/CustomAxios';
import LoadingTableContainer from '../components/Common/LoadingTableSpinnerContainer';
import { Alert, Button, Container } from 'react-bootstrap';
import { IInvoice } from '../components/Types/Types';
import styled from 'styled-components';
import CreateInvoiceModal from '../components/Invoices/CreateInvoiceModal';

const ErrorMessage = styled(Alert)`
    margin-top: 20px;
`;
const Title = styled.h1`
    text-align: left;
    margin-top: 10px;
    color: #333;
`;
const NoCompaniesMessage = styled.p`
    text-align: center;
    margin-top: 20px;
`;

const InvoicesManagerPage: React.FC = () => {
    const { data, error, loaded } = useAxiosGetInvoices(INVOICES_URL);
    const [modalShow, setModalShow] = useState(false);
    const [invoicesList, setInvoicesList] = useState<IInvoice[]>([]);

    useEffect(() => {
        if (loaded && data) {
            setInvoicesList(data.invoicesList);
        }
    }, [loaded, data]);

    const updateInvoicesList = (newInvoice: IInvoice) => {
        setInvoicesList(prevInvoicesList => [...prevInvoicesList, newInvoice]); // Create a new array
    };

    if (error) {
        return <ErrorMessage variant="danger">Error: {error.message ?? 'Ocurrió un error al cargar las preguntas.'}</ErrorMessage>;
    }

    if (!loaded) {
        return <LoadingTableContainer />;
    }

    return (
        <Container>
            <Title>Gestor de facturas:</Title>
            {invoicesList.length ? (
                <InvoicesTable data={invoicesList} />
            ) : (
                <NoCompaniesMessage>No hay empresas disponibles.</NoCompaniesMessage>
            )}
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Añadir factura
            </Button>
            <CreateInvoiceModal show={modalShow} onHide={() => setModalShow(false)} updateInvoicesList={updateInvoicesList} />
        </Container>
    );
};

export default InvoicesManagerPage;

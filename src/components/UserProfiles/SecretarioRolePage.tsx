import React from 'react'
import { Accordion, Button } from 'react-bootstrap'
import { People, CashCoin } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../resources/routes-constants'

const SecretarioRolePage: React.FC = () => {
    const navigate = useNavigate()
    const handleCompaniesManagerButton = () => {
        navigate(ROUTES.COMPANIES_MANAGER_ROUTE)
    }

    const handleInvoicesManagerButton = () => {
        navigate(ROUTES.INVOICES_MANAGER_ROUTE)
    }

    const handlePaymentSheetManagerButton = () => {
        navigate(ROUTES.PAYMENT_SHEET_MANAGER_ROUTE)
    }

    const handleMembersManagerButton = () => {
        navigate(ROUTES.MEMBERS_MANAGER)
    }
    return (
        <>
            <h3>SECIÓN DEL SECRETARIO</h3>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        {' '}
                        <People size={'3rem'}></People>Gestión de socios
                    </Accordion.Header>
                    <Accordion.Body>
                        <Button onClick={handleMembersManagerButton}>Ver listado socios</Button>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <CashCoin size={'3rem'}></CashCoin>Gestión de contabilidad financiera
                    </Accordion.Header>
                    <Accordion.Body>
                        <Button onClick={handleInvoicesManagerButton}>Gestión de Facturas</Button>
                        <Button onClick={handlePaymentSheetManagerButton}>Gestión de hojas de pago</Button>
                        <Button onClick={handleCompaniesManagerButton}>Gestión de empresas(para facturas)</Button>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )
}

export default SecretarioRolePage

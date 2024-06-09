import React from 'react'
import { Button } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../resources/routes-constants'
import { People, CashCoin, Gear } from 'react-bootstrap-icons'

function AllCollapseExample() {
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
    const handleChessQuestionsManagerButton = () => {
        navigate(ROUTES.CHESS_QUESTIONS_MANAGER)
    }
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    {' '}
                    <People size={'3rem'}></People>Gestión de socios
                </Accordion.Header>
                <Accordion.Body>
                    <Button> Solicitudes de socios</Button>
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
            <Accordion.Item eventKey="2">
                <Accordion.Header>
                    {' '}
                    <Gear size={'3rem'}></Gear>Gestión de administración
                </Accordion.Header>
                <Accordion.Body>
                    <Button onClick={handleChessQuestionsManagerButton}>Administrar mensajes</Button>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

const PresidenteMenu = () => {
    return (
        <>
            <div>MENU ADMINISTRACIÓN PRESIDENTE</div>
            <AllCollapseExample></AllCollapseExample>
        </>
    )
}

export default PresidenteMenu

import React, { useState } from 'react'
import { Accordion, Button } from 'react-bootstrap'
import { People, CashCoin, Gear } from 'react-bootstrap-icons'
import styled from 'styled-components'
import { ProfileSection } from './SideBar'

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2em;
    font-family: 'Montserrat', sans-serif;
    background-color: #f4f4f9;
    min-height: 100vh;
`

const Title = styled.h3`
    margin-bottom: 1.5em;
    color: #343a40;
    font-size: 2em;
`

const StyledAccordion = styled(Accordion)`
    width: 100%;
    max-width: 800px;
    border: none;
`

const StyledAccordionItem = styled(Accordion.Item)`
    background-color: #fff;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    margin-bottom: 1em;

    .accordion-header {
        font-size: 1.75rem;
        background-color: #f8f9fa;
        &:hover {
            background-color: #e9ecef;
        }
    }

    .show {
        background-color: #343a40;
        color: #fff;
    }
`

const StyledAccordionHeader = styled(Accordion.Header)`
    display: flex;
    align-items: center;
    font-size: inherit;
    color: inherit;
    svg {
        margin-right: 1rem;
    }
`

const StyledAccordionBody = styled(Accordion.Body)`
    display: flex;
    flex-direction: column;
    padding: 0;
`

const buttonBaseStyle = {
    width: '100%',
    height: '100%',
    fontSize: '1.2rem',
    color: '#fff',
    backgroundColor: '#343a40',
    border: 'none',
    borderRadius: 0,
    padding: '1rem 0',
    borderTop: '1px solid #dee2e6',
    borderBottom: '1px solid #dee2e6',
    margin: 0,
    cursor: 'pointer'
}

const buttonHoverStyle = {
    backgroundColor: '#495057'
}

interface PresidentRolePageProps {
    changePage: (section: ProfileSection) => void
}

const PresidenteRolePage: React.FC<PresidentRolePageProps> = ({ changePage }) => {
    const [hoveredButton, setHoveredButton] = useState<number | null>(null)

    const handleMembersManagerButton = () => {
        changePage(ProfileSection.MembersManager)
    }

    const handleInvoicesButton = () => {
        changePage(ProfileSection.InvoicesManger)
    }

    const handlePaymentSheetsButton = () => {
        changePage(ProfileSection.PaymentSheetsManager)
    }
    const handleCompaniesManagerButton = () => {
        changePage(ProfileSection.CompaniesManager)
    }
    const handleMessagesButton = () => {
        changePage(ProfileSection.MessagesManager)
    }

    return (
        <PageContainer>
            <Title>SECCIÓN DEL PRESIDENTE</Title>
            <StyledAccordion>
                <StyledAccordionItem eventKey="0">
                    <StyledAccordionHeader>
                        <People size="3rem" /> Gestión de socios
                    </StyledAccordionHeader>
                    <StyledAccordionBody>
                        <Button
                            style={hoveredButton === 1 ? { ...buttonBaseStyle, ...buttonHoverStyle } : buttonBaseStyle}
                            onClick={handleMembersManagerButton}
                            onMouseEnter={() => setHoveredButton(1)}
                            onMouseLeave={() => setHoveredButton(null)}
                        >
                            Ver listado socios
                        </Button>
                    </StyledAccordionBody>
                </StyledAccordionItem>
                <StyledAccordionItem eventKey="1">
                    <StyledAccordionHeader>
                        <CashCoin size="3rem" /> Gestión de contabilidad financiera
                    </StyledAccordionHeader>
                    <StyledAccordionBody>
                        <Button
                            style={hoveredButton === 1 ? { ...buttonBaseStyle, ...buttonHoverStyle } : buttonBaseStyle}
                            onClick={handleInvoicesButton}
                            onMouseEnter={() => setHoveredButton(1)}
                            onMouseLeave={() => setHoveredButton(null)}
                        >
                            Ver listado facturas
                        </Button>
                        <Button
                            style={hoveredButton === 1 ? { ...buttonBaseStyle, ...buttonHoverStyle } : buttonBaseStyle}
                            onClick={handlePaymentSheetsButton}
                            onMouseEnter={() => setHoveredButton(1)}
                            onMouseLeave={() => setHoveredButton(null)}
                        >
                            Ver listado hojas de liquidación
                        </Button>
                        <Button
                            style={hoveredButton === 1 ? { ...buttonBaseStyle, ...buttonHoverStyle } : buttonBaseStyle}
                            onClick={handleCompaniesManagerButton}
                            onMouseEnter={() => setHoveredButton(1)}
                            onMouseLeave={() => setHoveredButton(null)}
                        >
                            Ver listado compañias (facturas)
                        </Button>
                    </StyledAccordionBody>
                </StyledAccordionItem>
                <StyledAccordionItem eventKey="2">
                    <StyledAccordionHeader>
                        <Gear size="3rem" /> Gestión de administración
                    </StyledAccordionHeader>
                    <StyledAccordionBody>
                        <Button
                            style={hoveredButton === 1 ? { ...buttonBaseStyle, ...buttonHoverStyle } : buttonBaseStyle}
                            onClick={handleMessagesButton}
                            onMouseEnter={() => setHoveredButton(1)}
                            onMouseLeave={() => setHoveredButton(null)}
                        >
                            Mensajes recibidos
                        </Button>
                    </StyledAccordionBody>
                </StyledAccordionItem>
            </StyledAccordion>
        </PageContainer>
    )
}

export default PresidenteRolePage

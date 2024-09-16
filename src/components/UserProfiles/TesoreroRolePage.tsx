// TesoreroRolePage.js
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { People, CashCoin } from 'react-bootstrap-icons';
import { PageContainer, Title, StyledAccordion, StyledAccordionItem, StyledAccordionHeader, StyledAccordionBody, buttonBaseStyle, buttonHoverStyle } from './CommonStyles';
import { ProfileSection } from './SideBar';


interface TesoreroRolePageProps {
    changePage: (section: ProfileSection) => void
}


const TesoreroRolePage: React.FC<TesoreroRolePageProps> = ({ changePage }) => {
    const [hoveredButton, setHoveredButton] = useState<number | null>(null);


    const handleMembersManagerButton = () => {
        changePage(ProfileSection.MembersManager)
    }

    const handleInvoicesButton = () => {
        changePage(ProfileSection.InvoicesManager)
    }

    const handlePaymentSheetsButton = () => {
        changePage(ProfileSection.PaymentSheetsManager)
    }
    const handleCompaniesManagerButton = () => {
        changePage(ProfileSection.CompaniesManager)
    }

    return (
        <PageContainer>
            <Title>SECCIÓN DEL TESORERO</Title>
            <StyledAccordion>
                <StyledAccordionItem eventKey="0">
                    <StyledAccordionHeader>
                        <People size="3rem" /> Gestión de socios
                    </StyledAccordionHeader>
                    <StyledAccordionBody>
                        <Button
                            style={hoveredButton === 0 ? { ...buttonBaseStyle, ...buttonHoverStyle } : buttonBaseStyle}
                            onClick={handleMembersManagerButton}
                            onMouseEnter={() => setHoveredButton(0)}
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
                            Ver lista de facturas
                        </Button>
                        <Button
                            style={hoveredButton === 2 ? { ...buttonBaseStyle, ...buttonHoverStyle } : buttonBaseStyle}
                            onClick={handlePaymentSheetsButton}
                            onMouseEnter={() => setHoveredButton(2)}
                            onMouseLeave={() => setHoveredButton(null)}
                        >
                            Ver lista hojas de liquidación
                        </Button>
                        <Button
                            style={hoveredButton === 3 ? { ...buttonBaseStyle, ...buttonHoverStyle } : buttonBaseStyle}
                            onClick={handleCompaniesManagerButton}
                            onMouseEnter={() => setHoveredButton(3)}
                            onMouseLeave={() => setHoveredButton(null)}
                        >
                            Gestión de empresas (para facturas)
                        </Button>
                    </StyledAccordionBody>
                </StyledAccordionItem>
            </StyledAccordion>
        </PageContainer>
    );
};

export default TesoreroRolePage;

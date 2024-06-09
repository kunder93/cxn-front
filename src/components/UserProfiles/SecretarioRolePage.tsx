// SecretarioRolePage.js
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { People, CashCoin } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../resources/routes-constants';
import { PageContainer, Title, StyledAccordion, StyledAccordionItem, StyledAccordionHeader, StyledAccordionBody, buttonBaseStyle, buttonHoverStyle } from './CommonStyles';

const SecretarioRolePage: React.FC = () => {
    const navigate = useNavigate();
    const [hoveredButton, setHoveredButton] = useState<number | null>(null);

    const handleNavigation = (route: string) => {
        navigate(route);
    };

    return (
        <PageContainer>
            <Title>SECCIÓN DEL SECRETARIO</Title>
            <StyledAccordion>
                <StyledAccordionItem eventKey="0">
                    <StyledAccordionHeader>
                        <People size="3rem" /> Gestión de socios
                    </StyledAccordionHeader>
                    <StyledAccordionBody>
                        <Button
                            style={hoveredButton === 0 ? { ...buttonBaseStyle, ...buttonHoverStyle } : buttonBaseStyle}
                            onClick={() => handleNavigation(ROUTES.MEMBERS_MANAGER)}
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
                            onClick={() => handleNavigation(ROUTES.INVOICES_MANAGER_ROUTE)}
                            onMouseEnter={() => setHoveredButton(1)}
                            onMouseLeave={() => setHoveredButton(null)}
                        >
                            Gestión de Facturas
                        </Button>
                        <Button
                            style={hoveredButton === 2 ? { ...buttonBaseStyle, ...buttonHoverStyle } : buttonBaseStyle}
                            onClick={() => handleNavigation(ROUTES.PAYMENT_SHEET_MANAGER_ROUTE)}
                            onMouseEnter={() => setHoveredButton(2)}
                            onMouseLeave={() => setHoveredButton(null)}
                        >
                            Gestión de hojas de pago
                        </Button>
                        <Button
                            style={hoveredButton === 3 ? { ...buttonBaseStyle, ...buttonHoverStyle } : buttonBaseStyle}
                            onClick={() => handleNavigation(ROUTES.COMPANIES_MANAGER_ROUTE)}
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

export default SecretarioRolePage;

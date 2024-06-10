// CommonStyles.js
import styled from 'styled-components';
import { Accordion } from 'react-bootstrap';

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2em;
    font-family: 'Montserrat', sans-serif;
    background-color: #f4f4f9;
    min-height: 100vh;
`;

export const Title = styled.h3`
    margin-bottom: 1.5em;
    color: #343a40;
    font-size: 2em;
`;

export const StyledAccordion = styled(Accordion)`
    width: 100%;
    max-width: 800px;
    border: none;
`;

export const StyledAccordionItem = styled(Accordion.Item)`
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
`;

export const StyledAccordionHeader = styled(Accordion.Header)`
    display: flex;
    align-items: center;
    font-size: inherit;
    color: inherit;
    svg {
        margin-right: 1rem;
    }
`;

export const StyledAccordionBody = styled(Accordion.Body)`
    display: flex;
    flex-direction: column;
    padding: 0;
`;

export const buttonBaseStyle = {
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
    cursor: 'pointer',
};

export const buttonHoverStyle = {
    backgroundColor: '#495057',
};

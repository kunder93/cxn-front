import React from 'react'
import styled from 'styled-components'

const StyledSectionRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1em 0;
    font-family: 'Montserrat', sans-serif;
    border-top: 2px solid #dee2e6;

    &:first-child {
        border-top: none;
    }
`

const StyledSectionCol = styled.div`
    flex: 0 0 calc(50% - 1em);
    margin-left: 1em;
    padding: 0 1em;
    font-size: 1.2em;
`

interface SectionRowProps {
    label: string
    value: string | React.ReactNode
}

const SectionRow = ({ label, value }: SectionRowProps): JSX.Element => (
    <StyledSectionRow>
        <StyledSectionCol>{label}:</StyledSectionCol>
        <StyledSectionCol>{value}</StyledSectionCol>
    </StyledSectionRow>
)

export default SectionRow

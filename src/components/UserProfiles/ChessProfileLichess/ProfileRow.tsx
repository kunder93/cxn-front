import React from 'react'
import styled from 'styled-components'

/**
 * A styled row for displaying a label and its corresponding value.
 */
const StyledRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #444;
    font-size: 16px;
    &:last-child {
        border-bottom: none;
    }
`

/**
 * A styled column for displaying the label in the profile row.
 */
const StyledColLabel = styled.div`
    flex: 1;
    font-weight: bold;
    color: #bbb;
    padding-left: 3em;
`

/**
 * A styled column for displaying the value in the profile row.
 */
const StyledColValue = styled.div`
    flex: 1;
    text-align: right;
    color: #fff;
    padding-right: 3em;
`

/**
 * ProfileRow component to render a row with a label and a corresponding value.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label text to display.
 * @param {React.ReactNode} props.value - The value to display next to the label.
 * @returns {JSX.Element} The rendered ProfileRow component.
 */
const ProfileRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }: { label: string; value: React.ReactNode }): JSX.Element => (
    <StyledRow>
        <StyledColLabel>{label}</StyledColLabel>
        <StyledColValue>{value}</StyledColValue>
    </StyledRow>
)

export default ProfileRow
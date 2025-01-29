import { Button } from 'react-bootstrap'
import { FaRegPlusSquare } from 'react-icons/fa'
import styled from 'styled-components'

export const ActionsCell = styled.td`
    width: 100%;
    display: flex;
`

export const ActionsHeader = styled.th`
    max-width: 250px;
`

export const OptionButton = styled(Button)`
    width: 100%; /* Make the button take up 50% of the available width inside the cell */
    display: block;
    text-align: center;
`

export const TableActionsRow = styled.div`
    display: flex;
    flex-wrap: nowrap;
    gap: 15px;
    padding-bottom: 0.3rem;
    align-items: center;
    input {
        margin-bottom: 0px !important;
    }
`

export const AddBookIcon = styled(FaRegPlusSquare)`
    fill: blue;
    cursor: pointer;
    font-size: 4rem;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.2);
    }
`

export const SearchOptionsWrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: nowrap;
`

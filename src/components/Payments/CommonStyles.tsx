import styled from 'styled-components'
import { Modal, Button } from 'react-bootstrap'

export const StyledModalHeader = styled(Modal.Header)`
    background-color: #f8f9fa;
    color: #343a40;
    font-weight: bold;
    border-bottom: 1px solid #dee2e6;
`

export const StyledModalBody = styled(Modal.Body)`
    font-size: 16px;
    color: #495057;
    line-height: 1.5;
`

export const StyledModalFooter = styled(Modal.Footer)`
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 20px;
`

export const ConfirmButton = styled(Button)`
    background-color: #28a745;
    border-color: #28a745;

    &:hover {
        background-color: #218838;
        border-color: #1e7e34;
    }

    &:focus {
        box-shadow: 0 0 0 0.2rem rgba(72, 180, 97, 0.5);
    }
`

export const CloseButton = styled(Button)`
    background-color: #dc3545;
    border-color: #dc3545;

    &:hover {
        background-color: #c82333;
        border-color: #bd2130;
    }

    &:focus {
        box-shadow: 0 0 0 0.2rem rgba(225, 83, 97, 0.5);
    }
`

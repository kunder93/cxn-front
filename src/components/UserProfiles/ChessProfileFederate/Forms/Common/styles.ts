import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'

export const StyledLabel = styled(Form.Label)`
    font-weight: bold;
    display: flex;
    align-items: center;
    flex-direction: row;
`
export const StyledPreviewRow = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    flex-wrap: nowrap;
    max-width: 100%;
    align-items: center;

    div {
        width: 50%;
    }
    img {
        width: 100%;
        border-radius: 8px;
        height: auto;
        aspect-ratio: 1 / 1;
    }
    @media (max-width: 768px) {
        gap: 5px;
    }
`

export const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`

export const SubmitButton = styled(Button)`
    @media (max-width: 768px) {
        width: 100%; /* Botones ocupan el 100% del ancho en móviles */
        margin-bottom: 10px;
    }
`
export const ResetButton = styled(Button)`
    @media (max-width: 768px) {
        width: 100%; /* Botones ocupan el 100% del ancho en móviles */
    }
`

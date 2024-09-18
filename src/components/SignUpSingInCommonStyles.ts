import { Alert, Container, Row } from 'react-bootstrap'
import { ExclamationTriangle } from 'react-bootstrap-icons'
import styled from 'styled-components'

export const MainContainer = styled(Container)`
    padding-top: 1em;
    padding-bottom: 10em;
`

export const FormStyledContainer = styled.div`
    background-color: rgba(250, 238, 168, 0.219);
    box-shadow:
        0 0.5em 0.5em -0.3em rgba(0, 0, 0, 0.3),
        0.5em 0 0.5em -0.3em rgba(0, 0, 0, 0.3);
    padding: 1em;
    font-size: 140%;
    margin-left: 18em;
    margin-right: 18em;
    border-radius: 5px;
    @media (max-width: 768px) {
        margin-left: 0em;
        margin-right: 0em;
        input {
            font-size: 100%;
        }
        label {
            font-size: 120%;
        }
    }
`

export const ButtonRow = styled(Row)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    min-height: 100px;
    .col {
        // Col used for buttons in row
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
    }
`

export const ErrorAlert = styled(Alert)`
    color: red;
    font-size: 1em;
    background-color: white;
    margin: 3px;
    padding: 0.5em 1.5em;
    border: 1px solid palevioletred;
    border-radius: 10px;
`

export const ErrorTriangle = styled(ExclamationTriangle)`
    height: 10%;
    width: 10%;
`

export const ErrorMessage = styled.div`
    color: red;
`

export const StyledRow = styled(Row)`
    padding-bottom: 1em;
`

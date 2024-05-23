import { Col, Container, Row } from 'react-bootstrap'
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
    padding-left: 14em;
    padding-right: 14em;
    border-radius: 5px;
`

export const ButtonRow = styled(Row)`
    display: flex;
    padding-top: 0.5em;
    padding-bottom: 1em;
`
export const ButtonCol = styled(Col)`
    justify-content: center;
`

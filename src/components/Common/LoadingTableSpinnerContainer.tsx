import { Spinner } from 'react-bootstrap'
import styled from 'styled-components'

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px; /* Aumenta la altura para centrar mejor el contenido */
    margin-top: 20px;
`

const LargeSpinner = styled(Spinner)`
    font-size: 5rem; /* Ajusta el tamaño de la fuente para aumentar el tamaño del spinner */
`

const LoadingMessage = styled.p`
    margin-top: 10px;
    font-size: 1.5rem; /* Ajusta el tamaño del mensaje */
    color: #333;
`
const LoadingTableSpinnerContainer = (): React.JSX.Element => {
    return (
        <LoadingContainer>
            <LargeSpinner animation="border" role="output" />
            <LoadingMessage>Cargando datos...</LoadingMessage>
        </LoadingContainer>
    )
}

export default LoadingTableSpinnerContainer

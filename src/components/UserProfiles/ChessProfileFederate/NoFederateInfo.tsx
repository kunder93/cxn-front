import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import styled from 'styled-components'
import FederateRequestForm from './Forms/FederateRequestForm'
import { FederateStateResponse } from './Hooks/getFederateState'

// Styled components
const StyledModalHeader = styled(Modal.Header)`
    font-weight: bold;
    font-size: 1.5rem; /* Improved font size */
`

const CloseModalButton = styled(Button)`
    @media (max-width: 768px) {
        width: 100%; /* Full width buttons on mobile */
    }
`
const FederateRequestButton = styled(Button)`
    @media (max-width: 768px) {
        width: 100%; /* Full width buttons on mobile */
    }
`

// Props interface
interface NoFederateInfoProps {
    setFederateState: React.Dispatch<React.SetStateAction<FederateStateResponse>>
}

const NoFederateInfo = ({ setFederateState }: NoFederateInfoProps): JSX.Element => {
    const [showFederateModal, setShowFederateModal] = useState(false)

    return (
        <section>
            <p>
                Fedérate para poder competir en torneos oficiales Gallegos, Nacionales e Internacionales.{' '}
                <strong>Si no tienes pensado jugar, no te federes, por favor.</strong>
            </p>
            <p>
                <strong>Condiciones:</strong> Al federarte, tenemos que compartir información personal tuya con las federaciones tanto la gallega{' '}
                <a href="https://www.fegaxa.org/" target="_blank" rel="noopener noreferrer">
                    FEGAXA
                </a>
                , la española{' '}
                <a href="https://feda.org/feda2k16/" target="_blank" rel="noopener noreferrer">
                    FEDA
                </a>{' '}
                y la internacional{' '}
                <a href="https://www.fide.com/" target="_blank" rel="noopener noreferrer">
                    FIDE
                </a>
                .
            </p>
            <p>
                El proceso tarda varios días, por favor, sea paciente. En caso de que no actualicemos el estado en una semana, póngase en contacto con nosotros.
                Si necesita federarse con urgencia, ponte en contacto con nuestro equipo a través de los medios de contacto que proporciona la web.
            </p>
            <FederateRequestButton variant="success" onClick={() => setShowFederateModal(true)}>
                Quiero federarme
            </FederateRequestButton>
            <Modal show={showFederateModal} onHide={() => setShowFederateModal(false)} centered aria-labelledby="federate-modal-title">
                <StyledModalHeader id="federate-modal-title">Federarse</StyledModalHeader>
                <Modal.Body>
                    <FederateRequestForm setFederateState={setFederateState} closeModal={() => setShowFederateModal(false)} />
                </Modal.Body>
                <Modal.Footer>
                    <CloseModalButton variant="danger" onClick={() => setShowFederateModal(false)}>
                        Cerrar
                    </CloseModalButton>
                </Modal.Footer>
            </Modal>
        </section>
    )
}

export default NoFederateInfo

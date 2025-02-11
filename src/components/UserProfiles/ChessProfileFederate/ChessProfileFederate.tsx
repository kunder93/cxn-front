import { Accordion, Alert, Button, Modal, Spinner } from 'react-bootstrap'
import { FaCheckCircle } from 'react-icons/fa'
import styled from 'styled-components'
import { LuCross } from 'react-icons/lu'
import { useEffect, useState } from 'react'
import { FederateState, FederateStateResponse, noFederateState, useFederateState } from './Hooks/getFederateState'

import UpdateDniForm from './Forms/UpdateDniForm'
import NoFederateInfo from './NoFederateInfo'
import FederateInfo from './FederateInfo'
import InProgressInfo from './InProgressInfo'

const StyledNoFederateCross = styled(LuCross)`
    rotate: 45deg;
    font-size: 150%;
    fill: red;
`

// Styled components
const StyledModalHeader = styled(Modal.Header)`
    font-weight: bold;
    font-size: 1.5rem; /* Improved font size */
`

const StyledFaCheckCircle = styled(FaCheckCircle)`
    font-size: 150%;
    fill: green;
`

const CloseModalButton = styled(Button)`
    @media (max-width: 768px) {
        width: 100%; /* Full width for mobile buttons */
        font-size: 1.4em;
    }
`

const Heading = styled.h2`
    font-size: 1.5rem;
    @media (max-width: 768px) {
        font-size: 1.2rem;
    }
`

const ChessProfileFederate = (): JSX.Element => {
    const [federateStatus, setFederateState] = useState<FederateStateResponse>(noFederateState)
    const [uploadDniform, setUploadDniform] = useState(false)
    const currentYear = new Date().getFullYear()

    const { federateState, loading, error } = useFederateState()

    useEffect(() => {
        setFederateState(federateState)
    }, [federateState])

    const renderFederateIcon = (state: FederateState) => {
        switch (state) {
            case FederateState.FEDERATE:
                return <StyledFaCheckCircle />
            case FederateState.NO_FEDERATE:
                return <StyledNoFederateCross />
            case FederateState.IN_PROGRESS:
                return (
                    <>
                        <StyledFaCheckCircle /> <span>En proceso...</span>
                    </>
                )
            default:
                return null
        }
    }

    if (error) {
        return (
            <Alert variant="danger">
                Error al obtener su estado de federativo, inténtelo más tarde. Contacte a través del formulario o email en la sección 'El club'.
            </Alert>
        )
    }

    if (loading) {
        return (
            <div>
                Cargando... <Spinner animation="border" variant="primary" />
            </div>
        )
    }

    return (
        <>
            <Heading>Federativo:</Heading>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <strong>Federado para el {currentYear}:</strong> {renderFederateIcon(federateStatus.state)}
                    </Accordion.Header>
                    <Accordion.Body>
                        {federateStatus.state === FederateState.NO_FEDERATE && <NoFederateInfo setFederateState={setFederateState} />}
                        {federateStatus.state === FederateState.IN_PROGRESS && <InProgressInfo />}
                        {federateStatus.state === FederateState.FEDERATE && (
                            <FederateInfo
                                dniLastUpdate={federateStatus.dniLastUpdate.toString()}
                                setUploadDniform={setUploadDniform}
                                autoRenew={federateStatus.autoRenew}
                            />
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Modal show={uploadDniform} onHide={() => setUploadDniform(false)} centered>
                <StyledModalHeader>Actualizar DNI</StyledModalHeader>
                <Modal.Body>
                    <UpdateDniForm setFederateState={setFederateState} closeModal={() => setUploadDniform(false)} />
                </Modal.Body>
                <Modal.Footer>
                    <CloseModalButton variant="danger" onClick={() => setUploadDniform(false)}>
                        Cerrar
                    </CloseModalButton>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ChessProfileFederate

import { Accordion, AccordionBody, AccordionItemProps, Button, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap'
import React from 'react'
import useFederateData from '../Hooks/useFederateData'
import styled from 'styled-components'
import { RxCrossCircled } from 'react-icons/rx'
import { FaCheckCircle } from 'react-icons/fa'
import { MdError } from 'react-icons/md'
import { FederateState } from 'components/UserProfiles/ChessProfileFederate/Hooks/getFederateState'
import { UserDniViewModal } from 'components/UserProfiles/ChessProfileFederate/UserDniViewModal'

const StyledLoadingSpinner = styled(Spinner)``

const NoFederateIcon = styled(RxCrossCircled)`
    color: red;
`

const IsFederateIcon = styled(FaCheckCircle)`
    color: green;
`

const IsInProgressIcon = styled(FaCheckCircle)`
    color: orange;
`

const ErrorLoadingIcon = styled(MdError)`
    color: red;
`

const StyledAccordionBody = styled(AccordionBody)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const FederateStateDataRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 1rem;
    align-items: baseline;
`
const AccordionHeader = styled(Accordion.Header)`
    button {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }
`

interface AccordionItemFederateInfoProps extends AccordionItemProps {
    userDni: string
}

const renderFederateState = (federateState: FederateState): string => {
    switch (federateState) {
        case FederateState.FEDERATE:
            return 'Federado'
        case FederateState.IN_PROGRESS:
            return 'En progreso'
        default:
            return 'No federado'
    }
}

const renderAutoRenewState = (autoRenew: boolean): string => (autoRenew ? 'Sí' : 'No')

const AccordionItemFederateInfo: React.FC<AccordionItemFederateInfoProps> = ({ userDni, ...props }) => {
    const [loading, error, federateData] = useFederateData(userDni)
    const [dniModal, setDniModal] = React.useState(false)

    const renderFederateStatus = () => {
        if (error) {
            return (
                <OverlayTrigger placement="top" overlay={<Tooltip id="error-tooltip">Hubo un error cargando los datos federativos</Tooltip>}>
                    <span>
                        <ErrorLoadingIcon />
                    </span>
                </OverlayTrigger>
            )
        }

        if (loading) {
            return <StyledLoadingSpinner size="sm" variant="primary" />
        }

        if (!federateData) {
            return <NoFederateIcon />
        }

        switch (federateData.state) {
            case FederateState.FEDERATE:
                return <IsFederateIcon />
            case FederateState.IN_PROGRESS:
                return <IsInProgressIcon />
            default:
                return <NoFederateIcon />
        }
    }

    return (
        <Accordion.Item {...props}>
            <AccordionHeader>
                <span>Federado:</span> <>{renderFederateStatus()}</>
            </AccordionHeader>

            <StyledAccordionBody>
                {Boolean(federateData) && !error && !loading && federateData?.state != FederateState.NO_FEDERATE ? (
                    <>
                        <span>El estado federativo es: {renderFederateState(federateData?.state ?? FederateState.NO_FEDERATE)}</span>
                        <span>Renovación automática: {renderAutoRenewState(federateData?.autoRenew ?? false)}</span>
                        <FederateStateDataRow>
                            <span>DNI Fecha última actualización: {federateData?.dniLastUpdate ?? 'No disponible'}</span>
                            <Button size="sm" variant="primary" onClick={() => { setDniModal(true); }}>
                                Ver DNI
                            </Button>
                        </FederateStateDataRow>

                        <UserDniViewModal show={dniModal} onHide={() => { setDniModal(false); }} userDni={userDni} />
                    </>
                ) : (
                    <span>NO ESTÁ FEDERADO</span>
                )}
            </StyledAccordionBody>
        </Accordion.Item>
    )
}

export default AccordionItemFederateInfo

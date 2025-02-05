import { Dispatch, memo, SetStateAction, useCallback, useState } from 'react'
import { useFloating, autoUpdate, offset, flip, shift, useDismiss, useRole, useClick, useInteractions, FloatingFocusManager, useId } from '@floating-ui/react'
import { useAppSelector } from 'store/hooks'
import { useNotificationContext } from 'components/Common/NotificationContext'
import styled from 'styled-components'
import { FaCheckCircle, FaQuestionCircle } from 'react-icons/fa'
import { Button } from 'react-bootstrap'
import { FederateStateResponse } from './Hooks/getFederateState'
import { FEDERATE_CHANGE_AUTORENEW_URL } from 'resources/server_urls'
import { NotificationType } from 'components/Common/hooks/useNotification'
import axios from 'axios'
import { LuCross } from 'react-icons/lu'

// Reusable styled components
const StyledNoFederateCross = styled(LuCross)`
    rotate: 45deg;
    font-size: 150%;
    fill: red;
`

const StyledFaCheckCircle = styled(FaCheckCircle)`
    font-size: 150%;
    fill: green;
`

const StyledFaQuestionCircle = styled(FaQuestionCircle)`
    font-size: 2.5em;
    cursor: pointer;
    &:hover {
        color: blue;
    }
`

const StyledHelpMessageContainer = styled.div`
    background-color: #d1cbcb;
    border-radius: 20px;
    border: 5px solid blue;
    padding: 20px;
    display: flex;
    align-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    p {
        margin-bottom: 0;
    }
`

const SectionWrapper = styled.section`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 1em;
`

const SectionRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 1em;
    align-items: center;

    @media (max-width: 768px) {
        flex-wrap: wrap;
        button {
            width: 100%;
        }
    }
`

// Popover Component (memoized for performance)
const Popover = memo(({ message }: { message: string }) => {
    const [isOpen, setIsOpen] = useState(false)
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [offset(10), flip({ fallbackAxisSideDirection: 'end' }), shift()],
        placement: 'right',
        whileElementsMounted: autoUpdate
    })

    const click = useClick(context)
    const dismiss = useDismiss(context)
    const role = useRole(context)
    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role])
    const headingId = useId()

    return (
        <>
            <span ref={refs.setReference} {...getReferenceProps()}>
                <StyledFaQuestionCircle />
            </span>
            {isOpen && (
                <FloatingFocusManager context={context} modal={false}>
                    <StyledHelpMessageContainer
                        className="Popover"
                        ref={refs.setFloating}
                        style={floatingStyles}
                        aria-labelledby={headingId}
                        {...getFloatingProps()}
                    >
                        <p id={headingId}>{message}</p>
                    </StyledHelpMessageContainer>
                </FloatingFocusManager>
            )}
        </>
    )
})

// FederateAutoRenew Component (split logic from FederateInfo)
const FederateAutoRenew = memo(({ federateAutoRenew, onChange }: { federateAutoRenew: boolean; onChange: () => void }) => (
    <SectionRow>
        <Popover message="Actívalo si estás seguro de jugar competición federada todos los años. En caso de no estar seguro, desactívalo por favor." />
        <span>Renovación automática:</span> {federateAutoRenew ? <StyledFaCheckCircle /> : <StyledNoFederateCross />}
        <Button variant="secondary" onClick={onChange}>
            Cambiar
        </Button>
    </SectionRow>
))

// DniUpdate Component (split logic from FederateInfo)
const DniUpdate = memo(({ dniLastUpdate, onDniUpdate }: { dniLastUpdate: string; onDniUpdate: () => void }) => (
    <SectionRow>
        <Popover message="Si has cambiado el DNI, actualízalo. Te mostramos la última vez que lo has hecho." />
        <span>
            DNI: Última vez: <strong>{dniLastUpdate}</strong>
        </span>
        <Button variant="secondary" onClick={onDniUpdate}>
            Actualizar DNI
        </Button>
    </SectionRow>
))

// Main FederateInfo Component
const FederateInfo = ({
    dniLastUpdate,
    setUploadDniform,
    autoRenew
}: {
    dniLastUpdate: string
    setUploadDniform: Dispatch<SetStateAction<boolean>>
    autoRenew: boolean
}): JSX.Element => {
    const [federateAutoRenew, setFederateAutoRenew] = useState(autoRenew)
    const userJwt = useAppSelector((state) => state.users.jwt)
    const { showNotification } = useNotificationContext()

    const handleChangeFederateAutoRenew = useCallback(async (): Promise<void> => {
        try {
            const response = await axios.patch<FederateStateResponse>(FEDERATE_CHANGE_AUTORENEW_URL, null, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userJwt}`
                }
            })
            setFederateAutoRenew(response.data.autoRenew)
        } catch (error) {
            const errorMessage = axios.isAxiosError(error) ? error.message : 'Error inesperado, prueba más tarde.'
            throw errorMessage
        }
    }, [userJwt])

    return (
        <SectionWrapper>
            <FederateAutoRenew
                federateAutoRenew={federateAutoRenew}
                onChange={() => {
                    handleChangeFederateAutoRenew()
                        .then(() => {
                            showNotification('La renovación automática se ha cambiado correctamente.', NotificationType.Success)
                        })
                        .catch((error) => {
                            showNotification('Ha ocurrido un error: ' + error, NotificationType.Error)
                        })
                }}
            />
            <DniUpdate dniLastUpdate={dniLastUpdate} onDniUpdate={() => setUploadDniform(true)} />
        </SectionWrapper>
    )
}

export default FederateInfo

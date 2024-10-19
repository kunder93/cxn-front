import { Accordion, Alert, Button, Modal, Spinner } from 'react-bootstrap'
import { FaCheckCircle } from 'react-icons/fa'
import styled from 'styled-components'
import { LuCross } from 'react-icons/lu'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import UpdateDniForm from './UpdateDniForm'
import FederateRequestForm from './FederateRequestForm'
import { FederateState, FederateStateResponse, noFederateState, useFederateState } from './Hooks/getFederateState'
import { FaQuestionCircle } from 'react-icons/fa'
import { useFloating, autoUpdate, offset, flip, shift, useDismiss, useRole, useClick, useInteractions, FloatingFocusManager, useId } from '@floating-ui/react'
import axios from 'axios'
import { useAppSelector } from '../../../store/hooks'
import { useNotificationContext } from '../../../components/Common/NotificationContext'
import { NotificationType } from '../../../components/Common/hooks/useNotification'
import { FEDERATE_CHANGE_AUTORENEW_URL } from '../../../resources/server_urls'

const StyledNoFederateCross = styled(LuCross)`
    rotate: 45deg;
    font-size: 150%;
    fill: red;
`

const StyledFaCheckCircle = styled(FaCheckCircle)`
    font-size: 150%;
    fill: green;
`

const StyledModalHeader = styled(Modal.Header)`
    font-weight: bold;
    font-size: 150%;
`
const StyledFaQuestionCircle = styled(FaQuestionCircle)`
    font-size: 2.5em;
    cursor: pointer;
    &:hover {
        color: blue; /* Change this to your desired hover color */
    }
`

const StyledHelpMessageContainer = styled.div`
    background-color: #d1cbcb;
    border-radius: 20px; /* Ajusta el radio de las esquinas */
    border: 5px solid blue; /* Cambia inset a solid */
    padding: 20px; /* Añadir padding para que el contenido no toque los bordes */
    display: flex;
    align-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Agregar sombra opcional */

    p {
        margin-bottom: 0; /* Evitar márgenes en los párrafos */
    }
`

interface NoFederateInfoContainerProps {
    setShowFederateModal: Dispatch<SetStateAction<boolean>>
}
const NoFederateInfoContainer = ({ setShowFederateModal }: NoFederateInfoContainerProps): JSX.Element => {
    return (
        <>
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
                El proceso tarda varios días, por favor, sea paciente. En caso de que no actualicemos el estado en 1 semana, póngase en contacto con nosotros.
                Si necesita federarse con urgencia, ponte en contacto con nuestro equipo a través de los medios de contacto que proporciona la web.
            </p>
            <Button variant="success" onClick={() => setShowFederateModal(true)}>
                Solicitar federarse
            </Button>
        </>
    )
}

const InProgressInfoContainer = (): JSX.Element => {
    return (
        <>
            <p>
                El proceso para federarte ha comenzado. Por favor, tenga paciencia, este trámite puede tomar hasta una semana. Si necesita atención urgente o el
                proceso demora más de lo esperado, no dude en ponerse en contacto a través de nuestro correo: {<a href="mailto:principal@xadreznaron.es"></a>} o
                de el formulario presente en la web, en la seccion "El Club".
            </p>
        </>
    )
}

const FederateInfoContainer = ({
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
    function Popover({ message }: { message: string }) {
        const [isOpen, setIsOpen] = useState(false)
        const { refs, floatingStyles, context } = useFloating({
            open: isOpen,
            onOpenChange: setIsOpen,
            middleware: [
                offset(10), // Espacio entre el ícono y el popover
                flip({ fallbackAxisSideDirection: 'end' }), // Cambia de lado si no hay espacio
                shift() // Ajusta el popover si se sale de la pantalla
            ],
            placement: 'right', // Cambia la posición a la derecha
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
    }

    const handleChangeFederateAutoRenew = async () => {
        try {
            const response = await axios.patch<FederateStateResponse>(FEDERATE_CHANGE_AUTORENEW_URL, null, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userJwt}`
                }
            })
            setFederateAutoRenew(response.data.autoRenew)
            showNotification('La renovación automática se ha cambiado correctamente.', NotificationType.Success)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Manejar errores específicos de Axios
                showNotification('Ha ocurrido un error: ' + error.message, NotificationType.Error)
            } else {
                showNotification('Error inesperado, prueba más tarde.', NotificationType.Error)
                console.error('Unexpected error:', error)
            }
        }
    }

    return (
        <>
            <Popover
                message=" Actívalo si estás seguro de jugar competición federada todos los años. En caso de no estar seguro, desactívalo
                                porfavor."
            />
            <span>Renovación automática:</span> {federateAutoRenew ? <StyledFaCheckCircle /> : <StyledNoFederateCross />}{' '}
            <Button variant="secondary" onClick={() => void handleChangeFederateAutoRenew()}>
                {' '}
                Cambiar
            </Button>
            <br></br>
            <Popover message="Si has cambiado el DNI, actualizalo, te mostramos la última vez que lo has hecho." />
            <span>DNI: Fecha de última actualización: {dniLastUpdate} </span>{' '}
            <Button variant="secondary" onClick={() => setUploadDniform(true)}>
                {' '}
                Actualizar DNI
            </Button>
            <br></br>
        </>
    )
}

const ChessProfileFederate = (): JSX.Element => {
    const [federateStatus, setFederateState] = useState<FederateStateResponse>(noFederateState)
    const currentYear = new Date().getFullYear()

    const [uploadDniform, setUploadDniform] = useState(false)

    const [showFederateModal, setShowFederateModal] = useState(false)

    const { federateState, loading, error } = useFederateState()

    useEffect(() => {
        setFederateState(federateState)
    }, [federateState])

    return (
        <>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        {error ? (
                            <Alert variant="danger">Error al obtener su estado de federativo, inténtelo más tarde.</Alert>
                        ) : (
                            <>
                                {loading ? (
                                    <>
                                        Cargando...
                                        <Spinner animation="border" variant="primary" />
                                    </>
                                ) : (
                                    <>
                                        <strong>Federado para el {currentYear}:</strong>{' '}
                                        {federateStatus.state === FederateState.FEDERATE && <StyledFaCheckCircle></StyledFaCheckCircle>}
                                        {federateStatus.state === FederateState.NO_FEDERATE && (
                                            <>
                                                <StyledNoFederateCross></StyledNoFederateCross> <span> Expande para solicitar federarte.</span>
                                            </>
                                        )}
                                        {federateStatus.state === FederateState.IN_PROGRESS && (
                                            <>
                                                <StyledFaCheckCircle></StyledFaCheckCircle>
                                                <span> En proceso...</span>
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </Accordion.Header>

                    <Accordion.Body>
                        {error ? (
                            <>
                                <Alert variant="danger">
                                    Inténtelo más tarde o ponte en contacto con nuestro equipo a través del formulario o email presentes en la sección de 'El
                                    club' de esta web.
                                </Alert>
                            </>
                        ) : loading ? (
                            <>
                                Cargando...
                                <Spinner animation="border" variant="primary" />
                            </>
                        ) : (
                            <>
                                {federateStatus.state === FederateState.NO_FEDERATE && <NoFederateInfoContainer setShowFederateModal={setShowFederateModal} />}
                                {federateStatus.state === FederateState.IN_PROGRESS && <InProgressInfoContainer />}
                                {federateStatus.state === FederateState.FEDERATE && (
                                    <FederateInfoContainer
                                        dniLastUpdate={federateStatus.dniLastUpdate.toString()}
                                        setUploadDniform={setUploadDniform}
                                        autoRenew={federateStatus.autoRenew}
                                    />
                                )}
                            </>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Modal show={uploadDniform} onHide={() => setUploadDniform(false)} centered>
                <Modal.Header>Actualizar DNI</Modal.Header>
                <Modal.Body>
                    <UpdateDniForm setFederateState={setFederateState} closeModal={() => setUploadDniform(false)}></UpdateDniForm>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>

            <Modal show={showFederateModal} onHide={() => setShowFederateModal(false)} centered>
                <StyledModalHeader>Solicitud para federarse</StyledModalHeader>
                <Modal.Body>
                    <FederateRequestForm setFederateState={setFederateState} closeModal={() => setShowFederateModal(false)}></FederateRequestForm>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </>
    )
}

export default ChessProfileFederate

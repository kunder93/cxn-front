import { Modal } from 'react-bootstrap'
import RecoverPasswordForm from './RecoverPasswordForm'
import { useState } from 'react'
import SetNewPasswordForm from './SetNewPasswordForm'

interface RecoverPasswordModalProps {
    show: boolean
    handleClose: () => void
}

enum ModalStepWindow {
    GET_TOKEN,
    SET_NEW_PASSWORD
}

/**
 * RecoverPasswordModal component displaying a modal for password recovery.
 *
 * @param {boolean} show - Whether the modal is visible.
 * @param {Function} handleClose - Function to close the modal.
 * @returns {React.JSX.Element} The rendered RecoverPasswordModal component.
 */
const RecoverPasswordModal = ({ show, handleClose }: RecoverPasswordModalProps): React.JSX.Element => {
    const [step, setStep] = useState(ModalStepWindow.GET_TOKEN)

    const goToSetNewPassword = () => {
        setStep(ModalStepWindow.SET_NEW_PASSWORD)
    }

    const goToGetToken = () => {
        setStep(ModalStepWindow.GET_TOKEN)
    }

    const handleModalClose = () => {
        setStep(ModalStepWindow.GET_TOKEN)
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleModalClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{step === ModalStepWindow.GET_TOKEN ? 'Solicitar código' : 'Restablecer contraseña'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {step === ModalStepWindow.GET_TOKEN && <RecoverPasswordForm onClose={handleModalClose} goToSetNewPassword={goToSetNewPassword} />}
                {step === ModalStepWindow.SET_NEW_PASSWORD && <SetNewPasswordForm onClose={handleModalClose} goToGetToken={goToGetToken} />}
            </Modal.Body>
        </Modal>
    )
}

export default RecoverPasswordModal

import { useRef } from 'react'
import { Button, Modal, ModalProps } from 'react-bootstrap'

import styled from 'styled-components'
import { FormikProps } from 'formik'
import PasswordChangeForm, { ChangePasswordFormValues } from './PasswordChangeForm'

interface ChangePasswordModalProps extends ModalProps {
    useremail: string
    name: string
    firstsurname: string
    secondsurname: string
}
// Styled components
const ModalBody = styled(Modal.Body)`
    padding-top: 0px !important;

    @media (max-width: 768px) {
        padding: 1em; // Ajuste de padding en pantallas móviles
    }
`

const ModalFooter = styled(Modal.Footer)`
    justify-content: space-between !important; /* Distribuye los elementos a lo largo del contenedor */

    @media (max-width: 768px) {
        flex-direction: column;
        button {
            width: 100%;
            margin-bottom: 0.5em;
            font-size: 1.4em;
        }
    }
`

const StyledModalHeader = styled(Modal.Header)`
    @media (max-width: 768px) {
        h2 {
            font-size: 1.5rem; // Ajustar el tamaño de la fuente para pantallas pequeñas
        }
    }
`

const ChangePasswordModal = (props: ChangePasswordModalProps): JSX.Element => {
    const formRef = useRef<FormikProps<ChangePasswordFormValues>>(null)

    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.handleSubmit()
        }
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <StyledModalHeader closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h2>Cambiar contraseña de: {`${props.name} ${props.firstsurname} ${props.secondsurname}`}</h2>
                </Modal.Title>
            </StyledModalHeader>
            <ModalBody>
                <PasswordChangeForm formikRef={formRef} userEmail={props.useremail}></PasswordChangeForm>
            </ModalBody>
            <ModalFooter>
                <Button variant="success" onClick={handleSubmit}>
                    Cambiar
                </Button>
                <Button variant="danger" onClick={props.onHide}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ChangePasswordModal

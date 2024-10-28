import { useRef } from 'react'
import { Button, Modal, ModalProps } from 'react-bootstrap'
import styled from 'styled-components'
import { FormikProps } from 'formik'
import UnsubscribeMemberForm, { UnsubscribeMemberFormValues } from './UnsubscribeMemberForm'

interface UnsubscribeMemberModalProps extends ModalProps {
    useremail: string
    name: string
    firstsurname: string
    secondsurname: string
}

const ModalBody = styled(Modal.Body)`
    padding-top: 0px !important;

    @media (max-width: 768px) {
        padding: 0.5em; /* Ajuste para pantallas pequeñas */
    }
`

const ModalFooter = styled(Modal.Footer)`
    justify-content: space-between !important;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 0.5em;
        button {
            width: 100%;
        }
    }
`

const ModalTitle = styled.h2`
    font-size: 1.5rem;

    @media (max-width: 768px) {
        font-size: 1.2rem;
        text-align: center; /* Centrar el título en pantallas pequeñas */
    }
`

const UnsubscribeMemberModal = (props: UnsubscribeMemberModalProps): JSX.Element => {
    const formRef = useRef<FormikProps<UnsubscribeMemberFormValues>>(null)

    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.handleSubmit()
        }
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <ModalTitle>Darse de baja como socio: {props.name + ' ' + props.firstsurname + ' ' + props.secondsurname}</ModalTitle>
                </Modal.Title>
            </Modal.Header>
            <ModalBody>
                <UnsubscribeMemberForm formikRef={formRef} userEmail={props.useremail}></UnsubscribeMemberForm>
            </ModalBody>
            <ModalFooter>
                <Button variant="success" onClick={handleSubmit}>
                    Confirmar
                </Button>
                <Button variant="danger" onClick={props.onHide}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default UnsubscribeMemberModal

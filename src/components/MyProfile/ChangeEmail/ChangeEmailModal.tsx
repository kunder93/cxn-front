import React, { useState } from 'react'
import { Button, Modal, ModalProps, Spinner } from 'react-bootstrap'
import styled from 'styled-components'
import ChangeEmailForm from './ChangeEmailForm'

interface ChangeEmailModalProps extends ModalProps {
    useremail: string
    name: string
    firstsurname: string
    secondsurname: string
}

const ModalBody = styled(Modal.Body)`
    padding-top: 0px !important;
    @media (max-width: 768px) {
        padding: 1rem !important;
    }
`

const ModalFooterStyled = styled(Modal.Footer)`
    display: flex;
    justify-content: space-between;
    background-color: #f1f1f1;
    border-top: 1px solid #dee2e6;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px; // Add space between buttons on mobile
        button {
            width: 100%; // Make buttons full-width on mobile
        }
    }
`

const ModalHeaderStyled = styled(Modal.Header)`
    font-size: 150%;
    font-weight: bold;
    background-color: #007bff; // Bootstrap primary color
    color: white; // Text color
    border-bottom: 1px solid #0056b3; // Darker border for emphasis
`

const ModalTitle = styled.h2`
    font-size: 1.5rem;
    @media (max-width: 768px) {
        font-size: 1.25rem;
    }
`

const ChangeEmailModal: React.FC<ChangeEmailModalProps> = (props) => {
    const [buttonIsAvaliable, setButtonIsAvaliable] = useState(false)
    const [submitForm, setSubmitForm] = useState<(() => void) | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
            <ModalHeaderStyled closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <ModalTitle>Cambiar email de: {`${props.name} ${props.firstsurname} ${props.secondsurname}`}</ModalTitle>
                </Modal.Title>
            </ModalHeaderStyled>
            <ModalBody>
                <ChangeEmailForm
                    initialEmail={props.useremail}
                    setButtonAvaliability={setButtonIsAvaliable}
                    setSubmitForm={setSubmitForm} // Permite ejecutar el submit desde el modal
                    setIsSubmitting={setIsSubmitting} // Permite conocer el estado de envío
                />
            </ModalBody>
            <ModalFooterStyled>
                <Button
                    variant="success"
                    type="button"
                    disabled={!buttonIsAvaliable || isSubmitting}
                    onClick={() => {
                        if (submitForm) {
                            submitForm()
                        }
                    }}
                >
                    {isSubmitting ? (
                        <>
                            <Spinner animation="border" size="sm" aria-hidden="true" /> <output>Cambiando...</output>
                        </>
                    ) : (
                        'Cambiar'
                    )}
                </Button>
                <Button variant="danger" onClick={props.onHide}>
                    Cerrar
                </Button>
            </ModalFooterStyled>
        </Modal>
    )
}

export default ChangeEmailModal

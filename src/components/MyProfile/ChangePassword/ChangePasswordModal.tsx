// ChangePasswordModal.tsx
import { useState, useRef } from 'react'
import { Button, Modal, ModalProps, Spinner } from 'react-bootstrap'
import styled from 'styled-components'
import { FormikProps } from 'formik'
import PasswordChangeForm, { ChangePasswordFormValues } from './PasswordChangeForm'

interface ChangePasswordModalProps extends ModalProps {
    useremail: string
    name: string
    firstsurname: string
    secondsurname: string
}

const ModalBody = styled(Modal.Body)`
    padding-top: 0px !important;
    @media (max-width: 768px) {
        padding: 1em;
    }
`

const ModalFooterStyled = styled(Modal.Footer)`
    display: flex;
    justify-content: space-between;
    background-color: #f1f1f1;
    border-top: 1px solid #dee2e6;
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
        button {
            width: 100%;
        }
    }
`

const ModalHeaderStyled = styled(Modal.Header)`
    font-size: 150%;
    font-weight: bold;
    background-color: #007bff;
    color: white;
    border-bottom: 1px solid #0056b3;
`

const ChangePasswordModal = (props: ChangePasswordModalProps): JSX.Element => {
    const formRef = useRef<FormikProps<ChangePasswordFormValues>>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formIsValid, setFormIsValid] = useState(false)

    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.handleSubmit()
        }
    }

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
            <ModalHeaderStyled closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h2>Cambiar contraseña de: {`${props.name} ${props.firstsurname} ${props.secondsurname}`}</h2>
                </Modal.Title>
            </ModalHeaderStyled>
            <ModalBody>
                <PasswordChangeForm formikRef={formRef} userEmail={props.useremail} setIsSubmitting={setIsSubmitting} setFormIsValid={setFormIsValid} />
            </ModalBody>
            <ModalFooterStyled>
                <Button variant="success" onClick={handleSubmit} disabled={isSubmitting || !formIsValid}>
                    {isSubmitting ? (
                        <>
                            <Spinner as="span" animation="border" size="sm" aria-hidden="true" />
                            <output> Cambiando...</output>
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

export default ChangePasswordModal

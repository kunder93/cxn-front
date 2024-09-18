import React, { useState, useRef } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap'
import CreatePaymentSheetForm, { CreatePaymentSheetFormValues } from './CreatePaymentSheetForm'
import { IPaymentSheet } from 'components/Types/Types'
import { FormikProps } from 'formik'

interface CreatePaymentSheetModalProps {
    show: boolean
    onHide: () => void
    addRow: (newRow: IPaymentSheet) => void
}

const CreatePaymentSheetModal: React.FC<CreatePaymentSheetModalProps> = (props) => {
    const [isValid, setIsValid] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const formikRef = useRef<FormikProps<CreatePaymentSheetFormValues>>(null)

    const handleSubmitClick = () => {
        if (formikRef.current) {
            formikRef.current.handleSubmit()
            setIsValid(formikRef.current.isValid)
        }
    }

    return (
        <Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Crear hoja de liquidación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CreatePaymentSheetForm onValidationChange={setIsValid} addRow={props.addRow} isSubmitting={setIsSubmitting} formikRef={formikRef} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleSubmitClick} disabled={!isValid || isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Creando...
                        </>
                    ) : (
                        'Crear'
                    )}
                </Button>
                <Button variant="danger" onClick={props.onHide}>
                    <strong>Cerrar</strong>
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreatePaymentSheetModal

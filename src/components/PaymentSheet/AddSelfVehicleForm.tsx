import axios, { AxiosError } from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import BootstrapForm from 'react-bootstrap/Form'
import styled from 'styled-components'
import { PAYMENT_SHEET_URL } from '../../resources/server_urls'
import { ISelfVehicle } from '../Types/Types'
import * as Yup from 'yup'
import { NotificationType } from '../../components/Common/hooks/useNotification'
import { useNotificationContext } from '../../components/Common/NotificationContext'

const StyledErrorMessage = styled(ErrorMessage)`
    color: red;
    font-weight: bold;
`

const FieldRow = styled(Row)`
    padding-bottom: 1em;
    align-items: center;
    label {
        font-weight: bold;
    }
`

const SubmitButtonRow = styled(Row)`
    align-content: end;
`

interface AddSelfVehicleFormProps {
    paymentSheetId: number
    addPaymentSheetSelfVehicle: (paymentSheetId: number, selfVehicleData: ISelfVehicle) => void
}

const validationSchema = Yup.object({
    places: Yup.string().required('Es necesario poner lugares !').max(150, 'Intenta ser breve, no más de 150 caracteres.'),
    distance: Yup.number()
        .required('Es necesario poner una distancia.')
        .positive('La distancia debe ser un número positivo.')
        .min(3, 'No se aceptan distancias menores a 3km.'),
    kmPrice: Yup.number()
        .required('Es necesario poner un precio por kilómetro.')
        .positive('El precio debe ser un valor mayor a 0.')
        .max(0.3, 'No se acepta más de 30 céntimos (0.30) por Kilómetro.')
})

export const AddSelfVehicleForm: React.FC<AddSelfVehicleFormProps> = ({ paymentSheetId, addPaymentSheetSelfVehicle }) => {
    const initialValues: ISelfVehicle = { places: '', distance: 0.0, kmPrice: 0.19 }

    const { showNotification } = useNotificationContext()

    return (
        <Formik
            validationSchema={validationSchema}
            validateOnMount
            validateOnChange
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                const selfVehicleData: ISelfVehicle = { places: values.places, distance: values.distance, kmPrice: values.kmPrice }
                axios
                    .post(PAYMENT_SHEET_URL + '/' + paymentSheetId + '/addSelfVehicle', selfVehicleData)
                    .then(() => {
                        showNotification('Ruta con vehículo propio añadida.', NotificationType.Success)
                        addPaymentSheetSelfVehicle(paymentSheetId, selfVehicleData)
                    })
                    .catch((error) => {
                        const axiosError = error as AxiosError
                        if (axiosError?.response?.data) {
                            showNotification(axiosError.message, NotificationType.Error)
                        } else if (axiosError.request) {
                            showNotification('Error: no hay respuesta.', NotificationType.Error)
                        } else {
                            showNotification('Error: algo inesperado. Recarga o intentalo mas tarde.', NotificationType.Error)
                        }
                    })
                    .finally(() => {
                        actions.setSubmitting(false)
                    })
            }}
        >
            {({ isValid, isSubmitting, dirty }) => (
                <BootstrapForm as={Form}>
                    <Container as={BootstrapForm.Group}>
                        <FieldRow>
                            <Col md={3}>
                                <BootstrapForm.Label htmlFor="places">Lugares:</BootstrapForm.Label>
                            </Col>
                            <Col md={9}>
                                <BootstrapForm.Control
                                    as={Field}
                                    id="places"
                                    name="places"
                                    type="text"
                                    placeholder="Pon aqui todos los lugares que has visitado."
                                    component={'textarea'}
                                    rows={'3'}
                                />
                            </Col>
                        </FieldRow>
                        <Row>
                            <Col md={3}></Col>
                            <Col md={9}>
                                <StyledErrorMessage name="places" component={'p'}></StyledErrorMessage>
                            </Col>
                        </Row>
                        <FieldRow>
                            <Col md={3}>
                                <BootstrapForm.Label htmlFor="distance">Distancia (kilometros):</BootstrapForm.Label>
                            </Col>
                            <Col md={9}>
                                <Field
                                    as={BootstrapForm.Control}
                                    id="distance"
                                    type="number"
                                    step="0.01"
                                    name="distance"
                                    placeholder="La distancia recorrida en Km"
                                    min="0"
                                />
                            </Col>
                        </FieldRow>
                        <Row>
                            <Col md={3}></Col>
                            <Col md={9}>
                                <StyledErrorMessage name={'distance'} component={'p'}></StyledErrorMessage>
                            </Col>
                        </Row>
                        <FieldRow>
                            <Col md={3}>
                                <BootstrapForm.Label htmlFor="kmPrice">Precio por KM (Euros):</BootstrapForm.Label>
                            </Col>
                            <Col md={9}>
                                <Field
                                    as={BootstrapForm.Control}
                                    id="kmPrice"
                                    type="number"
                                    name="kmPrice"
                                    step="0.01"
                                    placeholder="Precio por kilometro en euros."
                                    min="0"
                                />
                            </Col>
                        </FieldRow>
                        <Row>
                            <Col md={3}></Col>
                            <Col md={9}>
                                <StyledErrorMessage name={'kmPrice'} component={'p'}></StyledErrorMessage>
                            </Col>
                        </Row>
                        <SubmitButtonRow>
                            <Button variant="success" disabled={isSubmitting || !isValid || !dirty} type="submit">
                                {isSubmitting ? (
                                    <>
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Añadiendo...
                                    </>
                                ) : (
                                    'Añadir vehiculo propio'
                                )}
                            </Button>
                        </SubmitButtonRow>
                    </Container>
                </BootstrapForm>
            )}
        </Formik>
    )
}

export default AddSelfVehicleForm

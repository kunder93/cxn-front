import React from 'react'
import { Formik, Field, Form, FormikHelpers, ErrorMessage, FormikProps } from 'formik'
import Select, { SingleValue } from 'react-select'
import { PAYMENT_SHEET_URL } from '../../resources/server_urls'
import { useAxiosGetAllUsersData } from '../../utility/CustomAxios'
import axios, { AxiosError } from 'axios'
import BootstrapForm from 'react-bootstrap/Form'
import { Container, Row, Col } from 'react-bootstrap'
import { CreatePaymentSheetFormValidationSchema } from './CreatePaymentSheetFormValidationSchema'
import FloatingNotificationA from '../../components/Common/FloatingNotificationA'
import useNotification, { NotificationType } from '../../components/Common/hooks/useNotification'
import { IPaymentSheet } from 'components/Types/Types'
import { useAppSelector } from '../../store/hooks' // Asumiendo que tienes este hook para obtener el JWT

export interface CreatePaymentSheetFormValues {
    userEmail: string
    reason: string
    place: string
    startDate: string
    endDate: string
}

interface MyValues {
    label: string
    value: string
}

interface CreatePaymentSheetFormProps {
    onValidationChange: (isValid: boolean) => void
    addRow: (newRow: IPaymentSheet) => void
    isSubmitting: React.Dispatch<React.SetStateAction<boolean>>
    formikRef: React.RefObject<FormikProps<CreatePaymentSheetFormValues>>
}

const CreatePaymentSheetForm: React.FC<CreatePaymentSheetFormProps> = ({ onValidationChange, addRow, isSubmitting, formikRef }) => {
    const { data, error, loaded } = useAxiosGetAllUsersData()
    const { notification, showNotification, hideNotification } = useNotification()

    const userJwt = useAppSelector<string | null>((state) => state.users.jwt) // Obtener el JWT del estado

    const userOptions: MyValues[] = data
        ? data.usersList.map((user) => ({
              label: `${user.name} ${user.firstSurname} ${user.secondSurname}`,
              value: user.email
          }))
        : []

    const isSelectDisabled = !loaded || !!error || !data

    const selectOptions: MyValues[] = isSelectDisabled ? [{ label: 'Seleccione una opción', value: '' }] : userOptions

    return (
        <Formik
            innerRef={formikRef}
            initialValues={{
                userEmail: '',
                reason: '',
                place: '',
                startDate: '',
                endDate: ''
            }}
            validationSchema={CreatePaymentSheetFormValidationSchema}
            onSubmit={(values: CreatePaymentSheetFormValues, { setSubmitting, resetForm }: FormikHelpers<CreatePaymentSheetFormValues>) => {
                isSubmitting(true)

                // Verificar si el token JWT está disponible
                if (!userJwt) {
                    showNotification('Error: No autenticado.', NotificationType.Error)
                    isSubmitting(false)
                    return
                }

                axios
                    .post<IPaymentSheet>(PAYMENT_SHEET_URL, values, {
                        headers: {
                            Authorization: `Bearer ${userJwt}`, // Incluir el JWT en la cabecera de autorización
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        showNotification('Se ha añadido la hoja de liquidación correctamente.', NotificationType.Success)
                        addRow(response.data)
                        resetForm()
                        onValidationChange(false) // Forzar la validación después del reset
                    })
                    .catch((error) => {
                        const axiosError = error as AxiosError
                        showNotification(axiosError.message, NotificationType.Error)
                    })
                    .finally(() => {
                        isSubmitting(false)
                        setSubmitting(false)
                    })
            }}
            validateOnChange
            validateOnMount
            validateOnBlur
            validate={(values) => {
                const isValid = CreatePaymentSheetFormValidationSchema.isValidSync(values)
                onValidationChange(isValid)
            }}
        >
            {({ handleSubmit, setFieldValue, values }) => (
                <BootstrapForm as={Form} onSubmit={handleSubmit}>
                    <Container as={BootstrapForm.Group} fluid>
                        <Row className="mb-3">
                            <Col md="3">
                                <BootstrapForm.Label htmlFor="userEmail">Seleccione quien recibe el pago:</BootstrapForm.Label>
                            </Col>
                            <Col md="9">
                                <Field name="userEmail">
                                    {() => (
                                        <Select
                                            options={selectOptions}
                                            isDisabled={isSelectDisabled}
                                            isMulti={false}
                                            onChange={(option: SingleValue<MyValues>) => {
                                                void setFieldValue('userEmail', option ? option.value : '')
                                            }}
                                            value={selectOptions.find((option) => option.value === values.userEmail)}
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="userEmail" component="div" className="text-danger" />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md="3">
                                <BootstrapForm.Label htmlFor="reason">Motivo del abono:</BootstrapForm.Label>
                            </Col>
                            <Col md="9">
                                <Field
                                    as={BootstrapForm.Control}
                                    id="reason"
                                    name="reason"
                                    type="text"
                                    placeholder="Participación campeonatos gallegos absolutos."
                                />
                                <ErrorMessage name="reason" component="div" className="text-danger" />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md="3">
                                <BootstrapForm.Label htmlFor="place">Lugar y país:</BootstrapForm.Label>
                            </Col>
                            <Col md="9">
                                <Field as={BootstrapForm.Control} id="place" name="place" type="text" placeholder="Padrón, España" />
                                <ErrorMessage name="place" component="div" className="text-danger" />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md="3">
                                <BootstrapForm.Label htmlFor="startDate">Fecha comienzo actividad:</BootstrapForm.Label>
                            </Col>
                            <Col md="9">
                                <Field as={BootstrapForm.Control} id="startDate" name="startDate" type="date" />
                                <ErrorMessage name="startDate" component="div" className="text-danger" />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md="3">
                                <BootstrapForm.Label htmlFor="endDate">Fecha fin de la actividad:</BootstrapForm.Label>
                            </Col>
                            <Col md="9">
                                <Field as={BootstrapForm.Control} id="endDate" name="endDate" type="date" />
                                <ErrorMessage name="endDate" component="div" className="text-danger" />
                            </Col>
                        </Row>
                    </Container>
                    <FloatingNotificationA notification={notification} hideNotification={hideNotification} />
                </BootstrapForm>
            )}
        </Formik>
    )
}

export default CreatePaymentSheetForm

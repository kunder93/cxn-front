import React, { useEffect, useState } from 'react'
import { useFormik, FormikHelpers } from 'formik' // Import FormikHelpers for type inference
import axios, { AxiosError } from 'axios'
import * as Yup from 'yup'
import { Form, Button, Spinner, Alert, Col, Row } from 'react-bootstrap'
import { UserData } from 'store/types/userTypes'
import { IPaymentDetails, IUsersListData, PaymentsCategory, ReceivedCreatedPayment } from 'components/Types/Types'
import { useAppSelector } from 'store/hooks'
import { GET_ALL_USERS_URL, MAKE_PYAMENT_URL } from 'resources/server_urls'
import { translatePaymentCategory } from 'utility/paymentsUtilities'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { NotificationType } from 'components/Common/hooks/useNotification'
import styled from 'styled-components'

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`

const StyledSubmitButton = styled(Button)`
    display: flex;
    align-items: center;
`

const SpinnerTextWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`

const validationSchema = Yup.object({
    userDni: Yup.string().required('Seleccione un usuario'),
    title: Yup.string().required('El título es obligatorio').max(50, 'El título no puede superar los 50 caracteres'),
    description: Yup.string()
        .required('La descripción es obligatoria')
        .min(10, 'La descripción debe tener al menos 10 caracteres')
        .max(120, 'La descripción no puede superar los 120 caracteres'),
    category: Yup.mixed<PaymentsCategory>().required('Seleccione una categoría'),
    amount: Yup.number()
        .typeError('El monto debe ser un número válido')
        .positive('El monto debe ser mayor a 0')
        .max(100, 'El monto no puede superar los 100.00 €')
        .required('El monto es obligatorio')
})

export interface IFormValues {
    userDni: string
    title: string
    description: string
    category: PaymentsCategory | string
    amount: number
}

interface AddUserPaymentFormProps {
    closemodal: () => void
    addPaymentTableFunc: (userDni: string, payment: IPaymentDetails) => void
}

const AddUserPaymentForm: React.FC<AddUserPaymentFormProps> = ({ closemodal, addPaymentTableFunc }) => {
    const [users, setUsers] = useState<UserData[]>([])
    const [loading, setLoading] = useState(false)
    const [loadedUsers, setLoadedUsers] = useState(false)
    const [loadUsersError, setLoadUsersError] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const { showNotification } = useNotificationContext()

    useEffect(() => {
        const fetchUsers = async () => {
            setLoadedUsers(false)
            try {
                const response = await axios.get<IUsersListData>(GET_ALL_USERS_URL, {
                    headers: {
                        Authorization: `Bearer ${userJwt}`
                    }
                })
                setUsers(response.data.usersList)
                setLoadedUsers(true)
            } catch (err) {
                setError('Error al cargar los usuarios.')
                setLoadUsersError(true)
            }
        }

        void fetchUsers()
    }, [userJwt])

    const initialValues: IFormValues = {
        userDni: '',
        title: '',
        description: '',
        category: '',
        amount: 0.0
    }

    const makePayment = async (values: IFormValues, resetForm: () => void) => {
        setLoading(true)
        setError(null)

        try {
            // Sending the payment request
            const response = await axios.post<ReceivedCreatedPayment>(MAKE_PYAMENT_URL, values, {
                headers: {
                    Authorization: `Bearer ${userJwt}`
                }
            })

            // Successfully created payment, now update the table
            const createdPayment: ReceivedCreatedPayment = response.data
            addPaymentTableFunc(values.userDni, createdPayment)

            // Show success notification
            showNotification('Pago añadido correctamente', NotificationType.Success)
            resetForm()
        } catch (err) {
            const axErr = err as AxiosError
            showNotification(axErr.message, NotificationType.Error)
        } finally {
            setLoading(false)
        }
    }

    // Add type annotation for formik
    const formik = useFormik<IFormValues>({
        initialValues,
        validationSchema,
        onSubmit: (values, formikHelpers: FormikHelpers<IFormValues>) => {
            void makePayment(values, formikHelpers.resetForm) // Using formikHelpers.resetForm for reset
        }
    })

    return (
        <div className="container mt-4">
            {error && <Alert variant="danger">{error}</Alert>}
            {!error && (
                <Form onSubmit={formik.handleSubmit}>
                    <Row>
                        <Form.Group as={Col} md="6" className="mb-3" controlId="userDni">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Select
                                name="userDni"
                                value={formik.values.userDni}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.userDni && !!formik.errors.userDni}
                                disabled={!loadedUsers || loadUsersError} // Deshabilitar si no están cargados o hay error
                            >
                                {/* Mostrar mensaje dinámico basado en el estado */}
                                {!loadedUsers ? (
                                    <option value="" disabled>
                                        Cargando usuarios...
                                    </option>
                                ) : loadUsersError ? (
                                    <option value="" disabled>
                                        Error al cargar usuarios
                                    </option>
                                ) : (
                                    <option value="">Seleccionar usuario</option>
                                )}
                                {/* Listar los usuarios si están cargados */}
                                {loadedUsers &&
                                    users.map((user) => (
                                        <option key={user.dni} value={user.dni}>
                                            {`${user.name} ${user.firstSurname} ${user.secondSurname}`}
                                        </option>
                                    ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{formik.errors.userDni}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" className="mb-3" controlId="title">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.title && !!formik.errors.title}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.title}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col} md="12" className="mb-3" controlId="description">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                rows={3}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.description && !!formik.errors.description}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.description}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col} md="6" className="mb-3" controlId="category">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Select
                                name="category"
                                value={formik.values.category}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.category && !!formik.errors.category}
                            >
                                <option value="">Seleccionar categoría</option>
                                {Object.values(PaymentsCategory).map((category) => (
                                    <option key={category} value={category}>
                                        {translatePaymentCategory(category)}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{formik.errors.category}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" className="mb-3" controlId="amount">
                            <Form.Label>Monto (€)</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                name="amount"
                                value={formik.values.amount}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.amount && !!formik.errors.amount}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.amount}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <ButtonsWrapper>
                        <StyledSubmitButton type="submit" variant="primary" disabled={loading || !formik.isValid || !formik.dirty}>
                            {loading ? (
                                <SpinnerTextWrapper>
                                    <Spinner animation="border" role="status" />
                                    Añadiendo...
                                </SpinnerTextWrapper>
                            ) : (
                                'Añadir Pago'
                            )}
                        </StyledSubmitButton>
                        <Button variant="danger" onClick={closemodal}>
                            Salir
                        </Button>
                    </ButtonsWrapper>
                </Form>
            )}
        </div>
    )
}

export default AddUserPaymentForm

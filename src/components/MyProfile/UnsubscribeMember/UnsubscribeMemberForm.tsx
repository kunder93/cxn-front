import { Formik, Form, Field, ErrorMessage } from 'formik'
import styled from 'styled-components'
import { Container, Row, Col, Form as BootstrapForm, FormGroup, FormLabel, FormControl, Button, Spinner } from 'react-bootstrap'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { UNSUBSCRIBE_URL } from 'resources/server_urls'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { NotificationType } from 'components/Common/hooks/useNotification'
import { useNavigate } from 'react-router'
import { removeJwt } from 'store/slices/user'
import { ROUTES } from 'resources/routes-constants'

// Estilos para el pie del form
const FormFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between !important;
    padding-top: 2em;
    button {
        transition:
            background-color 0.3s ease,
            transform 0.2s ease;
        font-size: 1rem;
        font-weight: 500;
    }

    button:hover {
        transform: translateY(-2px); /* Animación sutil */
    }

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 1em;

        button {
            width: 100%; /* Botones de ancho completo en móvil */
            font-size: 1.4em;
        }
    }
`

// Botón de confirmación estilizado
const ConfirmButton = styled(Button)`
    background-color: #28a745; /* Verde para confirmación */
    border: none;

    &:hover {
        background-color: #218838;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.5); /* Indicador de enfoque accesible */
    }
`

// Botón de cierre estilizado
const CloseButton = styled(Button)`
    background-color: #dc3545; /* Rojo para acciones de cancelación */
    border: none;

    &:hover {
        background-color: #c82333;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.5); /* Indicador de enfoque accesible */
    }
`

const StyledErrorMessage = styled(ErrorMessage)`
    color: red;
    font-weight: bold;
`

const StyledFormContainer = styled(Container)`
    padding-top: 1em;

    @media (max-width: 768px) {
        padding: 0.5em; /* Reduce padding en pantallas pequeñas */
    }
`

const StyledFormControl = styled(FormControl)`
    width: 100%;
`

export interface UnsubscribeMemberFormValues {
    currentPassword: string
    confirmCurrentPassword: string
}

export interface UnsubscribeMemberFormProps {
    userEmail: string
    closeModal: () => void
}

const UnsubscribeMemberForm = ({ userEmail, closeModal }: UnsubscribeMemberFormProps): React.JSX.Element => {
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const { showNotification } = useNotificationContext()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        dispatch(removeJwt())
        await navigate(ROUTES.HOMEPAGE_ROUTE)
    }

    const handleSubmit = (
        values: UnsubscribeMemberFormValues,
        resetForm: () => void, // Accept resetForm as a parameter
        setSubmitting: (isSubmitting: boolean) => void // To manage the form's submission state
    ) => {
        axios
            .patch(
                UNSUBSCRIBE_URL,
                { password: values.currentPassword },
                {
                    headers: {
                        Authorization: `Bearer ${userJwt ?? ''}` // Include the JWT in the Authorization header
                    }
                }
            )
            .then(async () => {
                // Handle successful response (optional)
                showNotification('Se ha dado de baja correctamente. ', NotificationType.Success)
                resetForm()
                await logoutHandler()
            })
            .catch((err: unknown) => {
                if (axios.isAxiosError(err)) {
                    showNotification('Error: ' + err.message, NotificationType.Error)
                } else {
                    showNotification('Error inesperado.', NotificationType.Error)
                }
            })
            .finally(() => {
                setSubmitting(false) // Ensure the submission state is reset
            })
    }

    return (
        <StyledFormContainer>
            <Formik
                initialValues={{ currentPassword: '', confirmCurrentPassword: '' }}
                validate={(values) => {
                    const errors: Partial<UnsubscribeMemberFormValues> = {}
                    if (!values.currentPassword) {
                        errors.currentPassword = 'Debes ingresar tu contraseña.'
                    } else if (values.currentPassword !== values.confirmCurrentPassword) {
                        errors.confirmCurrentPassword = 'Las contraseñas no coinciden.'
                    }
                    return errors
                }}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    handleSubmit(values, resetForm, setSubmitting) // Pass values to handleSubmit
                }}
            >
                {({ isValid, dirty, isSubmitting }) => (
                    <BootstrapForm as={Form}>
                        <Field type="hidden" name="email" value={userEmail} readOnly autoComplete="username" />
                        <Row>
                            <Col>
                                <FormGroup>
                                    <FormLabel htmlFor="currentPassword">
                                        <strong>Contraseña actual:</strong>
                                    </FormLabel>
                                    <Field
                                        as={StyledFormControl}
                                        type="password"
                                        name="currentPassword"
                                        id="currentPassword" // Add an id here
                                        autoComplete="current-password"
                                    />
                                    <StyledErrorMessage name="currentPassword" component="div" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <FormLabel htmlFor="confirmCurrentPassword">
                                        <strong>Repite la contraseña actual:</strong>
                                    </FormLabel>
                                    <Field
                                        as={StyledFormControl}
                                        type="password"
                                        name="confirmCurrentPassword"
                                        id="confirmCurrentPassword" // Add an id here
                                        autoComplete="current-password"
                                    />
                                    <StyledErrorMessage name="confirmCurrentPassword" component="div" />
                                </FormGroup>
                            </Col>
                        </Row>

                        <FormFooter>
                            <ConfirmButton variant="success" type="submit" disabled={!isValid || !dirty || isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Spinner animation="border" size="sm" /> Confirmando...
                                    </>
                                ) : (
                                    'Confirmar'
                                )}
                            </ConfirmButton>
                            <CloseButton
                                variant="danger"
                                onClick={() => {
                                    closeModal()
                                }}
                            >
                                Cerrar
                            </CloseButton>
                        </FormFooter>
                    </BootstrapForm>
                )}
            </Formik>
        </StyledFormContainer>
    )
}

export default UnsubscribeMemberForm

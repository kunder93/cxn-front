import { Team } from './types'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useNotificationContext } from 'components/Common/NotificationContext'
import { NotificationType } from 'components/Common/hooks/useNotification'
import { Form as BootstrapForm, Button, Row, Spinner } from 'react-bootstrap'
import * as Yup from 'yup'
import { ButtonsWrapper } from 'components/UserProfiles/ChessProfileFederate/Forms/Common/styles'
import styled from 'styled-components'

/**
 * Wrapper to style the spinner output layout when the form is submitting.
 */
const SpinnerTextWrapper = styled.div`
    output {
        display: flex;
        align-items: center;
        gap: 8px;
    }
`

/**
 * Styled submit button with full width and minimum size constraints.
 */
const StyledSubmitButton = styled(Button)`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50px;
    min-width: 150px;
`

/**
 * Props for the {@link CreateTeamForm} component.
 */
interface CreateTeamFormProps {
    /**
     * Function to call when the form is submitted.
     * It receives the team name, category, and description.
     *
     * @param name - The name of the team.
     * @param category - The category of the team.
     * @param description - The description of the team.
     */
    addTeam: (name: string, category: string, description: string) => Promise<void>
}

/**
 * A form component to create a new league team.
 *
 * This component uses Formik for form state management and validation,
 * and Yup for schema validation. On successful submission, it calls the `addTeam` function
 * and displays a success or error notification depending on the result.
 *
 * @param props - The {@link CreateTeamFormProps} with an `addTeam` callback.
 *
 * @returns A form with fields for name, description, and category, along with a submit button.
 *
 * @example
 * ```tsx
 * <CreateTeamForm addTeam={(name, category, desc) => api.createTeam(name, category, desc)} />
 * ```
 */
const CreateTeamForm: React.FC<CreateTeamFormProps> = ({ addTeam }) => {
    const initialValues: Team = { name: '', description: '', category: '' }
    const { showNotification } = useNotificationContext()

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Se requiere un nombre.').max(100, 'Máximo 100 caracteres'),
        category: Yup.string().required('Se requiere una categoría.').max(50, 'Máximo 50 caracteres'),
        description: Yup.string().required('Se requiere una descripción.').max(255, 'Máximo 255 caracteres')
    })

    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={async (values, actions) => {
                try {
                    await addTeam(values.name, values.category, values.description)
                    showNotification('Equipo creado exitosamente.', NotificationType.Success)
                    actions.resetForm()
                } catch {
                    showNotification('Error al crear el equipo.', NotificationType.Error)
                } finally {
                    actions.setSubmitting(false)
                }
            }}
        >
            {({ isSubmitting, isValid, dirty }) => (
                <Form>
                    <Row className="g-3">
                        <BootstrapForm.Group className="mb-3" controlId="name">
                            <BootstrapForm.Label>Nombre:</BootstrapForm.Label>
                            <Field id="name" name="name" placeholder="Nombre" className="form-control" />
                            <ErrorMessage name="name" component="div" className="invalid-feedback d-block" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group className="mb-3" controlId="description">
                            <BootstrapForm.Label>Descripción:</BootstrapForm.Label>
                            <Field
                                as="textarea"
                                rows={4}
                                id="description"
                                name="description"
                                placeholder="Qué lo diferencia de los otros equipos."
                                className="form-control"
                            />
                            <ErrorMessage name="description" component="div" className="invalid-feedback d-block" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group className="mb-3" controlId="category">
                            <BootstrapForm.Label>Categoría:</BootstrapForm.Label>
                            <Field id="category" name="category" placeholder="Honor/Primera/Preferente..." className="form-control" />
                            <ErrorMessage name="category" component="div" className="invalid-feedback d-block" />
                        </BootstrapForm.Group>

                        <ButtonsWrapper>
                            <StyledSubmitButton type="submit" variant="success" disabled={isSubmitting || !isValid || !dirty}>
                                {isSubmitting ? (
                                    <SpinnerTextWrapper>
                                        <output>
                                            <Spinner animation="border" />
                                            Creando...
                                        </output>
                                    </SpinnerTextWrapper>
                                ) : (
                                    'Crear equipo'
                                )}
                            </StyledSubmitButton>
                        </ButtonsWrapper>
                    </Row>
                </Form>
            )}
        </Formik>
    )
}

export default CreateTeamForm

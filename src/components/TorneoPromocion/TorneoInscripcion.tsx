import { Container, Button, Col, Spinner, Row, FormCheck } from 'react-bootstrap'
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'
import usePageTitle from '../../components/Common/hooks/usePageTitle'
import axios from 'axios'
import { TOURNAMENT_PARTICIPANTS_URL } from '../../resources/server_urls'
import { useNotificationContext } from '../../components/Common/NotificationContext'
import { NotificationType } from '../../components/Common/hooks/useNotification'
import { ROUTES } from '../../resources/routes-constants'

const CheckBoxContainer = styled.div`
    display: flex;
    gap: 2em;
`

// Styled Components
const Title = styled.h1`
    margin: 2rem 0;
    text-align: center;
`

const FormGroup = styled.div`
    margin-bottom: 1.5rem;
`

const FormLabel = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
`

const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
`

const Select = styled.select`
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
`

const ErrorText = styled.div`
    color: #dc3545;
    margin-top: 0.25rem;
`

const StyledContainer = styled(Container)`
    margin-bottom: 2em;
`

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
const AdvertisingContainer = styled(Container)`
    padding-top: 2em;
`

// Definir un tipo para las categorías
interface Category {
    label: string
    value: string
    minYear: number
}

// Categorías con los límites de edad correspondientes
const categories: Category[] = [
    { label: 'Sub 8 (2016 y posteriores)', value: 'SUB8', minYear: 2016 },
    { label: 'Sub 10 (2014, 2015)', value: 'SUB10', minYear: 2014 },
    { label: 'Sub 12 (2012, 2013)', value: 'SUB12', minYear: 2012 },
    { label: 'Sub 14 (2010, 2011)', value: 'SUB14', minYear: 2010 }
]

// Esquema de validación con Yup
const validationSchema = Yup.object({
    fideId: Yup.number().required('El Fide ID es obligatorio.').max(9999999, 'No puede ser mayor a 9999999').positive('El Fide ID tiene que ser positivo.'),
    name: Yup.string().max(60, 'El nombre y apellidos no puede tener más de 60 caracteres').required('El nombre es obligatorio'),
    club: Yup.string().max(30, 'El club no puede tener más de 30 caracteres').required('El club es obligatorio'),
    birthDate: Yup.date()
        .required('La fecha de nacimiento es obligatoria')
        .test('valid-category', 'La fecha de nacimiento no coincide con la categoría seleccionada', function (value) {
            const { category } = this.parent as { category?: string }

            if (!category) return true // Si no hay categoría, no validar

            const selectedCategory = categories.find((c) => c.value === category)
            if (!selectedCategory) return false

            return value.getFullYear() >= selectedCategory.minYear
        }),
    category: Yup.string()
        .oneOf(
            categories.map((c) => c.value),
            'Categoría inválida'
        )
        .required('La categoría es obligatoria')
})

const TournamentRegistration = (): React.JSX.Element => {
    usePageTitle('Inscripción torneo')
    const { showNotification } = useNotificationContext()

    return (
        <StyledContainer>
            <Title>Inscripción al Torneo</Title>
            <Formik
                initialValues={{ name: '', club: '', birthDate: '', category: '', fideId: undefined, byes: [] }}
                validationSchema={validationSchema}
                validateOnChange
                validateOnBlur
                validateOnMount
                onSubmit={(values, actions) => {
                    const formattedValues = {
                        ...values,
                        byes: values.byes.length > 0 ? values.byes.join(' ') : '' // Convert array to string
                    }

                    axios
                        .post(TOURNAMENT_PARTICIPANTS_URL, formattedValues)
                        .then(() => {
                            showNotification('Inscripción realizada correctamente.', NotificationType.Success)
                            actions.resetForm()
                        })
                        .catch((error: unknown) => {
                            if (axios.isAxiosError(error)) {
                                if (error.response?.data) {
                                    showNotification(error.message, NotificationType.Error)
                                } else if (error.request) {
                                    showNotification('Error: no hay respuesta.', NotificationType.Error)
                                }
                            } else {
                                showNotification('Error: algo inesperado. Recarga o inténtalo más tarde.', NotificationType.Error)
                            }
                        }) // <-- Corrected the misplaced closing parenthesis
                        .finally(() => {
                            actions.setSubmitting(false)
                        })
                }}
            >
                {({ isSubmitting, isValid, dirty }) => (
                    <FormikForm>
                        <FormGroup>
                            <FieldRow>
                                <Col md={2}>
                                    {' '}
                                    {/* Reduce el ancho de la columna del label */}
                                    <FormLabel>Fide ID</FormLabel>
                                </Col>
                                <Col md={7}>
                                    {' '}
                                    {/* Aumenta el ancho de la columna del input */}
                                    <Field name="fideId" type="number" as={Input} placeholder="Introduce el id de la FIDE" />
                                    <StyledErrorMessage name="fideId" component={ErrorText} />
                                    <a href="https://ratings.fide.com/" target="_blank" rel="noopener noreferrer">
                                        Busca tu fide id aquí.
                                    </a>
                                </Col>
                            </FieldRow>
                        </FormGroup>

                        <FormGroup>
                            <FieldRow>
                                <Col md={2}>
                                    <FormLabel>Nombre y Apellidos</FormLabel>
                                </Col>
                                <Col md={7}>
                                    <Field name="name" type="text" as={Input} placeholder="Introduce tu nombre completo" />
                                    <StyledErrorMessage name="name" component={ErrorText} />
                                </Col>
                            </FieldRow>
                        </FormGroup>

                        <FormGroup>
                            <FieldRow>
                                <Col md={2}>
                                    <FormLabel>Club</FormLabel>
                                </Col>
                                <Col md={7}>
                                    <Field name="club" type="text" as={Input} placeholder="Introduce el nombre de tu club" />
                                    <StyledErrorMessage name="club" component={ErrorText} />
                                </Col>
                            </FieldRow>
                        </FormGroup>

                        <FormGroup>
                            <FieldRow>
                                <Col md={2}>
                                    <FormLabel>Fecha de Nacimiento</FormLabel>
                                </Col>
                                <Col md={7}>
                                    <Field name="birthDate" type="date" as={Input} />
                                    <StyledErrorMessage name="birthDate" component={ErrorText} />
                                </Col>
                            </FieldRow>
                        </FormGroup>

                        <FormGroup>
                            <FieldRow>
                                <Col md={2}>
                                    <FormLabel>Categoría</FormLabel>
                                </Col>
                                <Col md={7}>
                                    <Field name="category" as={Select}>
                                        <option value="">Seleccione una categoría</option>
                                        {categories.map((category) => (
                                            <option key={category.value} value={category.value}>
                                                {category.label}
                                            </option>
                                        ))}
                                    </Field>
                                    <StyledErrorMessage name="category" component={ErrorText} />
                                </Col>
                            </FieldRow>
                        </FormGroup>
                        <FormGroup>
                            <FieldRow>
                                <Col md={2}>
                                    <FormLabel>Byes disponibles</FormLabel>
                                </Col>
                                <Col md={7}>
                                    <CheckBoxContainer role="group" aria-labelledby="checkbox-group">
                                        <label>
                                            <FormCheck as={Field} type="checkbox" name="byes" value="1" label="Ronda 1" />
                                        </label>
                                        <label>
                                            <FormCheck as={Field} type="checkbox" name="byes" value="2" label="Ronda 2" />
                                        </label>
                                        <label>
                                            <FormCheck as={Field} type="checkbox" name="byes" value="3" label="Ronda 3" />
                                        </label>
                                        <label>
                                            <FormCheck as={Field} type="checkbox" name="byes" value="4" label="Ronda 4" />
                                        </label>
                                        <label>
                                            <FormCheck as={Field} type="checkbox" name="byes" value="5" label="Ronda 5" />
                                        </label>
                                        <label>
                                            <FormCheck as={Field} type="checkbox" name="byes" value="6" label="Ronda 6" />
                                        </label>
                                        <label>
                                            <FormCheck as={Field} type="checkbox" name="byes" value="7" label="Ronda 7" />
                                        </label>{' '}
                                    </CheckBoxContainer>
                                    <StyledErrorMessage name="byes" component={ErrorText} />
                                </Col>
                            </FieldRow>
                        </FormGroup>
                        <SubmitButtonRow>
                            <Col></Col>
                            <Col>
                                {' '}
                                <Button variant="success" disabled={isSubmitting || !isValid || !dirty} type="submit">
                                    {isSubmitting ? (
                                        <>
                                            <Spinner as="span" animation="border" size="sm" aria-hidden="true" />
                                            <output> Añadiendo... </output>
                                        </>
                                    ) : (
                                        'Enviar'
                                    )}
                                </Button>
                            </Col>
                            <Col></Col>
                        </SubmitButtonRow>
                    </FormikForm>
                )}
            </Formik>
            <AdvertisingContainer>
                <Row>
                    <Col>
                        <strong>
                            Para dudas: <a href="mailto:xadreznaron@hotmail.com">xadreznaron@hotmail.com</a>
                        </strong>{' '}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <strong>
                            Al enviar el formulario el usuario acepta las condiciones expuestas en las{' '}
                            <a href={ROUTES.TORNEO_BASES} target="_blank" rel="noopener noreferrer">
                                bases
                            </a>
                            .
                        </strong>
                    </Col>
                </Row>
            </AdvertisingContainer>
        </StyledContainer>
    )
}

export default TournamentRegistration

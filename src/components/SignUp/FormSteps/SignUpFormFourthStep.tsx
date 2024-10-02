import { useCallback, useState } from 'react'
import { Field } from 'formik'
import { Button, Col, Row, Spinner, Form as BootstrapForm } from 'react-bootstrap'
import styled from 'styled-components'
import { SignUpFormStepProps, UserAceptanceModalOption } from '../SignUpFormTypes'
import UserAceptanceModal from '../UserAceptanceModal'
import { ButtonRow } from '../../SignUpSingInCommonStyles'
import { ResponsiveMainContainer } from './Styles/FormStepsCommonStyles'

const StyledRow = styled(Row)`
    display: flex;
    flex-wrap: nowrap !important;
    align-items: center !important;
    margin-bottom: 2em;
`

const CheckBoxContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0em;

    .checkbox-style {
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }

    .text-label {
        margin: 0;
        line-height: 20px; /* Match the checkbox height */
    }
    @media (max-width: 768px) {
        .checkbox-style {
            width: 30px;
            height: 30px;
            margin-right: 10px;
        }
    }
`

/**
 * Props for the CheckBoxWithLabel component.
 * @interface CheckBoxWithLabelProps
 */
interface CheckBoxWithLabelProps {
    /**
     * The name attribute for the checkbox input.
     * @type {string}
     */
    name: string

    /**
     * The label text to display next to the checkbox.
     * @type {string}
     */
    label: string
}
/**
 * A checkbox input with an associated label.
 *
 * @param {CheckBoxWithLabelProps} props - The props for the component.
 * @returns {JSX.Element} The rendered checkbox and label.
 */
const CheckBoxWithLabel = ({ name, label }: CheckBoxWithLabelProps) => (
    <CheckBoxContainer>
        <Field type="checkbox" name={name} className="checkbox-style" />
        <BootstrapForm.Text className="text-muted text-label">{label}</BootstrapForm.Text>
    </CheckBoxContainer>
)

/**
 * Props for the ModalButtonRow component.
 * @interface ModalButtonRowProps
 */
interface ModalButtonRowProps {
    /**
     * The label for the button.
     * @type {string}
     */
    label: string

    /**
     * The option for the modal related to the button.
     * @type {UserAceptanceModalOption}
     */
    modalOption: UserAceptanceModalOption

    /**
     * The function to call when the button is clicked.
     * @param {UserAceptanceModalOption} option - The option to be passed to the click handler.
     * @returns {void}
     */
    onClick: (option: UserAceptanceModalOption) => void
}

/**
 * A button that opens a modal when clicked.
 *
 * @param {ModalButtonRowProps} props - The props for the component.
 * @returns {JSX.Element} The rendered button in a row.
 */
const ModalButtonRow = ({ label, modalOption, onClick }: ModalButtonRowProps) => (
    <StyledRow>
        <Col>
            <Button variant="link" onClick={() => onClick(modalOption)}>
                {label}
            </Button>
        </Col>
    </StyledRow>
)

/**
 * The fourth step of the sign-up form where users accept terms and conditions.
 *
 * @param {SignUpFormStepProps} formikProps - The Formik props for managing form state.
 * @param {Function} previousStepFunction - Function to navigate to the previous step.
 * @returns {JSX.Element} The rendered fourth step of the sign-up form.
 */
const SignUpFormFourthStep = ({ formikProps, previousStepFunction }: SignUpFormStepProps) => {
    const [selectedAceptanceOption, setSelectedAceptanceOption] = useState<UserAceptanceModalOption>(UserAceptanceModalOption.CesionDatos)
    const [userAceptanceModalOpen, setUserAceptanceModalOpen] = useState(false)

    const handleUserAceptanceModalClose = useCallback(() => setUserAceptanceModalOpen(false), [])

    const handleModalOpen = useCallback((option: UserAceptanceModalOption) => {
        setSelectedAceptanceOption(option)
        setUserAceptanceModalOpen(true)
    }, [])

    const { dirty, isValid, isSubmitting } = formikProps

    return (
        <ResponsiveMainContainer>
            <CheckBoxWithLabel name="membersTerms" label="Normas del socio: He leído y acepto las condiciones." />
            <ModalButtonRow
                label="Ver las condiciones sobre normas de los socios."
                modalOption={UserAceptanceModalOption.NormasSocios}
                onClick={handleModalOpen}
            />
            <CheckBoxWithLabel name="privacyTerms" label="Protección datos: He leído y acepto las condiciones." />
            <ModalButtonRow
                label="Ver las condiciones sobre protección de datos."
                modalOption={UserAceptanceModalOption.CesionDatos}
                onClick={handleModalOpen}
            />
            <CheckBoxWithLabel name="confidencialityTerms" label="Compromiso de confidencialidad: He leído y acepto las condiciones." />
            <ModalButtonRow
                label="Ver las condiciones sobre el compromiso de confidencialidad."
                modalOption={UserAceptanceModalOption.CompromisoConfidencialidad}
                onClick={handleModalOpen}
            />
            <ButtonRow>
                <Col>
                    <Button variant="primary" onClick={previousStepFunction} size="lg">
                        Atrás
                    </Button>
                </Col>
                <Col>
                    <Button type="submit" variant="success" disabled={!dirty || !isValid || isSubmitting} size="lg">
                        {isSubmitting ? (
                            <>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Enviando...
                            </>
                        ) : (
                            'Registrarse'
                        )}
                    </Button>
                </Col>
            </ButtonRow>
            <UserAceptanceModal show={userAceptanceModalOpen} onClose={handleUserAceptanceModalClose} userAceptanceOption={selectedAceptanceOption} />
        </ResponsiveMainContainer>
    )
}

export default SignUpFormFourthStep

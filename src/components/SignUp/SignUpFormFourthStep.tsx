import React, { useCallback, useState } from 'react'
import { Field } from 'formik'
import { Button, Col, Row, Spinner, Form as BootstrapForm } from 'react-bootstrap'
import styled from 'styled-components'
import { SignUpFormStepProps, UserAceptanceModalOption } from './SignUpFormTypes'
import { ButtonRow, MainContainer } from './CommonStyles'
import UserAceptanceModal from './UserAceptanceModal'

export const CustomFormStyledContainer = styled.div`
    background-color: rgba(250, 238, 168, 0.219);
    box-shadow:
        0 0.5em 0.5em -0.3em rgba(0, 0, 0, 0.3),
        0.5em 0 0.5em -0.3em rgba(0, 0, 0, 0.3);
    padding: 1em;
    padding-top: 2em;
    padding-left: 2em;
    border-radius: 5px;
`

const ButtonCol = styled(Col)`
    width: 50%;
    display: flex;
    justify-content: center;

    @media (max-width: 768px) {
        width: 100%;
        margin-bottom: 1em;
    }
`

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
`

const CheckBoxWithLabel: React.FC<{ name: string; label: string }> = ({ name, label }) => (
    <CheckBoxContainer>
        <Field type="checkbox" name={name} className="checkbox-style" />
        <BootstrapForm.Text className="text-muted text-label">{label}</BootstrapForm.Text>
    </CheckBoxContainer>
)

const ModalButtonRow: React.FC<{ label: string; modalOption: UserAceptanceModalOption; onClick: (option: UserAceptanceModalOption) => void }> = ({
    label,
    modalOption,
    onClick
}) => (
    <StyledRow>
        <Col>
            <Button variant="link" onClick={() => onClick(modalOption)}>
                {label}
            </Button>
        </Col>
    </StyledRow>
)

const SignUpFormFourthStep: React.FC<SignUpFormStepProps> = ({ formikProps, previousStepFunction }) => {
    const [selectedAceptanceOption, setSelectedAceptanceOption] = useState<UserAceptanceModalOption>(UserAceptanceModalOption.CesionDatos)
    const [userAceptanceModalOpen, setUserAceptanceModalOpen] = useState(false)

    const handleUserAceptanceModalClose = useCallback(() => setUserAceptanceModalOpen(false), [])
    const handleModalOpen = useCallback((option: UserAceptanceModalOption) => {
        setSelectedAceptanceOption(option)
        setUserAceptanceModalOpen(true)
    }, [])

    const { dirty, isValid, isSubmitting } = formikProps

    return (
        <MainContainer>
            <CustomFormStyledContainer>
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
                    <ButtonCol>
                        <Button variant="primary" onClick={previousStepFunction} style={{ width: '100%', maxWidth: '150px', padding: '5px 10px', fontSize: '14px' }}>
                            Atrás
                        </Button>
                    </ButtonCol>
                    <ButtonCol>
                        <Button type="submit" variant="success" disabled={!dirty || !isValid || isSubmitting} style={{ width: '100%', maxWidth: '150px', padding: '5px 10px', fontSize: '14px' }}>
                            {isSubmitting ? (
                                <>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Enviando...
                                </>
                            ) : (
                                'Registrarse'
                            )}
                        </Button>
                    </ButtonCol>
                </ButtonRow>
                <UserAceptanceModal show={userAceptanceModalOpen} onClose={handleUserAceptanceModalClose} userAceptanceOption={selectedAceptanceOption} />
            </CustomFormStyledContainer>
        </MainContainer>
    )
}

export default SignUpFormFourthStep

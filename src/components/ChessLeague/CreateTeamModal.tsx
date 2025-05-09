import React from 'react'
import { Button, Modal, ModalProps } from 'react-bootstrap'
import CreateTeamForm from './CreateTeamForm'
import styled from 'styled-components'

/**
 * Styled button used for closing the modal, occupying full width and maintaining minimum size.
 */
const StyledCloseButton = styled(Button)`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50px;
    min-width: 150px;
`

/**
 * Props for the {@link CreateTeamModal} component.
 */
interface CreateTeamModalProps extends ModalProps {
    /**
     * Callback to add a new team. Receives the team name, category, and description.
     * Should return a Promise (e.g., making an API call).
     *
     * @param name - The name of the team.
     * @param category - The category of the team (e.g., "Primera division").
     * @param description - A description of the team.
     */
    addTeam: (name: string, category: string, description: string) => Promise<void>
}

/**
 * A modal component for creating a new league team.
 *
 * This modal includes a title, a form for entering team data, and a footer with a close button.
 * It uses React Bootstrap's `Modal` and accepts standard `ModalProps` along with an `addTeam` function
 * to handle the submission of the form.
 *
 * @param props - The modal props including the `addTeam` callback and any props passed to `Modal`.
 *
 * @example
 * ```tsx
 * <CreateTeamModal show={show} onHide={handleClose} addTeam={handleAddTeam} />
 * ```
 *
 * @returns A React Bootstrap modal for creating a team.
 */
const CreateTeamModal: React.FC<CreateTeamModalProps> = ({ addTeam, ...modalProps }) => {
    return (
        <Modal {...modalProps}>
            <Modal.Header closeButton>
                <Modal.Title>Crear equipo de liga:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CreateTeamForm addTeam={addTeam} />
            </Modal.Body>
            <Modal.Footer>
                <StyledCloseButton variant="danger" onClick={modalProps.onHide}>
                    Cerrar
                </StyledCloseButton>
            </Modal.Footer>
        </Modal>
    )
}

export default React.memo(CreateTeamModal)

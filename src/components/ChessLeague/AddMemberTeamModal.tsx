import { ListGroup, Modal, ModalProps } from 'react-bootstrap'
import { TeamWithMembers } from './types'
import AddMemberToTeamForm from './AddMemberToTeamForm'
import styled from 'styled-components'

/**
 * Props for the {@link AddMemberTeamModal} component.
 */
interface AddMemberTeamModalProps extends ModalProps {
    /**
     * The team to which a member will be added.
     * If null, the modal will not be rendered.
     */
    team: TeamWithMembers | null

    /**
     * Function to add a user to the selected team.
     *
     * @param userEmail - The email of the user to be added.
     * @param teamName - The name of the team to which the user is added.
     */
    addMemberToTeam: (userEmail: string, teamName: string) => Promise<void>
}

/**
 * Styled modal body to provide vertical spacing between elements.
 */
const ModalBody = styled(Modal.Body)`
    display: flex;
    flex-direction: column;
    gap: 1em;
`

/**
 * Modal component to add a member to a team.
 *
 * Displays team information and includes a form (`AddMemberToTeamForm`) to assign a user to the given team.
 * The modal is only shown if the `team` prop is not null.
 *
 * @param props - {@link AddMemberTeamModalProps} including the target team and member assignment function.
 *
 * @example
 * ```tsx
 * <AddMemberTeamModal
 *   show={showModal}
 *   onHide={handleClose}
 *   team={selectedTeam}
 *   addMemberToTeam={handleAddMember}
 * />
 * ```
 *
 * @returns A Bootstrap modal for adding a user to a team.
 */
const AddMemberTeamModal: React.FC<AddMemberTeamModalProps> = (props) => {
    return (
        <>
            {props.team && (
                <Modal {...props}>
                    <Modal.Header closeButton>
                        <Modal.Title>Añadir miembro al equipo</Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                        <ListGroup>
                            <ListGroup.Item>Nombre del equipo: {props.team.name}</ListGroup.Item>
                            <ListGroup.Item>Cateogría del equipo: {props.team.category}</ListGroup.Item>
                        </ListGroup>

                        <AddMemberToTeamForm teamName={props.team.name} members={props.team.members} addMemberToTeam={props.addMemberToTeam} />
                    </ModalBody>
                    <Modal.Footer>{/* Add buttons here if needed */}</Modal.Footer>
                </Modal>
            )}
        </>
    )
}

export default AddMemberTeamModal

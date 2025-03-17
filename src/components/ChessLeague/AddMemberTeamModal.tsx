import { ListGroup, Modal, ModalProps } from 'react-bootstrap'
import { TeamWithMembers } from './types'
import AddMemberToTeamForm from './AddMemberToTeamForm'
import styled from 'styled-components'

interface AddMemberTeamModalProps extends ModalProps {
    team: TeamWithMembers | null
    addMemberToTeam: (userEmail: string, teamName: string) => Promise<void>
}

const ModalBody = styled(Modal.Body)`
    display: flex;
    flex-direction: column;
    gap: 1em;
`

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

                        <AddMemberToTeamForm
                            teamName={props.team.name}
                            members={props.team.members}
                            addMemberToTeam={props.addMemberToTeam}
                        ></AddMemberToTeamForm>
                    </ModalBody>
                    <Modal.Footer>{/* Add buttons here */}</Modal.Footer>
                </Modal>
            )}
        </>
    )
}
export default AddMemberTeamModal

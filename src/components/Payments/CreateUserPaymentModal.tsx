import { Modal, ModalProps } from 'react-bootstrap'
import { StyledModalBody, StyledModalFooter, StyledModalHeader } from './CommonStyles'
import AddUserPaymentForm from './AddUserPaymentForm'
import { IPaymentDetails } from 'components/Types/Types'

interface CreateUserPaymentModalProps extends ModalProps {
    onHide: () => void
    addPaymentTableFunc: (userDni: string, payment: IPaymentDetails) => void
}

const CreateUserPaymentModal: React.FC<CreateUserPaymentModalProps> = (props) => {
    return (
        <Modal show={props.show} onHide={props.onHide} centered>
            <StyledModalHeader closeButton>
                <Modal.Title>Añadir Pago</Modal.Title>
            </StyledModalHeader>
            <StyledModalBody>
                <AddUserPaymentForm closemodal={props.onHide} addPaymentTableFunc={props.addPaymentTableFunc} />
            </StyledModalBody>
            <StyledModalFooter></StyledModalFooter>
        </Modal>
    )
}

export default CreateUserPaymentModal

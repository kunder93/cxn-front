import { Button, Modal, ModalProps } from 'react-bootstrap'
import { useAxiosGetUserPayments } from 'utility/CustomAxios'

interface PaymentsManagerModalProps extends ModalProps {
    userdni: string
    name: string
    firstsurname: string
    secondsurname: string
}

const PaymentsManagerModal = (props: PaymentsManagerModalProps): JSX.Element => {
    const { data, error, loaded } = useAxiosGetUserPayments(props.userdni)

    console.log('Data:')
    console.log(data)
    console.log('Error:')
    console.log(error)
    console.log('Loading:')
    console.log(loaded)

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h1> Historial de pagos: </h1>
                    <p>Aqui podrás comprobar los pagos realizados y los que estan pendientes.</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body></Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.onHide}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PaymentsManagerModal

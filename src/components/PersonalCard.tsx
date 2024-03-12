import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { useAppSelector } from '../store/hooks'

const PersonalCard: React.FC = () => {
    const userName = useAppSelector((state) => state.users.name)
    const userFirstSurname = useAppSelector((state) => state.users.firstSurname)
    const userSecondSurname = useAppSelector((state) => state.users.secondSurname)
    const userGender = useAppSelector((state) => state.users.gender)
    const userEmail = useAppSelector((state) => state.users.email)
    const userBirthDate = useAppSelector((state) => state.users.birthDate)
    const userRoles = useAppSelector((state) => state.users.userRoles)
    const kindMember = useAppSelector((state) => state.users.kindMember)
    return (
        <Card style={{ width: '15rem' }}>
            <Card.Body>
                <Card.Title>INFORMACIÓN PERSONAL</Card.Title>

                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <Card.Text>Pulsa para desplegar o contraer los campos</Card.Text>
                        </Accordion.Header>
                        <Accordion.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>Nombre: {userName}</ListGroup.Item>
                                <ListGroup.Item>Primer apellido: {userFirstSurname}</ListGroup.Item>
                                <ListGroup.Item>Segundo apellido: {userSecondSurname}</ListGroup.Item>
                                <ListGroup.Item>Sexo: {userGender}</ListGroup.Item>
                                <ListGroup.Item>Correo electronico: {userEmail}</ListGroup.Item>
                                <ListGroup.Item>Fecha de nacimiento: {userBirthDate}</ListGroup.Item>
                                <ListGroup.Item>Roles del usuario: {userRoles}</ListGroup.Item>
                                <ListGroup.Item>Tipo de socio: {kindMember}</ListGroup.Item>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Card.Body>

            <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
        </Card>
    )
}
export default PersonalCard

import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { LoginForm } from '../components/LoginForm'

const LoginPage: React.FC = () => {
    return (
        <Container fluid="md">
            <Row>
                <Col></Col>
                <Col>
                    <h2>Acceso socios CXN:</h2>
                    <LoginForm></LoginForm>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}
export default LoginPage

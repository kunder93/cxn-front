import { MainContainer } from '../components/SignUp/CommonStyles'
import LoginForm from '../components/LoginForm'
import React from 'react'
import { Col, Row } from 'react-bootstrap'

const LoginPage: React.FC = () => {
    return (
    <Row>
        <Col></Col>
        <Col>
        <MainContainer fluid="md">
                    <h2>Acceso socios CXN:</h2>
                    <LoginForm></LoginForm>
        </MainContainer>
        </Col><Col></Col>
        </Row> )
}
export default LoginPage

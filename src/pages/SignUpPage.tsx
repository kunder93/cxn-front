import React from 'react'

import { Col, Row } from "react-bootstrap"
import SignUpForm from '../components/SignUpForm'

const SignUpPage = () => (
    <Row>
        <Col></Col>
        <Col><h2>Formulario de registro:</h2>
            <SignUpForm></SignUpForm>
        </Col>
        <Col></Col>
    </Row>
)

export default SignUpPage

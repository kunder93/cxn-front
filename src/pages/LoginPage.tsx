import { MainContainer } from '../components/SignUp/CommonStyles'
import LoginForm from '../components/LoginForm'
import React from 'react'

const LoginPage: React.FC = () => {
    return (
        <MainContainer fluid="md">
            <h2>Acceso socios CXN:</h2>
            <LoginForm></LoginForm>
        </MainContainer>
    )
}
export default LoginPage

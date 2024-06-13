import React from 'react'
import LoginForm from '../components/LoginForm'
import { MainContainer } from '../components/SignUpSingInCommonStyles'

const LoginPage: React.FC = () => {
    return (
        <MainContainer fluid="md">
            <LoginForm></LoginForm>
        </MainContainer>
    )
}
export default LoginPage

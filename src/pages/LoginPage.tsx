import { MainContainer } from '../components/SignUp/CommonStyles'
import LoginForm from '../components/LoginForm'
import React from 'react'
import styled from 'styled-components'

const LoginPageTitle = styled.h2`
    font-weight: 600;
    font-size: 200%;
    padding-top: 0.3em;
    padding-bottom: 0.3em;
    padding-left: 0.1em;
`

const LoginPage: React.FC = () => {
    return (
        <MainContainer fluid="md">
            <LoginPageTitle>Acceso socios CXN:</LoginPageTitle>
            <LoginForm></LoginForm>
        </MainContainer>
    )
}
export default LoginPage

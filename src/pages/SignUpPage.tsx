import React from 'react'
import SignUpForm from '../components/SignUp/SignUpForm'
import { MainContainer } from '../components/SignUpSingInCommonStyles'

const SignUpPage: React.FC = () => (
    <MainContainer fluid="md">
        <SignUpForm></SignUpForm>
    </MainContainer>
)

export default SignUpPage

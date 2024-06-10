import React from 'react'

import SignUpForm from '../components/SignUp/SignUpForm'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'

const Page = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`

const SignUpPage: React.FC = () => (
    <Page>
        <Container>
            <SignUpForm></SignUpForm>
        </Container>
    </Page>
)

export default SignUpPage

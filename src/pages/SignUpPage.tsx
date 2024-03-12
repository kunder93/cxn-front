import React from 'react'

import SignUpForm from '../components/SignUp/SignUpForm'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'

const SignUpFormTittle = styled(Container)``

const Page = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`

const SignUpPage: React.FC = () => (
    <div>
        <Page>
            <SignUpFormTittle>
                <h2>Formulario de registro nuevo socio:</h2>
            </SignUpFormTittle>
            <Container>
                <SignUpForm></SignUpForm>
            </Container>
        </Page>
    </div>
)

export default SignUpPage

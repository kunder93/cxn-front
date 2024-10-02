import SignUpForm from '../components/SignUp/SignUpForm'
import { MainContainer } from '../components/SignUpSingInCommonStyles'
import usePageTitle from '../components/Common/hooks/usePageTitle'

const SignUpPage = (): JSX.Element => {
    usePageTitle('CXN Solicitud de socio')
    return (
        <MainContainer fluid="md">
            <SignUpForm></SignUpForm>
        </MainContainer>
    )
}

export default SignUpPage

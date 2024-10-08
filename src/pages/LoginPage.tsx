import LoginForm from '../components/LoginForm'
import { MainContainer } from '../components/SignUpSingInCommonStyles'
import usePageTitle from '../components/Common/hooks/usePageTitle'

const LoginPage = (): JSX.Element => {
    usePageTitle('CXN Entrar como socio')

    return (
        <MainContainer fluid="md">
            <LoginForm></LoginForm>
        </MainContainer>
    )
}
export default LoginPage

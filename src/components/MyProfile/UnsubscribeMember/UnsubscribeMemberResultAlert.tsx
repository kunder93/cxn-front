import React from 'react'
import { Alert, Collapse, Spinner } from 'react-bootstrap'
import { useAxiosUnsubscribeMember } from '../../../utility/CustomAxios'
import { removeJwt, removeUserProfile, setUserProfile } from '../../../store/slices/user'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../../resources/routes-constants'
import { useAppDispatch } from '../../../store/hooks'
import { FloatingNotificationContainer } from '../../../components/Common/FloatingNotificationA'

export interface UnsubscribeMemberAxiosValues {
    email: string
    password: string
}

interface IUnsubscribeMemberSubmitResultAlert {
    visibleParam: boolean
    closeFunction: React.Dispatch<React.SetStateAction<boolean>>
    formData: UnsubscribeMemberAxiosValues
}

const ChangeUserEmailResultAlert: React.FC<IUnsubscribeMemberSubmitResultAlert> = ({ visibleParam, closeFunction, formData }) => {
    const [variant, setVariant] = React.useState('info')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { data, error, loaded } = useAxiosUnsubscribeMember(formData)

    const determineAlertContent = () => {
        if (!loaded) {
            return <Spinner animation="border" variant="primary" />
        } else if (error) {
            return 'Hubo un error al procesar la solicitud: ' + error.message
        } else {
            data && setUserProfile(data)

            return 'Se ha cambiado el email a: ' + data?.email + ', vuelve a entrar en tu cuenta.'
        }
    }

    // Función para determinar la variante de la alerta
    React.useEffect(() => {
        if (error) {
            setVariant('danger')
        } else {
            setVariant('success')
        }
    }, [error])

    // Hide alert after 5 seconds and delete user data, jwt token and go to HOMEPAGE.
    React.useEffect(() => {
        const logoutHandler = () => {
            dispatch(removeJwt())
            dispatch(removeUserProfile())
            navigate(ROUTES.HOMEPAGE_ROUTE)
        }
        const timer = setTimeout(() => {
            closeFunction(false)
            if (!error && data) {
                logoutHandler()
                navigate('/')
            }
        }, 5000)

        // Limpia el temporizador al desmontar el componente
        return () => clearTimeout(timer)
    }, [closeFunction, data, dispatch, error, navigate])

    return (
        <Collapse in={visibleParam}>
            <FloatingNotificationContainer>
                <Alert variant={variant}>{determineAlertContent()}</Alert>
            </FloatingNotificationContainer>
        </Collapse>
    )
}

export default ChangeUserEmailResultAlert

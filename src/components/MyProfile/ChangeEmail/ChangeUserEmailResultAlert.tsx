import { FloatingNotificationContainer } from '../../../components/Common/FloatingNotificationContainer'
import React from 'react'
import { Alert, Collapse, Spinner } from 'react-bootstrap'
import { useAxiosChangeUserEmail } from '../../../utility/CustomAxios'
import { removeJwt, removeUserProfile } from '../../../store/slices/user'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../../store/hooks'
import { ROUTES } from '../../../resources/routes-constants'

export interface ChangeEmailAxiosValues {
    email: string
    newEmail: string
}

interface IChangeKindMemberSubmitResultAlert {
    visibleParam: boolean
    closeFunction: React.Dispatch<React.SetStateAction<boolean>>
    formData: ChangeEmailAxiosValues
}

const ChangeUserEmailResultAlert: React.FC<IChangeKindMemberSubmitResultAlert> = ({ visibleParam, closeFunction, formData }) => {
    const [variant, setVariant] = React.useState('info')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { data, error, loaded } = useAxiosChangeUserEmail(formData)

    const determineAlertContent = () => {
        if (!loaded) {
            return <Spinner animation="border" variant="primary" />
        } else if (error) {
            return 'Hubo un error al procesar la solicitud: ' + error.toString()
        } else {
            return 'Se ha cambiado el email a: ' + data?.email + ', vuelve a entrar en tu cuenta.'
        }
    }

    // Stablish alert variant.
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

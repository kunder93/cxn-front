import { FloatingNotificationContainer } from '../../Common/FloatingNotificationContainer'
import React from 'react'
import { Alert, Collapse, Spinner } from 'react-bootstrap'
import { setUserProfile } from '../../../store/slices/user'
import { useAxiosChangeUserPassword } from '../../../utility/CustomAxios'

export interface ChangePasswordAxiosValues {
    email: string
    currentPassword: string
    newPassword: string
}

interface IChangePasswordSubmitResultAlert {
    visibleParam: boolean
    closeFunction: React.Dispatch<React.SetStateAction<boolean>>
    formData: ChangePasswordAxiosValues
}

const ChangeUserPasswordResultAlert: React.FC<IChangePasswordSubmitResultAlert> = ({ visibleParam, closeFunction, formData }) => {
    const [variant, setVariant] = React.useState('info')

    const { data, error, loaded } = useAxiosChangeUserPassword(formData)

    const determineAlertContent = () => {
        if (!loaded) {
            return <Spinner animation="border" variant="primary" />
        } else if (error) {
            return 'Hubo un error al procesar la solicitud: ' + error.toString()
        } else {
            data && setUserProfile(data)

            return 'Se ha cambiado el email a: ' + data?.email
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

    // Efecto secundario para ocultar la alerta después de 5 segundos
    React.useEffect(() => {
        const timer = setTimeout(() => {
            closeFunction(false)
        }, 5000)

        // Limpia el temporizador al desmontar el componente
        return () => clearTimeout(timer)
    }, [closeFunction])
    const handleExit = () => {
        console.log('exit')
    }

    return (
        <Collapse in={visibleParam} onExited={handleExit}>
            <FloatingNotificationContainer>
                <Alert variant={variant}>{determineAlertContent()}</Alert>
            </FloatingNotificationContainer>
        </Collapse>
    )
}

export default ChangeUserPasswordResultAlert

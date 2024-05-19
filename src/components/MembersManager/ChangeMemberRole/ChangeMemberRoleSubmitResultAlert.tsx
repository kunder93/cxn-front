import React from 'react'
import { Alert, Collapse, Spinner } from 'react-bootstrap'
import { FloatingNotificationContainer } from '../../Common/FloatingNotificationContainer'
import { UserRole } from 'store/types/userTypes'
import { ChangeMemberRolesValues } from './ChangeMemberRolesForm'
import { useAxiosChangeMemberRoles } from '../../../utility/CustomAxios'

interface IChangeMemberRolesSubmitResultAlert {
    formData: ChangeMemberRolesValues
    visibleParam: boolean
    closeFunction: React.Dispatch<React.SetStateAction<boolean>>
    updateMemberRoles: (newUserRoles: UserRole[]) => void
}

const ChangeMemberRolesSubmitResultAlert: React.FC<IChangeMemberRolesSubmitResultAlert> = ({ updateMemberRoles, formData, visibleParam, closeFunction }) => {
    const { userRoles } = formData
    const { data, error, loaded } = useAxiosChangeMemberRoles(formData)
    const [variant, setVariant] = React.useState('info')
    // Función para determinar el contenido y el estilo de la alerta
    const determineAlertContent = () => {
        if (!loaded) {
            return <Spinner animation="border" variant="primary" />
        } else if (error) {
            return 'Hubo un error al procesar la solicitud.'
        } else {
            return 'Se ha cambiado el tipo de socio a: ' + formData.userRoles.toString()
        }
    }

    React.useEffect(() => {
        if (loaded && !error) {
            // La solicitud se completó con éxito, llama a updateMemberRoles para actualizar la tabla
            updateMemberRoles(userRoles)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaded, data, error, userRoles])

    // Función para determinar la variante de la alerta
    React.useEffect(() => {
        if (error) {
            setVariant('danger')
        } else {
            setVariant('success')
        }
    }, [error])

    const handleExit = () => {
        console.log('exit')
    }

    // Efecto secundario para ocultar la alerta después de 5 segundos
    React.useEffect(() => {
        const timer = setTimeout(() => {
            closeFunction(false)
        }, 5000)

        // Limpia el temporizador al desmontar el componente
        return () => clearTimeout(timer)
    }, [closeFunction, userRoles])

    return (
        <Collapse in={visibleParam} onExited={handleExit}>
            <FloatingNotificationContainer>
                <Alert variant={variant}>{determineAlertContent()}</Alert>
            </FloatingNotificationContainer>
        </Collapse>
    )
}

export default ChangeMemberRolesSubmitResultAlert

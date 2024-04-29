import React from 'react'
import { useAxiosChangeKindMember } from '../../../utility/CustomAxios'
import { Alert, Collapse, Spinner } from 'react-bootstrap'
import { FloatingNotificationContainer } from '../../Common/FloatingNotificationContainer'
import { renderKindMember } from '../../../utility/userUtilities'
import { KindMember } from 'store/types/userTypes'
import { ChangeKindMemberValues } from './ChangeKindMemberForm'

interface IChangeKindMemberSubmitResultAlert {
    formData: ChangeKindMemberValues
    visibleParam: boolean
    closeFunction: React.Dispatch<React.SetStateAction<boolean>>
    updateKindMember: (newKindMember: KindMember) => void
}

const ChangeKindMemberSubmitResultAlert: React.FC<IChangeKindMemberSubmitResultAlert> = ({ updateKindMember, formData, visibleParam, closeFunction }) => {
    const { kindMember /*, email */ } = formData
    const { /*data,*/ error, loaded } = useAxiosChangeKindMember(formData)
    const [variant, setVariant] = React.useState('info')
    // Función para determinar el contenido y el estilo de la alerta
    const determineAlertContent = () => {
        if (!loaded) {
            return <Spinner animation="border" variant="primary" />
        } else if (error) {
            return 'Hubo un error al procesar la solicitud.'
        } else {
            return 'Se ha cambiado el tipo de socio a: ' + renderKindMember(kindMember)
        }
    }

    React.useEffect(() => {
        if (loaded && !error) {
            // La solicitud se completó con éxito, llama a updateKindMember para actualizar la tabla
            updateKindMember(kindMember)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaded, error, kindMember])

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
    }, [closeFunction, kindMember])

    return (
        <Collapse in={visibleParam} onExited={handleExit}>
            <FloatingNotificationContainer>
                <Alert variant={variant}>{determineAlertContent()}</Alert>
            </FloatingNotificationContainer>
        </Collapse>
    )
}

export default ChangeKindMemberSubmitResultAlert

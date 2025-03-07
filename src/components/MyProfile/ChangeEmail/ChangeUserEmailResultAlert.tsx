import React, { useEffect, useState, useCallback } from 'react'
import { Alert, Collapse, Spinner } from 'react-bootstrap'
import { useAxiosChangeUserEmail } from '../../../utility/CustomAxios'
import { removeJwt, removeUserProfile } from '../../../store/slices/user'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../../store/hooks'
import { ROUTES } from '../../../resources/routes-constants'
import { FloatingNotificationContainer } from '../../../components/Common/FloatingNotificationA'

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
    const [variant, setVariant] = useState('info')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { data, error, loaded } = useAxiosChangeUserEmail(formData)

    // Mark logoutHandler as async and await navigation inside a try/catch block.
    const logoutHandler = useCallback(async () => {
        dispatch(removeJwt())
        dispatch(removeUserProfile())
        try {
            await navigate(ROUTES.LOGIN_ROUTE)
        } catch (err) {
            console.error('Navigation error:', err)
        }
    }, [dispatch, navigate])

    useEffect(() => {
        if (error) {
            setVariant('danger')
        } else if (data) {
            setVariant('success')
        }
    }, [error, data])

    useEffect(() => {
        const timer = setTimeout(() => {
            closeFunction(false)
            if (!error && data) {
                // Call logoutHandler and handle its promise
                logoutHandler().catch((err: unknown) => {
                    console.error('Logout handler error:', err)
                })
            }
        }, 5000)

        return () => {
            clearTimeout(timer)
        }
    }, [closeFunction, data, error, logoutHandler])

    // Extract the nested ternary logic into an independent statement
    let alertContent: React.ReactNode
    if (!loaded) {
        alertContent = <Spinner animation="border" variant="primary" />
    } else if (error) {
        alertContent = `Hubo un error al procesar la solicitud: ${error.message}`
    } else {
        alertContent = `Se ha cambiado el email a: ${data?.email ?? 'desconocido'}, vuelve a entrar en tu cuenta.`
    }

    return (
        <Collapse in={visibleParam}>
            <FloatingNotificationContainer>
                <Alert variant={variant}>{alertContent}</Alert>
            </FloatingNotificationContainer>
        </Collapse>
    )
}

export default ChangeUserEmailResultAlert

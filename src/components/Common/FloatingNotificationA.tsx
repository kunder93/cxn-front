import React from 'react'
import { Alert, Collapse } from 'react-bootstrap'
import styled from 'styled-components'
import { NotificationAOptions } from './hooks/useNotification'

export const FloatingNotificationContainer = styled.div`
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
`

interface IFloatingNotificationA {
    notification: NotificationAOptions | null
    hideNotification: () => void
}

const FloatingNotificationA: React.FC<IFloatingNotificationA> = ({ notification, hideNotification }) => {
    const handleExited = () => {
        hideNotification()
    }

    return (
        <Collapse in={notification !== null} onExited={handleExited}>
            <FloatingNotificationContainer>
                {notification && (
                    <Alert variant={notification.type} onClose={hideNotification} dismissible>
                        {notification.message}
                    </Alert>
                )}
            </FloatingNotificationContainer>
        </Collapse>
    )
}

export default FloatingNotificationA

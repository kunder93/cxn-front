import React, { useEffect, useState } from 'react'
import { Alert, Collapse } from 'react-bootstrap'
import { FloatingNotificationContainer } from '../FloatingNotificationA'

interface FloatingNotificationProps {
    message: string
    variant: string
    onClose: () => void
}

const FloatingNotification = ({ message, variant, onClose }: FloatingNotificationProps): JSX.Element => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
        }, 5000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    return (
        <Collapse in={visible} onExited={onClose}>
            <FloatingNotificationContainer>
                <Alert variant={variant} onClose={onClose} dismissible>
                    {message}
                </Alert>
            </FloatingNotificationContainer>
        </Collapse>
    )
}

export default React.memo(FloatingNotification)

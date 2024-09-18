import { useState } from 'react'

export enum NotificationType {
    Success = 'success',
    Error = 'danger'
}

export interface NotificationAOptions {
    message: string
    type: NotificationType
}

const useNotification = () => {
    const [notification, setNotification] = useState<NotificationAOptions | null>(null)
    const hideNotification = () => {
        setNotification(null)
    }
    const showNotification = (message: string, type: NotificationType) => {
        setNotification({ message, type })
        // Auto-hide notification after 5 seconds
        setTimeout(() => {
            hideNotification()
        }, 5000)
    }

    return {
        notification,
        showNotification,
        hideNotification
    }
}

export default useNotification

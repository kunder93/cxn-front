import React, { createContext, useContext, useState, ReactNode } from 'react'
import { NotificationAOptions, NotificationType } from './hooks/useNotification'
import FloatingNotificationA from './FloatingNotificationA'

interface NotificationContextProps {
    notification: NotificationAOptions | null
    showNotification: (message: string, type: NotificationType) => void
    hideNotification: () => void
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined)

export const useNotificationContext = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotificationContext must be used within a NotificationProvider')
    }
    return context
}

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

    return (
        <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
            {children}
            <FloatingNotificationA notification={notification} hideNotification={hideNotification} />
        </NotificationContext.Provider>
    )
}

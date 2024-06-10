import { useState, useCallback } from 'react';

export const useNotification = () => {
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const notify = useCallback((msg: string, variant: string) => {
        setMessage(msg);
        setVariant(variant);
        setShowNotification(true);
    }, []);

    const closeNotification = useCallback(() => {
        setShowNotification(false);
    }, []);

    return {
        message,
        variant,
        showNotification,
        notify,
        closeNotification,
    };
};

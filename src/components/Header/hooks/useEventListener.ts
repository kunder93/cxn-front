import { useEffect, useRef } from 'react';

const useEventListener = (
    eventName: string, 
    handler: (event: Event) => void, 
    element: EventTarget = document
) => {
    const savedHandler = useRef<(event: Event) => void>();

    // Actualizar la referencia del handler si cambia
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        //el elemento soporta addEventListener
        const isSupported = element && 'addEventListener' in element;
        if (!isSupported) return;

        // event listener llama a la referencia del handler
        const eventListener: EventListener = (event: Event) => savedHandler.current?.(event);

        // Agregar evento
        const addEventListener = (evt: string, listener: EventListener) => element.addEventListener(evt, listener);
        const removeEventListener = (evt: string, listener: EventListener) => element.removeEventListener(evt, listener);

        addEventListener(eventName, eventListener);

        // Limpiar  evento cuando el componente se desmonta
        return () => {
            removeEventListener(eventName, eventListener);
        };
    }, [eventName, element]); // Re-run if eventName or element changes
};

export default useEventListener;

import { useCallback } from 'react'
import useEventListener from './useEventListener'

const useDocumentInteraction = (dropdownRef: React.RefObject<HTMLDivElement>, setShowDropdown: (value: boolean) => void) => {
    const handleDocumentInteraction = useCallback(
        (event: Event) => {
            // Comprueba si el evento es un MouseEvent o un KeyboardEvent
            if (event instanceof MouseEvent || event instanceof KeyboardEvent) {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setShowDropdown(false)
                }
            }
        },
        [dropdownRef, setShowDropdown]
    )

    useEventListener('mousedown', handleDocumentInteraction)
    useEventListener('keydown', handleDocumentInteraction)
}

export default useDocumentInteraction

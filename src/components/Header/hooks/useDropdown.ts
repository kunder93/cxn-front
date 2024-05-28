import { useState, useRef, useCallback } from 'react'
import useDocumentInteraction from './useDocumentInteraction' // Importa el nuevo hook

const useDropdown = (onNavItemClick: () => void) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const handleMouseOver = useCallback(() => setShowDropdown(true), [])
    const handleMouseLeave = useCallback(() => setShowDropdown(false), [])
    const handleItemClick = useCallback(() => {
        setShowDropdown(false)
        onNavItemClick()
    }, [onNavItemClick])

    useDocumentInteraction(dropdownRef, setShowDropdown) // Usa el nuevo hook

    return {
        showDropdown,
        dropdownRef,
        handleMouseOver,
        handleMouseLeave,
        handleItemClick
    }
}

export default useDropdown

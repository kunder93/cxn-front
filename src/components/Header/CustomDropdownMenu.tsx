import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'
import styled from 'styled-components'

interface DropdownMenuProps {
    title: string
    route: string
    menuItems: { text: string; href: string; accordionItemToOpen?: string }[]
}

const StyledDropdownTitle = styled(NavDropdown.Header)`
    cursor: pointer;
    display: inline-block !important;
    font-size: 150% !important;
`

const CustomDropdownMenu: React.FC<DropdownMenuProps> = ({ title, route, menuItems }) => {
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = React.useRef<HTMLDivElement>(null)

    const handleMouseOver = () => setShowDropdown(true)
    const handleMouseLeave = () => setShowDropdown(false)

    const handleFocus = () => setShowDropdown(true)

    const handleItemClick = () => {
        setShowDropdown(false)
    }

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Tab' && !dropdownRef.current?.contains(document.activeElement)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    React.useEffect(() => {
        const handleFocusChange = (event: FocusEvent) => {
            if (!dropdownRef.current?.contains(event.target as Node)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener('focusin', handleFocusChange)
        return () => {
            document.removeEventListener('focusin', handleFocusChange)
        }
    }, [])

    return (
        <div ref={dropdownRef} >
            <NavDropdown
                title={
                    <StyledDropdownTitle aria-description="Desplegable con enlace" role="heading" aria-level={1} onClick={() => navigate(route)} tabIndex={0} onFocus={handleFocus}>
                        {title}
                    </StyledDropdownTitle>
                }
                show={showDropdown}
                onMouseEnter={handleMouseOver}
                onMouseLeave={handleMouseLeave}
            >
                {menuItems.map((item, index) => (
                    <NavDropdown.Item key={index} as={Link} to={item.href} state={{ accordionItemToOpen: item.accordionItemToOpen }} onClick={handleItemClick}>
                        {item.text}
                    </NavDropdown.Item>
                ))}
            </NavDropdown>
        </div>
    )
}

export default CustomDropdownMenu

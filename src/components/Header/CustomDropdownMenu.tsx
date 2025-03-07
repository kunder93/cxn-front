import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NavDropdown, Dropdown } from 'react-bootstrap'
import styled from 'styled-components'
import useDropdown from './hooks/useDropdown'

interface DropdownMenuProps {
    title: string
    route: string
    menuItems: MenuItem[]
    onNavItemClick: () => void
}

interface MenuItem {
    text: string
    href: string
    accordionItemToOpen?: string
}

const MobileNavDropdown = styled(NavDropdown)`
    font-size: 100%;
    .dropdown-toggle::after {
        font-size: 230%;
    }
`

const StyledDropdownTitle = styled(NavDropdown.Header)`
    cursor: pointer;
    display: inline-block !important;
    font-size: 150% !important;
`

const CustomDropdownMenu: React.FC<DropdownMenuProps> = ({ title, route, menuItems, onNavItemClick }) => {
    const navigate = useNavigate()
    const { showDropdown, dropdownRef, handleMouseOver, handleMouseLeave, handleItemClick, toggleDropdown } = useDropdown(onNavItemClick)

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleTitleClick = useCallback(async () => {
        onNavItemClick()
        await navigate(route)
    }, [navigate, onNavItemClick, route])

    const menuItemsComponents = useMemo(() => {
        return menuItems.map((item) => (
            <Dropdown.Item key={item.text} as={Link} to={item.href} state={{ accordionItemToOpen: item.accordionItemToOpen }} onClick={handleItemClick}>
                {item.text}
            </Dropdown.Item>
        ))
    }, [menuItems, handleItemClick])

    return isMobile ? (
        <MobileNavDropdown
            ref={dropdownRef}
            title={
                <StyledDropdownTitle
                    as="h2"
                    aria-label="Desplegable con enlace"
                    onClick={() => {
                        handleTitleClick().catch((error: unknown) => {
                            console.error('Navigation error:', error)
                        })
                    }}
                >
                    {title}
                </StyledDropdownTitle>
            }
            show={showDropdown}
            onToggle={toggleDropdown}
            onClick={handleMouseOver}
        >
            {menuItemsComponents}
        </MobileNavDropdown>
    ) : (
        <NavDropdown
            ref={dropdownRef}
            title={
                <StyledDropdownTitle
                    as="h2"
                    aria-label="Desplegable con enlace"
                    onClick={() => {
                        handleTitleClick().catch((error: unknown) => {
                            console.error('Navigation error:', error)
                        })
                    }}
                    tabIndex={0}
                >
                    {title}
                </StyledDropdownTitle>
            }
            show={showDropdown}
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseLeave}
        >
            {menuItemsComponents}
        </NavDropdown>
    )
}

export default CustomDropdownMenu

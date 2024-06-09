import React, { useCallback, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'
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

const StyledDropdownTitle = styled(NavDropdown.Header)`
    cursor: pointer;
    display: inline-block !important;
    font-size: 150% !important;
`

const CustomDropdownMenu: React.FC<DropdownMenuProps> = ({ title, route, menuItems, onNavItemClick }) => {
    const navigate = useNavigate()
    const { showDropdown, dropdownRef, handleMouseOver, handleMouseLeave, handleItemClick } = useDropdown(onNavItemClick)

    const handleTitleClick = useCallback(() => {
        onNavItemClick()
        navigate(route)
    }, [navigate, onNavItemClick, route])

    const menuItemsComponents = useMemo(() => {
        return menuItems.map((item, index) => (
            <NavDropdown.Item key={index} as={Link} to={item.href} state={{ accordionItemToOpen: item.accordionItemToOpen }} onClick={handleItemClick}>
                {item.text}
            </NavDropdown.Item>
        ))
    }, [menuItems, handleItemClick])

    return (
        <NavDropdown
            ref={dropdownRef}
            title={
                <StyledDropdownTitle aria-label="Desplegable con enlace" role="heading" aria-level={1} onClick={handleTitleClick} tabIndex={0}>
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

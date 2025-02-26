import React from 'react'
import { Button } from 'react-bootstrap'
import { ProfileSection } from '../SideBar'

interface ButtonComponentProps {
    section: ProfileSection
    text: string
    hoveredButton: number | null
    setHoveredButton: (value: number | null) => void
    buttonIndex: number
    changePage: (section: ProfileSection) => void
}

/**
 * Renders a button that navigates to a specified section.
 * The button changes style when hovered over and triggers a page change on click.
 *
 * @component
 * @param {ButtonComponentProps} props - The properties for the ButtonComponent.
 * @returns {React.JSX.Element} The rendered ButtonComponent.
 */
const NavigationButton: React.FC<ButtonComponentProps> = ({ section, text, hoveredButton, setHoveredButton, buttonIndex, changePage }) => {
    const buttonBaseStyle = {
        width: '100%',
        height: '100%',
        fontSize: '1.2rem',
        color: '#fff',
        backgroundColor: '#343a40',
        border: 'none',
        borderRadius: 0,
        padding: '1rem 0',
        borderTop: '1px solid #dee2e6',
        borderBottom: '1px solid #dee2e6',
        margin: 0,
        cursor: 'pointer',
        ...(hoveredButton === buttonIndex ? { backgroundColor: '#495057' } : {})
    }

    return (
        <Button
            style={buttonBaseStyle}
            onClick={() => { changePage(section); }}
            onMouseEnter={() => { setHoveredButton(buttonIndex); }}
            onMouseLeave={() => { setHoveredButton(null); }}
        >
            {text}
        </Button>
    )
}

export default NavigationButton

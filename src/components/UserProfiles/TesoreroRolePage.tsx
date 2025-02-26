import React, { useState } from 'react'
import { People } from 'react-bootstrap-icons'
import { PageContainer, Title, StyledAccordion, StyledAccordionItem, StyledAccordionHeader, StyledAccordionBody } from './CommonStyles'
import { ProfileSection } from './SideBar'
import { ProfileMenuSection, RolePageProps } from './types'
import NavigationButton from './CommonComponents/NavigationButton'

/**
 * An array of sections for the profile menu in the Tesorero role page.
 *
 * Each section represents a category of management functionalities available to the Treasurer role,
 * including management of members and financial accounting.
 *
 * @constant {ProfileMenuSection[]} sections
 * @type {ProfileMenuSection[]}
 * @property {string} key - A unique key for each section, used as the event key in the accordion.
 * @property {React.JSX.Element} icon - The icon associated with the section, displayed in the accordion header.
 * @property {string} title - The title of the section, shown in the accordion header.
 * @property {Object[]} buttons - An array of button objects for the section, allowing navigation to different management pages.
 * @property {ProfileSection} buttons.section - The section that the button navigates to when clicked.
 * @property {string} buttons.text - The display text of the button, shown to the user.
 * @property {number} buttons.buttonIndex - The index of the button, used for hover effects.
 *
 */
const sections: ProfileMenuSection[] = [
    {
        key: '0',
        icon: <People size="3rem" />,
        title: 'Gestión de socios',
        buttons: [
            {
                text: 'Ver listado socios',
                section: ProfileSection.MembersManager,
                buttonIndex: 0
            },
            {
                text: 'Gestionar pagos socios',
                section: ProfileSection.MembersPaymentsManager,
                buttonIndex: 1
            }
        ]
    }
]

/**
 * TesoreroRolePage component for managing the Treasurer role in the application.
 *
 * This component displays an accordion menu with sections for managing members and financial accounting.
 * Each section contains buttons that allow navigation to different management pages.
 *
 * @component
 * @param {RolePageProps} props - The props for the component.
 * @param {function} props.changePage - A function to change the page based on the selected section.
 *
 * @returns {React.JSX.Element} The rendered component.
 *
 * @example
 * // Usage
 * <TesoreroRolePage changePage={handleChangePage} />
 */
const TesoreroRolePage: React.FC<RolePageProps> = ({ changePage }) => {
    const [hoveredButton, setHoveredButton] = useState<number | null>(null)

    return (
        <PageContainer>
            <Title>SECCIÓN DEL TESORERO</Title>
            <StyledAccordion>
                {sections.map(({ key, icon, title, buttons }) => (
                    <StyledAccordionItem eventKey={key} key={key}>
                        <StyledAccordionHeader>
                            {icon} {title}
                        </StyledAccordionHeader>
                        <StyledAccordionBody>
                            {buttons.map(({ section, text, buttonIndex }) => (
                                <NavigationButton
                                    key={text}
                                    section={section}
                                    text={text}
                                    hoveredButton={hoveredButton}
                                    setHoveredButton={setHoveredButton}
                                    buttonIndex={buttonIndex}
                                    changePage={changePage}
                                />
                            ))}
                        </StyledAccordionBody>
                    </StyledAccordionItem>
                ))}
            </StyledAccordion>
        </PageContainer>
    )
}

export default TesoreroRolePage

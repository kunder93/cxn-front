import React, { useState } from 'react'
import { People, Gear } from 'react-bootstrap-icons'
import { PageContainer, Title, StyledAccordion, StyledAccordionItem, StyledAccordionHeader, StyledAccordionBody } from './CommonStyles'
import { ProfileSection } from './SideBar'
import NavigationButton from './CommonComponents/NavigationButton'
import { ProfileMenuSection, RolePageProps } from './types'

/**
 * An array of sections for the profile menu in the Secretario role page.
 *
 * @constant {ProfileMenuSection[]} sections
 * @type {ProfileMenuSection[]}
 * @description Each section includes a unique key, an icon, a title, and an array of buttons
 * that navigate to different profile sections.
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
                buttonIndex: 1
            }
        ]
    },
    {
        key: '2',
        icon: <Gear size="3rem" />,
        title: 'Gestión de administración',
        buttons: [
            {
                text: 'Mensajes recibidos',
                section: ProfileSection.MessagesManager,
                buttonIndex: 5
            },
            {
                text: 'Inscritos torneo',
                section: ProfileSection.TournamentParticipantManager,
                buttonIndex: 6
            }
        ]
    }
]

/**
 * Represents the Secretario Role Page component.
 *
 * @component
 * @param {RolePageProps} props - The properties for the SecretarioRolePage component.
 * @param {function} props.changePage - A function to change the current page based on the selected section.
 * @returns {React.JSX.Element} The rendered SecretarioRolePage component.
 */
const SecretarioRolePage: React.FC<RolePageProps> = ({ changePage }) => {
    const [hoveredButton, setHoveredButton] = useState<number | null>(null)

    return (
        <PageContainer>
            <Title>SECCIÓN DEL SECRETARIO</Title>
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

export default SecretarioRolePage

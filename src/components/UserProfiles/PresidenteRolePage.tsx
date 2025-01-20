import React, { useState } from 'react'
import { People, Gear } from 'react-bootstrap-icons'
import { ProfileSection } from './SideBar'
import NavigationButton from './CommonComponents/NavigationButton'
import { ProfileMenuSection, RolePageProps } from './types'
import { PageContainer, StyledAccordion, StyledAccordionBody, StyledAccordionHeader, StyledAccordionItem, Title } from './CommonStyles'

/**
 * An array of sections available in the President's role page.
 * Each section contains an icon, title, and a set of buttons that navigate to different profile sections.
 *
 * @type {ProfileMenuSection[]}
 */
const sections: ProfileMenuSection[] = [
    {
        key: '0',
        icon: <People size="3rem" />,
        title: 'Gestión de socios',
        buttons: [
            { section: ProfileSection.MembersManager, text: 'Ver listado socios', buttonIndex: 1 },
            { section: ProfileSection.FederateManager, text: 'Ver listado federados', buttonIndex: 2 }
        ]
    },
    {
        key: '1',
        icon: <Gear size="3rem" />,
        title: 'Gestión de administración',
        buttons: [
            { section: ProfileSection.MessagesManager, text: 'Mensajes recibidos', buttonIndex: 5 },
            { section: ProfileSection.TournamentParticipantManager, text: 'Inscritos torneo', buttonIndex: 6 },
            { section: ProfileSection.ActivitiesManager, text: 'Gestión actividades', buttonIndex: 7 }
        ]
    }
]

/**
 * Renders the President's role page with sections and associated buttons.
 * Displays an accordion with buttons that navigate to different sections
 * when clicked, and highlights the hovered button.
 *
 * @component
 * @param {PresidentRolePageProps} props - The properties for the PresidenteRolePage.
 * @returns {JSX.Element} The rendered PresidenteRolePage component.
 */
const PresidenteRolePage: React.FC<RolePageProps> = ({ changePage }: { changePage: (section: ProfileSection) => void }): JSX.Element => {
    const [hoveredButton, setHoveredButton] = useState<number | null>(null)

    return (
        <PageContainer>
            <Title>SECCIÓN DEL PRESIDENTE</Title>
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

export default PresidenteRolePage

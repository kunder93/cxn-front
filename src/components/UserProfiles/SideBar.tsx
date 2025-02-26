import React from 'react'
import styled from 'styled-components'
import { BsPerson, BsPeople, BsCalendar, BsClipboardData } from 'react-icons/bs'
import { FaChessKnight } from 'react-icons/fa'
import { UserRole } from '../../store/types/userTypes'
import { SlBookOpen } from 'react-icons/sl'

const SideBarContainer = styled.aside`
    background-color: #f8f9fa;
    padding: 2rem;
    font-family: 'Montserrat', sans-serif;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    font-size: 16px;
    height: 100vh;
    @media (max-width: 768px) {
        display: none;
    }

    ul {
        list-style-type: none;
        padding: 0;

        li {
            margin: 1rem 0;

            a {
                color: #343a40;
                text-decoration: none;
                font-weight: bold;
                display: flex;
                align-items: center;
                padding: 1rem;
                border-radius: 8px;
                transition: background-color 0.3s ease;

                svg {
                    margin-right: 1rem;
                    font-size: 1.5rem;
                }

                &:hover {
                    background-color: #e9ecef;
                }

                &.active {
                    background-color: #343a40;
                    color: #fff;

                    svg {
                        color: #fff;
                    }
                }
            }
        }
    }
`

export enum ProfileSection {
    UserPage = 'UserPage',
    ChessData = 'ChessData',
    MemberCandidate = 'MemberCandidate',
    President = 'President',
    Tesorero = 'Tesorero',
    Secretario = 'Secretario',
    MembersManager = 'MembersManager',
    MessagesManager = 'MessagesManager',
    TournamentParticipantManager = 'TournamentParticipantManager',
    FederateManager = 'FederateManager',
    ActivitiesManager = 'ActivitiesManager',
    MembersPaymentsManager = 'MembersPaymentsManager',
    MembersResources = 'MembersResources'
}

interface SidebarProps {
    roles: UserRole[]
    setProfilePage: (section: ProfileSection) => void
    setSidebarSection: (section: ProfileSection) => void
    currentSection: ProfileSection
}

const Sidebar: React.FC<SidebarProps> = ({ roles, setProfilePage, currentSection, setSidebarSection }) => {
    const handleClick = (section: ProfileSection) => {
        setProfilePage(section)
        setSidebarSection(section)
    }

    const renderLink = (section: ProfileSection, icon: React.JSX.Element, label: string) => (
        <li key={section}>
            <a href="#" className={currentSection === section ? 'active' : ''} onClick={() => { handleClick(section); }}>
                {icon} {label}
            </a>
        </li>
    )

    const sections = [
        { section: ProfileSection.UserPage, icon: <BsPerson />, label: 'Mi Perfil', roles: [UserRole.SOCIO, UserRole.SOCIO_CANDIDATO] },
        { section: ProfileSection.President, icon: <BsPeople />, label: 'Presidente', roles: [UserRole.PRESIDENTE] },
        { section: ProfileSection.Tesorero, icon: <BsClipboardData />, label: 'Tesorero', roles: [UserRole.TESORERO] },
        { section: ProfileSection.Secretario, icon: <BsCalendar />, label: 'Secretario', roles: [UserRole.SECRETARIO] },
        { section: ProfileSection.ChessData, icon: <FaChessKnight />, label: 'Datos de Ajedrez', roles: [UserRole.SOCIO] },
        { section: ProfileSection.MemberCandidate, icon: <BsPeople />, label: 'Bienvenida candidatos', roles: [UserRole.SOCIO_CANDIDATO, UserRole.ADMIN] },
        { section: ProfileSection.MembersResources, icon: <SlBookOpen />, label: 'Recursos para socios', roles: [UserRole.SOCIO, UserRole.ADMIN] }
    ]

    return (
        <SideBarContainer>
            <ul>
                {sections.map(({ section, icon, label, roles: sectionRoles }) => {
                    if (roles.includes(UserRole.ADMIN) || sectionRoles.some((role) => roles.includes(role))) {
                        return renderLink(section, icon, label)
                    }
                    return null
                })}
            </ul>
        </SideBarContainer>
    )
}

export default Sidebar

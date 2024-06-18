// src/components/UserProfiles/Navbar.tsx
import React from 'react'
import styled from 'styled-components'
import { BsPerson, BsGear, BsPeople, BsCalendar, BsClipboardData } from 'react-icons/bs'
import { FaChessKnight } from 'react-icons/fa'
import { UserRole } from '../../store/types/userTypes'
import { ProfileSection } from './SideBar'

const NavbarContainer = styled.nav`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: #f8f9fa;
    padding: 1rem;
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 1000;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);

    a {
        color: #343a40;
        text-decoration: none;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1.2rem;

        svg {
            font-size: 1.5rem;
        }

        &.active {
            color: #007bff;
        }

        &:hover {
            color: #007bff;
        }
    }
`

interface NavbarProps {
    roles: UserRole[]
    currentSection: ProfileSection
    setProfilePage: (section: ProfileSection) => void
    setSidebarSection: (section: ProfileSection) => void
}

const UserProfileNavbar: React.FC<NavbarProps> = ({ roles, currentSection, setProfilePage, setSidebarSection }) => {
    const handleClick = (section: ProfileSection) => {
        setProfilePage(section)
        setSidebarSection(section)
    }

    return (
        <NavbarContainer>
            <a href="#" className={currentSection === ProfileSection.UserPage ? 'active' : ''} onClick={() => handleClick(ProfileSection.UserPage)}>
                <BsPerson />
                <span>Personal</span>
            </a>
            {roles.includes(UserRole.SOCIO) && (
                <a href="#" className={currentSection === ProfileSection.ChessData ? 'active' : ''} onClick={() => handleClick(ProfileSection.ChessData)}>
                    <FaChessKnight />
                    <span>Ajedrez</span>
                </a>
            )}
            {roles.includes(UserRole.ADMIN) && (
                <>
                    <a href="#" className={currentSection === ProfileSection.President ? 'active' : ''} onClick={() => handleClick(ProfileSection.President)}>
                        <BsPeople />
                        <span>Presidente</span>
                    </a>
                    <a href="#" className={currentSection === ProfileSection.Tesorero ? 'active' : ''} onClick={() => handleClick(ProfileSection.Tesorero)}>
                        <BsCalendar />
                        <span>Tesorero</span>
                    </a>
                    <a href="#" className={currentSection === ProfileSection.Secretario ? 'active' : ''} onClick={() => handleClick(ProfileSection.Secretario)}>
                        <BsCalendar />
                        <span>Secretario</span>
                    </a>
                    <a href="#" className={currentSection === ProfileSection.AdminPage ? 'active' : ''} onClick={() => handleClick(ProfileSection.AdminPage)}>
                        <BsGear />
                        <span>Admin</span>
                    </a>
                    <a
                        href="#"
                        className={currentSection === ProfileSection.MemberCandidate ? 'active' : ''}
                        onClick={() => handleClick(ProfileSection.MemberCandidate)}
                    >
                        <BsClipboardData />
                        <span>Candidato</span>
                    </a>
                </>
            )}
            {roles.includes(UserRole.SOCIO_CANDIDATO) && (
                <a
                    href="#"
                    className={currentSection === ProfileSection.MemberCandidate ? 'active' : ''}
                    onClick={() => handleClick(ProfileSection.MemberCandidate)}
                >
                    <BsClipboardData />
                    <span>Candidato</span>
                </a>
            )}
            {roles.includes(UserRole.PRESIDENTE) && (
                <>
                    <a href="#" className={currentSection === ProfileSection.President ? 'active' : ''} onClick={() => handleClick(ProfileSection.President)}>
                        <BsPeople />
                        <span>Presidente</span>
                    </a>
                    <a href="#" className={currentSection === ProfileSection.ChessData ? 'active' : ''} onClick={() => handleClick(ProfileSection.ChessData)}>
                        <FaChessKnight />
                        <span>Ajedrez</span>
                    </a>
                </>
            )}
        </NavbarContainer>
    )
}

export default UserProfileNavbar

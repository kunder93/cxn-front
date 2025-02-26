import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import SocioRolePage from '../components/UserProfiles/SocioRolePage'
import MemberCandidate from '../components/UserProfiles/MemberCandidate'
import PresidenteRolePage from '../components/UserProfiles/PresidenteRolePage'
import TesoreroRolePage from '../components/UserProfiles/TesoreroRolePage'
import SecretarioRolePage from '../components/UserProfiles/SecretarioRolePage'
import MembersManagerPage from './MembersManagerPage'
import ChessQuestionsManager from './ChessQuestionsManager'
import Sidebar, { ProfileSection } from '../components/UserProfiles/SideBar'
import ChessProfile from '../components/UserProfiles/ChessProfile'
import useScrollTop from '../components/Common/hooks/useScrollTop'
import useUserProfile from '../components/UsersServices/hooks/useUserProfile'
import UserProfileNavbar from '../components/UserProfiles/UserProfileNavBar'
import TorneoInscripcionManager from './TorneoInscripcionManager'
import usePageTitle from '../components/Common/hooks/usePageTitle'
import { useFetchProfileImage } from '../components/MyProfile/Hooks/ProfilesHooks'
import { FederateManager } from './FederateManager'
import ActivitiesManager from './ActivitiesManager'
import { MembersPaymentsPage } from './MembersPaymentsPage'
import { MembersResourcesPage } from './MembersResourcesPages'

const MainPageContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: minmax(240px, 20%) minmax(300px, 80%);
    min-height: 100vh;
    position: relative;
    contain: content;
    transition: all 0.3s ease-in-out;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
        min-height: calc(100vh - 56px);
    }
`

const ProfileContent = styled.div`
    height: 100%;
    padding: 2rem;
    overflow: auto;
    transition: opacity 0.3s ease-in-out;
    background: #ffffff;
    position: relative;

    @media (max-width: 768px) {
        padding: 1.5rem;
        height: calc(100vh - 120px);
        padding-bottom: 4rem;
    }
`

const SkeletonSidebar = styled.div`
    background: #f8f9fa;
    border-right: 1px solid #e9ecef;
    padding: 1rem;
    height: 100vh;

    @media (max-width: 768px) {
        display: none;
    }
`

const SkeletonContent = styled.div`
    padding: 2rem;
    background: #fff;

    &::after {
        content: '';
        display: block;
        background: #f8f9fa;
        height: 40px;
        width: 60%;
        margin-bottom: 1rem;
        border-radius: 4px;
        animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            opacity: 1;
        }
    }

    @media (max-width: 768px) {
        padding: 1.5rem;
    }
`

const sectionComponents: Record<ProfileSection, React.FC<{ changePage: (section: ProfileSection) => void }>> = {
    // ... keep your existing section components same as before ...

    [ProfileSection.UserPage]: SocioRolePage,
    [ProfileSection.ChessData]: ChessProfile,
    [ProfileSection.MemberCandidate]: MemberCandidate,
    [ProfileSection.President]: PresidenteRolePage,
    [ProfileSection.Tesorero]: TesoreroRolePage,
    [ProfileSection.Secretario]: SecretarioRolePage,
    [ProfileSection.MembersManager]: MembersManagerPage,
    [ProfileSection.MessagesManager]: ChessQuestionsManager,
    [ProfileSection.TournamentParticipantManager]: TorneoInscripcionManager,
    [ProfileSection.FederateManager]: FederateManager,
    [ProfileSection.ActivitiesManager]: ActivitiesManager,
    [ProfileSection.MembersPaymentsManager]: MembersPaymentsPage,
    [ProfileSection.MembersResources]: MembersResourcesPage
}

const ProfilePage = (): React.JSX.Element => {
    const { userProfile, error } = useUserProfile()
    const [profilePage, setProfilePage] = useState<ProfileSection>(ProfileSection.UserPage)
    const [sidebarSection, setSidebarSection] = useState<ProfileSection>(ProfileSection.UserPage)
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768)
    const [isLoading, setIsLoading] = useState(true)

    useFetchProfileImage()
    usePageTitle('CXN Menú de socio')
    useScrollTop(profilePage)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        // Simulate minimum loading time for smoother transition
        const timer = setTimeout(() => {
            setIsLoading(!userProfile && !error)
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [userProfile, error])

    const changePage = (newSection: ProfileSection) => {
        setProfilePage(newSection)
    }

    const CurrentPageComponent = sectionComponents[profilePage]

    const renderProfileContent = () => {
        if (error) return <p>{error}</p>
        return <CurrentPageComponent changePage={changePage} />
    }

    if (isLoading) {
        return (
            <MainPageContainer>
                <SkeletonSidebar />
                <SkeletonContent />
            </MainPageContainer>
        )
    }

    return (
        <MainPageContainer id="main-page-container">
            {userProfile && (
                <>
                    {!isMobile ? (
                        <Sidebar
                            roles={userProfile.userRoles}
                            setProfilePage={changePage}
                            currentSection={sidebarSection}
                            setSidebarSection={setSidebarSection}
                        />
                    ) : (
                        <UserProfileNavbar
                            roles={userProfile.userRoles}
                            currentSection={sidebarSection}
                            setProfilePage={changePage}
                            setSidebarSection={setSidebarSection}
                        />
                    )}
                </>
            )}
            <ProfileContent id="selected-content-wrapper">{renderProfileContent()}</ProfileContent>
        </MainPageContainer>
    )
}

export default ProfilePage

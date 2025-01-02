import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import SocioRolePage from '../components/UserProfiles/SocioRolePage'
import MemberCandidate from '../components/UserProfiles/MemberCandidate'
import PresidenteRolePage from '../components/UserProfiles/PresidenteRolePage'
import TesoreroRolePage from '../components/UserProfiles/TesoreroRolePage'
import SecretarioRolePage from '../components/UserProfiles/SecretarioRolePage'
import MembersManagerPage from './MembersManagerPage'
import InvoicesManagerPage from './InvoicesManagerPage'
import CompaniesManagerPage from './CompaniesManagerPage'
import ChessQuestionsManager from './ChessQuestionsManager'
import Sidebar, { ProfileSection } from '../components/UserProfiles/SideBar'
import ChessProfile from '../components/UserProfiles/ChessProfile'
import PaymentSheetManagerPage from './PaymentSheetManagerPage'
import useScrollTop from '../components/Common/hooks/useScrollTop'
import useUserProfile from '../components/UsersServices/hooks/useUserProfile'
import UserProfileNavbar from '../components/UserProfiles/UserProfileNavBar'
import TorneoInscripcionManager from './TorneoInscripcionManager'
import usePageTitle from '../components/Common/hooks/usePageTitle'
import { useFetchProfileImage } from '../components/MyProfile/Hooks/ProfilesHooks'
import { FederateManager } from './FederateManager'
import ActivitiesManager from './ActivitiesManager'
import { MembersPaymentsPage } from './MembersPaymentsPage'

const MainPageContainer = styled.div`
    width: 100%;
    height: auto;
    min-height: 100%;
    display: grid;
    grid-template-columns: 20% 80%; /* Define las columnas para sidebar y contenido */

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`

const SidebarWrapper = styled.div`
    height: 100%;
`

const ProfileContent = styled.div`
    height: 100%;
    padding: 2rem;

    @media (max-width: 768px) {
        padding-bottom: 4rem;
        margin: 0;
    }
`

const sectionComponents: Record<ProfileSection, React.FC<{ changePage: (section: ProfileSection) => void }>> = {
    [ProfileSection.UserPage]: SocioRolePage,
    [ProfileSection.ChessData]: ChessProfile,
    [ProfileSection.MemberCandidate]: MemberCandidate,
    [ProfileSection.President]: PresidenteRolePage,
    [ProfileSection.Tesorero]: TesoreroRolePage,
    [ProfileSection.Secretario]: SecretarioRolePage,
    [ProfileSection.MembersManager]: MembersManagerPage,
    [ProfileSection.InvoicesManager]: InvoicesManagerPage,
    [ProfileSection.PaymentSheetsManager]: PaymentSheetManagerPage,
    [ProfileSection.CompaniesManager]: CompaniesManagerPage,
    [ProfileSection.MessagesManager]: ChessQuestionsManager,
    [ProfileSection.TournamentParticipantManager]: TorneoInscripcionManager,
    [ProfileSection.FederateManager]: FederateManager,
    [ProfileSection.ActivitiesManager]: ActivitiesManager,
    [ProfileSection.MembersPaymentsManager]: MembersPaymentsPage
}

const ProfilePage = (): JSX.Element => {
    const { userProfile, error } = useUserProfile()
    const [profilePage, setProfilePage] = useState<ProfileSection>(ProfileSection.UserPage)
    const [sidebarSection, setSidebarSection] = useState<ProfileSection>(ProfileSection.UserPage)
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768)
    // Ejecuta la petición asíncrona
    /*const { loading, error } =*/ useFetchProfileImage()
    usePageTitle('CXN Menú de socio')
    useScrollTop(profilePage)
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const changePage = (newSection: ProfileSection) => {
        setProfilePage(newSection)
    }
    const CurrentPageComponent = sectionComponents[profilePage]
    return (
        <MainPageContainer id="main-page-container">
            {userProfile && (
                <>
                    {!isMobile ? (
                        <SidebarWrapper>
                            <Sidebar
                                roles={userProfile.userRoles}
                                setProfilePage={changePage}
                                currentSection={sidebarSection}
                                setSidebarSection={setSidebarSection}
                            />
                        </SidebarWrapper>
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
            <ProfileContent id="selected-content-wrapper">
                {error ? <p>{error}</p> : CurrentPageComponent ? <CurrentPageComponent changePage={changePage} /> : null}
            </ProfileContent>
        </MainPageContainer>
    )
}

export default ProfilePage

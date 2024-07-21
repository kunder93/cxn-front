import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AdminRolePage from '../components/UserProfiles/AdminRolePage';
import SocioRolePage from '../components/UserProfiles/SocioRolePage';
import useUserProfile from '../components/UsersServices/hooks/useUserProfile';
import MemberCandidate from '../components/UserProfiles/MemberCandidate';
import PresidenteRolePage from '../components/UserProfiles/PresidenteRolePage';
import TesoreroRolePage from '../components/UserProfiles/TesoreroRolePage';
import SecretarioRolePage from '../components/UserProfiles/SecretarioRolePage';
import MembersManagerPage from './MembersManagerPage';
import InvoicesManagerPage from './InvoicesManagerPage';
import CompaniesManagerPage from './CompaniesManagerPage';
import ChessQuestionsManager from './ChessQuestionsManager';
import Sidebar, { ProfileSection } from '../components/UserProfiles/SideBar';
import ChessProfile from '../components/UserProfiles/ChessProfile';
import UserProfileNavbar from '../components/UserProfiles/UserProfileNavBar';
import PaymentSheetManagerPage from './PaymentSheetManagerPage';
import useScrollTop from '../components/Common/hooks/useScrollTop';



const MainPageContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 1rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const ProfileContent = styled.div`
    margin-top: 2rem;
    margin-right: 5rem;

    @media (max-width: 768px) {
        margin-top: 0;
        padding-bottom: 4rem;
        margin: 0;
    }
`;

const sectionComponents = {
    [ProfileSection.AdminPage]: AdminRolePage,
    [ProfileSection.UserPage]: SocioRolePage,
    [ProfileSection.ChessData]: ChessProfile,
    [ProfileSection.MemberCandidate]: MemberCandidate,
    [ProfileSection.President]: PresidenteRolePage,
    [ProfileSection.Tesorero]: TesoreroRolePage,
    [ProfileSection.Secretario]: SecretarioRolePage,
    [ProfileSection.MembersManager]: MembersManagerPage,
    [ProfileSection.InvoicesManger]: InvoicesManagerPage,
    [ProfileSection.PaymentSheetsManager]: PaymentSheetManagerPage,
    [ProfileSection.CompaniesManager]: CompaniesManagerPage,
    [ProfileSection.MessagesManager]: ChessQuestionsManager,
};

const ProfilePage: React.FC = () => {
    const { userProfile, error } = useUserProfile();
    const [profilePage, setProfilePage] = useState<ProfileSection>(ProfileSection.UserPage);
    const [sidebarSection, setSidebarSection] = useState<ProfileSection>(ProfileSection.UserPage);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

    // Custom hook para hacer scroll suave al inicio cuando cambia profilePage
    useScrollTop(profilePage)


    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const CurrentPageComponent = sectionComponents[profilePage];

    const changePage = (newSection: ProfileSection) => {
        setProfilePage(newSection);
        // setSidebarSection(newSection); // Este es el cambio, solo actualizará profilePage
    };

    const changeSidebarSection = (newSection: ProfileSection) => {
        setSidebarSection(newSection);
    };

    return (
        <MainPageContainer>
            {userProfile && (
                <>
                    {!isMobile ? (
                        <Sidebar
                            roles={userProfile.userRoles}
                            setProfilePage={changePage}
                            setSidebarSection={changeSidebarSection}
                            currentSection={sidebarSection}
                        />
                    ) : (
                        <UserProfileNavbar
                            roles={userProfile.userRoles}
                            currentSection={sidebarSection}
                            setProfilePage={changePage}
                            setSidebarSection={changeSidebarSection}
                        />
                    )}
                </>
            )}
            <ProfileContent>
                {error ? <p>{error}</p> : CurrentPageComponent && <CurrentPageComponent changePage={changePage} />}
            </ProfileContent>
        </MainPageContainer>
    );
};

export default ProfilePage;

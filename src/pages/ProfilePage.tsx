import React, { useState } from 'react'
import styled from 'styled-components'
import AdminRolePage from '../components/UserProfiles/AdminRolePage'
import SocioRolePage from '../components/UserProfiles/SocioRolePage'
import useUserProfile from '../components/UsersServices/hooks/useUserProfile'
import MemberCandidate from '../components/UserProfiles/MemberCandidate'
import PresidenteRolePage from '../components/UserProfiles/PresidenteRolePage'
import TesoreroRolePage from '../components/UserProfiles/TesoreroRolePage'
import SecretarioRolePage from '../components/UserProfiles/SecretarioRolePage'
import Sidebar, { ProfileSection } from '../components/UserProfiles/SideBar'
import ChessProfile from '../components/UserProfiles/ChessProfile'


const MainPageContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 1rem;
`

const ProfilePage: React.FC = () => {
    const { userProfile, error } = useUserProfile()
    const [profilePage, setProfilePage] = useState<ProfileSection>(ProfileSection.UserPage)

    return (
        <MainPageContainer>
            {userProfile && (
                <Sidebar roles={userProfile.userRoles} setProfilePage={setProfilePage} />
            )}
            <div>
                {error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        {profilePage === ProfileSection.AdminPage && <AdminRolePage />}
                        {profilePage === ProfileSection.UserPage && <SocioRolePage />}
                        {profilePage === ProfileSection.ChessData && <ChessProfile/>}
                        {profilePage === ProfileSection.MemberCandidate && <MemberCandidate />}
                        {profilePage === ProfileSection.President && <PresidenteRolePage />}
                        {profilePage === ProfileSection.Tesorero && <TesoreroRolePage />}
                        {profilePage === ProfileSection.Secretario && <SecretarioRolePage />}
                        {/* Aquí puedes añadir más páginas según sea necesario */}
                    </>
                )}
            </div>
        </MainPageContainer>
    )
}

export default ProfilePage

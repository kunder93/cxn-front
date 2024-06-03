import { useAppSelector } from '../store/hooks'
import React, { useEffect } from 'react'
import axios from 'axios'
//import PersonalCard from './../components/PersonalCard'
import { useAppDispatch } from '../store/hooks'
//import PresidenteMenu from '../components/PresidenteMenu'
//import UserServicesDropdown from '../components/UsersServices/UserServicesDropdown'
import styled from 'styled-components'

import AdminRolePage from '../components/UserProfiles/AdminRolePage'
import SocioRolePage from '../components/UserProfiles/SocioRolePage'
import { UserProfile } from '../store/types/userTypes'
import { setUserProfile } from '../store/slices/user'
//import { Wrench } from 'react-bootstrap-icons'

const SideBar = styled.aside`
    background-color: pink;
`

const MainPageContainer = styled.div`
    display: grid;
    grid-template-columns: 25fr 50fr 25fr;
`

enum ProfileSection {
    UserPage = 0,
    ChessData = 1,
    AdminPage = 2
}

const ProfilePage: React.FC = () => {
    const userJwt = useAppSelector((state) => state.users.jwt)

    const dispatch = useAppDispatch()
    console.log(userJwt)

    const [profilePage, SetProfilePage]= React.useState<ProfileSection>(ProfileSection.UserPage);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<UserProfile>('https://xadreznaron.es:4443/api/user', {
                    headers: {
                        Authorization: 'Bearer ' + userJwt,
                        'Access-Control-Allow-Origin': '*' //  CORS
                    }
                })

                const userProfile: UserProfile = response.data
                dispatch(setUserProfile(userProfile))
            } catch (error) {
                // Manejar errores aquí si es necesario
                console.error('Error al obtener datos del usuario', error)
            }
        }
        void fetchData() // Llama a la función asincrónica
    }, [userJwt, dispatch])
    return userJwt ? (
        <MainPageContainer>
            <SideBar>
                <ul>
                    <li>
                        <a href="#" onClick={() => SetProfilePage(ProfileSection.UserPage)}>Información personal</a>
                    </li>
                    <li>
                        <a href="#" onClick={() => SetProfilePage(ProfileSection.ChessData)}>Datos de ajedrez</a>
                    </li>
                    <li>
                        <a href="#" onClick={() => SetProfilePage(ProfileSection.AdminPage)}>Pagina Admin</a>
                    </li>
                    <li>
                        <a href="#">Link 4</a>
                    </li>
                    <li>
                        <a href="#">Link 5</a>
                    </li>
                </ul>
            </SideBar>
            <div>

                {/* Verificación de user ROles */}

                {profilePage == ProfileSection.AdminPage && <AdminRolePage></AdminRolePage> }
                {profilePage == ProfileSection.UserPage && <SocioRolePage></SocioRolePage> }
                {/*}
                {userProfile?.userRoles?.includes(UserRole.ADMIN) && <AdminRolePage></AdminRolePage>}
                {userProfile?.userRoles?.includes(UserRole.SOCIO) && <SocioRolePage></SocioRolePage>}
                {userProfile?.userRoles?.includes(UserRole.PRESIDENTE) && <PresidenteRolePage></PresidenteRolePage>}
                {userProfile?.userRoles?.includes(UserRole.SECRETARIO) && <SecretarioRolePage></SecretarioRolePage>}
                {userProfile?.userRoles?.includes(UserRole.TESORERO) &&<> <TesoreroRolePage></TesoreroRolePage> && <PresidenteMenu></PresidenteMenu> </> }
                {/* <PersonalCard />
                 <Button variant="primary" onClick={handleCompaniesManagerButton}>Companies Manager</Button>
                <Button variant="primary" onClick={handleInvoicesManagerButton}>Invoices Manager</Button>
                <Button variant="primary" onClick={handlePaymentSheetManagerButton}>Payment Sheet Manager</Button> 
                */}
                {/*} <div>{/*userRoles[0].startsWith('ROLE_PRESIDENTE') ? <PresidenteMenu></PresidenteMenu> : 'NO ERES PRESIDENTE'</div>
                  <UserServicesDropdown data={[]}></UserServicesDropdown>*/}
            </div>
            <div></div>
        </MainPageContainer>
    ) : (
        <h1>Welcome to the ProfilePage !!</h1>
    )
}

export default ProfilePage

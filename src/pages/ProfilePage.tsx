import { useAppSelector } from '../store/hooks'
import React, { useEffect } from 'react'
import axios from 'axios'
//import PersonalCard from './../components/PersonalCard'
import { useAppDispatch } from '../store/hooks'
//import PresidenteMenu from '../components/PresidenteMenu'
//import UserServicesDropdown from '../components/UsersServices/UserServicesDropdown'
import styled from 'styled-components'
import { Button, Container } from 'react-bootstrap'
import { UserProfile, UserRole, setUserProfile } from '../store/slices/user'
import AdminRolePage from '../components/UserProfiles/AdminRolePage'
import SocioRolePage from '../components/UserProfiles/SocioRolePage'
import PresidenteRolePage from '../components/UserProfiles/PresidenteRolePage'
import SecretarioRolePage from '../components/UserProfiles/SecretarioRolePage'
import TesoreroRolePage from '../components/UserProfiles/TesoreroRolePage'
import PresidenteMenu from '../components/PresidenteMenu'
//import { Wrench } from 'react-bootstrap-icons'

const CustomRow = styled.div`
    border-top: 2px solid grey;
    display: flex;
    justify-content: space-between;
    width: 50%;
    padding-top: 1em;
    padding-bottom: 1em;
`

const CustomCol = styled.div`
    flex: 0 0 calc(50% - 1em);
    margin-left: 1em;
    padding-right: 1em;
    padding-left: 1em;
`

const SideBar = styled.aside`
    background-color: pink;
`

const MainPageContainer = styled.div`
    display: grid;
    grid-template-columns: 25fr 75fr;
`

const renderValue = (value: string | Date | UserRole[]): React.ReactNode => {
    if (typeof value === 'string' || value instanceof Date) {
        return value.toString()
    } else if (Array.isArray(value)) {
        return value.join(', ')
    } else {
        return 'Valor no reconocido'
    }
}

const ProfilePage: React.FC = () => {
    const userJwt = useAppSelector((state) => state.users.jwt)
    const userProfile = useAppSelector((state) => state.users.userProfile)
    const dispatch = useAppDispatch()
    console.log(userJwt)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<UserProfile>('https://xadreznaron.es:4443/api/user', {
                    headers: {
                        Authorization: 'Bearer ' + userJwt,
                        'Access-Control-Allow-Origin': '*' // Agregar el encabezado CORS aquí
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
                        <a href="#">Información personal</a>
                    </li>
                    <li>
                        <a href="#">Datos de ajedrez</a>
                    </li>
                    <li>
                        <a href="#">Link 3</a>
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
                <Container>
                    <h1>Información personal:</h1>
                    {Object.keys(userProfile).map((key) => (
                        <CustomRow key={key}>
                            <CustomCol>{key}:</CustomCol>
                            <CustomCol>{renderValue(userProfile[key as keyof UserProfile])}</CustomCol>
                        </CustomRow>
                    ))}
                    <Button variant="success">Cambiar correo</Button>
                    <Button variant="success">Cambiar contraseña</Button>
                    <Button variant="danger">Darse de baja</Button>
                </Container>
                <Container>
                    <h1>Datos de ajedrez:</h1>
                    <CustomRow>
                        <CustomCol>Federado:</CustomCol>
                        <CustomCol>SI</CustomCol>
                    </CustomRow>
                    <CustomRow>
                        <CustomCol>ID FIDE:</CustomCol>
                        <CustomCol>66786785</CustomCol>
                    </CustomRow>
                    <CustomRow>
                        <CustomCol>Equipo liga gallega:</CustomCol>
                        <CustomCol>CXN NARONTEC A</CustomCol>
                    </CustomRow>
                    <Button variant="success">Solicitar alta federativa</Button>
                </Container>
                {/* Verificación de user ROles */}
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
        </MainPageContainer>
    ) : (
        <h1>Welcome to the ProfilePage !!</h1>
    )
}

export default ProfilePage

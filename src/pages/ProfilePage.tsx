/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useAppSelector } from '../store/hooks'
import React, { useEffect } from 'react'
import axios from 'axios'
import PersonalCard from './../components/PersonalCard'
import { useAppDispatch } from '../store/hooks'
import { setName, setFirstSurname, setSecondSurname, setGender, setEmail, setBirthDate, setUserRoles, setKindMember } from '../store/slices/user/index'
import PresidenteMenu from '../components/PresidenteMenu'
import UserServicesDropdown from '../components/UsersServices/UserServicesDropdown'

const ProfilePage: React.FC = () => {
    const userJwt = useAppSelector((state) => state.users.jwt)
    const dispatch = useAppDispatch()
    console.log(userJwt)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/user', {
                    headers: {
                        Authorization: 'Bearer ' + userJwt
                    }
                })

                console.log(response.data.kindMember)
                dispatch(setName(response.data.name))
                dispatch(setFirstSurname(response.data.firstSurname))
                dispatch(setSecondSurname(response.data.secondSurname))
                dispatch(setGender(response.data.gender))
                dispatch(setEmail(response.data.email))
                dispatch(setBirthDate(response.data.birthDate))
                dispatch(setUserRoles(response.data.userRoles))
                dispatch(setKindMember(response.data.kindMember))
            } catch (error) {
                // Manejar errores aquí si es necesario
                console.error('Error al obtener datos del usuario', error)
            }
        }

        void fetchData() // Llama a la función asincrónica
    }, [userJwt, dispatch])
    const userRoles = useAppSelector((state) => state.users.userRoles)

    return userJwt ? (
        <div>
            <div>
                <PersonalCard />
                {/* <Button variant="primary" onClick={handleCompaniesManagerButton}>Companies Manager</Button>
                <Button variant="primary" onClick={handleInvoicesManagerButton}>Invoices Manager</Button>
                <Button variant="primary" onClick={handlePaymentSheetManagerButton}>Payment Sheet Manager</Button> */}
            </div>
            <div>{userRoles[0].startsWith('ROLE_PRESIDENTE') ? <PresidenteMenu></PresidenteMenu> : 'NO ERES PRESIDENTE'}</div>
            <UserServicesDropdown data={[]}></UserServicesDropdown>
        </div>
    ) : (
        <h1>Welcome to the ProfilePage !!</h1>
    )
}

export default ProfilePage

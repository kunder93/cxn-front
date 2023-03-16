import { useAppSelector } from '../store/hooks'
import React, { useEffect } from 'react'
import axios from 'axios'
import PersonalCard from './../components/PersonalCard'
import { useAppDispatch } from '../store/hooks'
import { setName, setFirstSurname, setSecondSurname, setGender, setEmail, setBirthDate, setUserRoles } from '../store/slices/user/index'
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom";
import { ROUTES } from '../resources/routes-constants'


const ProfilePage = () => {
    const userJwt = useAppSelector((state) => state.users.jwt)
    const dispatch = useAppDispatch()
    console.log(userJwt)
    const navigate = useNavigate()
    const handleCompaniesManagerButton = () => {
        navigate(ROUTES.COMPANIES_MANAGER_ROUTE)
    }

    const handleInvoicesManagerButton = () => {
        navigate(ROUTES.INVOICES_MANAGER_ROUTE)
    }

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/user', {
                headers: {
                    Authorization: 'Bearer ' + userJwt
                }
            })
            .then((response) => {
                dispatch(setName(response.data.name))
                dispatch(setFirstSurname(response.data.firstSurname))
                dispatch(setSecondSurname(response.data.secondSurname))
                dispatch(setGender(response.data.gender))
                dispatch(setEmail(response.data.email))
                dispatch(setBirthDate(response.data.birthDate))
                dispatch(setUserRoles(response.data.userRoles))
            })
    }, [userJwt, dispatch])

    return userJwt ? (
        <div>
            <PersonalCard />
            <Button variant="primary" onClick={handleCompaniesManagerButton}>Companies Manager</Button>
            <Button variant="primary" onClick={handleInvoicesManagerButton}>Invoices Manager</Button>
        </div>
    ) : (
        <h1>Welcome to the ProfilePage !!</h1>
    )
}

export default ProfilePage

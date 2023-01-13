import React, {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from './resources/routes-constants'
import './styles/main.sass'
import ProfilePage from './pages/ProfilePage'

const RootComponent: React.FC = () => { 
 
    return (

            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path={ROUTES.HOMEPAGE_ROUTE} element={<HomePage/>}/> 
                <Route path={ROUTES.LOGIN_ROUTE} element={<LoginPage />} />
                <Route path={ROUTES.SIGNUP_ROUTE} element={<SignUpPage />} /> 
                <Route path={ROUTES.MYPROFILE_ROUTE} element={<ProfilePage/>} />
            </Routes>

    )
}

export default RootComponent

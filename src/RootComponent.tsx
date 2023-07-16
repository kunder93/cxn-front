import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from './resources/routes-constants'
import './styles/main.sass'
import ProfilePage from './pages/ProfilePage'
import CompaniesManagerPage from './pages/CompaniesManagerPage'
import InvoicesManagerPage from './pages/InvoicesManagerPage'
import PaymentSheetManagerPage from './pages/PaymentSheetManagerPage'
import PaymentSheetPDFGenerator from './components/PaymentSheet/PaymentSheetPDFGenerator'
import SchoolPage from './pages/SchoolPage'
import TheClubPage from './pages/TheClubPage'
import MembersManagerTable from './pages/MembersManagerPage'
const RootComponent: React.FC = () => { 
    return (
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path={ROUTES.HOMEPAGE_ROUTE} element={<HomePage/>}/> 
                <Route path={ROUTES.LOGIN_ROUTE} element={<LoginPage />} />
                <Route path={ROUTES.SIGNUP_ROUTE} element={<SignUpPage />} /> 
                <Route path={ROUTES.MYPROFILE_ROUTE} element={<ProfilePage/>} />
                <Route path={ROUTES.COMPANIES_MANAGER_ROUTE} element={<CompaniesManagerPage/>} />
                <Route path={ROUTES.INVOICES_MANAGER_ROUTE} element={<InvoicesManagerPage/>}/>
                <Route path={ROUTES.PAYMENT_SHEET_MANAGER_ROUTE} element={<PaymentSheetManagerPage/>}/>
                <Route path={ROUTES.PDF_DOCUMENT} element={<PaymentSheetPDFGenerator />}/>
                <Route path={ROUTES.SCHOOL} element={<SchoolPage/>}/>
                <Route path={ROUTES.THECLUB} element={<TheClubPage/>}/>
                <Route path={ROUTES.MEMBERS_MANAGER} element={<MembersManagerTable/>}/>
            </Routes>
    )
}

export default RootComponent

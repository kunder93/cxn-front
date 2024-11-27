import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from './resources/routes-constants'
import './styles/main.scss'
import ProfilePage from './pages/ProfilePage'
import CompaniesManagerPage from './pages/CompaniesManagerPage'
import InvoicesManagerPage from './pages/InvoicesManagerPage'
import PaymentSheetManagerPage from './pages/PaymentSheetManagerPage'
import SchoolPage from './pages/School/SchoolPage'
import TheClubPage from './pages/TheClubPage'
import MembersManagerTable from './pages/MembersManagerPage'
import SchoolKids from './pages/School/SchoolKids'
import SchoolOld from './pages/School/SchoolOld'
import SchoolOnline from './pages/School/SchoolOnline'
import SchoolResources from './pages/School/SchoolResources'
import LibraryManagerPage from './pages/LibraryManagerPage'
import PaymentSheetPDFGeneratorWrapper from './components/PaymentSheet/PaymentSheetPdfGeneratorWrapper'
import ActivitiesPage from './pages/ActivitiesPage'
import ScrollTopWrapper from './components/Common/ScrollTopWrapper'
import PrivacyPolicy from './pages/PrivacyPolicy'
import LegalNotice from './pages/LegalNotice'
import ChessQuestionsManager from './pages/ChessQuestionsManager'
import TorneoBases from './components/TorneoPromocion/TorneoBases'
import TorneoCartel from './components/TorneoPromocion/TorneoCartel'
import TorneoInscripcion from './components/TorneoPromocion/TorneoInscripcion'
const RootComponent = (): JSX.Element => {
    return (
        <ScrollTopWrapper>
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path={ROUTES.HOMEPAGE_ROUTE} element={<HomePage />} />
                <Route path={ROUTES.LOGIN_ROUTE} element={<LoginPage />} />
                <Route path={ROUTES.SIGNUP_ROUTE} element={<SignUpPage />} />
                <Route path={ROUTES.MYPROFILE_ROUTE} element={<ProfilePage />} />
                <Route path={ROUTES.COMPANIES_MANAGER_ROUTE} element={<CompaniesManagerPage />} />
                <Route path={ROUTES.INVOICES_MANAGER_ROUTE} element={<InvoicesManagerPage />} />
                <Route path={ROUTES.PAYMENT_SHEET_MANAGER_ROUTE} element={<PaymentSheetManagerPage />} />
                <Route path={ROUTES.PDF_DOCUMENT} element={<PaymentSheetPDFGeneratorWrapper />} />
                <Route path={ROUTES.SCHOOL_CHILDS} element={<SchoolKids />} />
                <Route path={ROUTES.SCHOOL_OLDS} element={<SchoolOld />} />
                <Route path={ROUTES.SCHOOL_ONLINE} element={<SchoolOnline />} />
                <Route path={ROUTES.SCHOOL} element={<SchoolPage />} />
                <Route path={ROUTES.SCHOOL_RESOURCES} element={<SchoolResources />} />
                <Route path={ROUTES.THECLUB} element={<TheClubPage />} />
                <Route path={ROUTES.MEMBERS_MANAGER} element={<MembersManagerTable />} />
                <Route path={ROUTES.LIBRARY_MANAGER_ROUTE} element={<LibraryManagerPage />} />
                <Route path={ROUTES.ACTIVITIES} element={<ActivitiesPage />} />
                <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />
                <Route path={ROUTES.LEGAL_NOTICE} element={<LegalNotice />} />
                <Route path={ROUTES.CHESS_QUESTIONS_MANAGER} element={<ChessQuestionsManager />} />
                <Route path={ROUTES.TORNEO_BASES} element={<TorneoBases />} />
                <Route path={ROUTES.TORNEO_CARTEL} element={<TorneoCartel />} />
                <Route path={ROUTES.TORNEO_INSCRIPCION} element={<TorneoInscripcion />} />
            </Routes>
        </ScrollTopWrapper>
    )
}

export default RootComponent

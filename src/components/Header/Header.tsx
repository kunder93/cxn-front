import React, { useEffect, useRef, useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useAppSelector } from '../../store/hooks'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../resources/routes-constants'
import CxnLogo from '../../images/LogoCXN.svg'
import styled from 'styled-components'
import UserLoggedHeaderNavBar from './UserLoggedHeaderNavBar'
import CustomDropdownMenu from './CustomDropdownMenu'

// Estilos personalizados aquí...

const NavLogo = styled.img`
    filter: invert(100%) saturate(80%) brightness(70%);
    width: 75%;
    height: 75%;
    max-width: 100px;
`

const StyledNavbar = styled(Navbar)`
    column-gap: 1em;
    background: linear-gradient(to top, #212529, #292d31, #383b3f);
    .navbar-toggler.collapsed {
        margin-right: 1em;
    }
    #responsive-navbar-nav {
        padding-left: 2em;
    }
    .navbar-toggler {
        margin-right: 1em;
    }
`

const NavbarBrandStyled = styled(Navbar.Brand)`
    padding-bottom: 0.5em;
    margin-left: 1em;
    &:hover {
        filter: invert(90%) saturate(100%) brightness(100%);
    }
    &:focus {
        &:focus-visible {
            outline: 4px solid #2b5fa3c8;
            outline-offset: 2px;
        }
    }
`

const InsideOptionsNav = styled(Nav)`
    column-gap: 1.5em;
    > .nav-link {
        font-size: 150%;
    }
`

const CustomNav = styled(Nav)`
    font-size: 150%;
    gap: 30px;
    padding-right: 2em;
    @media (max-width: 768px) {
        gap: 0px;
        border-top: 2px solid grey;
        margin-top: 0.5em;
        padding-top: 0.5em;
        margin-right: 3em;
    }
`

const CXN_BLOG_URL = 'https://xadreznaron.wordpress.com/'

const CollapsibleNavigationBar: React.FC = () => {
    const [expanded, setExpanded] = useState(false)
    const userJwt = useAppSelector<string>((state) => state.users.jwt)
    const isUserLoggedIn = userJwt.length !== 0

    const navbarRef = useRef<HTMLDivElement>(null)

    const handleToggle = () => setExpanded(!expanded)
    const handleNavItemClick = () => setExpanded(false)
    const handleNavbarBrandClick = () => setExpanded(false)

    const handleClickOutside = (event: MouseEvent) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
            setExpanded(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <StyledNavbar ref={navbarRef} expanded={expanded} className="sticky-top" collapseOnSelect expand="sm" data-bs-theme="dark" id="main-navigation-bar">
            <NavbarBrandStyled as={Link} to={''} tabIndex={0} aria-label="Link a la página principal." onClick={handleNavbarBrandClick}>
                <NavLogo alt="CXN Logo" src={CxnLogo} />
            </NavbarBrandStyled>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleToggle} /> {/* Botón de alternancia */}
            <Navbar.Collapse id="responsive-navbar-nav">
                <InsideOptionsNav className="me-auto">
                    <CustomDropdownMenu
                        title={'Escuela'}
                        route={ROUTES.SCHOOL}
                        menuItems={[
                            { text: 'Niños', href: ROUTES.SCHOOL_CHILDS },
                            { text: 'Adultos', href: ROUTES.SCHOOL_OLDS },
                            { text: 'Online', href: ROUTES.SCHOOL_ONLINE },
                            { text: 'Recursos', href: ROUTES.SCHOOL_RESOURCES }
                        ]}
                        onNavItemClick={handleNavItemClick}
                    />
                    <Nav.Link as={Link} title="Actividades" to={ROUTES.ACTIVITIES} onClick={handleNavItemClick}>
                        Actividades
                    </Nav.Link>
                    <CustomDropdownMenu
                        title="El Club"
                        route={ROUTES.THECLUB}
                        menuItems={[
                            { text: 'Directiva', href: ROUTES.THECLUB, accordionItemToOpen: '1' },
                            { text: 'Estatutos', href: ROUTES.THECLUB, accordionItemToOpen: '2' },
                            { text: 'Historia', href: ROUTES.THECLUB, accordionItemToOpen: '4' },
                            { text: 'Contacto', href: ROUTES.THECLUB, accordionItemToOpen: '5' },
                            { text: 'Localización', href: ROUTES.THECLUB, accordionItemToOpen: '6' },
                            { text: 'Equipos', href: ROUTES.THECLUB, accordionItemToOpen: '3' }
                        ]}
                        onNavItemClick={handleNavItemClick}
                    />

                    {/* 
<CustomDropdownMenu
    title="IV Torneo promoción" // Título que aparecerá en el menú desplegable
    route={ROUTES.TORNEO_BASES} // Ruta a la que redirige el botón principal del menú
    menuItems={[
        { text: 'Cartel', href: ROUTES.TORNEO_CARTEL }, // Primer ítem del menú con enlace a 'Cartel'
        { text: 'Bases', href: ROUTES.TORNEO_BASES }, // Segundo ítem del menú con enlace a 'Bases'
        { text: 'Inscripción', href: ROUTES.TORNEO_INSCRIPCION } // Tercer ítem del menú con enlace a 'Inscripción'
    ]}
    onNavItemClick={handleNavItemClick} // Evento manejador al hacer clic en un ítem del menú
/>
*/}
                    <Nav.Link as={Link} title="Actividades" to={ROUTES.ACTIVITIES} onClick={handleNavItemClick}>
                        Actividades
                    </Nav.Link>
                    <Nav.Link title="Blog CXN" href={CXN_BLOG_URL} target="_blank" rel="noopener noreferrer" onClick={handleNavItemClick}>
                        Blog
                    </Nav.Link>
                </InsideOptionsNav>
                {isUserLoggedIn ? (
                    <UserLoggedHeaderNavBar />
                ) : (
                    <CustomNav className="ms-auto">
                        <Nav.Link as={Link} to={ROUTES.SIGNUP_ROUTE} onClick={handleNavItemClick}>
                            Unirse
                        </Nav.Link>
                        <Nav.Link as={Link} to={ROUTES.LOGIN_ROUTE} onClick={handleNavItemClick}>
                            ZonaCXN
                        </Nav.Link>
                    </CustomNav>
                )}
            </Navbar.Collapse>
        </StyledNavbar>
    )
}

export default CollapsibleNavigationBar

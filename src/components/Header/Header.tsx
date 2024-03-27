import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useAppSelector } from '../../store/hooks'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../resources/routes-constants'
import CxnLogo from '../../images/LogoCXN.svg'
import styled from 'styled-components'
import UserLoggedHeaderNavBar from './UserLoggedHeaderNavBar'
import CustomDropdownMenu from './CustomDropdownMenu'

const primaryColor = '#212529'
const navLogoWidth = '100%'
const navLogoHeight = '100%'

const NavLogo = styled.img`
    filter: invert(100%) saturate(80%) brightness(70%);
    width: ${navLogoWidth};
    height: ${navLogoHeight};
    max-width: 100px;
`

const StyledNavbar = styled(Navbar)`
    column-gap: 1em;
    background: linear-gradient(to top, ${primaryColor}, #292d31, #383b3f);
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
        /* Hacer que el elemento sea enfocable */
        &:focus-visible {
            outline: 4px solid #2b5fa3c8; // Estilo del borde de foco
            outline-offset: 2px; // Desplazamiento del  borde para que no cubra la imagen
        }
    }
`
const InsideOptionsNav = styled(Nav)`
    column-gap: 1.5em;
    /* Aplicar estilos solo a los Nav.Link directamente dentro de InsideOptionsNav */
    > .nav-link {
        font-size: 150%;
    }
`

const CustomNav = styled(Nav)`
    font-size: 150%;
    gap: 30px;
    padding-right: 2em;
`

const CollapsibleNavigationBar: React.FC = () => {
    const userJwt = useAppSelector<string>((state) => state.users.jwt)
    const isUserLoggedIn = userJwt.length !== 0

    return (
        <StyledNavbar className="sticky-top" collapseOnSelect expand="sm" data-bs-theme="dark" id="main-navigation-bar">
            <NavbarBrandStyled as={Link} to={''} tabIndex={0} aria-label="Link a la página principal.">
                <NavLogo alt="CXN Logo" src={CxnLogo} />
            </NavbarBrandStyled>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
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
                    />
                    <CustomDropdownMenu
                        title="El Club"
                        route={ROUTES.THECLUB}
                        menuItems={[
                            { text: 'Directiva', href: ROUTES.THECLUB, accordionItemToOpen: '1' },
                            { text: 'Estatutos', href: ROUTES.THECLUB, accordionItemToOpen: '2' },
                            { text: 'Equipos', href: ROUTES.THECLUB, accordionItemToOpen: '3' },
                            { text: 'Historia', href: ROUTES.THECLUB, accordionItemToOpen: '4' },
                            { text: 'Contacto', href: ROUTES.THECLUB, accordionItemToOpen: '5' },
                            { text: 'Localización', href: ROUTES.THECLUB, accordionItemToOpen: '6' }
                        ]}
                    />
                    <Nav.Link as={Link} title="Actividades" to={ROUTES.ACTIVITIES}>
                        Actividades
                    </Nav.Link>
                    <Nav.Link title="Blog CXN" href="https://xadreznaron.wordpress.com/" target="_blank" rel="noopener noreferrer">
                        Blog
                    </Nav.Link>
                </InsideOptionsNav>

                {isUserLoggedIn ? (
                    <UserLoggedHeaderNavBar></UserLoggedHeaderNavBar>
                ) : (
                    <CustomNav className="ms-auto">
                        <Nav.Link as={Link} to={ROUTES.SIGNUP_ROUTE}>
                            Unirse
                        </Nav.Link>
                        <Nav.Link as={Link} to={ROUTES.LOGIN_ROUTE}>
                            ZonaCXN
                        </Nav.Link>
                    </CustomNav>
                )}
            </Navbar.Collapse>
        </StyledNavbar>
    )
}

export default CollapsibleNavigationBar

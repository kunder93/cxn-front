import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useAppSelector } from '../store/hooks'
import {useAppDispatch } from '../store/hooks'
import {removeJwt} from '../store/slices/user/index'
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from '../resources/routes-constants'
import logo from '../images/LogoCXN.svg'
import { NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';

const NavLogo = styled.img`
    filter:  invert(100%) saturate(80%) brightness(70%);
`



const Header = () => {
  
  const userJwt = useAppSelector((state) => state.users.jwt)
  const dispatch = useAppDispatch()

  const firstName = () => {if (userJwt.length  !== 0){return true}};

  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(removeJwt())
    navigate(ROUTES.HOMEPAGE_ROUTE)
  }

  
  function CollapsibleNavigationBar() {
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState(false);
    const [showTimeoutId, setShowTimeoutId] = useState<NodeJS.Timeout>();

    const handleMouseOver = () => {
      // Set a timeout of 1 second before showing the dropdown
      const timeoutId = setTimeout(() => {
        setShowDropdown(true);
      }, 1000);
      // Store the timeout id in state to clear it later
      setShowTimeoutId(timeoutId);
    };
    const handleMouseLeave = () => {
    // Clear the timeout if the mouse leaves the dropdown
    if (showTimeoutId) {
      clearTimeout(showTimeoutId);
      setShowTimeoutId(undefined);
      setShowDropdown(false)
    }
  };
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link}  to={ROUTES.HOMEPAGE_ROUTE}> <NavLogo src={logo} width={100} height={60} alt="Logo" /> </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Inicio</Nav.Link>
             
              <NavDropdown title="El Club" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Localización</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Historia
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Directiva</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">
                  Estatutos
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.5">
                  Equipos
                </NavDropdown.Item>
              </NavDropdown>
              
              <NavDropdown  title="Escuela" id="collasible-nav-dropdown"  
              show={showDropdown}
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              onClick={()=>navigate(ROUTES.SCHOOL)}
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Hazte socio" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>

            </Nav>

               {firstName() ? (
            <Nav className="ms-auto">
              <Nav.Link as={Link} to={ROUTES.MYPROFILE_ROUTE}>My profile</Nav.Link>
              <Nav.Link as={Link} to={ROUTES.HOMEPAGE_ROUTE} onClick = {logoutHandler}>Logout</Nav.Link>
            </Nav>
          )
          :
         (
            <Nav className="ms-auto">
              <Nav.Link as={Link} to={ROUTES.SIGNUP_ROUTE}>Sign up</Nav.Link>
              <Nav.Link as={Link} to={ROUTES.LOGIN_ROUTE}>Log in</Nav.Link>
            </Nav>
          )
        }

          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  



  return (
    <div>
      <CollapsibleNavigationBar></CollapsibleNavigationBar>
    </div>
  )
}
export default Header
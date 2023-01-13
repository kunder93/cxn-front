import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useAppSelector } from '../store/hooks'
import {useAppDispatch } from '../store/hooks'
import {removeJwt} from '../store/slices/user/index'
import { useNavigate } from "react-router-dom";
import { ROUTES } from '../resources/routes-constants'

const Header = () => {
  
  const userJwt = useAppSelector((state) => state.users.jwt)
  const dispatch = useAppDispatch()

  const firstName = () => {if (userJwt.length  !== 0){return true}};

  const logoutHandler = () => {
    dispatch(removeJwt())
    navigate(ROUTES.HOMEPAGE_ROUTE)
  }

  const navigate = useNavigate()

  const myProfileHandler = () => {
    navigate(ROUTES.MYPROFILE_ROUTE)
  }

  const logoHandler = () => {
    navigate(ROUTES.HOMEPAGE_ROUTE)
  }

  return (
    <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand  href = "#" onClick = {logoHandler}>CXN Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {firstName() ? (
            <Nav className="ms-auto">
              <Nav.Link onClick = {myProfileHandler}>My Profile</Nav.Link>
              <Nav.Link onClick = {logoutHandler}>Logout</Nav.Link>
            </Nav>
          )
          :
         (
            <Nav className="ms-auto">
              <Nav.Link href="/signup">Sign Up</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          )
        }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default Header
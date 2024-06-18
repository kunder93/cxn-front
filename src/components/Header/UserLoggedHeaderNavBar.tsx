import React, { useState } from 'react'
import { Nav } from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons'
import { useAppDispatch } from '../../store/hooks'
import { removeJwt } from '../../store/slices/user'
import { ROUTES } from '../../resources/routes-constants'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const UserProfileIcon = styled(PersonCircle)`
    width: 50px;
    height: 50px;
    min-height: 50px;
    min-width: 50px;
    background-color: grey;
    fill: #ffffff;
    border-radius: 50%;
    &:hover {
        box-shadow: 0 0 0 8px #343b41;
    }
`

const FloatingWindow = styled.div`
    position: absolute;
    top: 90%; /* Position it right below the icon */
    left: calc(95%);
    transform: translateX(-50%);
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: ${(props) => (props.hidden ? 'none' : 'block')};
    z-index: 9999; /* Higher z-index to appear over other elements */
    animation: slideUp 0.5s ease-in-out;

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translate(-50%, 20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
`

const StyledNav = styled(Nav)`
    padding-right: 2em;

    a {
        font-size: 160%;
    }
    @media (max-width: 768px) {
        gap: 0px;
        border-top: 2px solid grey;
        margin-top: 0.5em;
        padding-top: 0.5em;
        margin-right: 4em;
    }
`

interface IUserLoggedHeaderNavBar {
    handleNavItemClick: () => void
}

const UserLoggedHeaderNavBar: React.FC<IUserLoggedHeaderNavBar> = ({ handleNavItemClick }) => {
    const [imagePopOver, setImagePopOver] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleImageMouseEnter = () => {
        setImagePopOver(true)
    }

    const handleImageMouseLeave = () => {
        setImagePopOver(false)
    }

    const logoutHandler = () => {
        dispatch(removeJwt())
        navigate(ROUTES.HOMEPAGE_ROUTE)
    }

    return (
        <StyledNav className="ms-auto">
            <UserProfileIcon onMouseEnter={handleImageMouseEnter} onMouseLeave={handleImageMouseLeave} />
            <Nav.Link as={Link} to={ROUTES.MYPROFILE_ROUTE} onClick={handleNavItemClick}>
                Zona Socio
            </Nav.Link>
            <Nav.Link as={Link} to={ROUTES.HOMEPAGE_ROUTE} onClick={logoutHandler}>
                Salir
            </Nav.Link>

            <FloatingWindow hidden={!imagePopOver}>
                {/* Content for the floating window */}
                En construcción, paciencia!!.
            </FloatingWindow>
        </StyledNav>
    )
}

export default UserLoggedHeaderNavBar

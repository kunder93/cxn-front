import React, { useState } from 'react'
import { Nav } from 'react-bootstrap'
import { useAppDispatch } from '../../store/hooks'
import { PersonCircle } from 'react-bootstrap-icons'
import { removeJwt } from '../../store/slices/user'
import { ROUTES } from '../../resources/routes-constants'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const UserProfileIconStyled = styled(PersonCircle)`
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

const UserLoggedHeaderNavBar: React.FC = () => {
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
        <Nav className="ms-auto">
            <Nav.Link as={Link} to={ROUTES.MYPROFILE_ROUTE}>
                My perfil
            </Nav.Link>
            <Nav.Link as={Link} to={ROUTES.HOMEPAGE_ROUTE} onClick={logoutHandler}>
                Salir
            </Nav.Link>
            <div>
                <UserProfileIconStyled onMouseEnter={handleImageMouseEnter} onMouseLeave={handleImageMouseLeave}></UserProfileIconStyled>
            </div>
            <FloatingWindow hidden={!imagePopOver}>
                {/* Content for the floating window */}
                This is the floating window content.
            </FloatingWindow>
        </Nav>
    )
}

export default UserLoggedHeaderNavBar

import { useState } from 'react'
import { Dropdown, Nav } from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { removeJwt, removeUserProfile } from '../../store/slices/user'
import { ROUTES } from '../../resources/routes-constants'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Image from 'react-bootstrap/Image'
import { UserProfile } from 'store/types/userTypes'

const UserProfileImage = styled(Image)`
    width: 50px;
    height: 50px;
    min-height: 50px;
    min-width: 50px;
    background-color: grey;
    fill: #ffffff;
    border-radius: 50%;
    object-fit: cover;
    &:hover {
        box-shadow: 0 0 0 8px #343b41;
    }
`
const UserProfileNotDefined = styled(PersonCircle)`
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

const ProfileImageContainer = styled.div`
    padding-right: 0.5em;
`

const UserLoggedHeaderNavBar = (): React.JSX.Element => {
    const [imagePopOver, setImagePopOver] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const profileImage = useAppSelector((state) => state.users.profileImage) // Fetch profile image separately
    const userProfile: UserProfile = useAppSelector((state) => state.users.userProfile)

    const logoutHandler = async () => {
        try {
            dispatch(removeJwt())
            dispatch(removeUserProfile())
            await navigate(ROUTES.HOMEPAGE_ROUTE)
        } catch (error) {
            console.error('Logout failed:', error)
            // Consider showing an error notification to the user
        }
    }

    const isInitialProfileImage = profileImage.url === '' && !profileImage.stored

    const profileImageContent = isInitialProfileImage ? (
        <UserProfileNotDefined />
    ) : (
        <UserProfileImage
            src={profileImage.stored ? profileImage.file : profileImage.url || 'User/ProfileImagesExample/NoProfileImage.avif'}
            onMouseEnter={() => {
                setImagePopOver(true)
            }}
            onMouseLeave={() => {
                setImagePopOver(false)
            }}
        />
    )

    return (
        <StyledNav className="ms-auto">
            <ProfileImageContainer>{profileImageContent}</ProfileImageContainer>
            {/* Dropdown for the user's name and logout option */}
            <Dropdown align="end">
                <Dropdown.Toggle as="a" className="nav-link">
                    {userProfile.name + ' ' + userProfile.firstSurname + ' ' + userProfile.secondSurname}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={ROUTES.MYPROFILE_ROUTE}>
                        Mi Perfil
                    </Dropdown.Item>
                    <Dropdown.Item onClick={logoutHandler as unknown as (e: React.MouseEvent) => void}>Salir</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <FloatingWindow hidden={!imagePopOver}>
                {/* Content for the floating window */}
                En construcción, paciencia!!.
            </FloatingWindow>
        </StyledNav>
    )
}

export default UserLoggedHeaderNavBar

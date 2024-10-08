import useModal from '../../components/MyProfile/ChangePassword/hooks/useModal'
import { Button, Container } from 'react-bootstrap'
import styled from 'styled-components'
import SectionRow from './ChangePassword/SectionRow'
import ChangeEmailModal from './ChangeEmail/ChangeEmailModal'
import { UserProfile } from 'store/types/userTypes'
import { renderGenderValues, renderKindMember, renderUserRoles } from '../../utility/userUtilities'
import UnsubscribeMemberModal from './UnsubscribeMember/UnsubscribeMemberModal'
import ChangePasswordModal from './ChangePassword/ChangePasswordModal'
import Image from 'react-bootstrap/Image'
import PersonalImageButtonChanger from './PersonalImageButtonChanger'
import { useAppSelector } from '../../store/hooks'
import { PersonBoundingBox } from 'react-bootstrap-icons'
const StyledContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    padding: 2em;
    min-height: 100vh;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    font-family: 'Montserrat', sans-serif;
`

const LeftColumn = styled.div`
    width: 70%;
    padding-right: 2em;
`

const RightColumn = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ProfileImageContainer = styled.div`
    margin-bottom: 2em;
    display: flex;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
    img {
        width: 150px;
        height: 150px;
        object-fit: cover;
    }
`

const ButtonRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 100%;
    button {
        width: 100%;
        padding: 0.75em 1em;
    }
`

const ProfileDataContainer = styled.div`
    margin-top: 2em;
    padding: 1.5em;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); // Light shadow for visual separation
`

const Title = styled.h1`
    margin-bottom: 2em;
    color: #343a40;
    font-size: 2.5em;
    font-weight: 700;
`
const ProfileImage = styled(Image)`
    width: 150px;
    height: 150px;
    border-radius: 50%; // Make the image a circle
    border: 3px solid #dee2e6; // Add a border for emphasis
    object-fit: cover; // Ensure image is fully contained in the circle
`

const ProfileActionButtonsContainer = styled.div``

const SocioRolePageDataTable = (): JSX.Element => {
    const { modalType, openModal, closeModal } = useModal()
    const userProfile: UserProfile = useAppSelector((state) => state.users.userProfile)
    const profileImage = useAppSelector((state) => state.users.profileImage) // Fetch profile image separately
    const isInitialProfileImage = profileImage?.url === '' && profileImage?.stored === false

    return (
        <StyledContainer>
            {/* Left column for profile data */}
            <LeftColumn>
                <Title>Información personal:</Title>
                <ProfileDataContainer>
                    <SectionRow label="DNI" value={userProfile.dni} />
                    <SectionRow label="Nombre" value={userProfile.name} />
                    <SectionRow label="Apellidos" value={`${userProfile.firstSurname} ${userProfile.secondSurname}`} />
                    <SectionRow label="Fecha de nacimiento" value={new Date(userProfile.birthDate).toLocaleDateString('es-ES')} />
                    <SectionRow label="Género" value={renderGenderValues(userProfile.gender)} />
                    <SectionRow label="Correo electrónico" value={userProfile.email} />
                    <SectionRow label="Tipo de socio" value={renderKindMember(userProfile.kindMember)} />
                    <SectionRow label="Rol del socio" value={renderUserRoles(userProfile.userRoles)} />
                </ProfileDataContainer>
            </LeftColumn>

            {/* Right column for profile image and action buttons */}
            <RightColumn>
                <ProfileImageContainer>
                    {/* Show icon if there's no image, else show profile image */}
                    {isInitialProfileImage ? (
                        <PersonBoundingBox size={150} /> // Custom size for icon
                    ) : (
                        <ProfileImage src={profileImage.stored ? profileImage.file : profileImage.url} alt="Imagen de perfil" rounded />
                    )}
                </ProfileImageContainer>

                <ProfileActionButtonsContainer>
                    <ButtonRow>
                        <PersonalImageButtonChanger />
                        <Button onClick={() => openModal('email')} variant="secondary">
                            Cambiar correo
                        </Button>
                        <Button onClick={() => openModal('password')} variant="secondary">
                            Cambiar contraseña
                        </Button>
                        <Button onClick={() => openModal('unsubscribe')} variant="danger">
                            Darse de baja
                        </Button>
                    </ButtonRow>
                </ProfileActionButtonsContainer>
            </RightColumn>

            {/* Modals for profile actions */}
            <ChangeEmailModal
                show={modalType === 'email'}
                onHide={closeModal}
                userEmail={userProfile.email}
                name={userProfile.name}
                firstsurname={userProfile.firstSurname}
                secondsurname={userProfile.secondSurname}
            />
            <ChangePasswordModal
                show={modalType === 'password'}
                onHide={closeModal}
                userEmail={userProfile.email}
                name={userProfile.name}
                firstSurname={userProfile.firstSurname}
                secondSurname={userProfile.secondSurname}
            />
            <UnsubscribeMemberModal
                show={modalType === 'unsubscribe'}
                onHide={closeModal}
                useremail={userProfile.email}
                name={userProfile.name}
                firstsurname={userProfile.firstSurname}
                secondsurname={userProfile.secondSurname}
            />
        </StyledContainer>
    )
}

export default SocioRolePageDataTable

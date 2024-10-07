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

const StyledContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 100vh;
    padding: 2em 1em;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 5px;
`

const ButtonRow = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 2em;
    font-family: 'Montserrat', sans-serif;

    @media (max-width: 576px) {
        flex-direction: column;
        align-items: center;
        gap: 1em;
        width: 100%;
        button {
            width: 100%;
            height: 4em;
            font-weight: bolder;
            color: white;
        }
        padding-right: 2em;
    }
`

const Title = styled.h1`
    margin-bottom: 1.5em;
    color: #343a40;
    font-size: 2em;
    align-self: flex-start;
`

const SocioRolePageDataTable = (): JSX.Element => {
    const { modalType, openModal, closeModal } = useModal()
    const userProfile: UserProfile = useAppSelector((state) => state.users.userProfile)
    console.log('LA IMAGEN DE PERFIL EN SOCIO ROLE PAGE DATA TABLE ES: ' + userProfile.profileImageUrl)
    return (
        <StyledContainer>
            <Title>Información personal:</Title>
            <Image src={userProfile.profileImageUrl} alt="Imagen de perfil" rounded />
            <SectionRow label="DNI" value={userProfile.dni} />
            <SectionRow label="Nombre" value={userProfile.name} />
            <SectionRow label="Apellidos" value={`${userProfile.firstSurname} ${userProfile.secondSurname}`} />
            <SectionRow label="Fecha de nacimiento" value={new Date(userProfile.birthDate).toLocaleDateString('es-ES')} />
            <SectionRow label="Género" value={renderGenderValues(userProfile.gender)} />
            <SectionRow label="Correo electrónico" value={userProfile.email} />
            <SectionRow label="Tipo de socio" value={renderKindMember(userProfile.kindMember)} />
            <SectionRow label="Rol del socio" value={renderUserRoles(userProfile.userRoles)} />
            <ButtonRow>
                <Button onClick={() => openModal('email')} variant="secondary">
                    Cambiar correo
                </Button>
                <Button onClick={() => openModal('password')} variant="secondary">
                    Cambiar contraseña
                </Button>
                <Button onClick={() => openModal('unsubscribe')} variant="danger">
                    Darse de baja
                </Button>
                <PersonalImageButtonChanger></PersonalImageButtonChanger>
            </ButtonRow>
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

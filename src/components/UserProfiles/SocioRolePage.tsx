import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useAppSelector } from '../../store/hooks'
import styled from 'styled-components'
import { UserProfile } from '../../store/types/userTypes'
import { renderGenderValues, renderKindMember, renderUserRoles } from '../../utility/userUtilities'
import ChangeEmailModal from '../MyProfile/ChangeEmail/ChangeEmailModal'
import ChangePasswordModal from '../../components/MyProfile/ChangePassword/ChangePasswordModal'
import UnsubscribeMemberModal from '../../components/MyProfile/UnsubscribeMember/UnsubscribeMemberModal'

const FirstCustomRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%; /* Ajusta el ancho según sea necesario */
    padding-top: 1em;
    padding-bottom: 1em;
`

const CustomRow = styled.div`
    border-top: 2px solid grey;
    display: flex;
    justify-content: space-between;
    width: 100%; /* Ajusta el ancho según sea necesario */
    padding-top: 1em;
    padding-bottom: 1em;
`

const ButtonsRow = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    width: 100%; /* Ajusta el ancho según sea necesario */
    margin-top: 1em; /* Añade un margen superior si es necesario */
`

const CustomCol = styled.div`
    flex: 0 0 calc(50% - 1em);
    margin-left: 1em;
    padding-right: 1em;
    padding-left: 1em;
`

const StyledContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding-top: 1em;
    padding-bottom: 2em;
    text-align: center; /* Alineación centrada del texto si es necesario */
`

const SocioRolePage: React.FC = () => {
    const userProfile: UserProfile = useAppSelector((state) => state.users.userProfile)

    const [emailModal, setEmailModal] = useState(false)
    const [passwordModal, setPasswordModal] = useState(false)
    const [unsubscribeMemberModal, setUnsubscribeMemberModal] = useState(false)
    function handleChangeEmail() {
        setEmailModal(true)
    }
    function handleChangePassword() {
        setPasswordModal(true)
    }
    function handleUnsubscribeMember() {
        setUnsubscribeMemberModal(true)
    }

    return (
        <StyledContainer>
            <h1>Información personal:</h1>
            <FirstCustomRow>
                <CustomCol>DNI:</CustomCol>
                <CustomCol>{userProfile.dni}</CustomCol>
            </FirstCustomRow>
            <CustomRow>
                <CustomCol>Nombre:</CustomCol>
                <CustomCol>{userProfile.name}</CustomCol>
            </CustomRow>
            <CustomRow>
                <CustomCol>Apellidos:</CustomCol>
                <CustomCol>{userProfile.firstSurname + ' ' + userProfile.secondSurname}</CustomCol>
            </CustomRow>
            <CustomRow>
                <CustomCol>Fecha de nacimiento:</CustomCol>
                <CustomCol>{userProfile.birthDate.toString()}</CustomCol>
            </CustomRow>
            <CustomRow>
                <CustomCol>Género:</CustomCol>
                <CustomCol>{renderGenderValues(userProfile.gender)}</CustomCol>
            </CustomRow>
            <CustomRow>
                <CustomCol>Correo electrónico:</CustomCol>
                <CustomCol>{userProfile.email}</CustomCol>
            </CustomRow>
            <CustomRow>
                <CustomCol>Tipo de socio:</CustomCol>
                <CustomCol>{renderKindMember(userProfile.kindMember)}</CustomCol>
            </CustomRow>
            <CustomRow>
                <CustomCol>Rol del socio:</CustomCol>
                <CustomCol>{renderUserRoles(userProfile.userRoles)}</CustomCol>
            </CustomRow>

            <ButtonsRow>
                <Button onClick={handleChangeEmail} variant="secondary">
                    Cambiar correo
                </Button>
                <Button variant="secondary" onClick={handleChangePassword}>
                    Cambiar contraseña
                </Button>
                <Button variant="danger" onClick={handleUnsubscribeMember}>
                    Darse de baja
                </Button>
            </ButtonsRow>

            <ChangeEmailModal
                show={emailModal}
                onHide={() => setEmailModal(false)}
                userEmail={userProfile.email}
                name={userProfile.name}
                firstSurname={userProfile.firstSurname}
                secondSurname={userProfile.secondSurname}
            />
            <ChangePasswordModal
                show={passwordModal}
                onHide={() => setPasswordModal(false)}
                userEmail={userProfile.email}
                name={userProfile.name}
                firstSurname={userProfile.firstSurname}
                secondSurname={userProfile.secondSurname}
            />
            <UnsubscribeMemberModal
                show={unsubscribeMemberModal}
                onHide={() => setUnsubscribeMemberModal(false)}
                userEmail={userProfile.email}
                name={userProfile.name}
                firstSurname={userProfile.firstSurname}
                secondSurname={userProfile.secondSurname}
            />
        </StyledContainer>
    )
}

export default SocioRolePage

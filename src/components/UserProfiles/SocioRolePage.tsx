import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useAppSelector } from '../../store/hooks'
import styled from 'styled-components'
import { UserProfile } from '../../store/types/userTypes'
import { renderGenderValues, renderKindMember, renderUserRoles } from '../../utility/userUtilities'
import ChangeEmailModal from '../MyProfile/ChangeEmail/ChangeEmailModal'
import ChangePasswordModal from '../../components/MyProfile/ChangePassword/ChangePasswordModal'
import UnsubscribeMemberModal from '../../components/MyProfile/UnsubscribeMember/UnsubscribeMemberModal'

const CustomRow = styled.div`
    border-top: 2px solid grey;
    display: flex;
    justify-content: space-between;
    width: 50%;
    padding-top: 1em;
    padding-bottom: 1em;
`

const CustomCol = styled.div`
    flex: 0 0 calc(50% - 1em);
    margin-left: 1em;
    padding-right: 1em;
    padding-left: 1em;
`

const StyledContainer = styled(Container)`
    padding-top: 1em;
    padding-bottom: 2em;
`

const SocioRolePage: React.FC = () => {
    const userProfile: UserProfile = useAppSelector((state) => state.users.userProfile)

    const [emailModal, setEmailModal] = useState(false)
    const [passwordModal, setPasswordModal] = useState(false)
    const [unsubscribeMemberModal, setUnsubscribeMemberModal] = useState(false)
    function handleChangeEmail() {
        setEmailModal(true)
    }
    function handleChangePassword(){
        setPasswordModal(true)
    }
    function handleUnsubscribeMember(){
        setUnsubscribeMemberModal(true)
    }

    return (
        <StyledContainer>
            <h1>Información personal:</h1>
            <CustomRow>
                <CustomCol>DNI:</CustomCol>
                <CustomCol>{userProfile.dni}</CustomCol>
            </CustomRow>
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

            <Button onClick={handleChangeEmail} variant="success">
                Cambiar correo
            </Button>
            <ChangeEmailModal
                show={emailModal}
                onHide={() => setEmailModal(false)}
                userEmail={userProfile.email}
                name={userProfile.name}
                firstSurname={userProfile.firstSurname}
                secondSurname={userProfile.secondSurname}
            ></ChangeEmailModal>
            <Button variant="success" onClick={handleChangePassword} >Cambiar contraseña</Button>
            <ChangePasswordModal
                show={passwordModal}
                onHide={() => setPasswordModal(false)}
                userEmail={userProfile.email}
                name={userProfile.name}
                firstSurname={userProfile.firstSurname}
                secondSurname={userProfile.secondSurname}
            ></ChangePasswordModal>
            <Button variant="danger" onClick={handleUnsubscribeMember}>Darse de baja</Button>
            <UnsubscribeMemberModal
                show={unsubscribeMemberModal}
                onHide={() => setUnsubscribeMemberModal(false)}
                userEmail={userProfile.email}
                name={userProfile.name}
                firstSurname={userProfile.firstSurname}
                secondSurname={userProfile.secondSurname}
            ></UnsubscribeMemberModal>


        </StyledContainer>
    )
}
export default SocioRolePage

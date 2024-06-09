import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useAppSelector } from '../../store/hooks';
import styled from 'styled-components';
import { UserProfile } from '../../store/types/userTypes';
import { renderGenderValues, renderKindMember, renderUserRoles } from '../../utility/userUtilities';
import ChangeEmailModal from '../MyProfile/ChangeEmail/ChangeEmailModal';
import ChangePasswordModal from '../../components/MyProfile/ChangePassword/ChangePasswordModal';
import UnsubscribeMemberModal from '../../components/MyProfile/UnsubscribeMember/UnsubscribeMemberModal';

const StyledContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; /* Cambio de justify-content */
    min-height: 100vh;
    padding: 2em 1em;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 5px;
`;

const SectionRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1em 0;
    font-family: 'Montserrat', sans-serif;
    border-top: 2px solid #dee2e6;

    &:first-child {
        border-top: none;
    }
`;

const SectionCol = styled.div`
    flex: 0 0 calc(50% - 1em);
    margin-left: 1em;
    padding: 0 1em;
    font-size: 1.2em;
`;

const ButtonRow = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 2em;
    font-family: 'Montserrat', sans-serif;
`;

const Title = styled.h1`
    margin-bottom: 1.5em;
    color: #343a40;
    font-size: 2em;
    align-self: flex-start; /* Alineación del título a la parte superior */
`;

const SocioRolePage: React.FC = () => {
    const userProfile: UserProfile = useAppSelector((state) => state.users.userProfile);
    const [modalType, setModalType] = useState('');

    const openModal = (type: string) => {
        setModalType(type);
    };

    const closeModal = () => {
        setModalType('');
    };

    return (
        <StyledContainer>
            <Title>Información personal:</Title>
            <SectionRow>
                <SectionCol>DNI:</SectionCol>
                <SectionCol>{userProfile.dni}</SectionCol>
            </SectionRow>
            <SectionRow>
                <SectionCol>Nombre:</SectionCol>
                <SectionCol>{userProfile.name}</SectionCol>
            </SectionRow>
            <SectionRow>
                <SectionCol>Apellidos:</SectionCol>
                <SectionCol>{`${userProfile.firstSurname} ${userProfile.secondSurname}`}</SectionCol>
            </SectionRow>
            <SectionRow>
                <SectionCol>Fecha de nacimiento:</SectionCol>
                <SectionCol>{new Date(userProfile.birthDate).toLocaleDateString('es-ES')}</SectionCol>
            </SectionRow>
            <SectionRow>
                <SectionCol>Género:</SectionCol>
                <SectionCol>{renderGenderValues(userProfile.gender)}</SectionCol>
            </SectionRow>
            <SectionRow>
                <SectionCol>Correo electrónico:</SectionCol>
                <SectionCol>{userProfile.email}</SectionCol>
            </SectionRow>
            <SectionRow>
                <SectionCol>Tipo de socio:</SectionCol>
                <SectionCol>{renderKindMember(userProfile.kindMember)}</SectionCol>
            </SectionRow>
            <SectionRow>
                <SectionCol>Rol del socio:</SectionCol>
                <SectionCol>{renderUserRoles(userProfile.userRoles)}</SectionCol>
            </SectionRow>
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
            </ButtonRow>
            <ChangeEmailModal
                show={modalType === 'email'}
                onHide={closeModal}
                userEmail={userProfile.email}
                name={userProfile.name}
                firstSurname={userProfile.firstSurname}
                secondSurname={userProfile.secondSurname}
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
                userEmail={userProfile.email}
                name={userProfile.name}
                firstSurname={userProfile.firstSurname}
                secondSurname={userProfile.secondSurname}
            />
        </StyledContainer>
    );
};

export default SocioRolePage;

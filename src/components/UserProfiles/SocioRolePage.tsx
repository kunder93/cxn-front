import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useAppSelector } from '../../store/hooks';
import styled from 'styled-components';
import { UserProfile } from '../../store/types/userTypes';
import { renderGenderValues, renderKindMember, renderUserRoles } from '../../utility/userUtilities';
import ChangeEmailModal from '../MyProfile/ChangeEmail/ChangeEmailModal';
import ChangePasswordModal from '../../components/MyProfile/ChangePassword/ChangePasswordModal';
import UnsubscribeMemberModal from '../../components/MyProfile/UnsubscribeMember/UnsubscribeMemberModal';

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1em 0;
    font-family: 'Montserrat', sans-serif;

    &:not(:first-child) {
        border-top: 2px solid #dee2e6;
    }
`;

const Col = styled.div`
    flex: 0 0 calc(50% - 1em);
    margin-left: 1em;
    padding: 0 1em;
    font-size: 1.2em; /* Aumenta el tamaño de la fuente */
`;

const ButtonRow = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 2em;
    font-family: 'Montserrat', sans-serif;
`;

const StyledContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2em 1em;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 5px;
`;

const Title = styled.h1`
    margin-bottom: 1.5em;
    color: #343a40;
    font-size: 2em; /* Aumenta el tamaño de la fuente */
`;

const SocioRolePage: React.FC = () => {
    const userProfile: UserProfile = useAppSelector((state) => state.users.userProfile);
    const [emailModal, setEmailModal] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);
    const [unsubscribeMemberModal, setUnsubscribeMemberModal] = useState(false);

    return (
        <StyledContainer>
            <Title>Información personal:</Title>
            <Row>
                <Col>DNI:</Col>
                <Col>{userProfile.dni}</Col>
            </Row>
            <Row>
                <Col>Nombre:</Col>
                <Col>{userProfile.name}</Col>
            </Row>
            <Row>
                <Col>Apellidos:</Col>
                <Col>{`${userProfile.firstSurname} ${userProfile.secondSurname}`}</Col>
            </Row>
            <Row>
                <Col>Fecha de nacimiento:</Col>
                <Col>{new Date(userProfile.birthDate).toLocaleDateString()}</Col>
            </Row>
            <Row>
                <Col>Género:</Col>
                <Col>{renderGenderValues(userProfile.gender)}</Col>
            </Row>
            <Row>
                <Col>Correo electrónico:</Col>
                <Col>{userProfile.email}</Col>
            </Row>
            <Row>
                <Col>Tipo de socio:</Col>
                <Col>{renderKindMember(userProfile.kindMember)}</Col>
            </Row>
            <Row>
                <Col>Rol del socio:</Col>
                <Col>{renderUserRoles(userProfile.userRoles)}</Col>
            </Row>
            <ButtonRow>
                <Button onClick={() => setEmailModal(true)} variant="secondary">
                    Cambiar correo
                </Button>
                <Button onClick={() => setPasswordModal(true)} variant="secondary">
                    Cambiar contraseña
                </Button>
                <Button onClick={() => setUnsubscribeMemberModal(true)} variant="danger">
                    Darse de baja
                </Button>
            </ButtonRow>
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
    );
};

export default SocioRolePage;

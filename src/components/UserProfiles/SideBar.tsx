import React from 'react';
import { UserRole } from '../../store/types/userTypes';
import styled from 'styled-components';

const SideBarContainer = styled.aside`
    background-color: #f8f9fa;
    padding: 1rem;
    font-family: 'Montserrat', sans-serif;

    ul {
        list-style-type: none;
        padding: 0;

        li {
            margin: 1rem 0;

            a {
                color: #343a40;
                text-decoration: none;
                font-weight: bold;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
`;

interface SidebarProps {
    roles: UserRole[];
    setProfilePage: (section: ProfileSection) => void;
}

export enum ProfileSection {
    UserPage,
    ChessData,
    AdminPage,
    MemberCandidate,
    President,
    Tesorero,
    Secretario,
}

const Sidebar: React.FC<SidebarProps> = ({ roles, setProfilePage }) => {
    return (
        <SideBarContainer>
            <ul>
                <li>
                    <a href="#" onClick={() => setProfilePage(ProfileSection.UserPage)}>
                        Información personal
                    </a>
                </li>

                {roles.includes(UserRole.SOCIO) && (
                    <li>
                        <a href="#" onClick={() => setProfilePage(ProfileSection.ChessData)}>
                            Datos de ajedrez
                        </a>
                    </li>
                )}
                {roles.includes(UserRole.ADMIN) && (
                    <>
                        <li>
                            <a href="#" onClick={() => setProfilePage(ProfileSection.ChessData)}>
                                Datos de ajedrez
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => setProfilePage(ProfileSection.President)}>
                                Sección de presidente
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => setProfilePage(ProfileSection.Tesorero)}>
                                Sección de tesorero
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => setProfilePage(ProfileSection.Secretario)}>
                                Sección de secretario
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => setProfilePage(ProfileSection.AdminPage)}>
                                Página Admin
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => setProfilePage(ProfileSection.MemberCandidate)}>
                                Información candidato a socio
                            </a>
                        </li>
                    </>
                )}
                {roles.includes(UserRole.SOCIO_CANDIDATO) && (
                    <li>
                        <a href="#" onClick={() => setProfilePage(ProfileSection.MemberCandidate)}>
                            Información candidato a socio
                        </a>
                    </li>
                )}
                {roles.includes(UserRole.PRESIDENTE) && (
                    <>
                        <li>
                            <a href="#" onClick={() => setProfilePage(ProfileSection.ChessData)}>
                                Datos de ajedrez
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => setProfilePage(ProfileSection.President)}>
                                Sección de presidente
                            </a>
                        </li>
                    </>
                )}
            </ul>
        </SideBarContainer>
    );
};

export default Sidebar;

import React from 'react'
import { useAppSelector } from '../../store/hooks'
import styled from 'styled-components'

// Contenedor del mensaje
const MessageContainer = styled.div`
    background-color: #fff0f5; /* Color de fondo suave */
    border: 1px solid #ffb6c1; /* Borde rosa claro */
    border-radius: 10px; /* Bordes redondeados */
    padding: 2rem; /* Más espacio interno */
    margin: 2rem 0; /* Más espacio externo */
    margin-left: 2rem;
    margin-right: 2rem;
    font-family: 'Montserrat', sans-serif;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Transición suave */

    &:hover {
        transform: translateY(-5px); /* Levantar un poco el contenedor al pasar el ratón */
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Sombra más fuerte al pasar el ratón */
    }
`

// Título del mensaje
const MessageTitle = styled.h2`
    color: #ff69b4; /* Color rosa intenso */
    font-size: 1.8rem; /* Tamaño de fuente más grande */
    margin-bottom: 1rem;
`

// Párrafo del mensaje
const MessageText = styled.p`
    color: #696969; /* Color gris oscuro */
    font-size: 1.2rem; /* Tamaño de fuente más grande */
    line-height: 1.6; /* Altura de línea mayor */
    margin: 0;
`

const MemberCandidate: React.FC = () => {
    const user = useAppSelector((state) => state.users)
    return (
        <MessageContainer>
            <MessageTitle>Bienvenido, {user.userProfile.name} {user.userProfile.firstSurname}</MessageTitle>
            <MessageText>
                Su solicitud está siendo procesada y será cursada en los próximos días. Gracias por su paciencia.
            </MessageText>
        </MessageContainer>
    )
}

export default MemberCandidate

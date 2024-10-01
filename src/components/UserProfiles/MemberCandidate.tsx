import React from 'react'
import { useAppSelector } from '../../store/hooks'
import styled from 'styled-components'

/**
 * Styled container for displaying a welcome message to the user.
 * Features a light pink background, rounded borders, and subtle shadow effects.
 */
const MessageContainer = styled.div`
    background-color: #fff0f5;
    border: 1px solid #ffb6c1;
    border-radius: 10px;
    padding: 2rem;
    margin: 2rem 0;
    margin-left: 2rem;
    margin-right: 2rem;
    font-family: 'Montserrat', sans-serif;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
`

/**
 * Styled heading for the message title.
 * Displays the user's name in a bold, large, pink-colored font.
 */
const MessageTitle = styled.h2`
    color: #f5459d;
    font-size: 1.8rem;
    margin-bottom: 1rem;
`

/**
 * Styled paragraph for the message text.
 * Provides information with a dark grey color, large font, and increased line height.
 */
const MessageText = styled.p`
    color: #696969;
    font-size: 1.2rem;
    line-height: 1.6;
    margin: 0;
`

/**
 * MemberCandidate component.
 * Displays a personalized welcome message for the user.
 *
 * The user's profile information (name and surname) is retrieved from the Redux store.
 * This component informs the user that their membership application is being processed.
 *
 * @component
 * @example
 * return (
 *   <MemberCandidate />
 * )
 */
const MemberCandidate: React.FC = () => {
    // Retrieve the user data from the Redux store
    const user = useAppSelector((state) => state.users)

    return (
        <MessageContainer>
            <MessageTitle>
                Bienvenido, {user.userProfile.name} {user.userProfile.firstSurname}
            </MessageTitle>
            <MessageText>Su solicitud está siendo procesada y será cursada en los próximos días. Gracias por su paciencia.</MessageText>
        </MessageContainer>
    )
}

export default MemberCandidate

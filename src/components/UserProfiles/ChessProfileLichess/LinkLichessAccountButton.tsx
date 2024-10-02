import axios from 'axios'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { BASE_URL } from '../../../resources/server_urls'
import { useAppSelector } from '../../../store/hooks'
import { useNotificationContext } from '../../../components/Common/NotificationContext'
import { NotificationType } from '../../../components/Common/hooks/useNotification'
import { useLichessProfileNow } from './Hooks'
import { isLichessProfileEmpty, LichessProfileResponse } from './lichess'

const LICHESS_OAUTH_ENDPOINT = 'https://lichess.org/oauth'
const CLIENT_ID = process.env.REACT_APP_LICHESS_CLIENT_ID ?? 'xadreznaron.es' // Use environment variable for client ID

export enum Scopes {
    /** Read your preferences */
    PREFERENCE_READ = 'preference:read'
    // ... other scopes omitted for brevity
}

/**
 * Generates a code challenge for OAuth2 PKCE flow.
 * @param {string} codeVerifier - The code verifier string.
 * @returns {Promise<string>} - A promise that resolves to the code challenge.
 */
async function generateCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(codeVerifier)
    const digest = await window.crypto.subtle.digest('SHA-256', data)
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '')
}

/**
 * Generates a random string for the code verifier.
 * @param {number} length - The length of the random string.
 * @returns {string} - A random string.
 */
function generateRandomString(length: number): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
    const array = new Uint32Array(length)
    window.crypto.getRandomValues(array)

    return Array.from(array, (num) => charset[num % charset.length]).join('')
}

/**
 * Initiates the OAuth2 flow for linking a Lichess account.
 * @param {string | null} userJwt - The user's JWT for authorization.
 * @param {string} email - The user's email for the redirect URI.
 * @param {(message: string, type: NotificationType) => void} showNotification - Function to show notifications.
 * @returns {Promise<void>} - A promise that resolves when the flow is initiated.
 */
const initiateOAuthFlow = async (
    userJwt: string | null,
    email: string,
    showNotification: (message: string, type: NotificationType) => void,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setOAuthCompleted: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
    setIsLoading(true)
    const redirectUri = `${BASE_URL}api/${email}/lichessAuth`
    const codeVerifier = generateRandomString(128)
    const codeChallenge = await generateCodeChallenge(codeVerifier)
    const scope: Scopes = Scopes.PREFERENCE_READ
    const url = `${LICHESS_OAUTH_ENDPOINT}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&code_challenge_method=S256&code_challenge=${codeChallenge}&scope=${scope}`

    try {
        await axios.post(`${BASE_URL}api/${email}/lichessAuth`, codeVerifier, {
            headers: {
                Authorization: `Bearer ${userJwt}`,
                'Content-Type': 'text/plain'
            }
        })

        // Open the authorization URL
        window.open(url, '_blank')
        setOAuthCompleted(true)
    } catch (error) {
        showNotification('Error: algo inesperado. Recarga o intentalo más tarde.', NotificationType.Error)
    } finally {
        setIsLoading(false)
    }
}

interface LinkLichessAccountButtonProps {
    setLichessProfileCallback: (profile: LichessProfileResponse) => void // Callback function to set the Lichess profile
}
/**
 * A button that initiates the OAuth2 flow for linking a Lichess account.
 * It renders a "Añadir" button that opens the Lichess authorization URL when clicked.
 * The button requires the user's JWT and email from the state to work.
 * @returns {React.ReactElement} - A Bootstrap Button component.
 */
const LinkLichessAccountButton: React.FC<LinkLichessAccountButtonProps> = ({ setLichessProfileCallback }): React.ReactElement => {
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const userProfile = useAppSelector((state) => state.users.userProfile)
    const { showNotification } = useNotificationContext()
    const [isLoading, setIsLoading] = useState(false) // Manage button loading state
    const [oAuthCompleted, setOAuthCompleted] = useState(false) // Manage OAuth completion
    const [fetchNow, setFetchNow] = useState(0)

    const { lichessProfile, loading, error } = useLichessProfileNow(userJwt, fetchNow)

    console.log('FETCH PROFILE VALOR ES:' + fetchNow)
    console.log('HOOK, LICHESS PROFILE USER NAME ES: ' + lichessProfile.userName)
    console.log('HOOK, LOADING ES: ' + loading)
    console.log('HOOK, ERROR ES: ' + error)
    console.log('valor de isLichessProfileEmpty: ' + isLichessProfileEmpty(lichessProfile))

    const handleGetProfileClick = () => {
        setFetchNow(fetchNow + 1) // Start fetching the profile when button is clicked
    }

    return (
        <>
            {!oAuthCompleted && (
                <Button
                    variant="success"
                    onClick={() => void initiateOAuthFlow(userJwt, userProfile.email, showNotification, setIsLoading, setOAuthCompleted)}
                    disabled={isLoading} // Disable the button while OAuth is in progress
                >
                    {isLoading ? 'Cargando...' : 'Vincular perfil a mi cuenta'}
                </Button>
            )}

            {/* Conditionally render the second button after OAuth flow completes */}
            {oAuthCompleted && (
                <Button variant="primary" onClick={handleGetProfileClick}>
                    Cargar perfil
                </Button>
            )}
            {fetchNow != 0 &&
                (isLichessProfileEmpty(lichessProfile) || error != null ? (
                    <span> No se ha podido cargar el perfil, intenta vincularlo de nuevo o ponte en contacto con noosotros.</span>
                ) : (
                    setLichessProfileCallback(lichessProfile)
                ))}
        </>
    )
}

export default LinkLichessAccountButton

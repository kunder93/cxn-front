import axios from 'axios'
import React from 'react'
import { Button } from 'react-bootstrap'
import { BASE_URL } from '../../../resources/server_urls'
import { useAppSelector } from '../../../store/hooks'

const LICHESS_OAUTH_ENDPOINT = 'https://lichess.org/oauth'
const CLIENT_ID = process.env.REACT_APP_LICHESS_CLIENT_ID ?? 'xadreznaron.es' // Use environment variable for client ID

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
 * @returns {Promise<void>} - A promise that resolves when the flow is initiated.
 */
const initiateOAuthFlow = async (userJwt: string | null, email: string): Promise<void> => {
    const redirectUri = `${BASE_URL}api/${email}/lichessAuth`
    const codeVerifier = generateRandomString(128)
    const codeChallenge = await generateCodeChallenge(codeVerifier)

    const url = `${LICHESS_OAUTH_ENDPOINT}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&code_challenge_method=S256&code_challenge=${codeChallenge}`

    try {
        await axios.post(`${BASE_URL}api/${email}/lichessAuth`, codeVerifier, {
            headers: {
                Authorization: `Bearer ${userJwt}`,
                'Content-Type': 'text/plain'
            }
        })

        // Open the authorization URL
        window.open(url, '_blank')
    } catch (error) {
        console.error('Error sending the code verifier:', error)
        // Optionally, you could implement user feedback here (e.g., display a message).
    }
}

/**
 * A button that initiates the OAuth2 flow for linking a Lichess account.
 * It renders a "Link Lichess Profile" button that opens the Lichess authorization URL when clicked.
 * The button requires the user's JWT and email from the state to work.
 * @returns {React.ReactElement} - A Bootstrap Button component.
 */
const LinkLichessAccountButton: React.FC = () => {
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const userProfile = useAppSelector((state) => state.users.userProfile)

    return (
        <Button variant="success" onClick={() => void initiateOAuthFlow(userJwt, userProfile.email)}>
            Link Lichess Profile
        </Button>
    )
}

export default LinkLichessAccountButton

import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { BASE_URL } from '../../../resources/server_urls'
import { useAppSelector } from '../../../store/hooks'
import { useNotificationContext } from '../../../components/Common/NotificationContext'
import { NotificationType } from '../../../components/Common/hooks/useNotification'
import { useLichessProfileNow } from './Hooks'
import { isLichessProfileEmpty, LichessProfileResponse } from './lichess'
import axios from 'axios'

const LICHESS_OAUTH_ENDPOINT = 'https://lichess.org/oauth'
const CLIENT_ID = process.env.REACT_APP_LICHESS_CLIENT_ID ?? 'xadreznaron.es' // Use environment variable for client ID

export enum Scopes {
    /** Read your preferences */
    PREFERENCE_READ = 'preference:read'
}

async function generateCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(codeVerifier)
    const digest = await window.crypto.subtle.digest('SHA-256', data)
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '')
}

function generateRandomString(length: number): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
    const array = new Uint32Array(length)
    window.crypto.getRandomValues(array)
    return Array.from(array, (num) => charset[num % charset.length]).join('')
}

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
                Authorization: `Bearer ${userJwt ?? ''}`,
                'Content-Type': 'text/plain'
            }
        })
        window.open(url, '_blank')
        setOAuthCompleted(true)
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            showNotification('Error: ' + error.message, NotificationType.Error)
        } else {
            showNotification('Error al iniciar la autenticación con Lichess', NotificationType.Error)
        }
    } finally {
        setIsLoading(false)
    }
}

interface LinkLichessAccountButtonProps {
    setLichessProfileCallback: (profile: LichessProfileResponse) => void
}

const LinkLichessAccountButton: React.FC<LinkLichessAccountButtonProps> = ({ setLichessProfileCallback }): React.ReactElement => {
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const userProfile = useAppSelector((state) => state.users.userProfile)
    const { showNotification } = useNotificationContext()
    const [isLoading, setIsLoading] = useState(false)
    const [oAuthCompleted, setOAuthCompleted] = useState(false)
    const [fetchNow, setFetchNow] = useState(0)
    const { lichessProfile, error } = useLichessProfileNow(fetchNow)

    const handleGetProfileClick = () => {
        setFetchNow(fetchNow + 1)
    }

    useEffect(() => {
        if (fetchNow !== 0 && !isLichessProfileEmpty(lichessProfile) && error == null) {
            setLichessProfileCallback(lichessProfile)
        }
    }, [lichessProfile, fetchNow, error, setLichessProfileCallback])

    return (
        <>
            {!oAuthCompleted && (
                <Button
                    variant="success"
                    onClick={() => void initiateOAuthFlow(userJwt, userProfile.email, showNotification, setIsLoading, setOAuthCompleted)}
                    disabled={isLoading}
                >
                    {isLoading ? 'Cargando...' : 'Vincular perfil a mi cuenta'}
                </Button>
            )}
            {oAuthCompleted && (
                <Button variant="primary" onClick={handleGetProfileClick}>
                    Cargar perfil
                </Button>
            )}
            {fetchNow !== 0 &&
                (isLichessProfileEmpty(lichessProfile) || error != null ? (
                    <span>No se ha podido cargar el perfil, intenta vincularlo de nuevo o ponte en contacto con nosotros.</span>
                ) : (
                    <span>Perfil cargado. ¡Vinculado correctamente!</span>
                ))}
        </>
    )
}

export default LinkLichessAccountButton

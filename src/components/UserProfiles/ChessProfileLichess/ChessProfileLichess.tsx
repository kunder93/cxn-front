import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { Trophy } from 'react-bootstrap-icons'
import styled, { keyframes, css } from 'styled-components'
import LichessPlayersTable from './LichessPlayersTable'
import { emptyLichessProfile, isLichessProfileEmpty, LichessProfileResponse } from './lichess'
import { useLichessProfile, useLichessProfiles } from './Hooks'
import ProfileRow from './ProfileRow'
import LinkLichessAccountButton from './LinkLichessAccountButton'
import { GrUpdate } from 'react-icons/gr'
import axios from 'axios'
import { useAppSelector } from '../../../store/hooks'
import { useNotificationContext } from '../../../components/Common/NotificationContext'
import { NotificationType } from '../../../components/Common/hooks/useNotification'
import { UPDATE_LICHESS_PROFILE_URL } from '../../../resources/server_urls'

const StyledAccordionBody = styled(Accordion.Body)`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 0;
`

const FullWidthTable = styled(LichessPlayersTable)`
    width: 100%;
    height: 100%;
    table {
        width: 100%;
        height: 100%;
    }
`

const FirstStyledAccordionBody = styled(Accordion.Body)`
    padding: 20px;
    background-color: #222;
    color: #fff;
`
// Definir la animación de rotación
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(2160deg);
  }
`

const IconButton = styled(GrUpdate)<{ isRotating: boolean }>`
    color: #fff;
    font-size: 2rem;
    cursor: pointer;

    ${({ isRotating }) =>
        isRotating &&
        css`
            color: #000;
            animation: ${rotate} 5s linear;
        `}
`

// Default empty values for LichessProfileResponse

const ChessProfileLichess: React.FC = () => {
    const { lichessProfile, loading: profileLoading } = useLichessProfile()
    const [myLichessProfile, setMyLichessProfile] = useState<LichessProfileResponse>(emptyLichessProfile)
    const { players, loading: playersLoading } = useLichessProfiles(myLichessProfile)
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const [isRotating, setIsRotating] = useState(false)
    const { showNotification } = useNotificationContext()
    const handleUpdateClick = async () => {
        setIsRotating(true)
        try {
            const response = await axios.post<LichessProfileResponse>(
                UPDATE_LICHESS_PROFILE_URL,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${userJwt}` // Agregar el token JWT en el encabezado
                    }
                }
            )

            showNotification('Perfil de lichess actualizado', NotificationType.Success)
            setMyLichessProfile(response.data)
            // También puedes almacenar el mensaje en el estado si lo deseas
        } catch (error) {
            // Manejo de errores
            if (axios.isAxiosError(error)) {
                showNotification(error.message, NotificationType.Error)
            } else {
                showNotification('Error inesperado', NotificationType.Error)
            }
        } finally {
            setIsRotating(false)
        }
    }

    useEffect(() => {
        setMyLichessProfile(lichessProfile)
    }, [lichessProfile])

    if (profileLoading || playersLoading) {
        return <div>Cargando...</div>
    }

    return (
        <>
            <h2>Lichess:</h2>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <strong>
                            <img src="/Lichess/LichessLogo.png" width={40} alt="Lichess Logo" />
                            {isLichessProfileEmpty(myLichessProfile) ? (
                                <>
                                    <span> ¡¡ No tienes perfil de lichess !! Desplegar para ver más. </span>
                                </>
                            ) : (
                                'Mi perfil'
                            )}
                        </strong>
                    </Accordion.Header>
                    <FirstStyledAccordionBody>
                        {isLichessProfileEmpty(myLichessProfile) ? (
                            <>
                                <LinkLichessAccountButton setLichessProfileCallback={setMyLichessProfile}></LinkLichessAccountButton>
                            </>
                        ) : (
                            <>
                                <ProfileRow
                                    label="Última vez actualizado:"
                                    value={
                                        <>
                                            {new Date(myLichessProfile.lastUpdate).toLocaleString()}{' '}
                                            <IconButton
                                                isRotating={isRotating}
                                                onClick={() => {
                                                    void handleUpdateClick()
                                                }}
                                            />
                                        </>
                                    }
                                />
                                <ProfileRow label="Nombre en Lichess:" value={myLichessProfile.lichessUserName} />
                                <ProfileRow label="ELO Blitz:" value={myLichessProfile.blitzGame.elo} />
                                <ProfileRow label="Blitz, cantidad de partidas jugadas:" value={myLichessProfile.blitzGame.amountOfGames} />
                                <ProfileRow label="ELO Bullet:" value={myLichessProfile.bulletGame.elo} />
                                <ProfileRow label="Bullet, cantidad de partidas jugadas:" value={myLichessProfile.bulletGame.amountOfGames} />
                                <ProfileRow label="ELO Clásico:" value={myLichessProfile.classicalGame.elo} />
                                <ProfileRow label="Clásicas, cantidad de partidas jugadas:" value={myLichessProfile.classicalGame.amountOfGames} />
                                <ProfileRow label="ELO Rápidas:" value={myLichessProfile.rapidGame.elo} />
                                <ProfileRow label="Rápidas, cantidad de partidas jugadas:" value={myLichessProfile.rapidGame.amountOfGames} />
                                <ProfileRow label="ELO Problemas:" value={myLichessProfile.puzzleGame.elo} />
                                <ProfileRow label="Cantidad de problemas realizados:" value={myLichessProfile.puzzleGame.amountOfGames} />
                            </>
                        )}
                    </FirstStyledAccordionBody>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <strong>
                            <Trophy size={40} /> ELO Xadrez Narón Lichess
                        </strong>
                    </Accordion.Header>
                    <StyledAccordionBody>
                        <FullWidthTable data={players.profilesList} />
                    </StyledAccordionBody>
                </Accordion.Item>
            </Accordion>
        </>
    )
}

export default ChessProfileLichess

import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { Trophy } from 'react-bootstrap-icons'
import { useAppSelector } from '../../../store/hooks'
import styled from 'styled-components'
import LichessPlayersTable from './LichessPlayersTable'
import { emptyLichessProfile, isLichessProfileEmpty, LichessProfileResponse } from './lichess'
import { useLichessProfile, useLichessProfiles } from './Hooks'
import ProfileRow from './ProfileRow'
import LinkLichessAccountButton from './LinkLichessAccountButton'

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

// Default empty values for LichessProfileResponse

const ChessProfileLichess: React.FC = () => {
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)
    const { lichessProfile, loading: profileLoading } = useLichessProfile(userJwt)
    const { players, loading: playersLoading } = useLichessProfiles(userJwt)

    const [myLichessProfile, setMyLichessProfile] = useState<LichessProfileResponse>(emptyLichessProfile)

    useEffect(() => {
        setMyLichessProfile(lichessProfile)
    }, [lichessProfile])

    if (profileLoading || playersLoading) {
        return <div>Cargando...</div>
    }

    return (
        <Accordion defaultActiveKey="0">
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
                            <ProfileRow label="Última vez actualizado:" value={new Date(myLichessProfile.lastUpdate).toLocaleString()} />
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
    )
}

export default ChessProfileLichess

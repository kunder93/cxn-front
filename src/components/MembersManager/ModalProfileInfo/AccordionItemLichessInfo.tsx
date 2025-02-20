import { Accordion, AccordionBody, AccordionItemProps, OverlayTrigger, Spinner, Table, Tooltip } from 'react-bootstrap'
import React from 'react'

import styled from 'styled-components'
import { RxCrossCircled } from 'react-icons/rx'
import { FaCheckCircle } from 'react-icons/fa'
import { MdError } from 'react-icons/md'

import useLichessProfile from '../Hooks/useLichessProfile'
import { Game } from 'components/UserProfiles/ChessProfileLichess/lichess'

const NoLichessProfileIcon = styled(RxCrossCircled)`
    color: red;
`
const ErrorLoadingIcon = styled(MdError)`
    color: red;
`

const IsLichessProfileIcon = styled(FaCheckCircle)`
    color: green;
`

const StyledAccordionBody = styled(AccordionBody)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
const ProfileLink = styled.a`
    font-weight: bold;
    color: #007bff;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`

const AccordionHeader = styled(Accordion.Header)`
    button {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }
`

const StyledLoadingSpinner = styled(Spinner)``

interface AccordionItemLichessInfoProps extends AccordionItemProps {
    userDni: string
}

const renderGameRow = (gameType: string, gameData: Game) => (
    <tr key={gameType}>
        <td className="fw-bold">{gameType}</td>
        <td>{gameData.elo}</td>
        <td>{gameData.amountOfGames}</td>
        <td>{gameData.isProvisional ? 'Sí' : 'No'}</td>
    </tr>
)

const AccordionItemLichessInfo: React.FC<AccordionItemLichessInfoProps> = ({ userDni, ...props }) => {
    const { loading, error, lichessProfile } = useLichessProfile(userDni)

    const renderLichessProfileStatus = () => {
        if (error) {
            return (
                <OverlayTrigger placement="top" overlay={<Tooltip id="error-tooltip">Hubo un error cargando los datos federativos</Tooltip>}>
                    <span>
                        <ErrorLoadingIcon />
                    </span>
                </OverlayTrigger>
            )
        }

        if (loading) {
            return <StyledLoadingSpinner size="sm" variant="primary" />
        }

        if (!lichessProfile || lichessProfile.lichessUserName === '') {
            return <NoLichessProfileIcon />
        } else {
            return <IsLichessProfileIcon />
        }
    }

    return (
        <Accordion.Item {...props}>
            <AccordionHeader>
                <span>Perfil lichess:</span> {renderLichessProfileStatus()}
            </AccordionHeader>
            <StyledAccordionBody>
                {!lichessProfile || lichessProfile.lichessUserName === '' ? (
                    <span>NO TIENE PERFIL LICHESS VINCULADO</span>
                ) : (
                    <>
                        {/* Información del perfil */}
                        <div>
                            <span className="fw-bold">Usuario:</span>{' '}
                            <ProfileLink href={`https://lichess.org/@/${lichessProfile.lichessUserName}`} target="_blank" rel="noopener noreferrer">
                                {lichessProfile.lichessUserName}
                            </ProfileLink>
                        </div>
                        <div className="text-muted">Última actualización: {lichessProfile.lastUpdate}</div>

                        {/* Tabla de modalidades */}
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Modalidad</th>
                                    <th>ELO</th>
                                    <th>Partidas</th>
                                    <th>Provisional</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderGameRow('Blitz', lichessProfile.blitzGame)}
                                {renderGameRow('Bullet', lichessProfile.bulletGame)}
                                {renderGameRow('Rápidas', lichessProfile.rapidGame)}
                                {renderGameRow('Clásicas', lichessProfile.classicalGame)}
                                {renderGameRow('Puzzles', lichessProfile.puzzleGame)}
                            </tbody>
                        </Table>
                    </>
                )}
            </StyledAccordionBody>
        </Accordion.Item>
    )
}

export default AccordionItemLichessInfo

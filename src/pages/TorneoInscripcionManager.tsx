import React from 'react'

import { Alert } from 'react-bootstrap'
import styled from 'styled-components'
import LoadingTableSpinnerContainer from '../components/Common/LoadingTableSpinnerContainer'
import { useAxiosGetAllTournamentParticipants } from './../utility/CustomAxios'
import TournamentParticipantsManagerTable from './../components/TournamentParticipantsManagerTable'
const Title = styled.h1`
    text-align: left;
    margin-top: 20px;
    color: #333;
`

const ErrorMessage = styled(Alert)`
    margin-top: 20px;
`

const NoQuestionsMessage = styled.p`
    text-align: center;
    margin-top: 20px;
`

const TorneoInscripcionManager: React.FC = () => {
    const { data, error, loaded } = useAxiosGetAllTournamentParticipants()

    if (error) {
        return <ErrorMessage variant="danger">Error: {error.message ?? 'Ocurrió un error al cargar los participantes del torneo.'}</ErrorMessage>
    }

    if (!loaded) {
        return <LoadingTableSpinnerContainer />
    }

    return (
        <>
            <Title>Lista con inscritos en el torneo:</Title>
            {data ? <TournamentParticipantsManagerTable membersData={data} /> : <NoQuestionsMessage>No hay usuarios que mostrar.</NoQuestionsMessage>}
        </>
    )
}

export default TorneoInscripcionManager

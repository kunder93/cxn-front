import { Alert } from 'react-bootstrap'
import styled from 'styled-components'
import LoadingTableSpinnerContainer from '../components/Common/LoadingTableSpinnerContainer'
import { useAxiosGetAllTournamentParticipants } from './../utility/CustomAxios'
import TournamentParticipantsManagerTable from './../components/TournamentParticipantsManagerTable'

// Styled components for title and messages
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

/**
 * Manages the display of tournament participants.
 *
 * This component fetches the list of participants in a tournament and displays it.
 * If there's an error during the fetching process, it shows an error message.
 * If the data is still loading, a loading spinner is displayed.
 * If no participants are found, a message indicating this is shown.
 *
 * @component
 * @returns {JSX.Element} The rendered TorneoInscripcionManager component.
 */
const TorneoInscripcionManager = (): JSX.Element => {
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

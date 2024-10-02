import { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import styled from 'styled-components'
import { IChessQuestionsList, useAxiosGetChessQuestions } from '../utility/CustomAxios'
import ChessQuestionsTable from '../components/ChessQuestions/ChessQuestionsTable'
import LoadingTableSpinnerContainer from '../components/Common/LoadingTableSpinnerContainer'

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
 * Manages and displays chess questions submitted by visitors on the website.
 *
 * @component
 * @returns {JSX.Element} The rendered ChessQuestionsManager component.
 */
const ChessQuestionsManager = (): JSX.Element => {
    const { data, error, loaded } = useAxiosGetChessQuestions()
    const [chessQuestionsList, setChessQuestionsList] = useState<IChessQuestionsList>({ chessQuestionList: [] })

    useEffect(() => {
        if (loaded && data) {
            setChessQuestionsList(data)
        }
    }, [loaded, data])

    if (error) {
        return <ErrorMessage variant="danger">Error: {error.message ?? 'Ocurrió un error al cargar las preguntas.'}</ErrorMessage>
    }

    if (!loaded) {
        return <LoadingTableSpinnerContainer />
    }

    return (
        <>
            <Title>Gestión de preguntas realizadas por visitantes de la web:</Title>
            {chessQuestionsList?.chessQuestionList.length ? (
                <ChessQuestionsTable data={chessQuestionsList} />
            ) : (
                <NoQuestionsMessage>No hay preguntas disponibles.</NoQuestionsMessage>
            )}
        </>
    )
}

export default ChessQuestionsManager

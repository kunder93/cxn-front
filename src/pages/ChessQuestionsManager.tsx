import React, { useState } from 'react'
import { IChessQuestionsList, useAxiosGetChessQuestions } from '../utility/CustomAxios'
import ChessQuestionsTable from '../components/ChessQuestions/ChessQuestionsTable'

const ChessQuestionsManager:React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error, loaded } = useAxiosGetChessQuestions()

    const [chessQuestionsList, setChessQuestionsList] = useState<IChessQuestionsList>({ chessQuestionList: [] })
    console.log(error)
    // Update the local state with the initial list of companies
    React.useEffect(() => {
        if (loaded) {
            data && setChessQuestionsList({ chessQuestionList: data.chessQuestionList })
        }
    }, [loaded, data])



    return (
        <>
            <h1>Gestion de preguntas realizadas por visitantes de la web:</h1>
            {/* Check if data is loaded */}
            {loaded ? <ChessQuestionsTable data={chessQuestionsList} /> : <p>Loading...</p>}
        </>
    )
}

export default ChessQuestionsManager
import React from 'react'
import ChessProfileLichess from './ChessProfileLichess/ChessProfileLichess'
import ChessProfileFederate from './ChessProfileFederate/ChessProfileFederate'

const ChessProfile: React.FC = () => {
    return (
        <div>
            <h1>Perfil ajedrecístico:</h1>
            <ChessProfileLichess></ChessProfileLichess>
            <ChessProfileFederate></ChessProfileFederate>
        </div>
    )
}

export default ChessProfile

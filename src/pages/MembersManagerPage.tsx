import React from 'react'
import MembersManagerTable from '../components/MembersManager/MembersManagerTable'

import { useAxiosGetAllUsersData } from '../utility/CustomAxios'
import { Alert } from 'react-bootstrap'
import styled from 'styled-components'
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

const MembersManagerPage: React.FC = () => {
    const { data, error, loaded } = useAxiosGetAllUsersData()

    if (error) {
        return <ErrorMessage variant="danger">Error: {error.message ?? 'Ocurrió un error al cargar las preguntas.'}</ErrorMessage>
    }

    if (!loaded) {
        return <LoadingTableSpinnerContainer />
    }

    return (
        <>
            <Title>Gestión de socios del club:</Title>
            {data?.usersList ? <MembersManagerTable usersData={data.usersList} /> : <NoQuestionsMessage>No hay usuarios que mostrar.</NoQuestionsMessage>}
        </>
    )
}

export default MembersManagerPage

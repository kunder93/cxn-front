import React from 'react'
import MembersManagerTable from '../components/MembersManager/MembersManagerTable'

import { useAxiosGetAllUsersData } from '../utility/CustomAxios'
import { Spinner } from 'react-bootstrap'

const MembersManagerPage: React.FC = () => {
    const { data, error, loaded } = useAxiosGetAllUsersData()
    console.log(error)
    return <> {loaded || !data ? <MembersManagerTable usersData={data.usersList}></MembersManagerTable> : <Spinner animation="border" variant="primary" />}</>
}

export default MembersManagerPage

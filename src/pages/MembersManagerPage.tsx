import React, { useEffect, useState } from 'react'
import MembersManagerTable from '../components/MembersManager/MembersManagerTable'
import axios from 'axios'
import { IUsersListData } from '../components/Types/Types'

const MembersManagerPage: React.FC = () => {
    const [data, setData] = useState<IUsersListData>({ usersList: [] })
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<IUsersListData>('http://localhost:8080/api/user/getAll')
                setData(response.data)
                console.log('AXIOS DATA:')
                console.log(response.data)
                setLoaded(true)
            } catch (error) {
                console.error('Error fetching data:', error)
                setLoaded(true)
            }
        }

        void fetchData()
    }, [])

    return loaded ? <MembersManagerTable data={data.usersList}></MembersManagerTable> : <div></div>
}

export default MembersManagerPage

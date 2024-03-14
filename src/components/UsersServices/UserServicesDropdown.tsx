import React from 'react'

import { IUserData } from '../Types/Types'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../resources/routes-constants'

interface Props {
    data: IUserData[]
}

const UserServicesDropdown: React.FC<Props> = (props) => {
    console.log(props)
    const navigate = useNavigate()
    const handleBibliotecaManagerButton = () => {
        navigate(ROUTES.LIBRARY_MANAGER_ROUTE)
    }
    return (
        <>
            <div> SERVICIOS DEL USUARIO NORMAl</div>
            <Button onClick={handleBibliotecaManagerButton}>Biblioteca</Button>
        </>
    )
}
export default UserServicesDropdown

import React from 'react'

import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../resources/routes-constants'

const UserServicesDropdown: React.FC /*<Props>*/ = (/*props*/) => {
    const navigate = useNavigate()
    const handleBibliotecaManagerButton = async () => {
        await navigate(ROUTES.LIBRARY_MANAGER_ROUTE)
    }

    return (
        <>
            <div> SERVICIOS DEL USUARIO NORMAl</div>
            <Button onClick={() => handleBibliotecaManagerButton}>Biblioteca</Button>
        </>
    )
}
export default UserServicesDropdown

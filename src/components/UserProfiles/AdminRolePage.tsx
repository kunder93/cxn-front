import { Button } from 'react-bootstrap'
import React from 'react'
import PresidenteMenu from '../../components/PresidenteMenu'
import UserServicesDropdown from '../../components/UsersServices/UserServicesDropdown'

function handleCompaniesManagerButton():void {
    console.log('empty function')
}
function handleInvoicesManagerButton():void {
    console.log('empty function')
}
function handlePaymentSheetManagerButton():void {
    console.log('empty function')
}

const AdminRolePage:React.FC = () => {
  return (
    <div>

        <Button variant="primary" onClick={handleCompaniesManagerButton}>Companies Manager</Button>
        <Button variant="primary" onClick={handleInvoicesManagerButton}>Invoices Manager</Button>
        <Button variant="primary" onClick={handlePaymentSheetManagerButton}>Payment Sheet Manager</Button> 
        <PresidenteMenu></PresidenteMenu>
        <UserServicesDropdown data={[]}></UserServicesDropdown>
    </div>
  )
}

export default AdminRolePage
import React, { useState } from 'react'

import CompanyTable from '../components/Companies/CompaniesTable'
import MyVerticallyCenteredModal from '../components/Companies/CreateCompanyModal'
import { useAxiosGetCompanies } from '../utility/CustomAxios'
import { COMPANIES_URL } from './../resources/server_urls'
import { BuildingAdd } from 'react-bootstrap-icons'
import { StyledButton } from '../components/Companies/CompaniesStyles'

function CompanyManagerPage() {
    const [modalShow, setModalShow] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error, loaded } = useAxiosGetCompanies(COMPANIES_URL)
    return (
        <div>
            <h1>Companies manager:</h1>
            {loaded ? <CompanyTable data={data.companiesList} /> : ''}
            <StyledButton variant="primary" onClick={() => setModalShow(true)}>
                <BuildingAdd></BuildingAdd>
                Add company
            </StyledButton>
            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    )
}

export default CompanyManagerPage

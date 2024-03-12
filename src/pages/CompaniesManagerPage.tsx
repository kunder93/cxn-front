import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { BuildingAdd } from 'react-bootstrap-icons'
import CompanyTable from '../components/Companies/CompaniesTable'
import CrateCompanyModal from '../components/Companies/CreateCompanyModal'
import { ICompany } from '../components/Companies/Types'
import { useAxiosGetCompanies } from '../utility/CustomAxios'
import { COMPANIES_URL } from './../resources/server_urls'

const CompanyManagerPage: React.FC = () => {
    const [modalShow, setModalShow] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error, loaded } = useAxiosGetCompanies(COMPANIES_URL)
    console.log(error)
    const [companiesList, setCompaniesList] = useState<ICompany[]>([])
    // Update the local state with the initial list of companies
    React.useEffect(() => {
        if (loaded) {
            setCompaniesList(data.companiesList)
        }
    }, [loaded, data])

    // Function to update the companies list when a new company is registered
    const updateCompaniesList = (newCompany: ICompany) => {
        setCompaniesList([...companiesList, newCompany])
    }

    return (
        <Container>
            <h1>Gestor de empresas:</h1>
            {/* Check if data is loaded */}
            {loaded ? <CompanyTable data={companiesList} /> : <p>Loading...</p>}
            <Button
                variant="primary"
                onClick={() => setModalShow(true)}
                style={{
                    color: '#000000',
                    fontSize: '1em',
                    margin: '1em',
                    padding: '0.25em 1em',
                    border: '10px solid palevioletred',
                    borderRadius: '10px',
                    borderColor: '#0d6efd',
                    backgroundColor: '#0d6efd'
                }}
            >
                <BuildingAdd size={30} />
                Registrar empresa
            </Button>
            <CrateCompanyModal show={modalShow} onHide={() => setModalShow(false)} updateCompaniesList={updateCompaniesList} />
        </Container>
    )
}

export default CompanyManagerPage

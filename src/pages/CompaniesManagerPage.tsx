import { useState, useEffect } from 'react'
import { Alert, Button, Container } from 'react-bootstrap'
import { BuildingAdd } from 'react-bootstrap-icons'
import CompanyTable from '../components/Companies/CompaniesTable'
import CreateCompanyModal from '../components/Companies/CreateCompanyModal'
import { ICompany } from '../components/Companies/Types'
import { useAxiosGetCompanies } from '../utility/CustomAxios'
import { COMPANIES_URL } from './../resources/server_urls'
import LoadingTableContainer from '../components/Common/LoadingTableSpinnerContainer'
import styled from 'styled-components'

const ErrorMessage = styled(Alert)`
    margin-top: 20px;
`
const Title = styled.h1`
    text-align: left;
    margin-top: 10px;
    color: #333;
`
const NoCompaniesMessage = styled.p`
    text-align: center;
    margin-top: 20px;
`

/**
 * Manages the display and creation of companies in the application.
 *
 * This component fetches a list of companies from an API and allows users to add new companies through a modal.
 * It displays a table of existing companies or a message when there are no companies available.
 *
 * @component
 * @returns {JSX.Element} The rendered CompanyManagerPage component.
 */
const CompanyManagerPage = (): JSX.Element => {
    const [modalShow, setModalShow] = useState(false)
    const { data, error, loaded } = useAxiosGetCompanies(COMPANIES_URL)
    const [companiesList, setCompaniesList] = useState<ICompany[]>([])

    useEffect(() => {
        if (loaded && data) {
            setCompaniesList(data.companiesList)
        }
    }, [loaded, data])

    /**
     * Updates the list of companies by adding a new company.
     *
     * @param {ICompany} newCompany - The new company to be added to the list.
     */
    const updateCompaniesList = (newCompany: ICompany) => {
        setCompaniesList([...companiesList, newCompany])
    }

    if (error) {
        return <ErrorMessage variant="danger">Error: {error.message ?? 'Ocurrió un error al cargar las preguntas.'}</ErrorMessage>
    }

    if (!loaded) {
        return <LoadingTableContainer />
    }

    return (
        <Container>
            <Title>Gestor de empresas:</Title>
            {companiesList?.length ? <CompanyTable data={companiesList} /> : <NoCompaniesMessage>No hay empresas disponibles.</NoCompaniesMessage>}
            <Button variant="primary" onClick={() => setModalShow(true)}>
                <BuildingAdd size={30} />
                Registrar empresa
            </Button>
            <CreateCompanyModal show={modalShow} onHide={() => setModalShow(false)} updateCompaniesList={updateCompaniesList} />
        </Container>
    )
}

export default CompanyManagerPage

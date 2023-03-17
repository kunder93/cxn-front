import React,{ useState }from 'react'
import { Button } from 'react-bootstrap'

import CompanyTable from '../components/CompaniesTable'
import MyVerticallyCenteredModal from '../components/CreateCompanyModal'
import {useAxiosGetCompanies} from '../utility/CustomAxios'
import {COMPANIES_URL} from './../resources/server_urls'
import { BuildingAdd } from 'react-bootstrap-icons';
import styled from 'styled-components'

  const StyledButton = styled(Button)`
    color: #000000;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 10px solid palevioletred;
    border-radius: 10px;
    border-color: #0d6efd;
    background-color: #0d6efd;
    
  `



  function CompanyManagerPage() { 
    const [modalShow, setModalShow] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error, loaded } = useAxiosGetCompanies(
      COMPANIES_URL)
    return (
        <div>
          <h1>Companies manager:</h1>
          {loaded? <CompanyTable data={data.companiesList}/> : ''}
          <StyledButton variant="primary"  onClick = {()=> setModalShow(true)}>
            <BuildingAdd></BuildingAdd>
            Add company
          </StyledButton>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
    )
  }

export default CompanyManagerPage
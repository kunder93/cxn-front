import LoadingTableSpinnerContainer from 'components/Common/LoadingTableSpinnerContainer'
import MembersPaymentsManagerTable from 'components/Payments/MembersPaymentsManagerTable'
import { Alert } from 'react-bootstrap'
import styled from 'styled-components'
import { useAxiosGetAllMembersPaymentsData } from 'utility/CustomAxios'

const ErrorMessage = styled(Alert)`
    margin-top: 20px;
`
const Title = styled.h1`
    text-align: left;
    margin-top: 20px;
    color: #333;
`

const NoDataMessage = styled.p`
    text-align: center;
    margin-top: 20px;
`

export const MembersPaymentsPage = () => {
    const { data, error, loaded } = useAxiosGetAllMembersPaymentsData()

    if (error) {
        return <ErrorMessage variant="danger">Error: {error.message ?? 'Ocurrió un error al cargar las preguntas.'}</ErrorMessage>
    }
    if (!loaded) {
        return <LoadingTableSpinnerContainer />
    }

    return (
        <>
            <Title>Gestión de pagos de los socios:</Title>
            {data ? <MembersPaymentsManagerTable data={data} /> : <NoDataMessage>No hay usuarios que mostrar.</NoDataMessage>}
        </>
    )
}

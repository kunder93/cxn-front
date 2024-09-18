import usePageTitle from '../../components/Common/hooks/usePageTitle'
import React from 'react'
import { Container } from 'react-bootstrap'

const TorneoCartel: React.FC = () => {
    usePageTitle('Cartel torneo')
    return (
        <Container>
            <div style={{ textAlign: 'center', margin: '5px 0' }}>
                <embed src="torneoPromocion/IV_TorneoPromocionNaron_2024.pdf" type="application/pdf" width="100%" height="800px" />
            </div>
        </Container>
    )
}

export default TorneoCartel

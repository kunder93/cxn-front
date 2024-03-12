import React from 'react'
import styled from 'styled-components'


const estatutosSrc = "/EstatutosCXN.pdf"


const PdfWrapper = styled.embed`
    border: 10px solid grey;
    border-radius: 2%;
`

const EstatutosPDF: React.FC = () => {
    return <PdfWrapper src={estatutosSrc} width={'100%'} height={'800px'} />
}

export default EstatutosPDF

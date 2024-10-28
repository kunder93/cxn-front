import { Building, EnvelopeAt, Facebook, Telephone, Whatsapp } from 'react-bootstrap-icons'
import styled from 'styled-components'
import ContactForm from '../ContactForm'
import ListGroup from 'react-bootstrap/ListGroup'

const phoneNumber = '(+34) 654 94 62 12'

const CellContainer = styled.ul`
    font-size: 140%;
    list-style-type: none; /* Eliminar los puntos de lista */
    @media screen and (max-width: 400px) {
        font-size: 120%;
    }
`
const ContactTitle = styled.h2`
    padding-top: 2rem;
`
const MainContactContainerStyled = styled.div``

const ContactFormWrapper = styled.div`
    border-bottom: 0.1rem solid grey;
    border-top: 0.1rem solid grey;
    padding: 1.5rem;
    box-shadow:
        0 0 0 2px #c7c7c7,
        0 0 0 3px gray;
    border-radius: 1%;
`

const ContactListContainer = styled(ListGroup)`
    display: grid !important;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    padding-top: 1em;
    font-size: 110%;
    border: 3px solid grey;
    background-color: #ffffff;
    padding-right: 1em;
    @media screen and (max-width: 1200px) {
        grid-template-columns: 1fr; /* Cambia a una columna cuando la resolución es igual o menor a 1200px */
        font-size: 100%;
    }
`

const ContactContainer = (): JSX.Element => {
    return (
        <MainContactContainerStyled>
            <ContactFormWrapper>
                <ContactForm />
            </ContactFormWrapper>
            <ContactTitle>Contacto:</ContactTitle>
            <ContactListContainer>
                <CellContainer>
                    <li>
                        <Telephone></Telephone>
                        Por teléfono / <Whatsapp></Whatsapp> whatsapp:
                    </li>
                </CellContainer>
                <CellContainer>
                    <li>
                        <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
                    </li>
                </CellContainer>
                <CellContainer>
                    <li>
                        <EnvelopeAt></EnvelopeAt> Por correo electrónico:
                    </li>
                </CellContainer>
                <CellContainer>
                    <li>
                        <a href="mailto:xadreznaron@hotmail.com">xadreznaron@hotmail.com</a>
                    </li>
                </CellContainer>
                <CellContainer>
                    <li>
                        <Building></Building> En nuestras oficinas:
                    </li>
                </CellContainer>
                <CellContainer>
                    {' '}
                    <li>Lunes y Jueves de 16:30 a 20:30 </li>
                </CellContainer>
                <CellContainer>
                    <li>
                        <Facebook></Facebook>
                        <a href="https://www.facebook.com/XadrezNaron/">Facebook CXN</a>
                    </li>
                </CellContainer>
            </ContactListContainer>
        </MainContactContainerStyled>
    )
}

export default ContactContainer

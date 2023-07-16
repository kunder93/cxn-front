import { useAppSelector } from '../store/hooks'
import React from 'react'
import { Accordion, Container } from 'react-bootstrap'
import { GeoAlt, GeoAltFill } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card'
import styled from 'styled-components';
import ContactForm from '../components/ContactForm';
const TheClubPage = () => {
    const parseJwt = (token: string) => {
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
            window
                .atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                })
                .join('')
        )

        return JSON.parse(jsonPayload)
    }

    const userJwt = useAppSelector((state) => state.users.jwt)
    console.log(userJwt)

    return userJwt ? (
        <h1>Welcome {parseJwt(userJwt).sub} !!</h1>
    ) : (
        <>
            <div> PAGINA DE INFORMACION DE CLUB CXN</div>
            <History></History>
        </>
    )
}

const History = () => {
    return (
        <>
            <div>Hitoria cxn:</div>
            <CXNMainDescription></CXNMainDescription>
            <CXNActividadActualClub></CXNActividadActualClub>
            <CXNContacto></CXNContacto>
        </>
    )
}

function CXNMainDescription() {
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" />
                <Card.Body>
                    <Card.Title>Foto principal cxn (Presentacion club)</Card.Title>
                    <Card.Text>El actual edificio donde realiza su actividad el club inaugurado en 200X</Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}



function CXNActividadActualClub() {
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" />
                <Card.Body>
                    <Card.Title>Clases, torneos, competicion federada, etc</Card.Title>
                    <Card.Text>Párrafo donde se explica brevemente con alguna foto la actividad actual del club.</Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}


// Styled components
const ContactoContainer = styled.div`
  display: flex;
  flex-direction: row;
`;












function CXNContacto() {

    const LocationMapContainer = () => {
        
        return (<Container>  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1148.5449657413176!2d-8.193371913182835!3d43.49916876182977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2ddf6189d18199%3A0x584133bf9ebb5f7a!2sLocal%20Social%20Municipal%20Alto%20do%20Casti%C3%B1eiro!5e0!3m2!1ses!2ses!4v1688589460338!5m2!1ses!2ses" width="600" height="450"   loading="lazy" ></iframe></Container>
        )
    }

    const LocationTextContainer = () => {
        
        return (<Container><GeoAlt size={"10rem"}></GeoAlt><p> Local Sococial Alto do Castiñeiro</p>
        <p>Rua Manoel Antonio, 9 </p>
        <p>San Xosé Obrero</p>
        <p>15570 Narón, A Coruña</p></Container>
        )
    }



    return (<div>
        <Accordion>
        <Accordion.Item eventKey="0">
                <Accordion.Header>Historia</Accordion.Header>
                <Accordion.Body>
                   El día 2 de Abril de 1986 se reunieron en el local social: - José Manuel Paz Gómez - Ricardo Tuimil Martinez - Luis Angel Pantín Pérez -
                   José Ramón Pantín Soto - Manuel Carpente Rodeiro - Francisco Couce Rodriguez 
                   como junta directiva quedando elegidos por unanimidad en la 
                   asamblea general extraordinaria celebrada el día 22 de Marzo de 1986 a la que asistieron 10 
                   socios y se aprobaron los estatutos por unanimidad.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>  Contacto</Accordion.Header>
                <Accordion.Body>
                    <ContactForm></ContactForm>
                   -- Formulario de contacto.
                   -- Teléfonos de contacto.
                   -- Horario oficina:
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header> <GeoAlt size={"2rem"}></GeoAlt> Localización</Accordion.Header>
                <Accordion.Body>
                    <ContactoContainer>
                        <LocationMapContainer></LocationMapContainer>
                        <LocationTextContainer></LocationTextContainer>
                    </ContactoContainer>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion></div>
    )
}

export default TheClubPage

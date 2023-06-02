import {useAppSelector } from '../store/hooks'
import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import logo from '../images/LogoCXN.svg'
import { Card, Container, ListGroup } from 'react-bootstrap';
import styled from 'styled-components';


const MainContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`;

const CardsContainer = styled(Container)`
  display: flex;
  flex-direction: row;
`;


const StyledCarousel = styled(Carousel)`
  .carousel-item {
    height: 400px;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`

function CardExample() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={logo} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the cards content.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
}





const HomePage = () => {



  function ControlledCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex:any, e:any) => {
      setIndex(selectedIndex);
    };
  
    return (
      <StyledCarousel variant="dark" activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item >
          <img src={logo} alt="Logo" />
          <Carousel.Caption>
         
            <h3>Titulo del primer carusel</h3>
            <p>Parrafo del primer carusel. Blablabla mas cosas que contar y decir.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={logo} alt="Logo" /> 
          <Carousel.Caption>
            <h3>Titulo del segundo carusel</h3>
            <p>Parrafo del segundo carusel. Blablabla mas cosas que contar y decir.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img src={logo} alt="Logo" />
  
          <Carousel.Caption>
            <h3>Titulo del tercer carusel</h3>
            <p>Parrafo del tercer carusel. Blablabla mas cosas que contar y decir.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </StyledCarousel>
    );
  }




  const parseJwt = (token:string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}




  const userJwt = useAppSelector((state) => state.users.jwt)
  console.log(userJwt)

  return(
    userJwt ? (
    <h1>Welcome {parseJwt(userJwt).sub} !!</h1> ) 
    : (
      <MainContainer>
        <h1>Welcome to the Home Page !!</h1>
        <ControlledCarousel></ControlledCarousel> 
        <CardsContainer>
          <CardExample></CardExample>
          <CardExample></CardExample>
          <CardExample></CardExample>
          <CardExample></CardExample>
        </CardsContainer>
      </MainContainer> 
      )  
    
  )
}

export default HomePage

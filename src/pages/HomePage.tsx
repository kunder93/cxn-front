import {useAppSelector } from '../store/hooks'
import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import logo from '../images/LogoCXN.svg'
const HomePage = () => {



  function ControlledCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex:any, e:any) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel variant="dark" activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
        <img src={logo} width={500} height={500} alt="Logo" />
          <Carousel.Caption>
         
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img src={logo} width={100} height={300} alt="Logo" />
  
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img src={logo} width={300} height={300} alt="Logo" />
  
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
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
      <div>
    <h1>Welcome to the Home Page !!</h1>
    <ControlledCarousel></ControlledCarousel> </div> )  
    
  )
}

export default HomePage

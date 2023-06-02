import {useAppSelector } from '../store/hooks'
import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import logo from '../images/LogoCXN.svg'
const HomePage = () => {

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
    <h1>Escola do Círculo Xadrez Narón</h1>
      <div>Parrafo: ---Escola cxn: Breve explicacion historia(cuando nace escuela) objectivos(para que vas a la escuela, que ganas resumido) (1 parrafo )  </div>

      <div>Parrafo: --- A quien va dirigido? Niños y niñas ( diferenciar clases de adultos, mostrar enlace para ir a adultos, la actividad de adultos lleva otro nombre que no sea `&quot;` escuela`&quot;` ) </div>

      <div> Párrafo: ---- Cuando? calendario - horario de la escuela.
            Fechas en las que se puede apuntar.
            Lugar: acceso maps. Foto complementaria?
      </div>
      <div>
        Párrafo: Metodologia, técnicas aplicadas. Utilizacion de libros, material, tecnologias, analisis de partidas etc....
      </div>
      <div>
        Profesorado: especialistas y expertos, personal que disponemos para impartir o asesorar en las clases.
      </div>

      <div>
        Párrafo: Otras actividades estrechamente relacionadas con las clases y que un alumno va a poder realizar. Ejemplo: torneos de niños del club, 2h de clases presenciales, seguro accidentes, diploma..etc
      </div>

      <div> Precios: informar sobre los precios y formas de pago.</div>

      <div> Descuentos: informar sobre los descuentos aplicables.</div>
     </div> 
     
     
     
     
     
     
     
     
     
     
     )  






  )
}

export default HomePage

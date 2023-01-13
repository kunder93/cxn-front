import React, { SyntheticEvent, useState } from 'react'
import Form from 'react-bootstrap/Form';
import FormContainer from '../components/FormContainer'
import { useNavigate } from "react-router-dom";
import {useAppDispatch } from '../store/hooks'
import {setJwt} from '../store/slices/user/index'
import axios from 'axios';
import {SERVER_URL} from '../resources/server_urls'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'


const LoginPage = () => {
  
  const dispatch = useAppDispatch()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  
  const navigate = useNavigate()

  const [showAlert, setShowAlert] = useState(false)

  const [errorLogin, setErrorLogin] = useState('')
  

  const submitHandler = async(e: SyntheticEvent ) => {
      e.preventDefault()
      const userData = { email: email, password: password }
      axios.post(SERVER_URL, userData).then((response) => {
          console.log(response.status)
          console.log(response.data)
          dispatch(setJwt(response.data.jwt))
          navigate('/')
      }).catch((error) => {
        if (error.response){
          console.log("server responded")
          console.log(error.response)
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
          setErrorLogin(error.response.data.content)
          setShowAlert(true)

        } else if (error.request){
          console.log('network error')
        } else {
          console.log(error)
        }
      })




      console.log('submited Login')
  }

  return (<div>
    <FormContainer>
      <h1> Login Page</h1>
      <Form onSubmit= {submitHandler}>
      <Form.Group className="my-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" 
        value = {email}
        onChange={e => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="my-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" 
        value = {password}
        onChange={e => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </FormContainer>
  {showAlert ? (
             <Alert show={showAlert} variant="danger">
             <Alert.Heading>Error en el login !!!</Alert.Heading>
             <p>
             {errorLogin}
             </p>
             <hr />
             <div className="d-flex justify-content-end">
               <Button onClick={() => setShowAlert(false)} variant="outline-danger">
                 Cerrar
               </Button>
             </div>
           </Alert>
          ) :  ''}
  </div>
  )
}







export default LoginPage
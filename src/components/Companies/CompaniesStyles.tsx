import React from 'react'
import { Button, Col } from 'react-bootstrap'
import styled from 'styled-components'


export const StyledButton = styled(Button)`
color: #000000;
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 10px solid palevioletred;
border-radius: 10px;
border-color: #0d6efd;
background-color: #0d6efd;
`


export const ErrorMessage = styled.div`
    color: red;
`

export const CreateCompanyFormButtonsContainer = styled(Col)`
    margin-top: 1em;
`

export const FloatingNotificationContainer = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
`;
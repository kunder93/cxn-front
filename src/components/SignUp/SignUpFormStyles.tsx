import React from 'react'
import { Alert } from 'react-bootstrap'
import { ExclamationTriangle } from 'react-bootstrap-icons'
import styled from 'styled-components'


export const ProgressBarIconsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
`

export const ErrorAlert = styled(Alert)`
    color: red;
    font-size: 1em;
    background-color: white;
    margin: 3px;
    padding: 0.5em 1.5em;
    border: 1px solid palevioletred;
    border-radius: 10px;
`
export const ErrorTriangle = styled(ExclamationTriangle)`
    height: 10%;
    width: 10%;
`


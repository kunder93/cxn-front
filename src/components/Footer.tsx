import React from 'react'

import { Facebook, Instagram, Youtube, Twitch } from 'react-bootstrap-icons'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import { ReactComponent as DeputacionLogo } from '../images/DepCor_horiz.svg'
import { ReactComponent as EscudoNaronLogo } from '../images/NaronConcelloLogo.svg'
import { ReactComponent as DeporteGalegoLogo } from '../images/deporte-galego.svg'
import { ReactComponent as LogoXunta } from '../images/logo_xunta.svg'
import LogoNarontec from '../images/logotipo-narontec-web.png'

const FooterContainer = styled.footer`
    background-color: green; //#212529;
`

const SpoonsorFooterContainer = styled(Container)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
`

const SocialNetworkFooterContainer = styled(Container)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
`

const SecondFooterContainer = styled(Container)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    color: red;
`

const LastRowFooterContainer = styled(Container)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    color: red;
`
const FacebookIcon = styled(Facebook)`
    width: 100px;
    height: 100px;
    margin: 30px;
    fill: red;
`
const InstagramIcon = styled(Instagram)`
    width: 100px;
    height: 100px;
    margin: 30px;
    fill: red;
`
const YoutubeIcon = styled(Youtube)`
    width: 100px;
    height: 100px;
    margin: 30px;
    fill: red;
`

const TwitchIcon = styled(Twitch)`
    width: 100px;
    height: 100px;
    margin: 30px;
    fill: red;
`
const DeputacionLogoStyled = styled(DeputacionLogo)`
    width: 180px;
    height: 180px;
    margin: 20px;
    //fill: cyan;
`
const EscudoNaronLogoStyled = styled(EscudoNaronLogo)`
    width: 180px;
    height: 180px;
    margin: 20px;
    //fill: cyan;
`

const DeporteGalegoLogoStyled = styled(DeporteGalegoLogo)`
    width: 300px;
    height: 220px;
    margin: 20px;
    //fill: cyan;
`
const XuntaLogoStyled = styled(LogoXunta)`
    width: 300px;
    height: 220px;
    margin: 20px;
    //fill: cyan;
`

const Footer = () => {
    return (
        <FooterContainer >
            <SpoonsorFooterContainer>
                <a href="https://www.naron.es/">
                    <EscudoNaronLogoStyled></EscudoNaronLogoStyled>
                </a>
                <a href="https://www.dacoruna.gal">
                    <DeputacionLogoStyled></DeputacionLogoStyled>
                </a>
                <a href="https://deporte.xunta.gal/">
                    <DeporteGalegoLogoStyled></DeporteGalegoLogoStyled>
                </a>
                <a href="https://www.xunta.gal">
                    <XuntaLogoStyled></XuntaLogoStyled>
                </a>
                <a href="https://narontec.es/">
                    {' '}
                    <img src={LogoNarontec} />
                </a>
            </SpoonsorFooterContainer>

            <SocialNetworkFooterContainer>
                <a href="https://www.facebook.com/XadrezNaron/">
                    <FacebookIcon></FacebookIcon>
                </a>
                <a href="https://www.naron.es/">
                    <InstagramIcon></InstagramIcon>
                </a>
                <a href="https://www.naron.es/">
                    <YoutubeIcon></YoutubeIcon>
                </a>
                <a href="https://www.naron.es/">
                    <TwitchIcon></TwitchIcon>
                </a>
            </SocialNetworkFooterContainer>
            <SecondFooterContainer>
                <div>
                    <p>Aviso Legal</p>
                </div>
                <div>
                    <p>Politica de privacidad</p>
                </div>
                <div>
                    <p>Sugerencias</p>
                </div>
                <div>
                    <p>Contactos</p>
                </div>
            </SecondFooterContainer>
            <LastRowFooterContainer>
                <div>
                    <p>© 2023 Círculo Xadrez Narón</p>
                </div>
            </LastRowFooterContainer>
        </FooterContainer>
    )
}

export default Footer

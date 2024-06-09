import React from 'react'

import { Facebook, Instagram, Twitter } from 'react-bootstrap-icons'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import { ReactComponent as DeputacionLogo } from '../../images/DepCor_horiz.svg'
import { ReactComponent as EscudoNaronLogo } from '../../images/NaronConcelloLogo.svg'
import { ReactComponent as DeporteGalegoLogo } from '../../images/deporte-galego.svg'
import { ReactComponent as LogoXunta } from '../../images/logo_xunta.svg'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../resources/routes-constants'

const FirstRowLogosColour = '#005aaa;'

const FooterContainer = styled.footer`
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
`

const SocialNetworkFooterContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
`

const SpoonsorFooterContainer = styled(SocialNetworkFooterContainer)`
    flex-wrap: wrap;
`

const SecondFooterContainer = styled(Container)`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`

const LastRowFooterContainer = styled(Container)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    color: #adff2f;
`
const FacebookIcon = styled(Facebook)`
    width: 100px;
    height: 100px;
    margin: 30px;
    fill: #ffffff;
`

const InstagramIcon = styled(Instagram)`
    width: 100px;
    height: 100px;
    margin: 30px;
    fill: #ffffff;
`
const TwitterIcon = styled(Twitter)`
    width: 100px;
    height: 100px;
    margin: 30px;
    fill: #ffffff;
`

const DeputacionLogoStyled = styled(DeputacionLogo)`
    width: 180px;
    height: 180px;
    margin: 20px;
    fill: ${FirstRowLogosColour};
`
const EscudoNaronLogoStyled = styled(EscudoNaronLogo)`
    width: 180px;
    height: 180px;
    margin: 20px;
    fill: ${FirstRowLogosColour};
`

const DeporteGalegoLogoStyled = styled(DeporteGalegoLogo)`
    width: 300px;
    height: 220px;
    margin: 20px;
    fill: ${FirstRowLogosColour};
`
const XuntaLogoStyled = styled(LogoXunta)`
    width: 300px;
    height: 220px;
    margin: 20px;
    fill: ${FirstRowLogosColour};
`

const LogoNarontecStyled = styled.img`
    width: 315px;
    height: 55px;
`

const LinkStyle = styled.a`
    &:focus {
        outline: 2px solid blue; // Estilo del borde de foco
        outline-offset: 2px; // Desplazamiento del borde para que no cubra la imagen
    }
    /* Hacer que el elemento sea enfocable */
    &:focus-visible {
        // Aquí puedes establecer un estilo diferente si lo deseas
    }
    /* Estilo de enfoque cuando se navega con el teclado */
    &:focus:not(:focus-visible) {
        outline: none; // Eliminar el borde predeterminado
    }
`

const StyledLink = styled(Link)`
    text-decoration: none;
    transition: color 0.2s; /* Transición suave para el cambio de color */
    &:focus {
        outline: 2px solid blue; /* Estilo del borde de foco */
    }
    &:focus:not(:focus-visible) {
        outline: none; /* Eliminar el borde de foco predeterminado en navegadores modernos */
    }
    &:hover {
        color: #18ad2c; /* Cambiar el color del texto al pasar el ratón sobre el enlace */
    }
`

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <SpoonsorFooterContainer>
                <LinkStyle href="https://www.naron.es/" target="_blank" rel="noopener noreferrer" aria-label="Más sobre concello naron." tabIndex={0}>
                    <EscudoNaronLogoStyled aria-label="Escudo de naron"></EscudoNaronLogoStyled>
                </LinkStyle>
                <LinkStyle href="https://www.dacoruna.gal" target="_blank" rel="noopener noreferrer" aria-label="Más sobre diputacion coruña." tabIndex={0}>
                    <DeputacionLogoStyled aria-label="Logo Diputación Coruña"></DeputacionLogoStyled>
                </LinkStyle>
                <LinkStyle href="https://deporte.xunta.gal/" target="_blank" rel="noopener noreferrer" aria-label="Más sobre deporte galego." tabIndex={0}>
                    <DeporteGalegoLogoStyled aria-label="Logo Deporte Galego"></DeporteGalegoLogoStyled>
                </LinkStyle>
                <LinkStyle href="https://www.xunta.gal" target="_blank" rel="noopener noreferrer" aria-label="Mas sobre xunta de galicia." tabIndex={0}>
                    <XuntaLogoStyled aria-label="Logo Xunta de Galicia"></XuntaLogoStyled>
                </LinkStyle>
                <LinkStyle href="https://narontec.es/" target="_blank" rel="noopener noreferrer" aria-label="Mas sobre patrocinador narontec." tabIndex={0}>
                    <LogoNarontecStyled src="/Footer/logotipo-narontec-web.avif" alt="Logo patrocinador Narontec." loading="lazy" />
                </LinkStyle>
            </SpoonsorFooterContainer>
            <SocialNetworkFooterContainer>
                <LinkStyle
                    href="https://www.facebook.com/XadrezNaron/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ver facebook circulo xadrez naron."
                    tabIndex={0}
                >
                    <FacebookIcon aria-label="Icono Facebook"></FacebookIcon>
                </LinkStyle>
                <LinkStyle
                    href="https://twitter.com/XadrezNaron"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ver instagram circulo xadrez naron."
                    tabIndex={0}
                >
                    <InstagramIcon aria-label="Icono Instagram"></InstagramIcon>
                </LinkStyle>
                <LinkStyle
                    href="https://twitter.com/XadrezNaron"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ver twitter circulo xadrez naron."
                    tabIndex={0}
                >
                    <TwitterIcon aria-label="Icono Twitter"></TwitterIcon>
                </LinkStyle>
            </SocialNetworkFooterContainer>
            <SecondFooterContainer>
                <StyledLink aria-label="Aviso legal" to={ROUTES.LEGAL_NOTICE}>
                    Aviso Legal
                </StyledLink>
                <StyledLink aria-label="Política de privacidad" to={ROUTES.PRIVACY_POLICY}>
                    Politica de privacidad
                </StyledLink>
            </SecondFooterContainer>
            <LastRowFooterContainer>
                <p>© 2024 Círculo Xadrez Narón</p>
            </LastRowFooterContainer>
        </FooterContainer>
    )
}

export default Footer

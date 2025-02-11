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

const LOGO_COLOR = '#005aaa'

const FooterContainer = styled.footer`
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
`

const CenteredContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
`

const SpoonsorFooterContainer = styled(CenteredContainer)`
    flex-wrap: wrap;
`

const SecondFooterContainer = styled(CenteredContainer)`
    flex-direction: row;
    justify-content: space-evenly;
`

const LastRowFooterContainer = styled(CenteredContainer)`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    color: #adff2f;
`

const SocialIcon = styled.div`
    width: 100px;
    height: 100px;
    margin: 30px;
    svg {
        fill: #ffffff;
        width: 100%;
        height: 100%;
    }

    @media (max-width: 768px) {
        width: 60px;
        height: 60px;
        margin: 20px;
    }
`

const SmallLogoContainer = styled.div`
    margin: 20px;
    svg {
        width: 180px;
        height: 180px;
    }
    @media (max-width: 768px) {
        svg {
            width: 120px;
            height: 120px;
        }
    }
`

const LargeLogoContainer = styled.div`
    margin: 20px;
    svg {
        fill: ${LOGO_COLOR};
        width: 300px;
        height: 220px;
    }
    @media (max-width: 768px) {
        svg {
            width: 150px;
            height: 110px;
        }
    }
`

const LinkStyle = styled.a`
    &:focus {
        outline: 2px solid blue;
        outline-offset: 2px;
    }
    &:focus-visible {
        outline: none;
    }
    &:focus:not(:focus-visible) {
        outline: none;
    }
`

const StyledLink = styled(Link)`
    text-decoration: none;
    transition: color 0.2s;
    &:focus {
        outline: 2px solid blue;
    }
    &:focus:not(:focus-visible) {
        outline: none;
    }
    &:hover {
        color: #18ad2c;
    }
`

const logos = [
    {
        Component: EscudoNaronLogo,
        href: 'https://www.naron.es/',
        ariaLabel: 'Más sobre concello naron.',
        large: false
    },
    {
        Component: DeputacionLogo,
        href: 'https://www.dacoruna.gal',
        ariaLabel: 'Más sobre diputacion coruña.',
        large: false
    },
    {
        Component: DeporteGalegoLogo,
        href: 'https://deporte.xunta.gal/',
        ariaLabel: 'Más sobre deporte galego.',
        large: true
    },
    {
        Component: LogoXunta,
        href: 'https://www.xunta.gal',
        ariaLabel: 'Mas sobre xunta de galicia.',
        large: true
    },
    {
        Component: 'img',
        href: 'https://narontec.es/',
        src: '/Footer/logotipo-narontec-web.avif',
        alt: 'Logo patrocinador Narontec.',
        width: '315',
        height: '55',
        large: false
    }
]

const socialLinks = [
    {
        Component: Facebook,
        href: 'https://www.facebook.com/XadrezNaron/',
        ariaLabel: 'Ver facebook circulo xadrez naron.'
    },
    {
        Component: Instagram,
        href: 'https://instagram.com/XadrezNaron',
        ariaLabel: 'Ver instagram circulo xadrez naron.'
    },
    {
        Component: Twitter,
        href: 'https://twitter.com/XadrezNaron',
        ariaLabel: 'Ver twitter circulo xadrez naron.'
    }
]

const Footer: React.FC = () => (
    <FooterContainer>
        <SpoonsorFooterContainer id="footer1Row">
            {logos.map(({ Component, href, ariaLabel, large, ...props }) => (
                <LinkStyle key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} tabIndex={0}>
                    {Component === 'img' ? (
                        <img {...props} loading="lazy" />
                    ) : large ? (
                        <LargeLogoContainer>
                            <Component aria-label={ariaLabel} />
                        </LargeLogoContainer>
                    ) : (
                        <SmallLogoContainer>
                            <Component aria-label={ariaLabel} />
                        </SmallLogoContainer>
                    )}
                </LinkStyle>
            ))}
        </SpoonsorFooterContainer>
        <CenteredContainer id="footer2Row">
            {socialLinks.map(({ Component, href, ariaLabel }) => (
                <LinkStyle key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} tabIndex={0}>
                    <SocialIcon>
                        <Component aria-label={ariaLabel} />
                    </SocialIcon>
                </LinkStyle>
            ))}
        </CenteredContainer>
        <SecondFooterContainer id="footer3Row">
            <StyledLink aria-label="Aviso legal" to={ROUTES.LEGAL_NOTICE}>
                Aviso Legal
            </StyledLink>
            <StyledLink aria-label="Política de privacidad" to={ROUTES.PRIVACY_POLICY}>
                Política de privacidad
            </StyledLink>
        </SecondFooterContainer>
        <LastRowFooterContainer id="footer4Row">
            <p>© 2024 Círculo Xadrez Narón</p>
        </LastRowFooterContainer>
    </FooterContainer>
)

export default Footer

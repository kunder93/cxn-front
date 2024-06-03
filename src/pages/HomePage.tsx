/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import styled from 'styled-components'
import { MainContainerStyled, mainContentContainerBackgroundColor } from '../components/Common/CommonStyles'
import HomePageCard, { ButtonOptions, HomePageCardProps } from '../components/HomePage/HomePageCard'
import HomePageMainCarousel from '../components/HomePage/HomePageMainCarousel'
//import { useAppSelector } from '../store/hooks'
import { SetPageTitle } from '../utility/functions'
import MoreInfoForm from '../components/Common/MoreInfoForm'
import MembersBenefits, { MembersBenefitOption } from '../components/HomePage/MembersBenefits'

const pageMainTitle = 'Circulo Xadrez Narón te da la bienvenida !'
const freeActivitiesTitle = 'Prueba nuestras actividades de forma gratuita sin ser soci@:'
const memberActivitiesTitle = 'Beneficios de hacerte socio:'

const freeAticivitiesCardsData: HomePageCardProps[] = [
    {
        imageSrc: '/Principal/NinosTorneo_optimizada.avif',
        imageAlt: 'Imagen clases niños',
        sources: [],
        cardTitle: 'Clases para niños',
        cardText: ['Disponibles en varios horarios y lugares.', ' Desde 5 hasta 18 años.'],
        buttonProps: [
            {
                buttonText: 'Pide hasta 1 mes de prueba',
                buttonAction: ButtonOptions.MODAL,
                component: <MoreInfoForm initialTopic={'PRUEBA CLASES PARA NIÑOS'} formTitle={'CLASES PARA NIÑOS'} category={'CLASES NIÑOS'} />
            }
        ]
    },
    {
        imageSrc: '/Principal/TorneoTablerosPiezasColocadas_optimizada.avif',
        imageAlt: 'Imagen torneo niños',
        sources: [],
        cardTitle: 'Torneos informales',
        cardText: ['Torneos para cualquiera !', 'Sólo apuntarse y jugar.'],
        buttonProps: [
            { buttonText: 'Próximos torneos', buttonAction: ButtonOptions.NAVIGATION, navigationUrl: 'activities' },
            {
                buttonText: 'Solicitar info',
                buttonAction: ButtonOptions.MODAL,
                component: (
                    <MoreInfoForm
                        initialTopic={'¿CUÁLES SON LOS PRÓXIMOS TORNEOS?'}
                        formTitle={'PRÓXIMOS TORNEOS'}
                        category={'PRÓXIMOS TORNEOS'}
                    ></MoreInfoForm>
                )
            }
        ]
    },
    {
        imageSrc: '/Principal/MayoresClaseOptimizada.avif',
        imageAlt: 'Imagen clase adultos',
        sources: [],
        cardTitle: 'Clases para adultos',
        cardText: ['Desde los 18 años.', ' Disponibles en varios horarios y lugares.'],
        buttonProps: [
            {
                buttonText: 'Pide hasta 1 mes de prueba',
                buttonAction: ButtonOptions.MODAL,
                component: <MoreInfoForm initialTopic={'PRUEBA CLASES PARA NIÑOS'} formTitle={'CLASES PARA ADULTOS'} category={'CLASES ADULTOS'}></MoreInfoForm>
            }
        ]
    }
]

const memberActivitiesCardsData: HomePageCardProps[] = [
    {
        imageSrc: '/Principal/PremiosGallegoVeteranos_optimizada.avif',
        imageAlt: 'Recibiendo premios campoeonato gallego.',
        sources: [],
        cardTitle: 'Torneos y competicion federada',
        cardText: ['Participa en torneos y competición oficial.', 'Enfréntate a los mejores, supera tus límites.'],
        buttonProps: [
            {
                buttonText: 'Más info',
                buttonAction: ButtonOptions.MODAL,
                component: <MembersBenefits benefitOption={MembersBenefitOption.COMPETICION_FEDERADA}></MembersBenefits>
            }
        ]
    },
    {
        imageSrc: '/Principal/LibrosAjedrez_optimizada.avif',
        imageAlt: 'Estantería con libros de ajedrez.',
        sources: [],
        cardTitle: 'Material de ajedrez',
        cardText: ['Acceso a multitud de libros, revistas, programas, piezas, relojes, etc', 'Pide lo que creas que falte, nosotros lo conseguimos.'],
        buttonProps: [
            {
                buttonText: 'Más info',
                buttonAction: ButtonOptions.MODAL,
                component: <MembersBenefits benefitOption={MembersBenefitOption.MATERIAL_AJEDREZ}></MembersBenefits>
            }
        ]
    },
    {
        imageSrc: '/Principal/ClaseAdultos.avif',
        imageAlt: '4 Personas analizando posición ajedrez.',
        sources: [],
        cardTitle: 'Tutorización y seguimiento',
        cardText: [
            'Profesionales capacitados para ayudarte en tu progreso y mostrarte los puntos mejorables y las tecnicas necesarias para alcanzar tus metas.'
        ],
        buttonProps: [
            {
                buttonText: 'Más info',
                buttonAction: ButtonOptions.MODAL,
                component: <MembersBenefits benefitOption={MembersBenefitOption.TUTORIZACION}></MembersBenefits>
            }
        ]
    }
]
const [activity1, activity2, activity3] = freeAticivitiesCardsData
const [memberActivity1, memberActivity2, memberActivity3] = memberActivitiesCardsData

const StyledMainCarouselSection = styled.section`
    grid-area: mainCarousel;
`

const MainContentStyledSection = styled.section`
    grid-area: main-container-section;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto auto;
    grid-template-areas:
        'section-header'
        'free-activities'
        'member-ativities';
    background-color: ${mainContentContainerBackgroundColor};
    align-items: center; /* Centrar verticalmente */
    justify-content: center; /* Centrar horizontalmente */
    color: black;
`

const MainContentHeader = styled.header`
    grid-area: section-header;
`
const PageContentTitle = styled.h1`
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    padding-left: 1em;
    padding-right: 1em;
    font-weight: bold;
    font-size: 250%;
    @media (max-width: 768px) {
        font-size: 200%; // Ajusta este valor según tus necesidades
    }

    @media (max-width: 480px) {
        font-size: 180%; // Ajusta este valor según tus necesidades
    }
`

const ClubFreeActivitiesSection = styled.section`
    grid-area: free-activities;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
        'freeActivitiesHeader freeActivitiesHeader freeActivitiesHeader'
        'freeActivitiesArticle1 freeActivitiesArticle2 freeActivitiesArticle3';
    padding-bottom: 2em;

    @media only screen and (max-width: 1550px) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto auto;
        grid-template-areas:
            'freeActivitiesHeader freeActivitiesHeader '
            ' freeActivitiesArticle1  freeActivitiesArticle2'
            '  freeActivitiesArticle3                   .';
        grid-gap: 2em;
        @media only screen and (max-width: 1050px) {
            /* Cambiar las grid-template-rows para pantallas más pequeñas */
            grid-template-rows: auto auto auto auto;
            grid-template-areas:
                'freeActivitiesHeader freeActivitiesHeader freeActivitiesHeader'
                'freeActivitiesArticle1 freeActivitiesArticle1 freeActivitiesArticle1'
                'freeActivitiesArticle2 freeActivitiesArticle2 freeActivitiesArticle2'
                'freeActivitiesArticle3 freeActivitiesArticle3 freeActivitiesArticle3';
            gap: 1em;
        }
    }
`

const FreeActivitiesHeader = styled.header`
    grid-area: freeActivitiesHeader;
`

const FreeActivitiesTittle = styled.h2`
    padding-bottom: 1vw;
    padding-left: 1em;
    padding-right: 1em;
    @media (max-width: 768px) {
        font-size: 180%; // Ajusta este valor según tus necesidades
    }

    @media (max-width: 480px) {
        font-size: 140%; // Ajusta este valor según tus necesidades
    }
`

const FreeActivitiesArticle = styled.article`
    justify-self: center;
`
// Asignacion de áreas únicas a cada artículo(Card)
const FreeActivitiesArticle1 = styled(FreeActivitiesArticle)`
    grid-area: freeActivitiesArticle1;
`
const FreeActivitiesArticle2 = styled(FreeActivitiesArticle)`
    grid-area: freeActivitiesArticle2;
`
const FreeActivitiesArticle3 = styled(FreeActivitiesArticle)`
    grid-area: freeActivitiesArticle3;
`
const ClubMembersActivitiesSection = styled.section`
    grid-area: member-ativities;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
        'memberActivitiesHeader memberActivitiesHeader memberActivitiesHeader'
        ' memberActivitiesArticle1  memberActivitiesArticle2  memberActivitiesArticle3 ';
    padding-bottom: 2em;

    @media only screen and (max-width: 1550px) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto auto;
        grid-template-areas:
            'memberActivitiesHeader memberActivitiesHeader '
            ' memberActivitiesArticle1  memberActivitiesArticle2'
            '  memberActivitiesArticle3                   .';
        grid-gap: 2em;
        @media only screen and (max-width: 1050px) {
            /* Cambiar las grid-template-rows para pantallas más pequeñas */
            grid-template-rows: auto auto auto auto;
            grid-template-areas:
                'memberActivitiesHeader memberActivitiesHeader memberActivitiesHeader'
                'memberActivitiesArticle1 memberActivitiesArticle1 memberActivitiesArticle1'
                'memberActivitiesArticle2 memberActivitiesArticle2 memberActivitiesArticle2'
                'memberActivitiesArticle3 memberActivitiesArticle3 memberActivitiesArticle3';
            gap: 1em;
        }
    }
`
const MemberActivitiesHeader = styled.header`
    grid-area: memberActivitiesHeader;
`
const MemberActivitiesTittle = styled.h2`
    padding-bottom: 1em;
    padding-left: 1em;
    padding-right: 1em;
`

const MemberActivitiesArticle = styled.article`
    justify-self: center;
`
// Asignacion de áreas únicas a cada artículo(Card)
const MemberActivitiesArticle1 = styled(MemberActivitiesArticle)`
    grid-area: memberActivitiesArticle1;
`
const MemberActivitiesArticle2 = styled(MemberActivitiesArticle)`
    grid-area: memberActivitiesArticle2;
`

const MemberActivitiesArticle3 = styled(MemberActivitiesArticle)`
    grid-area: memberActivitiesArticle3;
`

const HomePage: React.FC = () => {
    SetPageTitle('CXN Principal')
    return (
        <MainContainerStyled>
            <StyledMainCarouselSection>
                <HomePageMainCarousel />
            </StyledMainCarouselSection>
            <MainContentStyledSection>
                <MainContentHeader>
                    <PageContentTitle>{pageMainTitle}</PageContentTitle>
                </MainContentHeader>
                <ClubFreeActivitiesSection>
                    <FreeActivitiesHeader>
                        <FreeActivitiesTittle>{freeActivitiesTitle}</FreeActivitiesTittle>
                    </FreeActivitiesHeader>
                    <FreeActivitiesArticle1>
                        <HomePageCard {...activity1}></HomePageCard>
                    </FreeActivitiesArticle1>
                    <FreeActivitiesArticle2>
                        <HomePageCard {...activity2}></HomePageCard>
                    </FreeActivitiesArticle2>
                    <FreeActivitiesArticle3>
                        <HomePageCard {...activity3}></HomePageCard>
                    </FreeActivitiesArticle3>
                </ClubFreeActivitiesSection>
                <ClubMembersActivitiesSection>
                    <MemberActivitiesHeader>
                        <MemberActivitiesTittle>{memberActivitiesTitle}</MemberActivitiesTittle>
                    </MemberActivitiesHeader>
                    <MemberActivitiesArticle1>
                        <HomePageCard {...memberActivity1}></HomePageCard>
                    </MemberActivitiesArticle1>
                    <MemberActivitiesArticle2>
                        <HomePageCard {...memberActivity2}></HomePageCard>
                    </MemberActivitiesArticle2>
                    <MemberActivitiesArticle3>
                        <HomePageCard {...memberActivity3}></HomePageCard>
                    </MemberActivitiesArticle3>
                </ClubMembersActivitiesSection>
            </MainContentStyledSection>
        </MainContainerStyled>
    )
}

export default HomePage

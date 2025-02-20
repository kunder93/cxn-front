import React from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import { InfoCircle } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../resources/routes-constants'
import { MainContentHeader } from '../../components/SchoolClass/CommonStyles'
import { HeaderPicture, MainContainerStyled, MainContentContainer, PageHeaderImage } from '../../components/Common/CommonStyles'
import usePageTitle from '../../components/Common/hooks/usePageTitle'

/**
 * Color used in image's border only in this page.
 */
const imageBorderColor = '#8a89895c'

const pageFontColor = 'black'

const infoCircleIconSize = 28

/**
 * Main page content title.
 */
const PageTitle = styled.h1`
    grid-area: contentTitle;
    text-align: center;
    padding-top: 1em;
    font-size: 300%;
`

/**
 * Styles for each article. Article  is an  image-text(title and paragraph) that contains info for class activity.
 */
const MainContentArticle = styled.article`
    display: flex;
    flex-direction: row;
    column-gap: 2em;
    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`

/**
 * Style for article image.
 */
const ImageFrame = styled.img`
    border-right: 0.3vw solid ${imageBorderColor};
    border-left: 0.3vw solid ${imageBorderColor};
    border-top: 0.5vw solid ${imageBorderColor};
    border-bottom: 0.5vw solid ${imageBorderColor};
    border-radius: 20%;
    width: 100%;
    aspect-ratio: 1;
    max-width: 500px;
`
/**
 * Style for article box where is content text.
 */
const ContentText = styled.div`
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
    padding-top: 0.5vh;
    padding-bottom: 1vh;
    align-self: center;
    font-size: 130%;
`
/**
 * Style for article box text title.
 */
const ArticleTitle = styled.h2`
    color: ${pageFontColor};
`
const ArticleParagraph = styled.p`
    color: black;
`

interface ArticleInfo {
    imageSrc: string
    imageAlt: string
    title: React.ReactNode
    paragraph: React.ReactNode
}

/**
 * Page main title style.
 */
const pageTitle = 'Escuela Círculo Xadrez Narón'

const headerImageSrc = '/ChessClass/SchoolHeaderImage.avif'

const articlesData: ArticleInfo[] = [
    {
        imageSrc: '/ChessClass/ChessClassKidsImage.avif',
        imageAlt: 'Nuestra clase con niños aprendiendo.',
        title: <ArticleTitle>Clases infantiles</ArticleTitle>,
        paragraph: (
            <ArticleParagraph>
                Las clases para niños y niñas de 5 a 18 años se imparten del 1 de Octubre al 31 de Junio los Lunes y Viernes de 16:00 a 20:00.
                <br /> 2 Horas semanales a escoger.
            </ArticleParagraph>
        )
    },
    {
        imageSrc: '/ChessClass/ChessClassPeople.avif',
        imageAlt: 'Clase con personas reunidas',
        title: <ArticleTitle>Clases para adultos</ArticleTitle>,
        paragraph: (
            <ArticleParagraph>
                Las clases para adultos se realizan los Martes y Jueves en grupos reducidos de 18:00 a 20:00 y los Sábados en Grupo abierto de 11:00 a 13:00.
            </ArticleParagraph>
        )
    },
    {
        imageSrc: '/ChessClass/SchoolChessOnline.avif',
        imageAlt: 'Clase online',
        title: <ArticleTitle>Clases Online</ArticleTitle>,
        paragraph: (
            <ArticleParagraph>
                Las clases online son impartidas de forma individual o en pequeños grupos. <br /> Es preferible el uso de ordenador.
                <br /> Horario flexible.
            </ArticleParagraph>
        )
    }
]

const SchoolPage = (): JSX.Element => {
    usePageTitle('CXN Escuela')
    const navigate = useNavigate()
    return (
        <MainContainerStyled>
            <HeaderPicture>
                <source srcSet={headerImageSrc} type="image/avif" />
                <PageHeaderImage src={headerImageSrc} alt="Clase vacia" />
            </HeaderPicture>
            <MainContentContainer>
                <MainContentHeader>
                    <PageTitle>{pageTitle}</PageTitle>
                </MainContentHeader>
                <MainContentArticle>
                    <ImageFrame src={articlesData[0].imageSrc} alt={articlesData[0].imageAlt} />
                    <ContentText>
                        {articlesData[0].title}
                        {articlesData[0].paragraph}
                        <Button variant="info" onClick={() => navigate(ROUTES.SCHOOL_CHILDS)} aria-label="Información clases infantiles">
                            <InfoCircle color="black" size={infoCircleIconSize} />
                        </Button>
                    </ContentText>
                </MainContentArticle>
                <MainContentArticle id="middleContentArticle">
                    <ContentText>
                        {articlesData[1].title}
                        {articlesData[1].paragraph}
                        <Button variant="info" onClick={() => navigate(ROUTES.SCHOOL_OLDS)} aria-label="Información clases adultos">
                            <InfoCircle color="black" size={infoCircleIconSize} />
                        </Button>
                    </ContentText>
                    <ImageFrame src={articlesData[1].imageSrc} alt={articlesData[1].imageAlt} />
                </MainContentArticle>
                <MainContentArticle>
                    <ImageFrame src={articlesData[2].imageSrc} alt={articlesData[2].imageAlt} />
                    <ContentText>
                        {articlesData[2].title}
                        {articlesData[2].paragraph}
                        <Button variant="info" onClick={() => navigate(ROUTES.SCHOOL_ONLINE)} aria-label="Información clases online">
                            <InfoCircle color="black" size={infoCircleIconSize} />
                        </Button>
                    </ContentText>
                </MainContentArticle>
            </MainContentContainer>
        </MainContainerStyled>
    )
}

export default SchoolPage

import React from 'react'
import { HeaderPicture, MainContainerStyled, MainContentContainer, PageHeaderImage } from '../../components/Common/CommonStyles'
import BenefitsAccordion, { BenefitsAccordionProps } from '../../components/SchoolClass/BenefitsAccordion'
import {
    ContentSection,
    IconOptions,
    MainContentHeader,
    PageSubTittle,
    PageTitle,
    ShortSummaryImage,
    ShortSummaryParagraph,
    ShortSummaryPicture,
    SummaryContentSection
} from '../../components/SchoolClass/CommonStyles'
import { SetPageTitle } from '../../utility/functions'
import { PhotoData } from 'components/SchoolClass/ClassPhotoGalleryCarousel'
import { Button } from 'react-bootstrap'
import { FiletypePdf } from 'react-bootstrap-icons'

const pageTitle = 'Escuela infantil Círculo Xadrez Narón'

const pageSubTitle = 'Compartir nuestra pasión por el ajedrez al mismo tiempo que aprendemos y crecemos como personas.'

const summaryParagraph =
    'Nos apasiona el ajedrez y estamos emocionados de compartir esta pasión con todos vosotros. Aquí no sólo aprendeás movimientos de piezas,descubrirás un universo de estrategia, amistad y diversión.'

const headerImageSrc = '/ChessClass/SchoolHeaderImage.avif'

const summaryImageSrc = '/NinaAmorCaballo.avif'

const carouselBenefits = [
    {
        IconUrl: IconOptions.DESARROLLO_COGNITIVO,
        title: 'Ejercita la cabeza!:',
        IconAlt: 'Desarrollo cognitivo',
        benefit: [
            {
                subtitle: '',
                text: 'Un gimnasio para la mente. Cuando juegas entrenas tu cerebro para pensar en grande y a largo plazo. Planificas tus movimientos y estrategias para ganar. En cada jugada, hay un montón de opciones y tienes que aprender a elegir la mejor decisión.'
            }
        ]
    },
    {
        IconUrl: IconOptions.HABILIDADES_ACADEMICAS,
        title: 'Como ir a la academia',
        IconAlt: 'Habilidades académicas',
        benefit: [
            {
                subtitle: '',
                text: 'Mejora la concentración y memoria. Al jugar hay que recordar cómo mover las piezas y donde ponerlas, asi mejoramos la memoria visual y la concentración. El ajedrez es como un puzle gigante, necesitamos utilizar la lógica para tomar decisiones y sumar movimientos.'
            }
        ]
    },
    {
        IconUrl: IconOptions.HABILIDADES_SOCIALES,
        title: 'Habilidades sociales y emocionales',
        IconAlt: 'Habilidades sociales',
        benefit: [
            {
                subtitle: '',
                text: 'Cuando juegas, estás con otros niños y eso mola. Aprendes a competir sin peleas, a seguir las reglas y hasta a trabajar en equipo si juegas con amigos.'
            },
            {
                subtitle: '',
                text: 'El ajedrez te enseña a esperar tu turno y a no ponerte nervioso cuando estás en plena partida.Un entrenamiento para ser paciente y mantener la calma.'
            },
            {
                subtitle: '',
                text: 'El ajedrez te enseña a esperar tu turno y a no ponerte nervioso cuando estás en plena partida.Un entrenamiento para ser paciente y mantener la calma.'
            },
            {
                subtitle: '',
                text: 'Jugar con otros te hace entender cómo piensan y juegan. Aprendes a respetar cómo juegan tus oponentes y a entender que todos tienen su forma de hacer las cosas'
            }
        ]
    },
    {
        IconUrl: IconOptions.HABILIDADES_EMOCIONALES,
        title: 'Bienestar emocional',
        IconAlt: 'Habilidades emocionales',
        benefit: [
            {
                subtitle: '',
                text: 'Cuando juegas ajedrez aprendes a lidiar con sentirte mal cuando pierdes y a sentirte genial cuando ganas. Te ayuda a aguantar cuando las cosas no van como quieres.'
            },
            {
                subtitle: '',
                text: 'Si mejoras en el juego, te das cuenta de lo capaz que eres, ¡y eso mola mucho! Te hace sentir más seguro y feliz contigo mismo.'
            },
            {
                subtitle: '',
                text: 'El ajedrez te hace concentrarte mucho, y eso hace que te olvides de las cosas que te estresan. Es como una pausa para la mente.'
            }
        ]
    },
    {
        IconUrl: IconOptions.DIVERSION_CREATIVIDAD,
        title: 'Diversión y creatividad',
        IconAlt: 'Diversión y creatividad',
        benefit: [
            {
                subtitle: 'Creatividad táctica:',
                text: 'A través del juego, los niños desarrollan la capacidad de encontrar soluciones creativas para desafíos tácticos.'
            },
            {
                subtitle: 'Curiosidad y exploración:',
                text: 'El ajedrez motiva a los niños a aprender constantemente nuevas estrategias y tácticas, fomentando su curiosidad.'
            }
        ]
    }
]

const faqKidsSchoolPairsQuestionAnswer = [
    {   
        question: '¿Cuándo empiezan las clases?', 
        answer: 'Las clases empiezan en Octubre y duran hasta Junio.' 
    },
    {
        question: '¿Qué dias y cuántas horas?', 
        answer: 'Jueves y viernes, 1 hora cada día, de 16:00 a 19:00.' 

    },
    {
        question: '¿Dónde puedo apuntarme?',
        answer: 'En el padroado de deportes en C.P.M A Gándara o en nuestras oficinas.'
    },
    {
        question:'¿Cuánto cuesta?',
        answer:'El precio para la temporada 2023/2024 es de 13,05  € al mes.'
    },
    {
        question: '¿Necesito comprar algo para las clases o llevar algún material?',
        answer: 'Todo el material necesario lo proporciona el club.'
    },
]

const photosData: PhotoData[] = [
    {
        url: '/ChessClass/KidsClass/CarouselImage1.avif',
        alt: 'Imagen 1'
    },
    {
        url: '/ChessClass/KidsClass/CarouselImage2.avif',
        alt: 'Imagen 2'
    },
    {
        url: '/ChessClass/KidsClass/CarouselImage3.avif',
        alt: 'Imagen 3'
    }
]

const accordionData: BenefitsAccordionProps = {
    carouselBenefits: carouselBenefits,
    initialQuestionsFormTopic: 'CLASES INFANTILES',
    faqList: faqKidsSchoolPairsQuestionAnswer,
    photosData: photosData,
    chessQuestionsFormCategory: 'CLASES NIÑOS'
}


function openPdfWindow() {
    // URL del PDF
    const pdfUrl = '/ChessClass/KidsClass/Cartel_Curso_2023_2024.pdf';
  
    // Abre una nueva ventana y carga el PDF
    window.open(pdfUrl, '_blank');
  }

const SchoolKids: React.FC = () => {
    SetPageTitle('CXN Escuela infantil')
    return (
        <MainContainerStyled>
            <HeaderPicture>
                <source srcSet={headerImageSrc} type="image/avif" />
                <PageHeaderImage src={headerImageSrc} alt="Clase vacia" title="Clase vacia" />
            </HeaderPicture>
            <MainContentContainer>
                <MainContentHeader>
                    <PageTitle>{pageTitle}</PageTitle>
                    <PageSubTittle>{pageSubTitle}</PageSubTittle>
                        <div className="d-flex align-items-center justify-content-center">
                            <Button style={{}} variant="success" onClick={openPdfWindow} > <FiletypePdf size={40}></FiletypePdf>¡ Mira el cartel de las clases !</Button>
                        </div>
                </MainContentHeader>
                <SummaryContentSection>
                    <ShortSummaryParagraph>{summaryParagraph}</ShortSummaryParagraph>
                    <ShortSummaryPicture>
                        <source srcSet={summaryImageSrc} type="image/avif" />
                        <ShortSummaryImage src={summaryImageSrc} alt="Amor caballuno" title="Amor caballuno" />
                    </ShortSummaryPicture>
                </SummaryContentSection>
                <ContentSection>
                    <BenefitsAccordion {...accordionData} />
                </ContentSection>
            </MainContentContainer>
        </MainContainerStyled>
    )
}

export default SchoolKids

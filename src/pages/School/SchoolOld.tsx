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

const pageTitle = 'Escuela adultos Círculo Xadrez Narón'

const pageSubtitle = 'Compartir nuestra pasión por el ajedrez al mismo tiempo que aprendemos y crecemos como personas.'

const summaryParagraph =
    'Nos apasiona el ajedrez y estamos emocionados de compartir esta pasión con todos vosotros. Aquí no sólo aprendeás movimientos de piezas, descubrirás un universo de estrategia, amistad y diversión.'

const headerImageSrc = '/ChessClass/SchoolHeaderImage.avif'

const summaryImageSrc = '/ChessClass/oldClass/GreenArrowGoingUp.avif'

const faqOldSchoolPairsQuestionAnswer = [
    { question: '¿Cuándo empiezan las clases?', answer: 'Las clases empiezan en Octubre y duran hasta Junio.' },
    {
        question: '¿Necesito comprar algo para las clases o llevar algún material?',
        answer: 'Todo el material necesario lo proporciona el club.'
    },
    {
        question: '¿Dónde puedo apuntarme, cuánto cuesta?',
        answer: 'En el padroado de deportes o en nuestras oficinas. Mas info: (link de contacto) '
    }
]

const carouselBenefits = [
    {
        IconUrl: IconOptions.DESARROLLO_COGNITIVO,
        IconAlt: 'Desarrollo cognitivo',
        title: 'Mantén tu mente ágil y activa:',
        benefit: [
            {
                subtitle: '',
                text: 'El ajedrez es un excelente ejercicio cerebral que ayuda a mejorar la memoria, la concentración y la agudeza mental.'
            }
        ]
    },
    {
        IconUrl: IconOptions.HABILIDADES_ACADEMICAS,
        title: 'Aprendizaje continuo:',
        IconAlt: 'Habilidades académicas',
        benefit: [
            {
                subtitle: 'Como ir a la academia',
                text: 'El ajedrez es un juego que siempre ofrece nuevos desafíos y oportunidades de aprendizaje. Aprender estrategias y tácticas más avanzadas puede ser un proceso gratificante y estimulante.'
            }
        ]
    },
    {
        IconUrl: IconOptions.HABILIDADES_SOCIALES,
        title: 'Habilidades sociales',
        IconAlt: 'Habilidades sociales',
        benefit: [
            {
                subtitle: 'Desarrollo de habilidades sociales:',
                text: 'El ajedrez es una actividad social que puede conectar a personas de diferentes edades e intereses. Participar en clubes de ajedrez o torneos puede brindar la oportunidad de conocer gente nueva y construir relaciones.'
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
                text: 'Jugar al ajedrez puede ser una forma efectiva de reducir el estrés y relajarse. Al concentrarse en el juego, se puede desconectar de las preocupaciones diarias y encontrar un espacio mental de tranquilidad.'
            },
            {
                subtitle: 'Autoestima y perseverancia:',
                text: 'A medida que se mejora en el juego, se experimenta un aumento en la confianza en sí mismo y en la capacidad para superar desafíos. Este sentimiento de logro puede impactar positivamente la autoestima y la perseverancia en otros aspectos de la vida.'
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
                text: 'La creatividad en el ajedrez se manifiesta en la toma de decisiones innovadoras, la resolución de problemas y la capacidad para pensar fuera de los esquemas convencionales para alcanzar el éxito.'
            }
        ]
    }
]

const photosData: PhotoData[] = [
    {
        url: '/ChessClass/oldClass/CarouselImage1.avif',
        alt: 'Tablero de ajedrez en pared.'
    },
    {
        url: '/ChessClass/oldClass/CarouselImage2.avif',
        alt: 'Tablero y reloj analógico.'
    },
    {
        url: '/ChessClass/oldClass/CarouselImage3.avif',
        alt: 'Gente em clase de ajedrez.'
    }
]

const accordionData: BenefitsAccordionProps = {
    carouselBenefits: carouselBenefits,
    initialQuestionsFormTopic: 'CLASES INFANTILES',
    faqList: faqOldSchoolPairsQuestionAnswer,
    photosData: photosData
}

const SchoolOld: React.FC = () => {
    SetPageTitle('CXN Escuela adultos')
    return (
        <MainContainerStyled>
            <HeaderPicture>
                <source srcSet={headerImageSrc} type="image/avif" />
                <PageHeaderImage src={headerImageSrc} alt="Clase vacia" />
            </HeaderPicture>
            <MainContentContainer>
                <MainContentHeader>
                    <PageTitle>{pageTitle}</PageTitle>
                    <PageSubTittle>{pageSubtitle}</PageSubTittle>
                </MainContentHeader>
                <SummaryContentSection>
                    <ShortSummaryParagraph>{summaryParagraph}</ShortSummaryParagraph>
                    <ShortSummaryPicture>
                        <source srcSet={summaryImageSrc} type="image/avif" />
                        <ShortSummaryImage src={summaryImageSrc} alt="Flecha verde creciente." />
                    </ShortSummaryPicture>
                </SummaryContentSection>
                <ContentSection>
                    <BenefitsAccordion {...accordionData} />
                </ContentSection>
            </MainContentContainer>
        </MainContainerStyled>
    )
}

export default SchoolOld

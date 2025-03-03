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
import { PhotoData } from '../../components/SchoolClass/ClassPhotoGalleryCarousel'
import usePageTitle from '../../components/Common/hooks/usePageTitle'

const pageTitle = 'Escola online Círculo Xadrez Narón'

const pageSubTitle = 'Compartir nuestra pasión por el ajedrez al mismo tiempo que aprendemos y crecemos como personas.'

const summaryParagraph = 'La escuela online pone a su disposición un monitor con el cual organizar un itinerario para alcanzar unos objetivos de aprendizaje. '

const secondParagraph = 'Desde los 10 años, 1 o 2 horas a la semana.'

const headerImageSrc = '/ChessClass/SchoolHeaderImage.avif'

const summaryImageSrc = '/OnlineChessImageSmall.avif'

const faqOldSchoolPairsQuestionAnswer = [
    { question: '¿Cuándo empiezan las clases?', answer: 'Las clases empiezan en Octubre y duran hasta Junio.' },
    {
        question: '¿Necesito comprar algo para las clases?',
        answer: 'Recomendamos portátil o tablet para realizar los ejercicios y participar en videollamada.'
    },
    {
        question: '¿Dónde puedo apuntarme, cuánto cuesta?',
        answer: 'A través de el formulario de contacto de esta web o en el correo indicado en la sección "El Club - contacto".'
    }
]

const carouselBenefits = [
    {
        IconUrl: IconOptions.DESARROLLO_COGNITIVO,
        title: 'Mantén tu mente ágil y activa:',
        IconAlt: 'Desarrollo cognitivo',
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
    initialQuestionsFormTopic: 'CLASES ONLINE',
    faqList: faqOldSchoolPairsQuestionAnswer,
    photosData: photosData,
    chessQuestionsFormCategory: 'CLASES ONLINE'
}

const SchoolOnline = (): React.JSX.Element => {
    usePageTitle('CXN Escuela online')
    return (
        <MainContainerStyled>
            <HeaderPicture>
                <source srcSet={headerImageSrc} type="image/avif" />
                <PageHeaderImage src={headerImageSrc} alt="Clase vacia" />
            </HeaderPicture>

            <MainContentContainer>
                <MainContentHeader>
                    <PageTitle>{pageTitle}</PageTitle>
                    <PageSubTittle>{pageSubTitle}</PageSubTittle>
                </MainContentHeader>
                <SummaryContentSection>
                    <ShortSummaryParagraph>
                        <p>{summaryParagraph}</p>
                        <p>{secondParagraph}</p>
                    </ShortSummaryParagraph>

                    <ShortSummaryPicture>
                        <source srcSet={summaryImageSrc} type="image/avif" />
                        <ShortSummaryImage src={summaryImageSrc} alt="Amor caballuno" />
                    </ShortSummaryPicture>
                </SummaryContentSection>
                <ContentSection>
                    <BenefitsAccordion {...accordionData} />
                </ContentSection>
            </MainContentContainer>
        </MainContainerStyled>
    )
}

export default SchoolOnline

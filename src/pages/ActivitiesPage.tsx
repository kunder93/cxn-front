import { Card, Container, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { backGroundColor, backgroundImageUrl } from '../components/Common/CommonStyles'
import usePageTitle from '../components/Common/hooks/usePageTitle'

/**
 * Represents the data for an activity card.
 *
 * @interface CardData
 * @property {Date} startDate - The starting date of the activity.
 * @property {Date} endDate - The ending date of the activity.
 * @property {string} title - The title of the activity.
 * @property {string} description - A brief description of the activity.
 * @property {'torneo federado' | 'torneo informal' | 'torneo online' | 'otro' | 'clases'} category - The category of the activity.
 */
interface CardData {
    startDate: Date
    endDate: Date
    title: string
    description: string
    category: 'torneo federado' | 'torneo informal' | 'torneo online' | 'otro' | 'clases'
}

/**
 * ActivityCard component displays individual activity details
 * such as title, description, date range, and category.
 *
 * @param {Object} props - The properties of the ActivityCard component.
 * @param {Date} props.startDate - The starting date of the activity.
 * @param {Date} props.endDate - The ending date of the activity.
 * @param {string} props.title - The title of the activity.
 * @param {string} props.description - A brief description of the activity.
 * @param {'torneo federado' | 'torneo informal' | 'torneo online' | 'otro' | 'clases'} props.category - The category of the activity.
 * @returns {JSX.Element} The rendered ActivityCard component.
 */
const ActivityCard = ({ startDate, endDate, title, description, category }: CardData) => {
    return (
        <article>
            <Card style={{ width: '18rem' }}>
                <Card.Header aria-description="Cabecera del articulo.">
                    <Card.Title>{title}</Card.Title>
                </Card.Header>

                <Card.Body aria-description="Cuerpo del articulo.">
                    <Card.Text>{description}</Card.Text>
                </Card.Body>

                <Card.Footer aria-description="Pie de pagina del articulo.">
                    <small className="text-muted">
                        {format(startDate, "'Desde: 'dd/MMMM/yyyy' a las 'HH:mm", {
                            locale: es
                        })}
                        {format(endDate, " 'Hasta: 'dd/MMMM/yyyy' a las 'HH:mm", {
                            locale: es
                        })}{' '}
                        Categoria: {category}
                    </small>
                </Card.Footer>
            </Card>
        </article>
    )
}

const cardsCarouselData: CardData[] = [
    {
        startDate: new Date('2024-10-01T16:00:00'),
        endDate: new Date('2025-06-30T19:00:00'),
        title: 'Clases ',
        description: 'Las clases para el curso 24-25 comienzan en Octubre y finalizan en junio.',
        category: 'clases'
    },
    {
        startDate: new Date('2024-09-21T10:30:00'),
        endDate: new Date('2024-09-21T20:00:00'),
        title: 'IV Torneo promoción',
        description: 'Campeonato perteneciente al circuito gallego.',
        category: 'torneo federado'
    }
]

const MainContainer = styled.div`
    background-color: ${backGroundColor};
    background-image: url(${backgroundImageUrl});
    align-items: center;
    padding-top: 1.5em;
    padding-bottom: 1em;
`

const StyledContainer = styled(Container)`
    padding-bottom: 2em;
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
    align-items: center;
    justify-content: center;
    align-content: center;
    // Establece el ancho de cada elemento para que ocupe un tercio del contenedor en pantallas más grandes
    & > article {
        flex: 0 0 calc(33.333% - 2em);
        max-width: calc(33.333% - 2em);
        width: 100%; /* Asegura que cada elemento ocupe todo el ancho del contenedor */
        padding: 0.5em; /* Agrega un pequeño espacio entre los elementos */
        box-sizing: border-box; /* Incluye el padding en el ancho del elemento */
    }
    // Media query para ajustar el ancho en pantallas más pequeñas
    @media (max-width: 992px) {
        & > article {
            flex: 0 0 calc(50% - 2em);
            max-width: calc(50% - 2em);
        }
    }
    // Media query para ajustar el ancho en pantallas aún más pequeñas
    @media (max-width: 666px) {
        & > article {
            flex: 0 0 calc(100% - 2em);
            max-width: calc(100% - 2em);
        }
    }
`

const pageTitleMsg = 'Próximas actividades a realizar:'

const PageTitle = styled.h1`
    color: white;
    text-align: center;
    font-size: 270%;
    background-color: #212529;
    margin-bottom: 0;
    padding-bottom: 1em;
`

/**
 * ActivitiesPage component that displays a list of upcoming activities.
 *
 * This component fetches and renders multiple activity cards,
 * along with a title for the page.
 *
 * @returns {JSX.Element} The rendered Activities page component.
 */
const ActivitiesPage = (): JSX.Element => {
    usePageTitle('CXN Actividades')
    return (
        <MainContainer>
            <Row>
                <PageTitle>{pageTitleMsg}</PageTitle>
            </Row>
            <StyledContainer>
                {cardsCarouselData.map((cardData, index) => (
                    <ActivityCard key={index} {...cardData} />
                ))}
            </StyledContainer>
        </MainContainer>
    )
}

export default ActivitiesPage

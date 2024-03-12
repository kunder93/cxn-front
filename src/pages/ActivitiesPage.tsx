import React from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { backGroundColor, backgroundImageUrl } from '../components/Common/CommonStyles'
import { SetPageTitle } from '../utility/functions'

interface CardData {
    startDate: Date
    endDate: Date
    title: string
    description: string
    category: 'torneo federado' | 'torneo informal' | 'torneo online' | 'otro'
}

const ActivityCard: React.FC<CardData> = ({ startDate, endDate, title, description, category }) => {
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
        startDate: new Date('2024-01-02T19:00:00'),
        endDate: new Date('2024-06-28T19:00:00'),
        title: 'Entrenamiento y charla',
        description: 'Todos los viernes a partir de las 19:00 nos reunimos en el local del alto para jugar partidas, hablar y entrenar.',
        category: 'otro'
    },
    {
        startDate: new Date('2024-02-22T14:00:00'),
        endDate: new Date('2024-02-22T18:00:00'),
        title: 'Torneo Relámpago de Ajedrez',
        description: 'Competencia de ajedrez rápida para jugadores de todos los niveles.',
        category: 'torneo informal'
    },
    {
        startDate: new Date('2024-03-10T09:00:00'),
        endDate: new Date('2024-03-10T17:00:00'),
        title: 'Clase Magistral de Ajedrez',
        description: 'Lección magistral de ajedrez a cargo del Gran Maestro Internacional.',
        category: 'otro'
    },
    {
        startDate: new Date('2024-03-15T18:00:00'),
        endDate: new Date('2024-03-15T20:00:00'),
        title: 'Simultáneas con un Maestro',
        description: 'Desafía a un maestro de ajedrez jugando simultáneamente contra él.',
        category: 'otro'
    },
    {
        startDate: new Date('2024-03-20T10:00:00'),
        endDate: new Date('2024-03-20T16:00:00'),
        title: 'Torneo de Ajedrez Juvenil',
        description: 'Competición de ajedrez para jóvenes promesas del deporte.',
        category: 'torneo federado'
    },
    {
        startDate: new Date('2024-03-25T11:00:00'),
        endDate: new Date('2024-03-25T14:00:00'),
        title: 'Torneo Amistoso de Ajedrez',
        description: 'Torneo de ajedrez amistoso para la comunidad local.',
        category: 'torneo informal'
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

const ActivitiesPage: React.FC = () => {
    SetPageTitle('CXN Actividades')
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

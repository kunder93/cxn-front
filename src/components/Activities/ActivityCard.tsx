import React from 'react'
import { Card, Badge, Spinner, Alert } from 'react-bootstrap'
import styled from 'styled-components'
import { ActivityCategory, IActivity } from './Types'
import { useActivityImage } from './Hooks'

const StyledCard = styled(Card)`
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition:
        transform 0.2s ease-in-out,
        box-shadow 0.2s ease-in-out;
    width: 320px;
    height: 380px;
    cursor: pointer;
    position: relative;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    }

    .img-wrapper {
        position: relative;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f8f9fa;
    }

    img {
        aspect-ratio: 16 / 9;
        object-fit: cover;
        max-height: 200px;
        width: 100%;
    }

    .category-badge {
        position: absolute;
        top: 10px;
        left: 10px;
        color: white;
        font-size: 0.8em;
        padding: 5px 8px;
        border-radius: 4px;
    }

    .card-body {
        padding: 15px;
        text-align: center;
        overflow-y: auto;
    }

    .card-title {
        font-size: 1.3em;
        font-weight: bold;
        margin-bottom: 10px;
        color: #333;
    }

    .card-text {
        color: #555;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 110px;
    }
`
const DateWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const formatDate = (date: Date) =>
    `${date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' })} ${date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false })}`

interface ActivityCardProps {
    activity: IActivity
}

const getBadgeVariant = (category: ActivityCategory) => {
    switch (category) {
        case ActivityCategory.TORNEO:
            return 'primary'
        case ActivityCategory.ENTRENAMIENTO:
            return 'success'
        case ActivityCategory.CLASES:
            return 'warning'
        case ActivityCategory.INFORMAL:
            return 'info'
        case ActivityCategory.OTRO:
            return 'secondary'
        default:
            return 'secondary'
    }
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
    const { loading, image, error } = useActivityImage(activity)

    return (
        <StyledCard>
            <div className="img-wrapper">
                {loading ? (
                    <Spinner animation="border" variant="primary" />
                ) : error ? (
                    <Alert variant="warning" className="m-0 p-2">
                        Imagen no disponible
                    </Alert>
                ) : (
                    <Card.Img variant="top" src={image} alt="Activity Image" />
                )}
                <Badge className="category-badge" bg={getBadgeVariant(activity.category ?? ActivityCategory.OTRO)}>
                    {activity.category}
                </Badge>
            </div>
            <Card.Body>
                <Card.Title>{activity.title}</Card.Title>
                <Card.Text>{activity.description}</Card.Text>
                <DateWrapper>
                    <span>Desde: {activity.startDate ? formatDate(new Date(activity.startDate)) : 'N/A'}</span>
                    <span>Hasta: {activity.endDate ? formatDate(new Date(activity.endDate)) : 'N/A'}</span>
                </DateWrapper>
            </Card.Body>
        </StyledCard>
    )
}

export default ActivityCard

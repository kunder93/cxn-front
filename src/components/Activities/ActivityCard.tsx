import React from 'react'
import { Card, Badge } from 'react-bootstrap'
import styled from 'styled-components'
import { ActivityCategory, IActivityWithImageUrl } from './Types'

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

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    }

    img {
        aspect-ratio: 16 / 9;
        object-fit: cover;
        max-height: 200px;
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
    activity: IActivityWithImageUrl
}

const imageSrcSelector = (activity: IActivityWithImageUrl) => {
    if (!activity.imageUrl) {
        switch (activity.category) {
            case ActivityCategory.TORNEO:
                return 'genericImageSourceForTorneo'
            case ActivityCategory.ENTRENAMIENTO:
                return 'genericImageSourceForEntrenamiento'
            case ActivityCategory.CLASES:
                return 'genericImageSourceForClases'
            case ActivityCategory.INFORMAL:
                return 'genericImageSourceForInformal'
            case ActivityCategory.OTRO:
            default:
                return 'genericImageSourceForOtro'
        }
    } else {
        return activity.imageUrl
    }
}

const getBadgeVariant = (category: ActivityCategory) => {
    switch (category) {
        case ActivityCategory.TORNEO:
            return 'primary' // Blue for tournaments
        case ActivityCategory.ENTRENAMIENTO:
            return 'success' // Green for training
        case ActivityCategory.CLASES:
            return 'warning' // Yellow for classes
        case ActivityCategory.INFORMAL:
            return 'info' // Teal for informal activities
        case ActivityCategory.OTRO:
        default:
            return 'secondary' // Default gray for other or unknown
    }
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
    return (
        <StyledCard>
            <div className="img-wrapper">
                <Card.Img variant="top" src={imageSrcSelector(activity)} alt="Activity Image" />
                <Badge className="category-badge" bg={getBadgeVariant(activity.category ? activity.category : ActivityCategory.OTRO)}>
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

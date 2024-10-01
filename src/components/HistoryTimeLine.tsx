import { Container, Row, Col } from 'react-bootstrap'

/**
 * Represents a single event in the timeline.
 * @interface TimelineEvent
 * @property {string} date - The date of the event.
 * @property {string} title - The title of the event.
 * @property {string} description - A brief description of the event.
 */
interface TimelineEvent {
    date: string
    title: string
    description: string
}

/**
 * Props for the Timeline component.
 * @interface TimelineProps
 * @property {TimelineEvent[]} events - An array of events to be displayed in the timeline.
 */
interface TimelineProps {
    events: TimelineEvent[]
}

/**
 * Timeline component that displays a list of events.
 *
 * @param {TimelineProps} props - The props for the Timeline component.
 * @returns {JSX.Element} The rendered Timeline component.
 */
const Timeline = ({ events }: TimelineProps) => {
    return (
        <Container>
            {events.map((event, index) => (
                <Row key={index}>
                    <Col xs={3}>
                        <div className="timeline-date">{event.date}</div>
                    </Col>
                    <Col xs={9}>
                        <div className="timeline-event">
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                        </div>
                    </Col>
                </Row>
            ))}
        </Container>
    )
}

export default Timeline

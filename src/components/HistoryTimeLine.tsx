import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
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
  );
};

export default Timeline;
import React, { ReactNode } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

/**
 * Props for the FormContainer component.
 * @interface FormContainerProps
 * @property {ReactNode} children - The content to be displayed within the container.
 */
interface FormContainerProps {
    children: ReactNode
}

/**
 * A container component that wraps its children with Bootstrap styling.
 *
 * @param {FormContainerProps} props - The props for the FormContainer component.
 * @returns {JSX.Element} The rendered FormContainer component.
 */
const FormContainer: React.FC<FormContainerProps> = ({ children }: FormContainerProps): JSX.Element => {
    return (
        <Container className="py-3">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer

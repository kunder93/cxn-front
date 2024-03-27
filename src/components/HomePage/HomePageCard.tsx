import React, { ReactElement } from 'react'
import { Button, Card, CardImg } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import HomePageCardModal from './HomePageCardModal'

const ScaledImage = styled(CardImg)`
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: fill;
    border-radius: 0% !important;
`
const CardFooter = styled(Card.Footer)`
    &&& {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: stretch;
        padding: 0; /* Elimina el padding */
    }
`

const StyledCardBody = styled(Card.Body)`
    text-align: center; /* Alinea el contenido al centro */
    background-color: #f4f8d3;
    &&& {
        padding: 0;
        padding-top: 0.5em !important;
        padding-bottom: 0 !important;
        padding-left: 0.5em;
        padding-right: 0.5em;
    }
`

const StyledCard = styled(Card)`
    border-radius: 0 !important;
    border: 0 !important;
    width: 300px;
    height: 350px !important;
`

const StyledCardText = styled(Card.Text)`
    margin-bottom: 0%;
    padding-bottom: 0.5em;
    font-family: 'Roboto', sans-serif;
`

const StyledCardTitle = styled(Card.Title)`
    font-family: 'Protest Strike', sans-serif;
`

export enum ButtonOptions {
    NAVIGATION = 'NAVIGATION', // Para acciones de navegación
    MODAL = 'MODAL' // Para renderizar el modal
}

export interface FormParams {
    formInitialTopic: string
    formTitle: string
}

export interface ButtonProps {
    buttonText: string
    buttonAction: ButtonOptions
    component?: ReactElement
    navigationUrl?: string
}

export interface HomePageCardProps {
    imageSrc: string
    imageAlt: string
    cardTitle: string
    cardText: string[]
    buttonProps: ButtonProps[]
}

const HomePageCard: React.FC<HomePageCardProps> = (props) => {
    const navigate = useNavigate()
    const [showModal, setShowModal] = React.useState(false)
    const [modalContent, setModalContent] = React.useState<ReactElement | null>(null)

    function closeModal() {
        setShowModal(false)
    }

    function buttonClickHandler(buttonProps: ButtonProps): void {
        switch (buttonProps.buttonAction) {
            case ButtonOptions.MODAL:
                setShowModal(true)
                setModalContent(buttonProps.component ?? null)
                break
            case ButtonOptions.NAVIGATION:
                navigate(buttonProps.navigationUrl ?? '')
                break
            default:
                break
        }
    }

    return (
        <>
            <article>
                <StyledCard>
                    <ScaledImage src={props.imageSrc} alt={props.imageAlt} loading='lazy' />
                    <StyledCardBody>
                        <StyledCardTitle>{props.cardTitle}</StyledCardTitle>
                        {props.cardText.map((text, index) => (
                            <StyledCardText key={index}>{text}</StyledCardText>
                        ))}
                    </StyledCardBody>
                    <CardFooter>
                        {props.buttonProps.map((button, index) => (
                            <Button
                                variant="success"
                                key={index}
                                onClick={() => buttonClickHandler(button)}
                                style={{ flexGrow: 1, borderRadius: 0, textShadow: '4px 4px 5px rgba(0, 0, 0, 0.5)' }}
                            >
                                {button.buttonText}
                            </Button>
                        ))}
                    </CardFooter>
                </StyledCard>
            </article>
            <HomePageCardModal
                show={showModal}
                closemodal={closeModal}
                modalcontentcomponent={modalContent ?? null} // Renderizar contenido modal personalizado
            ></HomePageCardModal>
        </>
    )
}

export default HomePageCard

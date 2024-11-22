import React, { ReactElement } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import HomePageCardModal from './HomePageCardModal'
import HomePageCardImage from './HomePageCardImage'

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
    border: 4px solid #926f32 !important;
    width: 300px;
    height: 380px !important;
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
    sources: {
        srcSet: string
        media?: string
        type?: string
    }[]
    cardTitle: string
    cardText: string[]
    buttonProps: ButtonProps[]
    modalAriaLabel: string
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
                    <HomePageCardImage alt={props.imageAlt} src={props.imageSrc} sources={props.sources} />
                    <StyledCardBody>
                        <StyledCardTitle>{props.cardTitle}</StyledCardTitle>
                        {props.cardText.map((text, index) => (
                            <StyledCardText key={index}>{text}</StyledCardText>
                        ))}
                    </StyledCardBody>
                    <CardFooter>
                        {props.buttonProps.map((button, index) => (
                            <Button
                                key={index}
                                onClick={() => buttonClickHandler(button)}
                                style={{
                                    flexGrow: 1,
                                    borderRadius: 0,
                                    textShadow: '4px 4px 5px rgba(0, 0, 0, 0.5)',
                                    backgroundColor: '#857415',
                                    borderColor: '#857415',
                                    borderRight: index !== props.buttonProps.length - 1 ? '2px solid #926f32' : 'none',
                                    transition: 'background-color 0.3s ease-in-out'
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#af9919')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#857415')}
                            >
                                {button.buttonText}
                            </Button>
                        ))}
                    </CardFooter>
                </StyledCard>
            </article>
            <HomePageCardModal
                show={showModal}
                closeModal={closeModal}
                modalContentComponent={modalContent ?? null} // Renderizar contenido modal personalizado
                ariaLabel={props.modalAriaLabel}
            />
        </>
    )
}

export default HomePageCard

import React, { ReactElement } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import HomePageCardModal from './HomePageCardModal'

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

const StyledCardBodyTitle = styled(Card.Title)`
    font-family: 'Protest Strike', sans-serif;
`

const StyledFooterButton = styled(Button)`
    display: flex;
    flex-grow: 1;
    border-radius: 0;
    text-shadow: '4px 4px 5px rgba(0, 0, 0, 0.5)';
    background-color: #92801a;
    border-color: #6d5f11;
    transition: background-color 0.3s ease-in-out;
    justify-content: center;
`

const CardHeaderImage = styled(Card.Img)`
    border-radius: 0;
    aspect-ratio: 16/9;
`

export enum ButtonOptions {
    NAVIGATION = 'NAVIGATION', // navigation actions.
    MODAL = 'MODAL' // Render modal.
}

export interface FormParams {
    formInitialTopic: string
    formTitle: string
}

export interface MyButtonProps {
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
    buttonProps: MyButtonProps[]
    modalAriaLabel: string
}

const HomePageCard: React.FC<HomePageCardProps> = (props) => {
    const navigate = useNavigate()
    const [showModal, setShowModal] = React.useState(false)
    const [modalContent, setModalContent] = React.useState<ReactElement | null>(null)

    function buttonClickHandler(buttonProps: MyButtonProps): void {
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
        <article>
            <StyledCard>
                <CardHeaderImage variant="top" src={props.imageSrc} alt={props.imageAlt} loading="lazy" />
                <StyledCardBody>
                    <StyledCardBodyTitle>{props.cardTitle}</StyledCardBodyTitle>
                    {props.cardText.map((text, index) => (
                        <StyledCardText key={index}>{text}</StyledCardText>
                    ))}
                </StyledCardBody>
                <CardFooter>
                    {props.buttonProps.map((button, index) => (
                        <StyledFooterButton
                            key={index}
                            onClick={() => buttonClickHandler(button)}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#af9919')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#857415')}
                        >
                            {button.buttonText}
                        </StyledFooterButton>
                    ))}
                </CardFooter>
            </StyledCard>

            <HomePageCardModal
                show={showModal}
                closeModal={() => setShowModal(false)}
                modalContentComponent={modalContent ?? null} // Content for render inner modal.
                ariaLabel={props.modalAriaLabel}
            />
        </article>
    )
}

export default HomePageCard

import { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import styled from 'styled-components'
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons'
import { IconOptions } from './CommonStyles'
import { carouselBackgroundSlideColor } from '../Common/CommonStyles'

// Chess pieces and src url as enum.
const pieceUrls: Record<number, string> = {
    0: '/ChessPiecesSVG/ChessWhiteQueen.svg',
    1: '/ChessPiecesSVG/ChessWhiteBishop.svg',
    2: '/ChessPiecesSVG/ChessWhiteHorse.svg',
    3: '/ChessPiecesSVG/ChessWhiteRook.svg',
    4: '/ChessPiecesSVG/ChessWhiteKing.svg'
}

// String messages.
const carouselTitleMsg = 'Beneficios de el ajedrez en niños:'
const nextButtonTitle = 'Siguiente'
const previousButtonTitle = 'Anterior'

enum IconDirection {
    Right = 'right',
    Left = 'left'
}

interface IconButtonProps {
    direction: IconDirection
    onClick: () => void
}

const IconButtonStyle = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    margin-bottom: 2px;
    &:focus-visible {
        outline: 4px solid blue !important;
    }
`

const IconButton = ({ direction, onClick }: IconButtonProps) => {
    const buttonTitle: string = direction === IconDirection.Right ? nextButtonTitle : previousButtonTitle
    return (
        <IconButtonStyle onClick={onClick} aria-label={buttonTitle} type="button">
            {direction === IconDirection.Right ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </IconButtonStyle>
    )
}

const CarouselSectionHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const ChessPieceStyled = styled.img`
    height: 100px;
`

const CarouselTitle = styled.h3`
    font-size: 200%;
    align-self: center;
    flex-basis: 40%;
`

const StyledCarousel = styled(Carousel)`
    background-color: ${carouselBackgroundSlideColor};

    overflow: hidden;
`

const CarouselItemContainerSection = styled.section`
    min-height: 350px;
    position: relative;
`

const IconStyle = styled.img`
    width: 130px;
    height: auto;
`

interface Benefit {
    subtitle: string
    text: string
}

export interface CarouselItemMessage {
    IconUrl: IconOptions
    IconAlt: string
    title: string
    benefit: Benefit[]
}

interface Props {
    benefits: CarouselItemMessage[]
}

const VisuallyHidden = styled.div`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
`

const ClassBenefitsCarousel = ({ benefits }: Props) => {
    const [index, setIndex] = useState(0)
    const totalItems = benefits.length

    const handleStep = (step: number) => {
        const newIndex = (index + step + totalItems) % totalItems
        setIndex(newIndex)
    }

    const handleNextStep = () => handleStep(1)
    const handlePreviousStep = () => handleStep(-1)

    const currentPieceUrl = pieceUrls[index]

    return (
        <section aria-label="Carousel de beneficios del ajedrez">
            <CarouselSectionHeader>
                <CarouselTitle>{carouselTitleMsg}</CarouselTitle>
                <IconButton direction={IconDirection.Left} onClick={handlePreviousStep} />
                <ChessPieceStyled src={currentPieceUrl} alt="" aria-hidden="true" />
                <IconButton direction={IconDirection.Right} onClick={handleNextStep} />
            </CarouselSectionHeader>

            <VisuallyHidden aria-live="polite">
                Slide {index + 1} of {totalItems}
            </VisuallyHidden>

            <StyledCarousel fade={false} controls={false} indicators={false} interval={4} activeIndex={index} className="slide">
                {benefits.map((item, idx) => (
                    <Carousel.Item key={`item-${item.title}`} aria-roledescription="slide" aria-label={`Slide ${idx + 1} of ${totalItems}`}>
                        <CarouselItemContainerSection aria-live="polite">
                            <IconStyle src={item.IconUrl} alt={item.IconAlt} />
                            <h4>{item.title}</h4>
                            {item.benefit.map((benefit, pIdx) => (
                                <div key={`benefit-${idx}-${pIdx}`}>
                                    <h5>{benefit.subtitle}</h5>
                                    <p>{benefit.text}</p>
                                </div>
                            ))}
                        </CarouselItemContainerSection>
                    </Carousel.Item>
                ))}
            </StyledCarousel>
        </section>
    )
}

export default ClassBenefitsCarousel

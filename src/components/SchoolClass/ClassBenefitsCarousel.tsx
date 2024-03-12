import React from 'react'
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
/**
 * Enum type for navigate right or left slides in carousel.
 */
enum IconDirection {
    Right = 'right',
    Left = 'left'
}

/**
 * Props interface for IconButton component.
 */
interface IconButtonProps {
    direction: IconDirection // Left or right direction
    onClick: () => void // void function
}

const IconButtonStyle = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    margin-bottom: 2px;
    &:focus {
        outline: 4px solid blue !important; 
    }
    /* focus style when navigate with keyboard */
    &:focus:not(:focus-visible) {
        outline: none; 
    }
`

/**
 * IconButton component to represent a button with a chevron icon for carousel navigation.
 * @param {IconButtonProps} props - The component properties.
 */
const IconButton: React.FC<IconButtonProps> = ({ direction, onClick }: IconButtonProps) => {
    const buttonTitle: string = direction === IconDirection.Right ? nextButtonTitle : previousButtonTitle
    return (
        <IconButtonStyle onClick={onClick} aria-describedby={buttonTitle} type="button" aria-label={buttonTitle}>
            {direction === IconDirection.Right ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </IconButtonStyle>
    )
}

/**
 * Header for section where is carousel.
 */
const CarouselSectionHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`
/**
 * Style for header chess piece that is used for change carousel slice.
 */
const ChessPieceStyled = styled.img`
    height: 100px;
`
/**
 * Style for carousel header title.
 */
const CarouselTitle = styled.h3`
    font-size: 200%;
    align-self: center;
    flex-basis: 40%;
`

/**
 * Style for carousel transition.
 */
const StyledCarousel = styled(Carousel)`
    background-color: ${carouselBackgroundSlideColor};
    .carousel-item {
        transition: margin-left 1s ease-in-out 0.4s;
    }
`

/**
 * Carousel.Item container used for stablish section and styles.
 */
const CarouselItemContainerSection = styled.section`
    min-height: 350px;
`

/**
 * Style from icon image used into carousel body slice.
 */
const IconStyle = styled.img`
    width: 130px;
    height: auto;
`

/**
 * Piece of text and subtitle to show into carousel slide.
 */
interface benefit {
    subtitle: string
    text: string
}

/**
 * Properties that one carousel item need have.
 */
export interface CarouselItemMessage {
    IconUrl: IconOptions
    IconAlt: string
    title: string
    benefit: benefit[]
}

interface Props {
    benefits: CarouselItemMessage[]
}

const ClassBenefitsCarousel: React.FC<Props> = ({ benefits }) => {
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
        <section>
            <CarouselSectionHeader>
                <CarouselTitle>{carouselTitleMsg}</CarouselTitle>
                <IconButton direction={IconDirection.Left} onClick={handlePreviousStep} />
                <ChessPieceStyled src={currentPieceUrl} title="Carousel chess piece" alt="piece changes like carousel content"></ChessPieceStyled>
                <IconButton direction={IconDirection.Right} onClick={handleNextStep} />
            </CarouselSectionHeader>
            
                <StyledCarousel fade={true} controls={false} indicators={false} interval={null} activeIndex={index}>
                    {benefits.map((item, idx) => (
                        <Carousel.Item key={`item-${idx}`}>
                            <CarouselItemContainerSection key={`container-${idx}`}>
                                <IconStyle src={item.IconUrl} alt={item.IconAlt}/>
                                <h4>{item.title}</h4>
                                {item.benefit.map((benefit, pIdx) => (
                                    <React.Fragment key={`benefit-${idx}-${pIdx}`}>
                                        <div>
                                            <h5>{benefit.subtitle}</h5>
                                            <h6>{benefit.text}</h6>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </CarouselItemContainerSection>
                        </Carousel.Item>
                    ))}
                </StyledCarousel>
           
        </section>
    )
}

export default ClassBenefitsCarousel

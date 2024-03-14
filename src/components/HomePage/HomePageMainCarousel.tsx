import React from 'react'
import { Carousel } from 'react-bootstrap'
import styled from 'styled-components'

const carouselImageSrc1 = '/Principal/ImagenCarouselPrincipal_1.avif'

const StyledCarousel = styled(Carousel)`
    .carousel-item {
        img {
            aspect-ratio: 9/2;
            width: 100%;
            max-height: 50vh;
        }
    }
`

/**
 * Create carousel for main page.
 * @returns Carousel used in main page to show main page header images.
 */
export const HomePageMainCarousel: React.FC = () => {
    return (
        <StyledCarousel controls={false} indicators={false} fade={true} interval={5000}>
            <Carousel.Item>
                <img src={carouselImageSrc1} alt="ImageCarousel1" /> {/* No lazy cause it loads in the first page view*/}
            </Carousel.Item>
        </StyledCarousel>
    )
}

export default HomePageMainCarousel

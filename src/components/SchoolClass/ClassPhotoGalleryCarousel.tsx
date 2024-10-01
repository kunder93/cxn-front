import { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import styled from 'styled-components'

const StyledCarousel = styled(Carousel)`
    height: 100%;
    width: 100%;
`
const StyledItem = styled(Carousel.Item)``

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    aspect-ratio: 2;
`

export interface PhotoData {
    url: string
    alt: string
}

export interface PhotoGalleryCarouselProps {
    photosUrl: PhotoData[]
}

const ClassPhotoGalleryCarousel = ({ photosUrl }: PhotoGalleryCarouselProps) => {
    const [index, setIndex] = useState(0)

    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex)
    }

    return (
        <StyledCarousel activeIndex={index} onSelect={handleSelect}>
            {photosUrl.map((photosUrl, index) => (
                <StyledItem key={index}>
                    <StyledImage src={photosUrl.url} alt={photosUrl.alt} loading="lazy" />
                </StyledItem>
            ))}
        </StyledCarousel>
    )
}

export default ClassPhotoGalleryCarousel

import React from 'react'
import styled from 'styled-components'
import Image from 'react-bootstrap/Image'

const carouselImageSrc1 = '/Principal/HomePageHeader.avif'

const PictureContainer = styled.div`
    width: 100%;
    overflow: hidden; /* Evita que el contenido adicional desborde */
`

const MainPicture = styled.picture`
    width: 100%;
`

const StyledImage = styled(Image)`
    width: 100%;
    height: auto; /* Mantiene la proporción de la imagen */
    aspect-ratio: 4/1;
    filter: blur(2px);
    @media (max-width: 768px) {
        height: 200px;
    }
`

const HomePageHeaderImage: React.FC = () => {
    return (
        <PictureContainer>
            <MainPicture>
                <source media="(min-width:1050px)" srcSet="/Principal/HomePageHeader1050.avif" />
                <source media="(min-width:650px)" srcSet="/Principal/HomePageHeader650.avif" />
                <source media="(min-width:450px)" srcSet="/Principal/HomePageHeader450.avif" />
                <StyledImage src={carouselImageSrc1} alt="Imagen cabecera pagina principal." fluid /> {/* No lazy cause it loads in the first page view */}
            </MainPicture>
        </PictureContainer>
    )
}

export default HomePageHeaderImage

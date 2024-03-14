import { Accordion } from 'react-bootstrap'
import styled from 'styled-components'

// COLORS
export const backGroundColor = '#212529'
export const backgroundImageUrl = '/Principal/chessPiecesBackground.avif'
const mainPageFontColor = 'white'
//Accordion colors
const accordionSectionHeaderBackgroundColor = ' #75674efc'
const accordionSectionHeaderBackgroundColorExpanded = '#695839'
const accordionSectionHeaderFontAndIconColorExpanded = '#15ff00'
const accordionSectionBodyBackgroundColor = '#d8cdba'
export const carouselBackgroundSlideColor = accordionSectionBodyBackgroundColor
export const principalFontColor = 'black'
export const mainContentContainerBackgroundColor = '#aca6a2'
/**
 * Container for stablish styles for general pages
 * it contains background color-image and a grid template.
 */
export const MainContainerStyled = styled.div`
    display: grid;
    background-color: ${backGroundColor};
    background-image: url(${backgroundImageUrl});
    background-size: fill;
    color: ${mainPageFontColor};
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
        'mainCarousel mainCarousel mainCarousel mainCarousel mainCarousel'
        '.  main-container-section  main-container-section  main-container-section  .';

    @media only screen and (max-width: 768px) {
        /* Cambiar las grid-template-rows para pantallas más pequeñas */
        grid-template-areas:
            'mainCarousel mainCarousel mainCarousel mainCarousel mainCarousel'
            'main-container-section  main-container-section  main-container-section  main-container-section  main-container-section';
    }
`

/**
 * Section that contains all data and page info except image header.
 */
export const MainContentContainer = styled.section`
    grid-area: main-container-section;
    display: flex;
    flex-direction: column;
    row-gap: 2vw;
    column-gap: 2vw;
    background-color: ${mainContentContainerBackgroundColor};
    padding-left: 2vw;
    padding-right: 2vw;
    padding-bottom: 4vw;
    color: ${principalFontColor};
    @media only screen and (max-width: 768px) {
        #middleContentArticle {
            flex-direction: column-reverse;
        }
    }
`

/**
 * Styles for the entire accordion elements.
 */
export const CustomAccordionStyled = styled(Accordion)`
    .accordion-button {
        background-color: ${accordionSectionHeaderBackgroundColor};
        color: ${principalFontColor};
    }
    .accordion-button:not(.collapsed) {
        background-color: ${accordionSectionHeaderBackgroundColorExpanded};
        color: ${accordionSectionHeaderFontAndIconColorExpanded};
    }
    .accordion-body {
        background-color: ${accordionSectionBodyBackgroundColor};
    }
`

/**
 * Picture element that is used as main content header in shcool class pages.
 */
export const HeaderPicture = styled.picture`
    grid-area: mainCarousel;
    aspect-ratio: 9/2;
`
/**
 * Image used into header picture
 */
export const PageHeaderImage = styled.img`
    width: 100%; /* Ocupar todo el ancho del contenedor padre */
    height: 100%; /* Ocupar toda la altura del contenedor padre */
`

import styled from 'styled-components'

import { Camera, EnvelopeOpenHeart, GraphUpArrow, PatchQuestion } from 'react-bootstrap-icons'
import { principalFontColor } from '../../components/Common/CommonStyles';

/**
 * ICONS USED INTO ACCORDION CAROUSEL (5 icons)
 */
export enum IconOptions {
    DESARROLLO_COGNITIVO  = '/Common/icono_desarrollo_cognitivo.svg',
    HABILIDADES_ACADEMICAS  = '/Common/icono_habilidades_academicas.svg',
    HABILIDADES_SOCIALES  = '/Common/icono_habilidades_sociales_emocionales.svg',
    HABILIDADES_EMOCIONALES  = '/Common/icono_habilidades_emocionales.svg',
    DIVERSION_CREATIVIDAD  = '/Common/icono_diversion_creatividad.svg'
}

// Tipo para la ruta de la imagen
export type IconPath = keyof typeof IconOptions;

/**
 * Main content header used in schools pages as title container for styles
 */
export const MainContentHeader = styled.header`
    color: ${principalFontColor}; // Font color
`

/**
 * Styles for page title used in school class pages.
 */
export const PageTitle = styled.h1`
    text-align: center;
    padding-top: 1em;
    padding-bottom: 0.75rem;
    font-size: 300%;
`
/**
 * Styles for page subtitle used in school class pages.
 */
export const PageSubTittle = styled.h2`
    font-size: 150%;
`

export const SummaryContentSection = styled.section`
    border-radius: 10px;
    display: flex;
    /* Centrar verticalmente */
    flex-direction: row-reverse; /* Cambiar a dirección de columna */
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 5vh;
    color: black;
`

export const ShortSummaryParagraph = styled.p`
    flex: 1;
    max-width: 400px;
    padding-top: 0.75rem;
    font-size: 120%;
`

export const ShortSummaryPicture = styled.picture``

export const ShortSummaryImage = styled.img`
    max-width: 100px; /* Ancho máximo de la imagen */
    max-height: 100px; /* Altura máxima de la imagen */
    width: 100px;
    height: 100px;
    border-radius: 50%;
    aspect-ratio: 1;
`

export const ContentSection = styled.section``

/**
 * ICONS USED INTO ACCORDION HEADERS
 */
export const GraphUpArrowStyled = styled(GraphUpArrow)`
    width: 60px;
    height: 60px;
`
export const EnvelopeOpenHeartStyled = styled(EnvelopeOpenHeart)`
    width: 60px;
    height: 60px;
`
export const PatchQuestionStyled = styled(PatchQuestion)`
    width: 60px;
    height: 60px;
`
export const CameraStyled = styled(Camera)`
    width: 60px;
    height: 60px;
`

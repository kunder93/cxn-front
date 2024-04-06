import React from 'react'
import { Accordion } from 'react-bootstrap'
import { CustomAccordionStyled } from '../../components/Common/CommonStyles'
import ClassBenefitsCarousel, { CarouselItemMessage } from './ClassBenefitsCarousel'
import ClassPhotoGalleryCarousel, { PhotoData } from './ClassPhotoGalleryCarousel'
import { CameraStyled, EnvelopeOpenHeartStyled, GraphUpArrowStyled, PatchQuestionStyled } from './CommonStyles'
import FaqList, { PairQuestionAnswer } from './FaqList'
import MoreInfoClassForm from '../Common/MoreInfoForm'

/**
 * Properties for the component BenefitsAccordion.
 * @interface BenefitsAccordionProps
 * @property {CarouselItemMesage[]} carouselBenefits - List of benefits for show into carousel.
 * @property {string} initialQuestionsFormTopic - Initial topic for questions form.
 * @property {PairQuestionAnswer[]} faqList - List of faq question and answers.
 */
export interface BenefitsAccordionProps {
    carouselBenefits: CarouselItemMessage[]
    initialQuestionsFormTopic: string
    faqList: PairQuestionAnswer[]
    photosData: PhotoData[]
}

const BenefitsAccordion: React.FC<BenefitsAccordionProps> = ({ carouselBenefits, initialQuestionsFormTopic, faqList, photosData}) => {
    const chessBenefitsHeaderMsg = 'Beneficios del ajedrez:'
    const contactHeaderMsg = 'Contacto'
    const faqHeaderMsg = 'Preguntas frecuentes:'
    const photoGalleryHeaderMsg = 'Galeria de fotos:'

    return (
        <CustomAccordionStyled>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <GraphUpArrowStyled />
                    <h2>{chessBenefitsHeaderMsg}</h2>
                </Accordion.Header>
                <Accordion.Body>
                    <ClassBenefitsCarousel benefits={carouselBenefits}></ClassBenefitsCarousel>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>
                    <EnvelopeOpenHeartStyled />
                    <h2>{contactHeaderMsg}:</h2>
                </Accordion.Header>
                <Accordion.Body>
                    <MoreInfoClassForm formTitle="Solicita información:" initialTopic={initialQuestionsFormTopic} />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>
                    <PatchQuestionStyled /> <h2>{faqHeaderMsg}</h2>
                </Accordion.Header>
                <Accordion.Body>
                    <FaqList faqPairsQuestionAnswer={faqList} />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header>
                    <CameraStyled /> <h2>{photoGalleryHeaderMsg}</h2>
                </Accordion.Header>
                <Accordion.Body>
                    <ClassPhotoGalleryCarousel photosUrl={photosData} />
                </Accordion.Body>
            </Accordion.Item>
        </CustomAccordionStyled>
    )
}

export default BenefitsAccordion

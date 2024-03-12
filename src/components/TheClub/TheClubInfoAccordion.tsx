import React, { useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { ClockHistory, FileText, GeoAlt, People, PeopleFill, Send } from 'react-bootstrap-icons'
import DirectivaComponent from './DirectivaComponent'
import HistoryTimeLine from '../../components/HistoryTimeLine'
import ContactContainer from './ContactComponents'
import CxnLeagueTeams from './CxnLeagueTeams'
import EstatutosPDF from './EstatutosPDF'
import LocationComponent from './LocationComponent'
import { CustomAccordionStyled } from '../../components/Common/CommonStyles'

const cxnHistorySpecialDates = [
    {
        date: '1986',
        title: 'Fundación del CXN',
        description:
            'José Manuel Paz Gómez, Ricardo Tuimil Martinez, Luis Angel Pantín Pérez, José Ramón Pantín Soto, Manuel Carpente Rodeiro y Francisco Couce Rodriguez forman la junta directiva.'
    },
    {
        date: 'July 2005',
        title: 'Milestone Reached',
        description: 'We reached a significant milestone in July 2005.'
    },
    {
        date: 'July 2005',
        title: 'Milestone Reached',
        description: 'We reached a significant milestone in July 2005.'
    },
    {
        date: 'July 2005',
        title: 'Milestone Reached',
        description: 'We reached a significant milestone in July 2005.'
    }
]

interface Props {
    initialOpenElement?: string
}

const TheClubInfoAccordion: React.FC<Props> = ({ initialOpenElement }) => {
    const [activeItem, setActiveItem] = useState<string | null>(initialOpenElement ?? null)
    const accordionRef = React.useRef<HTMLDivElement>(null)

    React.useLayoutEffect(() => {
        setActiveItem(initialOpenElement ?? null)
    }, [initialOpenElement])

    const handleAccordionItemClick = (eventKey: string) => {
        setActiveItem(activeItem === eventKey ? null : eventKey)
    }

    const handleAccordionEnter = (eventKey: string) => {
        // Realiza el enfoque después de que el elemento del acordeón se haya abierto completamente
        const element = document.getElementById('accordion-item-' + eventKey + '-header')
        if (element) {
            // Realizar scroll suave para enfocar el elemento del acordeón
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }
    return (
        <CustomAccordionStyled ref={accordionRef}>
            <Accordion activeKey={activeItem}>
                <Accordion.Item eventKey="1">
                    <Accordion.Header onClick={() => handleAccordionItemClick('1')} id="accordion-item-1-header">
                        <PeopleFill size={28} />
                        <h3>Directiva</h3>
                    </Accordion.Header>
                    <Accordion.Body id="accordion-item-1" onEntered={() => handleAccordionEnter('1')}>
                        <DirectivaComponent />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header onClick={() => handleAccordionItemClick('2')} id="accordion-item-2-header">
                        <FileText size={28} />
                        <h3>Estatutos</h3>
                    </Accordion.Header>
                    <Accordion.Body id="accordion-item-2" onEntered={() => handleAccordionEnter('2')}>
                        <EstatutosPDF />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header onClick={() => handleAccordionItemClick('3')} id="accordion-item-3-header">
                        <People size={28} />
                        <h3>Equipos</h3>
                    </Accordion.Header>
                    <Accordion.Body id="accordion-item-3" onEntered={() => handleAccordionEnter('3')}>
                        <CxnLeagueTeams />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header onClick={() => handleAccordionItemClick('4')} id="accordion-item-4-header">
                        <ClockHistory size={28} />
                        <h3>Historia</h3>
                    </Accordion.Header>
                    <Accordion.Body id="accordion-item-4" onEntered={() => handleAccordionEnter('4')}>
                        <HistoryTimeLine events={cxnHistorySpecialDates} />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                    <Accordion.Header onClick={() => handleAccordionItemClick('5')} id="accordion-item-5-header">
                        <Send size={28} />
                        <h3>Contacto</h3>
                    </Accordion.Header>
                    <Accordion.Body id="accordion-item-5" onEntered={() => handleAccordionEnter('5')}>
                        <ContactContainer />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6">
                    <Accordion.Header onClick={() => handleAccordionItemClick('6')} id="accordion-item-6-header">
                        <GeoAlt size={28} />
                        <h3> Localización</h3>
                    </Accordion.Header>
                    <Accordion.Body id="accordion-item-6" onEntered={() => handleAccordionEnter('6')}>
                        <LocationComponent />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </CustomAccordionStyled>
    )
}

export default TheClubInfoAccordion

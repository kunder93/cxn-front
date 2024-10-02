import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import { ROUTES } from '../../resources/routes-constants'
import { Link } from 'react-router-dom'
import usePageTitle from '../../components/Common/hooks/usePageTitle'

const StyledContainer = styled(Container)`
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

const Title = styled.h1`
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    text-align: center;
`

const Section = styled.section`
    margin-bottom: 2rem;
`

const SubTitle = styled.h2`
    font-size: 2rem;
    color: #34495e;
    margin-bottom: 1rem;
    border-bottom: 2px solid #3498db;
    padding-bottom: 0.5rem;
`

const ListItem = styled.li`
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: #7f8c8d;
`

const Paragraph = styled.p`
    font-size: 1rem;
    color: #7f8c8d;
    line-height: 1.6;
`

const OrderedList = styled.ol`
    margin-left: 20px;
    font-size: 1rem;
    color: #7f8c8d;
`

const DefinitionList = styled.dl`
    margin-bottom: 1rem;
    dt {
        font-weight: bold;
        color: #2c3e50;
        margin-top: 0.5rem;
    }
    dd {
        margin-left: 20px;
        color: #7f8c8d;
    }
`

const Anchor = styled(Link)`
    color: #2980b9;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`

const TorneoBases = (): JSX.Element => {
    usePageTitle('Bases torneo')
    return (
        <StyledContainer>
            <Title>BASES DO TORNEO</Title>

            <Section>
                <SubTitle>Información do Torneo</SubTitle>
                <DefinitionList>
                    <dt>Organizador</dt>
                    <dd>Círculo Xadrez Narón</dd>

                    <dt>Data</dt>
                    <dd>Sábado, 21 de setembro de 2024</dd>

                    <dt>Lugar de xogo</dt>
                    <dd>Local Social Municipal Alto do Castiñeiro, R/Manoel Antonio 9, 15570 (Narón) - A Coruña</dd>
                </DefinitionList>
            </Section>

            <Section>
                <SubTitle>Categorías</SubTitle>
                <ul>
                    <ListItem>Sub - 8 “Promesas”: Nados nos anos 2016 e posteriores</ListItem>
                    <ListItem>Sub - 10 “Benxamíns”: Nados nos anos 2014 e 2015.</ListItem>
                    <ListItem>Sub - 12 “Alevíns”: Nados nos anos 2012 e 2013.</ListItem>
                    <ListItem>Sub - 14 “Infantís”: Nados nos anos 2010 e 2011.</ListItem>
                </ul>
            </Section>

            <Section>
                <SubTitle>Sistema de xogo</SubTitle>
                <Paragraph>
                    Suízo a 7 roldas de 15' + 3'' para as categorías Sub-8, Sub-10, Sub-12 e Sub-14. Non se aplicará o apéndice G. Aplicarase o apéndice A4
                    (partidas sen supervisión adecuada).
                </Paragraph>
                <Paragraph>Utilizarase o programa de emparellamento VEGA. Non será válido para elo.</Paragraph>
            </Section>

            <Section>
                <SubTitle>Calendario da competición</SubTitle>
                <DefinitionList>
                    <dt>Presentación e confirmación de listas</dt>
                    <dd>10:30 horas.</dd>

                    <dt>Roldas</dt>
                    <dd>11:00, 12:00, 13:00, 16:00, 17:00, 18:00, 19:00 horas.</dd>

                    <dt>Entrega de Premios e Clausura</dt>
                    <dd>20:00 horas.</dd>
                </DefinitionList>
            </Section>

            <Section>
                <SubTitle>Inscricións</SubTitle>
                <Paragraph>
                    Ata as 12 PM do xoves 19 de setembro no formulario: <Anchor to={ROUTES.TORNEO_INSCRIPCION}>FORMULARIO</Anchor>
                </Paragraph>
                <Paragraph>
                    <strong>É OBRIGATORIO</strong> estar federado na temporada actual á hora de realizar a inscrición do torneo. No caso contrario, a inscrición
                    será rexeitada.
                </Paragraph>
                <Paragraph>
                    <strong>Aforo:</strong> Limitado. Xogadores seleccionados por orde de inscrición. Non se admitirán incorporacións pasada a data de
                    inscrición, salvo erro na recepción de datos ou decisión da organización.
                </Paragraph>
                <Paragraph>A solicitude da inscrición no torneo implica a aceptación da totalidade das bases e normas do mesmo.</Paragraph>
            </Section>

            <Section>
                <SubTitle>Desempates</SubTitle>
                <OrderedList>
                    <li>Enfrontamento particular.</li>
                    <li>Buchholz Brasileño*</li>
                    <li>Buchholz total*</li>
                    <li>Progresivo ata as derradeiras consecuencias.</li>
                </OrderedList>
                <Paragraph>* Nas partidas non disputadas computaranse como partidas contra un rival virtual.</Paragraph>
            </Section>

            <Section>
                <SubTitle>Xogadas ilegais</SubTitle>
                <Paragraph>Dúas xogadas ilegais suporán a perda da partida; non se incrementarán tempos por cada xogada ilegal.</Paragraph>
            </Section>

            <Section>
                <SubTitle>Byes</SubTitle>
                <Paragraph>
                    No Torneo Xeral poderanse solicitar ata 3 byes de medio punto agás nas 2 últimas roldas. Os byes solicitaranse no formulario de inscrición.
                </Paragraph>
            </Section>

            <Section>
                <SubTitle>Premios</SubTitle>
                <OrderedList>
                    <li>Trofeos para os cinco primeiros clasificados de cada categoría.</li>
                    <li>Medallas para todos os participantes ao finalizar o evento.</li>
                    <li>Reparto de agasallos entre os participantes mediante sorteo.</li>
                </OrderedList>
                <Paragraph>Para recoller o premio, é esencial estar presente na cerimonia de cerramento.</Paragraph>
            </Section>

            <Section>
                <SubTitle>Información Adicional</SubTitle>
                <Paragraph>
                    Os participantes autorizan á organización do torneo, a difusión de información ou a utilización de imaxes nos medios de comunicación ou en
                    publicidades e memorias da competición, podendo exercer os seu dereitos de reclamación no correo{' '}
                    <Anchor to="mailto:xadreznaron@hotmail.com">xadreznaron@hotmail.com</Anchor>.
                </Paragraph>
                <Paragraph>As bases poderán ser modificadas a criterio do árbitro principal no caso de ser necesario.</Paragraph>
            </Section>
        </StyledContainer>
    )
}

export default TorneoBases

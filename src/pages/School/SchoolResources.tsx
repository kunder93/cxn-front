import usePageTitle from '../../components/Common/hooks/usePageTitle'
import { backGroundColor, backgroundImageUrl, mainContentContainerBackgroundColor } from '../../components/Common/CommonStyles'
import { Container, Table } from 'react-bootstrap'
import styled from 'styled-components'
import React from 'react'

const StyledTable = styled(Table)`
    td:first-child {
        width: 25%; /* Establece un ancho del 20% solo para la primera celda */
    }
`

const MainContainer = styled.div`
    padding-top: 5em;
    padding-bottom: 5em;
    background-color: ${backGroundColor};
    background-image: url(${backgroundImageUrl});
`

const StyledContainer = styled(Container)`
    padding-top: 1em;
    padding-bottom: 1em;
    background-color: ${mainContentContainerBackgroundColor};
    border: 5px solid grey;
`

interface Resource {
    title: string
    link: string
    category: string
    description: string
}
const PageTitleMsg = 'Libros y cuadernos para aprender ajedrez!'

const ResourceLinkStyled = styled.a`
    &:focus {
        outline: 4px solid blue !important; // Estilo del borde de foco
    }
    /* Estilo de enfoque cuando se navega con el teclado */
    &:focus:not(:focus-visible) {
        outline: none; // Eliminar el borde predeterminado
    }
`

const ChessResources = (): React.JSX.Element => {
    usePageTitle('CXN Recursos didácticos.')
    const resources: Resource[] = [
        {
            title: 'Xadrez para todos I',
            link: 'https://www.fegaxa.org/wp-content/uploads/2016/02/1.-IniciacionVolumenI1.pdf',
            category: 'Iniciación:',
            description: 'Libro de iniciación en el ajedrez para niños.'
        },
        {
            title: 'Xadrez para todos II',
            link: 'https://www.fegaxa.org/wp-content/uploads/2016/02/2.-IniciacionVolumenII1.pdf',
            category: 'Iniciación:',
            description: 'Continuación del anterior libro Xadrez para todos I.'
        },
        {
            title: 'Xadrez para todos III',
            link: 'https://www.fegaxa.org/wp-content/uploads/2016/02/3.-IntermedioVolumenI.pdf',
            category: 'Intermedio:',
            description: 'Continuación de Xadrez para todos II.'
        },
        {
            title: 'Xadrez para todos IV',
            link: 'https://www.fegaxa.org/wp-content/uploads/2016/02/4.-IntermedioVolumenII1.pdf',
            category: 'Intermedio:',
            description: 'Continuación de Xadrez para todos III.'
        },
        {
            title: 'Xadrez para todos V',
            link: 'https://www.fegaxa.org/wp-content/uploads/2017/10/5.-AvanzadoVolumenI.pdf',
            category: 'Avanzado:',
            description: 'Continuación de Xadrez para todos IV.'
        },

        {
            title: 'Xoga e aprende 1',
            link: 'https://www.fegaxa.org/wp-content/uploads/2016/02/XogaEAprendeVolumenI1.pdf',
            category: 'Iniciación:',
            description: 'Libro destinado a los más pequeños.'
        },
        {
            title: 'Xoga e aprende 2',
            link: 'https://www.fegaxa.org/wp-content/uploads/2016/02/XogaEAprendeVolumenII1.pdf',
            category: 'Iniciación:',
            description: 'Libro destinado a los más pequeños.'
        },
        {
            title: 'Xoga e aprende 3',
            link: 'https://www.fegaxa.org/wp-content/uploads/2016/02/XogaEAprendeVolumenIII1.pdf',
            category: 'Iniciación:',
            description: 'Libro destinado a los más pequeños.'
        },
        {
            title: 'Xoga e aprende 4',
            link: 'https://www.fegaxa.org/wp-content/uploads/2016/02/XogaEAprendeVolumenIV.pdf',
            category: 'Iniciación:',
            description: 'Libro destinado a los más pequeños.'
        }
    ]

    // Agrupar los recursos por categorías
    const groupedResources: Record<string, Resource[]> = resources.reduce<Record<string, Resource[]>>((acc, resource) => {
        const { category } = resource

        // Using modern Object.hasOwn() method
        if (!(category in acc)) {
            acc[category] = []
        }

        acc[category].push(resource)
        return acc
    }, {})

    return (
        <MainContainer>
            <StyledContainer>
                <h1>{PageTitleMsg}</h1>
                {Object.entries(groupedResources).map(([category, resources]) => (
                    <div key={category}>
                        <h2>{category}</h2>
                        <StyledTable striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Descripción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resources.map((resource, index) => (
                                    <tr key={index}>
                                        <td>
                                            <ResourceLinkStyled
                                                href={resource.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-description={resource.description}
                                            >
                                                {resource.title}
                                            </ResourceLinkStyled>
                                        </td>
                                        <td>{resource.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </StyledTable>
                    </div>
                ))}
            </StyledContainer>
        </MainContainer>
    )
}

export default ChessResources

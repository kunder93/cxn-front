import styled from 'styled-components'

export const AuthorsHeaderWrapper = styled.div`
    display: flex;
    gap: 1rem;
    flex-direction: row;
    align-items: baseline;
`

export const DropzoneContainer = styled.div`
    border: 2px dashed #007bff;
    padding: 1rem;
    text-align: center;
    cursor: pointer;
    margin-bottom: 1rem;
    &:hover {
        background-color: #f0f8ff;
    }
    img {
        width: 200px; /* Fijar ancho del marco */
        height: 300px; /* Fijar alto del marco */
        object-fit: cover; /* Para que la imagen se ajuste al contenedor */
    }
`

export const ErrorContainer = styled.div`
    min-height: 20px;
    color: #c70000;
    font-size: 0.875rem;
    font-weight: bold;
`

export const DateWrapper = styled.div`
    display: flex;
    gap: 1rem;
    flex-direction: row;
    align-items: baseline;
`

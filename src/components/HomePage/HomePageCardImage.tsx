import React from 'react'
import styled from 'styled-components'

const ScaledImage = styled.img`
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: fill;
    border-radius: 0% !important;
    height: auto;
`

interface ImageComponentProps {
    alt: string
    src: string
    sources: {
        srcSet: string
        media?: string
        type?: string
    }[]
}

const ImageComponent: React.FC<ImageComponentProps> = ({ alt, src, sources }) => {
    return (
        <picture>
            {sources.map((source, index) => (
                <source key={index} srcSet={source.srcSet} media={source.media} type={source.type} />
            ))}
            <ScaledImage loading="lazy" src={src} alt={alt} />
        </picture>
    )
}

export default ImageComponent

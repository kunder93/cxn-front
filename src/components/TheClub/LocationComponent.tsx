import styled from 'styled-components'

const LocationContainer = styled.div`
    border: 0.3vh solid grey;
    height: 300px;
`

const LocationComponent = (): JSX.Element => {
    return (
        <LocationContainer>
            <iframe
                title="Ubicación en Google Maps del local CXN."
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1053.2265941247886!2d-8.19365659063733!3d43.4988111208882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2ddfa9620fa52f%3A0xdb9f4547e7c8300c!2sC%C3%ADrculo%20Xadrez%20Nar%C3%B3n!5e0!3m2!1ses!2ses!4v1706118727842!5m2!1ses!2ses"
                width="100%"
                height="100%"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </LocationContainer>
    )
}

export default LocationComponent

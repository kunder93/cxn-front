import usePageTitle from '../components/Common/hooks/usePageTitle'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'

/**
 * Constant for the CIF (Tax ID) of the organization.
 * @constant {string}
 */
const CIF = 'G-15.227.556'

/**
 * Constant for the email address of the organization.
 * @constant {string}
 */
const EMAIL = 'xadreznaron@hotmail.com'

/**
 * Constant for the address of the organization.
 * @constant {string}
 */
const DIRECCION = 'Rúa Manoel Antonio, 9 San Xosé Obrero 15570 Narón, A Coruña'

/**
 * Styled component for the main container.
 * Adds padding to the top and bottom of the container.
 */
const MainContainer = styled(Container)`
    padding-top: 2em;
    padding-bottom: 2em;
    p {
        margin-bottom: 1em; /* Adds space between paragraphs */
    }
`

/**
 * Component that renders the legal notice page.
 * It sets the page title and displays legal information about the organization.
 *
 * @component
 * @returns {React.JSX.Element} The rendered legal notice page.
 */
const LegalNotice = (): React.JSX.Element => {
    usePageTitle('CXN Aviso legal')

    return (
        <MainContainer>
            <h1>Aviso legal</h1>
            <p>Círculo Xadrez Naron, entidad sin ánimo de lucro, en adelante CXN, informa ser el responsable y propietario de este sitio web.</p>
            <p>
                CXN proporciona los siguientes datos:
                <br />
                <strong>CIF:</strong> {CIF}
                <br />
                <strong>Nº Registro Xunta Galicia:</strong> 925 <br />
                <strong>Correo electrónico:</strong> {EMAIL}
                <br />
                <strong>Domicilio social:</strong> {DIRECCION}
            </p>
            <h2>EL USUARIO DEL SITIO WEB Y CONDICIONES</h2>
            <p>
                Mediante este sitio web CXN muestra sus servicios y actividades, también facilita la comunicacion de los usuarios con la entidad. La utilización
                del sitio web supone la aceptación y cumplimiento de las <strong> condiciones de uso </strong>. Las <strong> Condiciones de uso </strong> pueden
                ser modificadas en cualquier momento por CXN de acuerdo a la legislación vigente sin necesidad de aviso previo a los usuarios.
            </p>
            <h2>UTILIZACIÓN DEL SITIO WEB</h2>
            <h3>Normas:</h3>
            <p>
                Es responsabilidad del usuario cómo utilice y acceda al sitio web. El usuario se compromete a hacer un uso adecuado y responsable de los
                contenidos y servicios del sitio web conforme la legislación vigente. El usuario se compromete a, utilizando el sitio web, no realizar acciones
                que perjudiquen o dañen la imagen y derechos de CXN o de terceros relacionados, como también de otros usuarios del sitio web.
            </p>
            <h3>Contenido:</h3>
            <p>
                Queda expresamente prohibida la utilización de contenido obtenido del sitio web ya sea propiedad de CXN o de terceros sin autorización expresa.
                El usuario no podrá utilizar los contenidos fuera de el ambito personal o privado.
            </p>
            <h3>Seguridad:</h3>
            <p>
                CXN emplea medidas de seguridad como comunicaciónes cifradas y otras tecnologias actuales y empleadas por gran parte de la industria para evitar
                un uso fraudulento de las comunicaciones entre el usuario y el sitio web. Advertir que CXN aún con estas medidas no puede garantizar la
                inexistencia de riesgos o fallos. Ante la existencia de cualquier indicio de uso fraudulento de sus datos que pudiera ser culpa de este sitio
                web rogamos encarecidamente ponerse en contacto con CXN en el menor tiempo posible.
            </p>
            <h2>PRIVACIDAD</h2>
            <p>
                La web proporciona servicios en los que el usuario deberá proporcionar determinados datos de carácter personal. El usuario es responsable de
                garantizar su veracidad, autenticidad, exactitud y vigencia. CXN proporcionará un tratamiento a esos datos ajustado a su naturaleza y/o
                finalidad, según nuestra <strong> política de privacidad</strong>.
            </p>
            <h3>Cookies:</h3>
            <p>
                Las cookies son pequeños fragmentos de información que el sitio almacena en el navegador del usuario para guardar información con distintos
                fines.
            </p>
            <p>CXN a través del sitio web no recopila ningún tipo de información personal a través de cookies.</p>
            <p>
                <strong>Cookies de terceros:</strong> CXN utiliza un servicio 'Google Maps' para enseñar en una sección la situación geográfica del club. Esta
                ventana utiliza cookies de terceros. Puede obtener información de las funciones de estas cookies en el sitio web:
                <a href="https://support.google.com/maps/answer/7576020?hl=es&sjid=6175177243193965021-EU#null" target="_blank" rel="noopener noreferrer">
                    <strong>Información para consumidores de Google Maps</strong>
                </a>
            </p>
            <h2>PROPIEDAD INTELECTUAL E INDUSTRIAL</h2>
            <p>
                Los diseños, marcas, videos, archivos, imágenes, logotipos, textos y/o gráficos son propiedad de CXN o han sido licenciados, cedidos o
                autorizados expresamente por parte de sus titulares legítimos a CXN. Se permite el uso particular y privado del sitio web por parte del usuario
                y otros usos si estos han sido autorizados previamente y de forma individual por CXN.
            </p>
            <h2>LEY APLICABLE Y JURISDICCIÓN</h2>
            <p>
                El acceso y utilización de este sitio web implica que el usuario acepta que todas las reclamaciones o quejas que tenga contra CXN, que provengan
                o estén relacionadas con el funcionamiento o el uso del sitio web serán resueltas por el tribunal competente situado en Ferrol, España, o el
                lugar más cercano.
            </p>
        </MainContainer>
    )
}

export default LegalNotice

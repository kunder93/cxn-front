import usePageTitle from '../components/Common/hooks/usePageTitle'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'

/** Constant for the CIF number */
const CIF = 'G-15.227.556'

/** Constant for the email address */
const EMAIL = 'xadreznaron@hotmail.com'

/** Constant for the address */
const DIRECCION = 'Rua Manoel Antonio, 9 San Xosé Obrero 15570 Narón, A Coruña'

/**
 * Styled component for the main container.
 * Adds padding at the top and bottom of the container.
 */
const MainContainer = styled(Container)`
    padding-top: 2em;
    padding-bottom: 2em;
`

/**
 * Privacy Policy component.
 * Displays the privacy policy, terms of data protection, and contact information for Círculo Xadrez Naron (CXN).
 *
 * @component
 * @returns {JSX.Element} A React component that renders the privacy policy page content.
 */
const PrivacyPolicy = (): JSX.Element => {
    usePageTitle('CXN Política de privacidad')
    return (
        <MainContainer>
            <h1>POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS</h1>
            <p>
                Círculo Xadrez Naron, entidad sin ánimo de lucro, en adelante CXN informa ser el responsable y propietario de este sitio web. El sitio web no
                recopila ningun tipo de dato de carácter personal ya que no necesita registro previo para su uso.
            </p>
            <p>
                Los datos personales facilitados para alguno de los servicios en este sitio web serán tratados por CXN, titular del sitio. CXN proporciona los
                siguientes datos: <br /> <strong>CIF:</strong> {CIF}
                <br />
                <strong>Nº Registro Xunta Galicia:</strong> 925 <br />
                <strong>Correo electrónico:</strong> {EMAIL}
                <br />
                <strong>Domicilio social:</strong> {DIRECCION}
            </p>
            <h2>POLÍTICA DE PRIVACIDAD</h2>
            <p>
                CXN no se hace responsable del contenido de las páginas web que puedan ser accesibles para el usuario a través de los enlaces establecidos en su
                sitio web. En ningún caso CXN ejercitará algún tipo de control sobre el contenido de otros sitios web. Tampoco garantiza la exactitud, veracidad
                o legalidad de los sitios web ajenos a su propiedad que sean accesibles a traves de los citados enlaces.
            </p>
            <p>
                CXN no se responsabiliza de los daños producidos en los equipos informáticos, documentos y/o ficheros de los Usuarios durante la prestación del
                servicio en el sitio web.
            </p>
            <h2>PROTECCIÓN DE DATOS</h2>
            <p>
                CXN se compromete a tratar los datos que solicite al usuario a través del sitio web conforme a lo establecido en la normativa vigente de
                protección de datos y en especial a la Ley Orgánica 3/2018, del 5 de diciembre, de Protección de Datos Personales y garantía de los derechos
                digitales (LOPD), asi como lo establecido en el Reglamento(UE) 2016/679 General de Protección de Datos (GDPR).
            </p>
            <h3>Consentimiento y finalidad de los ficheros:</h3>
            <p>
                Mediante el envío de datos personales al sitio web el usuario acepta su incorporación a un fichero titularidad de CXN con el objeto de recibir
                información sobre la temática 'ajedrez' del sitio web asi como comercial y promocional. Los datos proporcionados para los fines anteriormente
                descritos serán tratados sobre la base jurídica del consentimiento de la persona que los proporciona. Puede retirarse dicho consentimiento en
                cualquier momento, si bien ello no afectará a la licitud de los tratamientos efectuados con anterioridad. El hecho de facilitar los datos es
                voluntario, aunque, en caso de no hacerlo, no se podrá gestionar su solicitud, responder a la consulta correspondiente o remitirle las
                comunicaciones comerciales indicadas. Por tanto, la comunicación de sus datos personales a estos efectos es un requisito necesario para que
                podamos atender las peticiones formuladas por estas vías.
            </p>
            <h3>Derechos:</h3>
            <p>
                El usuario tiene la posibilidad de ejercitar sus derechos de acceso, rectificación, cancelación y oposición mediante el envío de un correo
                electrónico a la dirección <a href={`mailto:${EMAIL}`}>{EMAIL}</a> con el asunto "PROTECCIÓN DE DATOS". Podrá también como forma alternativa
                dirigirse por carta al correo postal del domicilio social de CXN.
            </p>

            <h3>Conservación de los datos:</h3>
            <p>
                Los datos serán conservados durante el tiempo necesario para dar respuesta a su solicitud o consulta y dar esta por definitivamente cerrada.
                Posteriormente, serán conservados a modo histórico de comunicaciones, salvo que se solicite su supresión a la dirección de email indicada
                anteriormente. No obstante, los datos personales utilizados para la remisión de comunicaciones comerciales podrán conservarse, para este fin, de
                manera indefinida, salvo que el interesado solicite su cancelación.{' '}
            </p>
            <h3>Medidas de seguridad en relación al tratamiento de los datos personales:</h3>
            <p>
                Conforme con lo dispuesto en la LOPD y el Reglamento de Medidas de Seguridad CXN ha adoptado medidas técnicas y organizativas necesarias para
                garantizar la seguridad de los datos de carácter personal y evitar la alteración, pérdida, tratamiento o acceso no autorizado. Dicho tratamiento
                cumple con las garantías de proteccion exigidas por la normativa vigente.
            </p>
            <h3>Comunicación de datos personales a terceros:</h3>
            <p>
                CXN nunca compartirá los datos de carácter personal facilitados por los usuarios con terceros sin haber obtenido el previo consentimiento del
                titular de los datos. CXN garantiza la seguridad y confidencialidad de los datos de carácter personal que le sean facilitados.
            </p>
            <p>
                Este sitio web contiene enlaces a otros sitios web. CXN no se hace responsable de la privacidad y el tratamiento de datos que puedan hacer estos
                sitios web. La presente política de privacidad se aplica única y exclusivamente a la información que recopilamos a través de nuestra web.
            </p>
        </MainContainer>
    )
}

export default PrivacyPolicy

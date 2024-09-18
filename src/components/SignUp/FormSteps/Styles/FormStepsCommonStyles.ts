import { Container } from "react-bootstrap";
import styled from "styled-components";


export const ResponsiveMainContainer = styled(Container)`
    padding-top: 1em;
    padding-bottom: 1em;
    @media (max-width: 768px) {
        width: 100%;
        padding: 0;
    }
`
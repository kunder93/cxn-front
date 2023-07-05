import styled from "styled-components";

export const FloatingNotificationContainer = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
`;


export const ErrorMessage = styled.div`
    color: red;
`
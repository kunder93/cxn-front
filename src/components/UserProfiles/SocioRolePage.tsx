import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useAppSelector } from '../../store/hooks'
import { KindMember, UserProfile, UserRole} from '../../store/slices/user'
import styled from 'styled-components'

const CustomRow = styled.div`
    border-top: 2px solid grey;
    display: flex;
    justify-content: space-between;
    width: 50%;
    padding-top: 1em;
    padding-bottom: 1em;
`

const CustomCol = styled.div`
    flex: 0 0 calc(50% - 1em);
    margin-left: 1em;
    padding-right: 1em;
    padding-left: 1em;
`


const StyledContainer = styled(Container)`
  padding-top: 1em;
  padding-bottom: 2em;
`




function renderKindMember(value: KindMember): string {
  switch (value) {
    case KindMember.SOCIO_ASPIRANTE:
      return 'SOCIO ASPIRANTE';
    case KindMember.SOCIO_FAMILIAR:
      return 'SOCIO FAMILIAR';
    case KindMember.SOCIO_HONORARIO:
      return 'SOCIO HONORARIO';
    case KindMember.SOCIO_NUMERO:
      return 'SOCIO NUMERARIO';
    default:
      return 'NO CONOCIDO';
  }
}

function renderUserRoles(value: UserRole[]): string {
  return value.map(role => {
    switch (role) {
      case UserRole.ADMIN:
        return 'ADMINISTRADOR';
      case UserRole.PRESIDENTE:
        return 'PRESIDENTE';
      case UserRole.SECRETARIO:
        return 'SECRETARIO';
      case UserRole.TESORERO:
        return 'TESORERO';
      case UserRole.SOCIO:
        return 'SOCIO';
      default:
        return 'NO CONOCIDO';
    }
  }).join(', '); // Concatenar los roles separados por coma
}

function renderGenderValues(genderValue: string):string {
  switch (genderValue){
    case 'male': 
      return 'Hombre';
    case 'female':
      return 'Mujer'
    default:  return 'No definido'
  }
}

const SocioRolePage:React.FC = () => {
  const userProfile:UserProfile = useAppSelector((state) => state.users.userProfile)
  return (
    <StyledContainer>
    <h1>Información personal:</h1>
    <CustomRow>
      <CustomCol>DNI:</CustomCol>
      <CustomCol>{userProfile.dni}</CustomCol>
    </CustomRow>
    <CustomRow>
      <CustomCol>Nombre:</CustomCol>
      <CustomCol>{userProfile.name}</CustomCol>
    </CustomRow>
    <CustomRow>
      <CustomCol>Apellidos:</CustomCol>
      <CustomCol>{userProfile.firstSurname + ' ' + userProfile.secondSurname }</CustomCol>
    </CustomRow>
    <CustomRow>
      <CustomCol>Fecha de nacimiento:</CustomCol>
      <CustomCol>{userProfile.birthDate.toString()}</CustomCol>
    </CustomRow>
    <CustomRow>
      <CustomCol>Género:</CustomCol>
      <CustomCol>{renderGenderValues(userProfile.gender)}</CustomCol>
    </CustomRow>
    <CustomRow>
      <CustomCol>Correo electrónico:</CustomCol>
      <CustomCol>{userProfile.email}</CustomCol>
    </CustomRow>
    <CustomRow>
      <CustomCol>Tipo de socio:</CustomCol>
      <CustomCol>{renderKindMember(userProfile.kindMember)}</CustomCol>
    </CustomRow>
    <CustomRow>
      <CustomCol>Rol del socio:</CustomCol>
      <CustomCol>{renderUserRoles(userProfile.userRoles)}</CustomCol>
    </CustomRow>
    

    <Button variant="success">Cambiar correo</Button>
    <Button variant="success">Cambiar contraseña</Button>
    <Button variant="danger">Darse de baja</Button>
</StyledContainer>
  )
}
export default SocioRolePage
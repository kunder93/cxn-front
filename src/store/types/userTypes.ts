export enum UserRole {
    SOCIO = 'ROLE_SOCIO',
    ADMIN = 'ROLE_ADMIN',
    PRESIDENTE = 'ROLE_PRESIDENTE',
    SECRETARIO = 'ROLE_SECRETARIO',
    TESORERO = 'ROLE_TESORERO'
}

export enum KindMember {
    SOCIO_NUMERO = 'SOCIO_NUMERO',
    SOCIO_ASPIRANTE = 'SOCIO_ASPIRANTE',
    SOCIO_HONORARIO = 'SOCIO_HONORARIO',
    SOCIO_FAMILIAR = 'SOCIO_FAMILIAR'
}


export interface UserProfile {
    dni: string
    name: string
    firstSurname: string
    secondSurname: string
    gender: string
    birthDate: Date
    email: string
    kindMember: KindMember
    userRoles: UserRole[]
}

export interface UserState {
    jwt: string
    userProfile: UserProfile
}
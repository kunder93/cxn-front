export enum UserRole {
    SOCIO = 'ROLE_SOCIO',
    ADMIN = 'ROLE_ADMIN',
    PRESIDENTE = 'ROLE_PRESIDENTE',
    SECRETARIO = 'ROLE_SECRETARIO',
    TESORERO = 'ROLE_TESORERO',
    SOCIO_CANDIDATO = 'ROLE_CANDIDATO_SOCIO'
}

export enum KindMember {
    SOCIO_NUMERO = 'SOCIO_NUMERO',
    SOCIO_ASPIRANTE = 'SOCIO_ASPIRANTE',
    SOCIO_HONORARIO = 'SOCIO_HONORARIO',
    SOCIO_FAMILIAR = 'SOCIO_FAMILIAR'
}

export interface UserData {
    dni: string
    email: string
    name: string
    firstSurname: string
    secondSurname: string
    gender: string
    birthDate: string
    kindMember: KindMember
    userRoles: UserRole[]
    teamName: string | null
}
export interface UserProfileImage {
    imageExtension: string // New field for image extension
    stored: boolean // New field for storage status
    url: string // New field for image URL
    file?: string
}
export interface UserProfile extends UserData {
    userAddress: UserAddress
}

export interface UserAddress {
    postalCode: number
    apartmentNumber: number
    building: string
    street: string
    city: string
    countryName: string
    subCountryName: string
}

export interface UserState {
    profileImage: UserProfileImage
    jwt: string
    userProfile: UserProfile
}

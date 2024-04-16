import { KindMember, UserRole } from '../store/types/userTypes'

export function renderKindMember(value: KindMember): string {
    switch (value) {
        case KindMember.SOCIO_ASPIRANTE:
            return 'SOCIO ASPIRANTE'
        case KindMember.SOCIO_FAMILIAR:
            return 'SOCIO FAMILIAR'
        case KindMember.SOCIO_HONORARIO:
            return 'SOCIO HONORARIO'
        case KindMember.SOCIO_NUMERO:
            return 'SOCIO NUMERARIO'
        default:
            return 'NO CONOCIDO'
    }
}

export function renderUserRoles(value: UserRole[]): string {
    return value
        .map((role) => {
            switch (role) {
                case UserRole.ADMIN:
                    return 'ADMINISTRADOR'
                case UserRole.PRESIDENTE:
                    return 'PRESIDENTE'
                case UserRole.SECRETARIO:
                    return 'SECRETARIO'
                case UserRole.TESORERO:
                    return 'TESORERO'
                case UserRole.SOCIO:
                    return 'SOCIO'
                default:
                    return 'NO CONOCIDO'
            }
        })
        .join(', ') // Concatenar los roles separados por coma
}

export function renderGenderValues(genderValue: string): string {
    switch (genderValue) {
        case 'male':
            return 'Hombre'
        case 'female':
            return 'Mujer'
        default:
            return 'No definido'
    }
}

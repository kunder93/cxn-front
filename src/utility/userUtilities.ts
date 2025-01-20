import { KindMember, UserRole } from '../store/types/userTypes'

export function renderKindMember(value: KindMember): string {
    switch (value) {
        case KindMember.SOCIO_ASPIRANTE:
            return 'ASPIRANTE'
        case KindMember.SOCIO_FAMILIAR:
            return 'FAMILIAR'
        case KindMember.SOCIO_HONORARIO:
            return 'HONORARIO'
        case KindMember.SOCIO_NUMERO:
            return 'NUMERARIO'
        default:
            return 'NO CONOCIDO'
    }
}

export function renderUserRoles(value: UserRole[]): string {
    return value
        .map((role) => {
            switch (role) {
                case UserRole.ADMIN:
                    return 'ADMIN'
                case UserRole.PRESIDENTE:
                    return 'PRESIDENTE'
                case UserRole.SECRETARIO:
                    return 'SECRETARIO'
                case UserRole.TESORERO:
                    return 'TESORERO'
                case UserRole.SOCIO:
                    return 'SOCIO'
                case UserRole.SOCIO_CANDIDATO:
                    return 'CANDIDATO'
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

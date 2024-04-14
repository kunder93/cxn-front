import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

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

interface UserState {
    jwt: string
    userProfile: UserProfile
}

const initialState: UserState = {
    jwt: '',
    userProfile: {
        dni: '',
        name: '',
        firstSurname: '',
        secondSurname: '',
        gender: '',
        email: '',
        birthDate: new Date(),
        userRoles: [] as UserRole[], // Inicializamos como un array vacío de roles
        kindMember: KindMember.SOCIO_NUMERO // Valor predeterminado para kindMember
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // TOKEN JWT ACTIONS
        setJwt: (state, action: PayloadAction<string>) => {
            state.jwt = action.payload
        },
        removeJwt: (state) => {
            state.jwt = ''
        },

        // USER PROFILE ACTIONS
        setUserProfile: (state, action: PayloadAction<UserProfile>) => {
            state.userProfile = action.payload
        },
        removeUserProfile: (state) => {
            state.userProfile = initialState.userProfile
        }
    }
})

export const { setJwt, removeJwt, setUserProfile, removeUserProfile } = userSlice.actions

export default userSlice.reducer

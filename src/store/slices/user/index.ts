import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { KindMember, UserProfile, UserRole, UserState } from '../../../store/types/userTypes'

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
        kindMember: KindMember.SOCIO_NUMERO, // Valor predeterminado para kindMember
        userAddress: {
            // Dirección del usuario
            postalCode: 0,
            apartmentNumber: 0,
            building: '',
            street: '',
            city: '',
            countryName: '',
            subCountryName: ''
        }
    }
}

const userSlice = createSlice({
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

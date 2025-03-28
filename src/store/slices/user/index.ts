import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { KindMember, UserProfile, UserProfileImage, UserRole, UserState } from '../../../store/types/userTypes'
import { FederateState } from 'components/UserProfiles/ChessProfileFederate/Hooks/getFederateState'

const initialState: UserState = {
    jwt: '',
    profileImage: {
        imageExtension: '', // New field for image extension
        stored: false, // New field for storage status
        url: '' // New field for image URL
    },
    userProfile: {
        dni: '',
        name: '',
        firstSurname: '',
        secondSurname: '',
        gender: '',
        email: '',
        birthDate: new Date().toISOString(),
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
        },
        assignedTeamName: null,
        preferredTeamName: null,
        federateState: FederateState.NO_FEDERATE
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
        },

        // PROFILE IMAGE ACTIONS
        setProfileImage: (state, action: PayloadAction<UserProfileImage>) => {
            state.profileImage = action.payload // Set profile image
        },
        removeProfileImage: (state) => {
            state.profileImage = initialState.profileImage // Reset profile image
        },
        setAssignedTeamName: (state, action: PayloadAction<string | null>) => {
            state.userProfile.assignedTeamName = action.payload
        },
        setPreferredTeamName: (state, action: PayloadAction<string | null>) => {
            state.userProfile.preferredTeamName = action.payload
        }
    }
})

export const { setJwt, removeJwt, setUserProfile, removeUserProfile, setProfileImage, removeProfileImage, setAssignedTeamName, setPreferredTeamName } =
    userSlice.actions

export default userSlice.reducer

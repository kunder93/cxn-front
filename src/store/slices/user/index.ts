import {createSlice} from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'


interface UserState {
    jwt: string,
    name: string,
    firstSurname: string,
    secondSurname: string,
    gender: string,
    email: string,
    birthDate: string,
    userRoles: string
  }

const initialState = {
    jwt: '',
    name: '',
    firstSurname: '',
    secondSurname: '',
    gender: '',
    email: '',
    birthDate: '' ,
    userRoles: ''

  } as UserState

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setJwt: (state, action: PayloadAction<string>) => {
        state.jwt = action.payload
      },
      removeJwt: (state) => {
        state.jwt = ''
      },
      setName:(state, action:PayloadAction<string>) => {
        state.name = action.payload
      },
      removeName: (state) => {
        state.name = ''
      },
      setFirstSurname:(state, action:PayloadAction<string>) => {
        state.firstSurname = action.payload
      },
      removeFirstSurname: (state) => {
        state.firstSurname = ''
      },
      setSecondSurname:(state, action:PayloadAction<string>) => {
        state.secondSurname = action.payload
      },
      removeSecondSurname: (state) => {
        state.secondSurname = ''
      },
      setGender:(state, action:PayloadAction<string>) => {
        state.gender = action.payload
      },
      removeGender: (state) => {
        state.gender = ''
      },
      setEmail:(state, action:PayloadAction<string>) => {
        state.email = action.payload
      },
      removeEmail: (state) => {
        state.email = ''
      },
      setBirthDate:(state, action:PayloadAction<string>) => {
        state.birthDate = action.payload
      },
      removeBirthDate: (state) => {
        state.birthDate = ''
      },
      setUserRoles:(state, action:PayloadAction<string>) => {
        state.userRoles = action.payload
      },
      removeUserRoles: (state) => {
        state.userRoles = ''
      }
  
    },
  })


  export const { setJwt, removeJwt, setName,removeName,setFirstSurname,removeFirstSurname,setSecondSurname,removeSecondSurname,setGender,removeGender,setEmail,removeEmail,setBirthDate,removeBirthDate,setUserRoles,removeUserRoles  } = userSlice.actions

  export default userSlice.reducer



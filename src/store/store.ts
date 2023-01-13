import { configureStore } from '@reduxjs/toolkit'
import users from './slices/user'







const store = configureStore({
      reducer: {
        users
      }, 
  })



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type:  { users: UsersState}
export type AppDispatch = typeof store.dispatch

export const selectJwt = (state: RootState) => state.users.jwt

export default store


import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    mail:null,
    idToken:null,
    localId:null
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state,action) =>{
        state.value.email = action.payload.email
        state.value.idToken = action.payload.idToken
        state.value.localId = action.payload.localId
    },
    cleanUser: (state) => {
        state.value = {
          email : null,
          idToken : null,
          localId : null
        }
    }
  },
})

export const { setUser, cleanUser } = authSlice.actions

export default authSlice.reducer
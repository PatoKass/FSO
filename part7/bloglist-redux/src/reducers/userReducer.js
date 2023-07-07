import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    } else {
      dispatch(setUser(null))
    }
  }
}

export const loginUser = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user))
  }
}

export const logoutUser = () => {
  return async (dispatch) => dispatch(setUser(null))
}

export default userSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const userlistSlice = createSlice({
  name: 'userlist',
  initialState: [],
  reducers: {
    setUserlist(state, action) {
      return action.payload
    },
  },
})

export const { setUserlist } = userlistSlice.actions

export const initializeUserlist = () => {
  return async (dispatch) => {
    const users = await blogService.getUsers()
    dispatch(setUserlist(users))
  }
}

export default userlistSlice.reducer

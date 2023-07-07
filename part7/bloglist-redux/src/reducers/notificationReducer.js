import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return initialState
    },
  },
})

export const { createNotification, removeNotification } =
  notificationSlice.actions

export const setNotification = (text, type, seconds) => {
  return async (dispatch) => {
    dispatch(createNotification({ text, type }))
    setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
  }
}
export default notificationSlice.reducer

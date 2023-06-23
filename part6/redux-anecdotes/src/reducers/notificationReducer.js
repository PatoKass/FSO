import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      return (state = action.payload)
    },
    removeNotification(state, action) {
      return (state = initialState)
    },
  },
})

export const { createNotification, removeNotification } =
  notificationSlice.actions

export const setNotification = (text, seconds) => {
  return async (dispatch) => {
    dispatch(createNotification(text))
    setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
  }
}
export default notificationSlice.reducer

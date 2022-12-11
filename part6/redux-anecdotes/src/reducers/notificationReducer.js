import { createSlice } from '@reduxjs/toolkit'

const initialNotification = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    text: initialNotification,
    timeoutID: 0,
  },
  reducers: {
    setNotification(state, action) {
      const notif = action.payload.notification
      state.text = notif
      state.timeoutID = action.payload.timeoutID
      console.log(action.payload.timeoutID)
    },
    removeNotification(state, action) {
      state.text = ''
    }
  }
})

export const showNotification = (notification, timeoutInSeconds, previousTimeoutId = 0) => {
  return async dispatch => {
    clearTimeout(previousTimeoutId)
    const timeoutID = setTimeout(() => {
      dispatch(removeNotification(null))
    }, timeoutInSeconds * 1000)
    dispatch(setNotification(
      {notification, timeoutID}
    ))
  }
}

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialNotification = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {text :initialNotification},
  reducers: {
    setNotification(state, action) {
      const notif = action.payload
      state.text = notif;
    },
    removeNotification(state, action) {
      state.text = ''
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
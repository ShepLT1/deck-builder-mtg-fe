import { createSlice, isRejected } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface AlertState {
  value: string
  isOpen: boolean
  isError: boolean
}

const initialState: AlertState = {
  value: "",
  isOpen: false,
  isError: false,
}

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    updateAlert: (state, action) => {
      state.value = action.payload.message
      state.isOpen = action.payload.isOpen
      state.isError = action.payload.isError
    },
    closeAlert: (state) => {
      state.isOpen = false
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isRejected, (state, action) => {
      // TODO: create Set of actions and Set of errors that should not trigger alert
      if (action.type.includes("CardsByNameContains")) {
        return
      }
      state.value = action.error.message || "Unable to complete request"
      state.isOpen = true
      state.isError = true
    })
  },
})

export const { updateAlert, closeAlert } = alertSlice.actions

export const selectAlert = (state: RootState) => state.alert

export default alertSlice.reducer

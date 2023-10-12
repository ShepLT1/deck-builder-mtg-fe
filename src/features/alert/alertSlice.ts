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
  // The `reducers` field lets us define reducers and generate associated actions
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
      state.value = action.error.message || "Unable to complete request"
      state.isOpen = true
      state.isError = true
    })
  },
})

export const { updateAlert, closeAlert } = alertSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAlert = (state: RootState) => state.alert

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default alertSlice.reducer

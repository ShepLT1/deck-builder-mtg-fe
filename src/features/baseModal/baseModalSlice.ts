import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface BaseModalState {
  value: boolean
}

const initialState: BaseModalState = {
  value: false,
}

export const baseModalSlice = createSlice({
  name: "baseModal",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateBaseModal: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { updateBaseModal } = baseModalSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBaseModal = (state: RootState) => state.baseModal

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default baseModalSlice.reducer

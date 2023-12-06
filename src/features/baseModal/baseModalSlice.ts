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
  reducers: {
    updateBaseModal: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { updateBaseModal } = baseModalSlice.actions

export const selectBaseModal = (state: RootState) => state.baseModal

export default baseModalSlice.reducer

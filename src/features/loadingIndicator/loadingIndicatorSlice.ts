import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface LoadingIndicatorState {
  value: boolean
}

const initialState: LoadingIndicatorState = {
  value: false,
}

export const loadingIndicatorSlice = createSlice({
  name: "loadingIndicator",
  initialState,
  reducers: {
    updateLoadingIndicator: (state, action) => {
      state.value = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.value = true
      })
      .addMatcher(isRejected, (state) => {
        state.value = false
      })
      .addMatcher(isFulfilled, (state) => {
        setTimeout(() => {
          state.value = false
        }, 1500)
      })
  },
})

export const { updateLoadingIndicator } = loadingIndicatorSlice.actions

export const selectLoadingIndicator = (state: RootState) =>
  state.loadingIndicator

export default loadingIndicatorSlice.reducer

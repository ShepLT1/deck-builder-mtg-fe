import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { Deck } from "../deck/deckSlice"
import { instance } from "../../utils/api/axios.config"

export interface DecksState {
  value: Deck[]
  status: "idle" | "loading" | "failed"
}

const initialState: DecksState = {
  value: [],
  status: "idle",
}

export const getAllDecks = createAsyncThunk("decks/getAllDecks", async () => {
  const response = await instance({
    method: "GET",
    url: `/decks`,
  })
  return response.data.content
})

export const decksSlice = createSlice({
  name: "decks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDecks.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getAllDecks.fulfilled, (state, action) => {
        state.status = "idle"
        state.value = action.payload
      })
      .addCase(getAllDecks.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const selectDecks = (state: RootState) => state.decks.value

export default decksSlice.reducer

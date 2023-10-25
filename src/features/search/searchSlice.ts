import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { Card } from "../card/cardSlice"
import axios from "axios"

interface SearchValue {
  input: string
  results: Card[]
}

export interface SearchState {
  value: SearchValue
  status: "idle" | "loading" | "failed"
}

const initialState: SearchState = {
  value: { input: "", results: [] },
  status: "idle",
}

export const getCardsByNameContains = createAsyncThunk(
  "cards/getCardsByNameContainsStatus",
  async (name: string) => {
    const response = await axios(`http://127.0.0.1:8080/cards?name=${name}`, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "SuperSecretToken",
      },
    })
    return response.data
  },
)

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchInput: (state, action) => {
      state.value.input = action.payload
    },
    updateSearchResults: (state, action) => {
      state.value.results = action.payload.content
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCardsByNameContains.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getCardsByNameContains.fulfilled, (state, action) => {
        state.status = "idle"
        searchSlice.caseReducers.updateSearchResults(state, action)
      })
      .addCase(getCardsByNameContains.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { updateSearchInput } = searchSlice.actions

export const selectSearch = (state: RootState) => state.search.value

export default searchSlice.reducer

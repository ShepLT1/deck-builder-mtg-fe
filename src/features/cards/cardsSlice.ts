import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { instance } from "../../utils/api/axios.config"
import { Card } from "../card/cardSlice"

export interface CardsState {
  value: Card[]
  currentPage: number
  totalPages: number
  status: "idle" | "loading" | "failed"
}

const initialState: CardsState = {
  value: [],
  currentPage: 0,
  totalPages: 1,
  status: "idle",
}

export const getCardsByPage = createAsyncThunk(
  "cards/getCardByPageStatus",
  async (page: number) => {
    const response = await instance({
      method: "GET",
      url: `/cards?page=${page}`,
    })
    return response.data
  },
)

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    updateCards: (state, action) => {
      state.value = action.payload.content
      state.currentPage = action.payload.pageable.pageNumber
      state.totalPages = action.payload.totalPages
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCardsByPage.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getCardsByPage.fulfilled, (state, action) => {
        state.status = "idle"
        cardsSlice.caseReducers.updateCards(state, action)
      })
      .addCase(getCardsByPage.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { updateCards } = cardsSlice.actions

export const selectCards = (state: RootState) => state.cards.value
export const selectCurrentPage = (state: RootState) => state.cards.currentPage
export const selectTotalPages = (state: RootState) => state.cards.totalPages

export default cardsSlice.reducer

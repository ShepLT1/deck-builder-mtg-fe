import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { instance } from "../../utils/api/axios.config"
import { Card } from "../card/cardSlice"

export interface Collectible {
  id: number
  card: Card
  collectorNumber: string
  set: Set
  finish: string
  promo: string
  imageUri: string[]
}

export interface Set {
  id: number
  name: string
  iconUri: string
  releaseDate: string
}

export function isCollectible(object: any): object is Collectible {
  return "card" in object
}

export interface CollectiblesState {
  value: Collectible[]
  currentPage: number
  totalPages: number
  status: "idle" | "loading" | "failed"
}

const initialState: CollectiblesState = {
  value: [],
  currentPage: 0,
  totalPages: 1,
  status: "idle",
}

export const getCollectiblesByCard = createAsyncThunk(
  "collectibles/getCollectiblesByCardStatus",
  async (card_id: number) => {
    const response = await instance({
      method: "GET",
      url: `/cards/collectibles?cardId=${card_id}`,
    })
    return response.data
  },
)

export const collectiblesSlice = createSlice({
  name: "collectibles",
  initialState,
  reducers: {
    updateCollectibles: (state, action) => {
      state.value = action.payload.content
      state.currentPage = action.payload.pageable.pageNumber
      state.totalPages = action.payload.totalPages
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCollectiblesByCard.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getCollectiblesByCard.fulfilled, (state, action) => {
        state.status = "idle"
        collectiblesSlice.caseReducers.updateCollectibles(state, action)
      })
      .addCase(getCollectiblesByCard.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { updateCollectibles } = collectiblesSlice.actions

export const selectCollectibles = (state: RootState) => state.collectibles.value
export const selectCurrentPage = (state: RootState) =>
  state.collectibles.currentPage
export const selectTotalPages = (state: RootState) =>
  state.collectibles.totalPages

export default collectiblesSlice.reducer

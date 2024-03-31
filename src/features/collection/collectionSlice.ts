import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { instance } from "../../utils/api/axios.config"
import { Collectible } from "../collectibles/collectiblesSlice"

export interface CollectionState {
  value: Collectible[]
  currentPage: number
  totalPages: number
  status: "idle" | "loading" | "failed"
}

const initialState: CollectionState = {
  value: [],
  currentPage: 0,
  totalPages: 1,
  status: "idle",
}

export const getCollectionByPage = createAsyncThunk(
  "collectibles/getCollectiblesByPageStatus",
  async (page: number) => {
    const response = await instance({
      method: "GET",
      url: `/cards/collectibles?page=${page}`,
    })
    return response.data
  },
)

export const addCollectibleToCollection = createAsyncThunk(
  "collectibles/addCollectibleToCollectionStatus",
  async (collectible_id: number) => {
    const response = await instance({
      method: "PATCH",
      url: `/cards/collectibles/${collectible_id}`,
      data: {
        action: "add",
      },
    })
    return response.data
  },
)

export const removeCollectibleFromCollection = createAsyncThunk(
  "collectibles/removeCollectibleFromCollectionStatus",
  async (collectible_id: number) => {
    const response = await instance({
      method: "PATCH",
      url: `/cards/collectibles/${collectible_id}`,
      data: {
        action: "remove",
      },
    })
    return response.data
  },
)

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    updateCollection: (state, action) => {
      state.value = action.payload.content
      state.currentPage = action.payload.pageable.pageNumber
      state.totalPages = action.payload.totalPages
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCollectionByPage.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getCollectionByPage.fulfilled, (state, action) => {
        state.status = "idle"
        collectionSlice.caseReducers.updateCollection(state, action)
      })
      .addCase(getCollectionByPage.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(addCollectibleToCollection.pending, (state) => {
        state.status = "loading"
      })
      .addCase(addCollectibleToCollection.fulfilled, (state, action) => {
        state.status = "idle"
        collectionSlice.caseReducers.updateCollection(state, action)
      })
      .addCase(addCollectibleToCollection.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(removeCollectibleFromCollection.pending, (state) => {
        state.status = "loading"
      })
      .addCase(removeCollectibleFromCollection.fulfilled, (state, action) => {
        state.status = "idle"
        collectionSlice.caseReducers.updateCollection(state, action)
      })
      .addCase(removeCollectibleFromCollection.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { updateCollection } = collectionSlice.actions

export const selectCollection = (state: RootState) => state.collection.value
export const selectCurrentPage = (state: RootState) =>
  state.collection.currentPage
export const selectTotalPages = (state: RootState) =>
  state.collection.totalPages

export default collectionSlice.reducer

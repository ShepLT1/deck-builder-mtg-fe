import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { Card } from "../card/cardSlice"
import { convertCardList } from "./helpers"
import axios from "axios"

export interface Deck {
  id: number
  name: string
  colors: string[]
}

export interface CardWithCount extends Card {
  count: number
}

export interface CardSection {
  title: string
  cards: CardWithCount[]
}

export interface RawDeck extends Deck {
  cardList: Card[]
}

export interface SectionedDeck extends Deck {
  cardList: CardSection[]
}

export interface DeckState {
  value: SectionedDeck
  status: "idle" | "loading" | "failed"
}

const initialState: DeckState = {
  value: { id: 0, name: "", cardList: [], colors: [] },
  status: "idle",
}

export const getDeckById = createAsyncThunk(
  "decks/getDeckByIdStatus",
  async (deck_id: number) => {
    const response = await axios(`http://127.0.0.1:8080/decks/${deck_id}`, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "SuperSecretToken",
      },
    })
    return response.data as RawDeck
  },
)

export const updateDeckName = createAsyncThunk(
  "decks/updateDeckName",
  async (new_name: string, { getState }) => {
    const state = getState() as RootState
    const response = await axios({
      method: "patch",
      url: `http://127.0.0.1:8080/decks/${state.deck.value.id}`,
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "SuperSecretToken",
      },
      data: {
        name: new_name,
      },
    })
    return response.data as RawDeck
  },
)

export const deckSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
    setDeck: (state, action: PayloadAction<RawDeck>) => {
      state.value.id = action.payload.id
      state.value.name = action.payload.name
      state.value.cardList = convertCardList(action.payload.cardList)
      state.value.colors = action.payload.colors
    },
    updateName: (state, action) => {
      state.value.name = action.payload.name
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDeckById.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getDeckById.fulfilled, (state, action) => {
        state.status = "idle"
        deckSlice.caseReducers.setDeck(state, action)
      })
      .addCase(getDeckById.rejected, (state, action) => {
        state.status = "failed"
        // TODO: pass action.error to error handler, which will display error popup
      })
      .addCase(updateDeckName.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateDeckName.fulfilled, (state, action) => {
        state.status = "idle"
        deckSlice.caseReducers.updateName(state, action)
      })
      .addCase(updateDeckName.rejected, (state) => {
        state.status = "failed"
        // TODO: pass action.error to error handler, which will display error popup
      })
  },
})

export const { setDeck, updateName } = deckSlice.actions

export const selectDeck = (state: RootState) => state.deck.value

export default deckSlice.reducer

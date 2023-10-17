import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { Card } from "../card/cardSlice"
import { convertCardList } from "./helpers"
import axios from "axios"

export interface NewDeck {
  name: string
  colors: string[]
}

export interface Deck extends NewDeck {
  id: number
}

export interface CardSection {
  title: string
  cards: Card[]
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

export const createNewDeck = createAsyncThunk(
  "decks/createNewDeck",
  async (new_deck: NewDeck) => {
    const response = await axios({
      method: "post",
      url: `http://127.0.0.1:8080/decks`,
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "SuperSecretToken",
      },
      data: new_deck,
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

export const removeCardInstance = createAsyncThunk(
  "decks/removeCardInstance",
  async (card_id: number, { getState }) => {
    const state = getState() as RootState
    const response = await axios({
      method: "patch",
      url: `http://127.0.0.1:8080/decks/${state.deck.value.id}/cards/${card_id}`,
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "SuperSecretToken",
      },
      data: {
        action: "remove",
      },
    })
    return response.data as RawDeck
  },
)

export const addCardInstance = createAsyncThunk(
  "decks/addCardInstance",
  async (card_id: number, { getState }) => {
    const state = getState() as RootState
    const response = await axios({
      method: "patch",
      url: `http://127.0.0.1:8080/decks/${state.deck.value.id}/cards/${card_id}`,
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "SuperSecretToken",
      },
      data: {
        action: "add",
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
    updateCardList: (state, action: PayloadAction<RawDeck>) => {
      state.value.cardList = convertCardList(action.payload.cardList)
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
      .addCase(getDeckById.rejected, (state) => {
        state.status = "failed"
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
      })
      .addCase(createNewDeck.pending, (state) => {
        state.status = "loading"
      })
      .addCase(createNewDeck.fulfilled, (state, action) => {
        state.status = "idle"
        deckSlice.caseReducers.setDeck(state, action)
      })
      .addCase(createNewDeck.rejected, (state, action) => {
        state.status = "failed"
      })
      .addCase(addCardInstance.pending, (state) => {
        state.status = "loading"
      })
      .addCase(addCardInstance.fulfilled, (state, action) => {
        state.status = "idle"
        deckSlice.caseReducers.updateCardList(state, action)
      })
      .addCase(addCardInstance.rejected, (state, action) => {
        state.status = "failed"
      })
      .addCase(removeCardInstance.pending, (state) => {
        state.status = "loading"
      })
      .addCase(removeCardInstance.fulfilled, (state, action) => {
        state.status = "idle"
        deckSlice.caseReducers.updateCardList(state, action)
      })
      .addCase(removeCardInstance.rejected, (state, action) => {
        state.status = "failed"
      })
  },
})

export const { setDeck, updateName } = deckSlice.actions

export const selectDeck = (state: RootState) => state.deck.value

export default deckSlice.reducer

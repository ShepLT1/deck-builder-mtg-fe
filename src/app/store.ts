import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import cardReducer from "../features/card/cardSlice"
import deckReducer from "../features/deck/deckSlice"
import decksReducer from "../features/decks/decksSlice"
import alertReducer from "../features/alert/alertSlice"
import baseModalReducer from "../features/baseModal/baseModalSlice"
import cardsReducer from "../features/cards/cardsSlice"
import searchReducer from "../features/search/searchSlice"
import userReducer from "../features/user/userSlice"

export const store = configureStore({
  reducer: {
    decks: decksReducer,
    card: cardReducer,
    deck: deckReducer,
    alert: alertReducer,
    baseModal: baseModalReducer,
    cards: cardsReducer,
    search: searchReducer,
    user: userReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

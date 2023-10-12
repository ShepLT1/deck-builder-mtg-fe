import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import cardReducer from "../features/card/cardSlice"
import deckReducer from "../features/deck/deckSlice"
import decksReducer from "../features/decks/decksSlice"
import alertReducer from "../features/alert/alertSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    decks: decksReducer,
    card: cardReducer,
    deck: deckReducer,
    alert: alertReducer,
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

import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { Decks } from "./features/decks/Decks"
import { Cards } from "./features/cards/Cards"
import { Deck } from "./features/deck/Deck"
import App from "./App"
import "./index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/decks",
        element: <Decks />,
      },
      {
        path: "/cards",
        element: <Cards />,
      },
      {
        path: "/decks/:id",
        element: <Deck />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)

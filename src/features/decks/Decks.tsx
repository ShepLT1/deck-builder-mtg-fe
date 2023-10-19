import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectDecks, getAllDecks } from "./decksSlice"
import { Grid, List, ListItemButton, ListItemText } from "@mui/material"
import { Link } from "react-router-dom"
import { getDeckById } from "../deck/deckSlice"
import BaseModal from "../baseModal/BaseModal"
import { DeckForm } from "../deck/DeckForm"
import { PageHeader } from "../../components/pageHeader"
import { updateBaseModal } from "../baseModal/baseModalSlice"

export function Decks() {
  const decks = useAppSelector(selectDecks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllDecks())
  }, [])

  return (
    <Grid container width="100%">
      <PageHeader
        title="Decks"
        buttonTitle="Create New Deck"
        buttonOnClick={() => dispatch(updateBaseModal(true))}
      />
      <Grid item xs={12}>
        <List>
          {decks.map((deck) => {
            return (
              <ListItemButton
                component={Link}
                to={`/decks/${deck.id}`}
                key={deck.id}
                onClick={() => dispatch(getDeckById(deck.id))}
              >
                <ListItemText primary={deck.name} sx={{ paddingLeft: 4 }} />
              </ListItemButton>
            )
          })}
        </List>
      </Grid>
      <BaseModal children={<DeckForm />} />
    </Grid>
  )
}

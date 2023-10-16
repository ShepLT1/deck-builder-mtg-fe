import { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectDecks, getAllDecks } from "./decksSlice"
import {
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material"
import { Link } from "react-router-dom"
import { getDeckById } from "../deck/deckSlice"
import BaseModal from "../baseModal/BaseModal"
import { DeckForm } from "../deck/DeckForm"
import { updateBaseModal } from "../baseModal/baseModalSlice"

export function Decks() {
  const decks = useAppSelector(selectDecks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllDecks())
  }, [])

  return (
    <Grid container spacing={2} width="100%">
      <Grid item xs={8}>
        <Typography variant="h3" gutterBottom>
          Decks
        </Typography>
        <List>
          {decks.map((deck) => {
            return (
              <ListItemButton
                component={Link}
                to={`/decks/${deck.id}`}
                key={deck.id}
                onClick={() => dispatch(getDeckById(deck.id))}
              >
                <ListItemText primary={deck.name} />
              </ListItemButton>
            )
          })}
        </List>
      </Grid>
      <Grid item xs={4}>
        <button onClick={() => dispatch(updateBaseModal(true))}>
          Create New Deck
        </button>
      </Grid>
      <BaseModal children={<DeckForm />} />
    </Grid>
  )
}

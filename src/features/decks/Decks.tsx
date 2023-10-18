import { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectDecks, getAllDecks } from "./decksSlice"
import {
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
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
    <Grid container width="100%">
      <Grid
        container
        sx={{ marginTop: 2, marginBottom: 2 }}
        alignItems={"center"}
      >
        <Grid item xs={10}>
          <Typography
            variant="h3"
            textAlign={"left"}
            sx={{ paddingLeft: 4, paddingTop: 2 }}
            gutterBottom
          >
            Decks
          </Typography>
        </Grid>
        <Button
          variant="contained"
          sx={{ height: 40 }}
          onClick={() => dispatch(updateBaseModal(true))}
        >
          Create New Deck
        </Button>
      </Grid>
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

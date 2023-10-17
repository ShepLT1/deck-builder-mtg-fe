import { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectCards, getCardsByPage } from "./cardsSlice"
import {
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
} from "@mui/material"
import { Link } from "react-router-dom"
import { getCardById } from "../card/cardSlice"
import BaseModal from "../baseModal/BaseModal"
import { CardForm } from "../card/CardForm"
import { updateBaseModal } from "../baseModal/baseModalSlice"
import { DisplayCard } from "../../components/displayCard"

export function Cards() {
  const cards = useAppSelector(selectCards)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCardsByPage(0))
  }, [])

  return (
    <Grid container width="100%">
      <Grid
        container
        sx={{ marginTop: 2, marginBottom: 2 }}
        alignItems={"center"}
      >
        <Grid item xs={10}>
          <Typography variant="h3" gutterBottom>
            Cards
          </Typography>
        </Grid>
        <Button
          variant="contained"
          sx={{ height: 40 }}
          onClick={() => dispatch(updateBaseModal(true))}
        >
          Create New Card
        </Button>
      </Grid>
      <Grid container spacing={0}>
        {cards.map((card) => {
          return <DisplayCard key={card.id} card={card} page="card" />
        })}
      </Grid>
      {/* <BaseModal children={<CardForm />} /> */}
    </Grid>
  )
}

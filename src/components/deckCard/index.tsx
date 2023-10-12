import React from "react"
import { CardWithCount } from "../../features/deck/deckSlice"
import { Grid } from "@mui/material"

// Different than Card feature because it's only used to display card image in deck with count if count > 1 & options dropdown with 'add one', 'remove one', & 'remove all'. The Card feature is used to create and edit individual cards.

export function DeckCard(props: CardWithCount) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <h4>Name: {props.name}</h4>
        <h4>Count: {props.count}</h4>
      </Grid>
    </Grid>
  )
}

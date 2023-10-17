import React from "react"
import { Card } from "../../features/card/cardSlice"
import { DisplayCard as DeckCard } from "../displayCard"
import { CardSection } from "../../features/deck/deckSlice"
import { Grid } from "@mui/material"

export function DeckCardSection(props: CardSection) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <h2>{props.title}</h2>
        <div>
          {props.cards.map((card: Card) => {
            return <DeckCard key={card.id} card={card} page="deck" />
          })}
        </div>
      </Grid>
    </Grid>
  )
}

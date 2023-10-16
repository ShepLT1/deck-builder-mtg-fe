import React from "react"
import { Card } from "../../features/card/cardSlice"
import { DisplayCard as DeckCard } from "../../features/card/DisplayCard"
import { CardSection } from "../../features/deck/deckSlice"
import { Grid } from "@mui/material"

export function DeckCardSection(props: CardSection) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <h2>{props.title}</h2>
        <div>
          {props.cards.map((card: Card) => {
            return <DeckCard key={card.id} {...card} />
          })}
        </div>
      </Grid>
    </Grid>
  )
}

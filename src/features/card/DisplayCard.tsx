import { useState } from "react"
import { Card } from "./cardSlice"
import {
  Card as BasicCard,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
} from "@mui/material"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { updateCard, selectCard, getCardById } from "./cardSlice"
import styles from "./Card.module.css"
import { isLand, isSpell, isCreature } from "./cardSlice"

export function DisplayCard(props: Card) {
  // const card = useAppSelector(selectCard)
  const dispatch = useAppDispatch()

  // Either display card to be updated or new card to be created based on modalState.method

  return (
    <BasicCard sx={{ minWidth: 275, maxWidth: 275, minHeight: 350 }}>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Typography variant="h6" textAlign={"start"} gutterBottom>
            {props.name}
          </Typography>
          {props.count > 1 ? (
            <Typography variant="h6" textAlign={"end"} gutterBottom>
              x {props.count}
            </Typography>
          ) : (
            <></>
          )}
        </Grid>
        <Typography variant="subtitle2" color="text.secondary">
          {isLand(props) ? <>{props.colors.join(", ")}</> : <></>}
          {isSpell(props) ? <>{props.manaCost.join(", ")}</> : <></>}
        </Typography>
        <hr />
        {isCreature(props) ? (
          <Typography variant="body2">
            {props.attributes.join(", ")}
            <br />
            <br />
          </Typography>
        ) : (
          <></>
        )}
        {props.abilities != null && props.abilities[0] != null ? (
          <Typography textAlign={"start"}>
            {props.abilities.join("/r/n")}
            <br />
          </Typography>
        ) : (
          <></>
        )}
        {isCreature(props) ? (
          <Typography textAlign={"end"}>
            {props.power} / {props.toughness}
            <br />
          </Typography>
        ) : (
          <></>
        )}
      </CardContent>
      <CardActions>
        <Button size="small">Options</Button>
      </CardActions>
    </BasicCard>
  )
}

// Different than Card feature because it's only used to display card image in deck with count if count > 1 & options dropdown with 'add one', 'remove one', & 'remove all'. The Card feature is used to create and edit individual cards

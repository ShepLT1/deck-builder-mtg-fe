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
import OptionPopover from "../../components/cardOptionPopover"

export function DisplayCard(props: Card) {
  // const card = useAppSelector(selectCard)
  const dispatch = useAppDispatch()

  // Either display card to be updated or new card to be created based on modalState.method

  return (
    <BasicCard
      sx={{ minWidth: 275, maxWidth: 275, minHeight: 350 }}
      variant="outlined"
    >
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item xs={9}>
            <Typography variant="h6" textAlign={"start"} gutterBottom>
              {props.name}
            </Typography>
          </Grid>
          {props.count > 1 ? (
            <Typography variant="h6" textAlign={"end"} gutterBottom>
              x{props.count}
            </Typography>
          ) : (
            <></>
          )}
        </Grid>
        <Grid container justifyContent="space-between">
          <Grid item xs={9}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              textAlign={"left"}
            >
              {isLand(props) ? <>{props.colors.join(", ")}</> : <></>}
              {isSpell(props) ? <>{props.manaCost.join(", ")}</> : <></>}
            </Typography>
          </Grid>
          <OptionPopover {...props} />
        </Grid>
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
      {/* <CardActions>
        <Button size="small">Options</Button>
      </CardActions> */}
    </BasicCard>
  )
}

// Different than Card feature because it's only used to display card image in deck with count if count > 1 & options dropdown with 'add one', 'remove one', & 'remove all'. The Card feature is used to create and edit individual cards

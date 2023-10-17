import React from "react"
import {
  Card,
  isLand,
  isSpell,
  isCreature,
} from "../../features/card/cardSlice"
import {
  Card as BasicCard,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material"
import "./style.css"
import OptionPopover from "../cardOptionPopover"
import { useAppDispatch } from "../../app/hooks"
import {
  addCardInstance,
  removeCardInstance,
} from "../../features/deck/deckSlice"

interface CardProps {
  card: Card
  page: "deck" | "card"
}

export function DisplayCard(props: CardProps) {
  const dispatch = useAppDispatch()

  const cardOptionButtons = [
    <Button
      key="add-one"
      onClick={() => dispatch(addCardInstance(props.card.id))}
    >
      Add One
    </Button>,
    <Button
      key="rm-one"
      color="warning"
      onClick={() => dispatch(removeCardInstance(props.card.id))}
    >
      Remove One
    </Button>,
    <Button key="rm-all" color="error">
      Remove All
    </Button>,
  ]

  return (
    <BasicCard
      sx={{ minWidth: 275, maxWidth: 275, minHeight: 350 }}
      variant="outlined"
    >
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item xs={9}>
            <Typography variant="h6" textAlign={"start"} gutterBottom>
              {props.card.name}
            </Typography>
          </Grid>
          <Typography variant="h6" textAlign={"end"} gutterBottom>
            x{props.card.count}
          </Typography>
        </Grid>
        <Grid container justifyContent="space-between">
          <Grid item xs={9}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              textAlign={"left"}
            >
              {isLand(props.card) ? <>{props.card.colors.join(", ")}</> : <></>}
              {isSpell(props.card) ? (
                <>{props.card.manaCost.join(", ")}</>
              ) : (
                <></>
              )}
            </Typography>
          </Grid>
          <OptionPopover options={cardOptionButtons} />
        </Grid>
        <hr />
        {isCreature(props.card) ? (
          <Typography variant="body2">
            {props.card.attributes.join(", ")}
            <br />
            <br />
          </Typography>
        ) : (
          <></>
        )}
        {props.card.abilities != null && props.card.abilities[0] != null ? (
          <Typography textAlign={"start"}>
            {props.card.abilities.join("/r/n")}
            <br />
          </Typography>
        ) : (
          <></>
        )}
        {isCreature(props.card) ? (
          <Typography textAlign={"end"}>
            {props.card.power} / {props.card.toughness}
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

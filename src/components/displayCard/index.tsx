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
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  addCardInstance,
  removeCardInstance,
} from "../../features/deck/deckSlice"
import { getCardById, deleteCard } from "../../features/card/cardSlice"
import { updateBaseModal } from "../../features/baseModal/baseModalSlice"
import {
  getCardsByPage,
  selectCurrentPage,
} from "../../features/cards/cardsSlice"

interface CardProps {
  card: Card
  page: "deck" | "card"
}

export function DisplayCard(props: CardProps) {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(selectCurrentPage)

  const handleEditCard = async (card_id: number) => {
    const response = await dispatch(getCardById(card_id))
    if (response.meta.requestStatus === "fulfilled") {
      dispatch(updateBaseModal(true))
    }
  }

  const handleDeleteCard = async (card_id: number) => {
    await dispatch(deleteCard(card_id))
    dispatch(getCardsByPage(currentPage))
  }

  const deckCardOptionButtons = [
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

  const cardOptionButtons = [
    <Button key="edit" onClick={() => handleEditCard(props.card.id)}>
      Edit
    </Button>,
    <Button
      key="delete"
      color="error"
      onClick={() => handleDeleteCard(props.card.id)}
    >
      Delete
    </Button>,
  ]

  return (
    <BasicCard
      sx={{ minWidth: 275, maxWidth: 275, minHeight: 350, margin: 1 }}
      variant="outlined"
    >
      <CardContent sx={{ position: "relative", height: "calc(100% - 40px)" }}>
        <Grid container justifyContent="space-between">
          <Grid item xs={9}>
            <Typography variant="h6" textAlign={"start"} gutterBottom>
              {props.card.name}
            </Typography>
          </Grid>
          {props.page === "deck" ? (
            <Typography variant="h6" textAlign={"end"} gutterBottom>
              x{props.card.count}
            </Typography>
          ) : (
            <OptionPopover options={cardOptionButtons} />
          )}
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
          {props.page === "deck" ? (
            <OptionPopover options={deckCardOptionButtons} />
          ) : isSpell(props.card) ? (
            <Typography variant="subtitle1">
              {props.card.type.substring(0, 4)}
            </Typography>
          ) : (
            <Typography variant="subtitle1">LAND</Typography>
          )}
        </Grid>
        <hr />
        {isCreature(props.card) && props.card.attributes[0] ? (
          <Typography variant="body2">
            {props.card.attributes.join(", ")}
            <br />
            <br />
          </Typography>
        ) : (
          <></>
        )}
        {props.card.abilities != null && props.card.abilities[0] != null ? (
          <>
            {props.card.abilities.map((ability) => (
              <Typography
                textAlign={"start"}
                key={ability}
                sx={{ marginBottom: 2 }}
              >
                {ability}
              </Typography>
            ))}
          </>
        ) : (
          <></>
        )}
        {isCreature(props.card) ? (
          <Typography
            textAlign={"end"}
            sx={{ position: "absolute", right: 16, bottom: 16 }}
          >
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

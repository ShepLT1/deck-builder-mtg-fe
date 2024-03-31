import React from "react"
import {
  Card,
  isLand,
  isSpell,
  isCreature,
} from "../../features/card/cardSlice"
import {
  Collectible,
  isCollectible,
} from "../../features/collectibles/collectiblesSlice"
import {
  Card as BasicCard,
  CardMedia,
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
import {
  addCollectibleToCollection,
  removeCollectibleFromCollection,
} from "../../features/collection/collectionSlice"

interface CardProps {
  card: Card | Collectible
  page: "deck" | "card" | "collection" | "collectible"
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

  const handleAddToCollection = async (card_id: number) => {
    await dispatch(addCollectibleToCollection(card_id))
  }

  const handleRemoveFromCollection = async (card_id: number) => {
    await dispatch(removeCollectibleFromCollection(card_id))
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

  const collectibleOptionButtons = [
    <Button
      key="add-to-collection"
      onClick={() => handleAddToCollection(props.card.id)}
    >
      Add to Collection
    </Button>,
  ]

  const collectionOptionsButtons = [
    <Button
      key="remove-from-collection"
      onClick={() => handleRemoveFromCollection(props.card.id)}
    >
      Remove from Collection
    </Button>,
  ]

  return (
    <BasicCard
      sx={{ minWidth: 225, maxWidth: 275, minHeight: 350, margin: 1 }}
      // variant="outlined"
    >
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item xs={9}>
            {isCollectible(props.card) ? (
              <>
                <Typography variant="h6" textAlign={"start"} gutterBottom>
                  {props.card.card.name +
                    (props.card.promo || props.card.finish !== "NONFOIL"
                      ? " (" +
                        (props.card.promo ? props.card.promo + " " : "") +
                        (props.card.finish !== "NONFOIL"
                          ? props.card.finish
                          : "") +
                        ")"
                      : "")}
                </Typography>
                <Typography variant="body2" textAlign={"start"} gutterBottom>
                  {props.card.set.name}
                </Typography>
                <Typography variant="body2" textAlign={"start"} gutterBottom>
                  {"Collector #: " + props.card.collectorNumber}
                </Typography>
              </>
            ) : (
              <></>
            )}
          </Grid>
          {props.page === "deck" && !isCollectible(props.card) ? (
            <Typography variant="h6" textAlign={"end"} gutterBottom>
              x{props.card.count}
            </Typography>
          ) : (
            <OptionPopover
              options={
                isCollectible(props.card)
                  ? props.page === "collection"
                    ? collectionOptionsButtons
                    : collectibleOptionButtons
                  : cardOptionButtons
              }
            />
          )}
        </Grid>
      </CardContent>
      <CardMedia
        component="img"
        alt={isCollectible(props.card) ? props.card.card.name : props.card.name}
        height="350"
        image={
          isCollectible(props.card)
            ? props.card.imageUri[0]
            : props.card.imageUri
        }
      />
    </BasicCard>
  )
}

import { useState } from "react"
import { Card as BasicCard } from "@mui/material"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { updateCard, selectCard, getCardById } from "./cardSlice"
import styles from "./Card.module.css"
import { isLand, isSpell, isCreature } from "./cardSlice"

export function Card() {
  const card = useAppSelector(selectCard)
  const dispatch = useAppDispatch()

  return (
    <div>
      <div className={styles.row}>
        <BasicCard sx={{ minWidth: 275 }}>
          {/* Display card image instead of all details */}
          <CardContent>
            <h2>{card.name}</h2>
            {isLand(card) ? <p>Colors: {card.colors}</p> : <></>}
            {isSpell(card) ? <p>Cost: {card.manaCost}</p> : <></>}
            {isSpell(card) ? <p>{card.type}</p> : <></>}
            {isCreature(card) ? <p>{card.attributes}</p> : <></>}
            {card.abilities != null && card.abilities[0] != null ? (
              <p>{card.abilities}</p>
            ) : (
              <></>
            )}
            {isCreature(card) ? <p>Power: {card.power}</p> : <></>}
            {isCreature(card) ? <p>Toughness: {card.toughness}</p> : <></>}
          </CardContent>
          <CardActions>
            <button onClick={() => dispatch(getCardById(3))}>Save</button>
          </CardActions>
        </BasicCard>
      </div>
    </div>
  )
}

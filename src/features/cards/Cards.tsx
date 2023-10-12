import { useState } from "react"
import { Card as BasicCard } from "@mui/material"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { updateCard, selectCard, getCardById } from "./cardsSlice"
import styles from "./Cards.module.css"
import { isLand, isSpell, isCreature } from "./cardsSlice"

export function Cards() {
  const card = useAppSelector(selectCard)
  const dispatch = useAppDispatch()

  return (
    <div>
      <div className={styles.row}>cards</div>
    </div>
  )
}

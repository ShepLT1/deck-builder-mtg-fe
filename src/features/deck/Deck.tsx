import { FormEvent, useEffect, useState } from "react"
import { Grid, TextField } from "@mui/material"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectDeck, updateDeckName } from "./deckSlice"
import { DeckCardSection } from "../../components/deckCardSection"

export function Deck() {
  const deck = useAppSelector(selectDeck)
  const dispatch = useAppDispatch()

  const [newName, setNewName] = useState(deck.name)

  const handleNameSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await dispatch(updateDeckName(newName))
  }

  useEffect(() => {
    setNewName(deck.name)
  }, [deck.name])

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <form onSubmit={handleNameSubmit}>
            <TextField
              id="deck-name"
              variant="standard"
              inputProps={{ style: { fontSize: 50 } }}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </form>
          <h4>{deck.colors}</h4>
        </Grid>
        <Grid item xs={12}>
          {deck.cardList.map((cardSection, i) => {
            return <DeckCardSection key={`cardSection${i}`} {...cardSection} />
          })}
        </Grid>
      </Grid>
    </div>
  )
}

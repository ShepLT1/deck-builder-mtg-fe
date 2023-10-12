import { FormEvent, useEffect, useState } from "react"
import { Grid, TextField, Typography, IconButton } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectDeck, updateDeckName } from "./deckSlice"
import { DeckCardSection } from "../../components/deckCardSection"

export function Deck() {
  const deck = useAppSelector(selectDeck)
  const dispatch = useAppDispatch()

  const [nameEditable, setNameEditable] = useState(false)
  const [newName, setNewName] = useState(deck.name)

  const handleNameSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await dispatch(updateDeckName(newName))
    setNameEditable(false)
  }

  const handleNameCancel = () => {
    setNameEditable(false)
    setNewName(deck.name)
  }

  useEffect(() => {
    setNewName(deck.name)
  }, [deck.name])

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {nameEditable ? (
            <form onSubmit={handleNameSubmit}>
              <TextField
                id="deck-name-input"
                variant="outlined"
                inputProps={{ style: { fontSize: 50 } }}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <IconButton aria-label="save" type="submit">
                <CheckIcon color="success" />
              </IconButton>
              <IconButton
                aria-label="cancel"
                onClick={() => handleNameCancel()}
              >
                <CloseIcon color="warning" />
              </IconButton>
            </form>
          ) : (
            <Typography variant="h2" gutterBottom>
              {deck.name}
              <IconButton
                aria-label="edit"
                onClick={() => setNameEditable(true)}
              >
                <EditIcon />
              </IconButton>
            </Typography>
          )}
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

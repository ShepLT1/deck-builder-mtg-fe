import { FormEvent, useEffect, useState } from "react"
import { Grid, TextField, Typography, IconButton } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectDeck, updateDeckName, addCardInstance } from "./deckSlice"
import { DeckCardSection } from "../../components/deckCardSection"
import Search from "../search/Search"

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
    <Grid container width="100%" marginTop={5}>
      <Grid container display="flex" direction="column" alignItems="start">
        <Typography variant="h6" marginLeft={6} gutterBottom>
          Add Cards to Deck
        </Typography>
        <Search
          displayResults={true}
          onResultClick={(card_id: number) =>
            dispatch(addCardInstance(card_id))
          }
        />
      </Grid>
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
            <IconButton aria-label="cancel" onClick={() => handleNameCancel()}>
              <CloseIcon color="warning" />
            </IconButton>
          </form>
        ) : (
          <Typography variant="h2" gutterBottom>
            {deck.name}
            <IconButton aria-label="edit" onClick={() => setNameEditable(true)}>
              <EditIcon />
            </IconButton>
          </Typography>
        )}
        <h4>{deck.colors.join(", ")}</h4>
      </Grid>
      <Grid item xs={12} marginLeft={5}>
        {deck.cardList.map((cardSection, i) => {
          return <DeckCardSection key={`card-section-${i}`} {...cardSection} />
        })}
      </Grid>
    </Grid>
  )
}

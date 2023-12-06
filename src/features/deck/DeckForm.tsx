import { FormEvent, useState } from "react"
import { Button, Grid, TextField, Typography } from "@mui/material"
import OutlinedInput from "@mui/material/OutlinedInput"
import MenuItem from "@mui/material/MenuItem"
import ListItemText from "@mui/material/ListItemText"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Checkbox from "@mui/material/Checkbox"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import { useAppDispatch } from "../../app/hooks"
import { createNewDeck } from "./deckSlice"
import { updateBaseModal } from "../baseModal/baseModalSlice"
import { useNavigate } from "react-router-dom"

export function DeckForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [newDeckName, setNewDeckName] = useState("")
  const [newDeckColors, setNewDeckColors] = useState<string[]>([])

  const handleNewDeckSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = await dispatch(
      createNewDeck({ name: newDeckName, colors: newDeckColors }),
    )
    dispatch(updateBaseModal(false))
    if (result.meta.requestStatus === "fulfilled") {
      const payload = result.payload as { id: number }
      navigate(`/decks/${payload.id}`)
    }
  }

  const handleColorChange = (
    event: SelectChangeEvent<typeof newDeckColors>,
  ) => {
    const {
      target: { value },
    } = event
    setNewDeckColors(typeof value === "string" ? value.split(",") : value)
  }

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

  const colors = ["White", "Blue", "Black", "Red", "Green", "Colorless"]

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2" gutterBottom textAlign={"center"}>
            New Deck
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleNewDeckSubmit}>
            <Grid item xs={12}>
              <FormControl sx={{ m: 1, width: 300 }}>
                <TextField
                  id="deck-name-input"
                  label="Name"
                  variant="outlined"
                  value={newDeckName}
                  onChange={(e) => setNewDeckName(e.target.value)}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="deck-colors-select-label">Colors</InputLabel>
                <Select
                  labelId="deck-colors-select-label"
                  id="deck-colors-select"
                  multiple
                  required
                  value={newDeckColors}
                  onChange={handleColorChange}
                  input={<OutlinedInput label="Colors" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {colors.map((color) => (
                    <MenuItem key={color} value={color}>
                      <Checkbox checked={newDeckColors.indexOf(color) > -1} />
                      <ListItemText primary={color} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid container direction="row" justifyContent="center">
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  )
}

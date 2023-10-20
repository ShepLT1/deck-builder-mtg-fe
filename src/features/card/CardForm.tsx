import { FormEvent, useState } from "react"
import { Button, Grid, TextField, Typography } from "@mui/material"
import OutlinedInput from "@mui/material/OutlinedInput"
import MenuItem from "@mui/material/MenuItem"
import ListItemText from "@mui/material/ListItemText"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Checkbox from "@mui/material/Checkbox"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import AddIcon from "@mui/icons-material/Add"
import IconButton from "@mui/material/IconButton"
import Chip from "@mui/material/Chip"
import ListItem from "@mui/material/ListItem"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  selectCard,
  setCard,
  setNewCard,
  updateName,
  updateAbilities,
  updateColors,
  updateManaCost,
  updateType,
  updatePower,
  updateToughness,
  updateAttributes,
  createNewLand,
  createNewSpell,
  createNewCreature,
  updateLand,
  updateSpell,
  updateCreature,
  isLand,
  isSpell,
  isCreature,
  Land,
  Spell,
  Creature,
} from "./cardSlice"
import { FormNumberInput } from "../../components/formNumberInput"

interface CardFormProps {
  id: number | null
}

export function CardForm(props: CardFormProps) {
  const dispatch = useAppDispatch()
  const card = useAppSelector(selectCard)
  const land = card as Land
  const spell = card as Spell
  const creature = card as Creature

  const colors = ["White", "Blue", "Black", "Red", "Green", "Colorless"]
  const spellTypes = ["Instant", "Sorcery", "Enchantment", "Artifact"]
  const cardTypes = ["Land", "Spell", "Creature"] as const
  type cardType = (typeof cardTypes)[number]

  const [newCardType, setNewCardType] = useState<cardType | "">("")
  const [newAbility, setNewAbility] = useState<string>("")
  const [whiteMana, setWhiteMana] = useState<number>(0)
  const [blueMana, setBlueMana] = useState<number>(0)
  const [blackMana, setBlackMana] = useState<number>(0)
  const [redMana, setRedMana] = useState<number>(0)
  const [greenMana, setGreenMana] = useState<number>(0)
  const [colorlessMana, setColorlessMana] = useState<number>(0)
  const [anyMana, setAnyMana] = useState<number>(0)

  const formManaArray = [
    { label: "White", value: whiteMana, onChange: setWhiteMana },
    { label: "Blue", value: blueMana, onChange: setBlueMana },
    { label: "Black", value: blackMana, onChange: setBlackMana },
    { label: "Red", value: redMana, onChange: setRedMana },
    { label: "Green", value: greenMana, onChange: setGreenMana },
    { label: "Colorless", value: colorlessMana, onChange: setColorlessMana },
    { label: "Any", value: anyMana, onChange: setAnyMana },
  ]

  const handleNewCardSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // TODO: dispatch create new card thunk
  }

  const handleEditCardSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // TODO: dispatch edit card thunk
  }

  const handleNewCardTypeChange = (event: SelectChangeEvent) => {
    setNewCardType(event.target.value as cardType)
    const newCard = {
      id: 0,
      name: card.name,
      abilities: [],
      count: 0,
    }
    switch (event.target.value) {
      case "Land":
        dispatch(setNewCard({ ...newCard, colors: [] } as Land))
        break
      case "Spell":
        dispatch(setNewCard({ ...newCard, manaCost: [], type: "" } as Spell))
        break
      case "Creature":
        dispatch(
          setNewCard({
            ...newCard,
            manaCost: [],
            type: "",
            power: 0,
            toughness: 0,
            attributes: [],
          } as Creature),
        )
        break
      default:
        break
    }
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

  const handleLandColorChange = (
    event: SelectChangeEvent<typeof land.colors>,
  ) => {
    const {
      target: { value },
    } = event
    dispatch(
      updateColors(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value,
      ),
    )
  }

  const handleAbilityDelete = (index: number) => {
    dispatch(updateAbilities(card.abilities.filter((_, i) => i !== index)))
  }

  const handleSpellTypeChange = (
    event: SelectChangeEvent<typeof spell.type>,
  ) => {
    dispatch(updateType(event.target.value as string))
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2" gutterBottom textAlign={"center"}>
            {props.id ? "Edit" : "New"} Card
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form
            onSubmit={props.id ? handleEditCardSubmit : handleNewCardSubmit}
          >
            {!props.id ? (
              <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: 345 }}>
                  <InputLabel id="card-type-select-label">Card Type</InputLabel>
                  <Select
                    labelId="card-type-select-label"
                    id="card-type-select"
                    value={newCardType}
                    onChange={handleNewCardTypeChange}
                    required
                  >
                    {cardTypes.map((cardType) => {
                      return (
                        <MenuItem key={cardType} value={cardType}>
                          {cardType}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>
            ) : (
              <></>
            )}
            <Grid item xs={12}>
              <FormControl sx={{ m: 1, width: 345 }}>
                <TextField
                  id="card-name-input"
                  label="Name"
                  variant="outlined"
                  value={card.name}
                  onChange={(e) => dispatch(updateName(e.target.value))}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} alignItems={"center"} display={"flex"}>
              <FormControl sx={{ m: 1, width: 350 }}>
                <TextField
                  id="card-abilities-input"
                  label="Abilities"
                  variant="outlined"
                  value={newAbility}
                  onChange={(e) => setNewAbility(e.target.value)}
                />
              </FormControl>
              <IconButton
                color="success"
                onClick={() => {
                  dispatch(updateAbilities([...card.abilities, newAbility]))
                  setNewAbility("")
                }}
              >
                <AddIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ m: 1, width: 350 }}>
                {card.abilities?.map((ability, i) => {
                  return (
                    <ListItem key={i}>
                      <Chip
                        label={ability}
                        variant="outlined"
                        onDelete={() => handleAbilityDelete(i)}
                      />
                    </ListItem>
                  )
                })}
              </FormControl>
            </Grid>
            {isLand(card) ? (
              <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: 345 }}>
                  <InputLabel id="land-colors-select-label">Colors</InputLabel>
                  <Select
                    labelId="land-colors-select-label"
                    id="land-colors-select"
                    multiple
                    required
                    value={card.colors}
                    onChange={handleLandColorChange}
                    input={<OutlinedInput label="Colors" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {colors.map((color) => (
                      <MenuItem key={color} value={color}>
                        <Checkbox checked={card.colors.indexOf(color) > -1} />
                        <ListItemText primary={color} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ) : isSpell(card) ? (
              <>
                <Grid item xs={12}>
                  <FormControl sx={{ m: 1, width: 345 }}>
                    <InputLabel id="spell-type-select-label">
                      Spell Type
                    </InputLabel>
                    <Select
                      labelId="spell-type-select-label"
                      id="spell-type-select"
                      required
                      value={card.type}
                      onChange={handleSpellTypeChange}
                    >
                      {spellTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  justifyContent={"space-between"}
                  sx={{ marginTop: 1 }}
                >
                  <Typography
                    variant="body1"
                    sx={{ paddingLeft: 3, paddingBottom: 1 }}
                  >
                    Mana Cost
                  </Typography>
                  {formManaArray.map((inputProps) => {
                    return (
                      <FormNumberInput
                        key={inputProps.label}
                        {...inputProps}
                        required={true}
                      />
                    )
                  })}
                </Grid>
              </>
            ) : (
              <></>
            )}
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

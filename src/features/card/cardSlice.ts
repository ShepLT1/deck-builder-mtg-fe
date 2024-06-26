import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { instance } from "../../utils/api/axios.config"

export interface Card {
  id: number
  name: string
  abilities: string[]
  dual: Card | null
  imageUri: string
  count: number
}

export interface Land extends Card {
  colors: string[]
}

export interface Mana {
  id: number
  type: string
  color: string
  value: string
}

export interface ManaSymbol {
  id: number
  name: string
  manaList: Mana[]
}

export interface Spell extends Card {
  manaCost: ManaSymbol[]
  type: string
}

export interface Creature extends Spell {
  power: number
  toughness: number
  attributes: string[]
}

export interface CardState {
  value: Card | Land | Spell | Creature
  status: "idle" | "loading" | "failed"
}

export function isLand(object: any): object is Land {
  return "colors" in object
}

export function isSpell(object: any): object is Spell {
  return "manaCost" in object
}

export function isCreature(object: any): object is Creature {
  return "power" in object
}

const initialState: CardState = {
  value: { id: 0, name: "", abilities: [], dual: null, imageUri: "", count: 0 },
  status: "idle",
}

export const getCardById = createAsyncThunk(
  "cards/getCardByIdStatus",
  async (card_id: number) => {
    const response = await instance({
      method: "GET",
      url: `/cards/${card_id}`,
    })
    return response.data
  },
)

export const createNewLand = createAsyncThunk(
  "cards/createNewLandStatus",
  async (land: Land) => {
    const response = await instance({
      method: "post",
      url: `/cards/lands`,
      data: land,
    })
    return response.data
  },
)

export const createNewSpell = createAsyncThunk(
  "cards/createNewSpellStatus",
  async (spell: Spell) => {
    const response = await instance({
      method: "post",
      url: `/cards/spells`,
      data: spell,
    })
    return response.data
  },
)

export const createNewCreature = createAsyncThunk(
  "cards/createNewCreatureStatus",
  async (creature: Creature) => {
    const response = await instance({
      method: "post",
      url: `/cards/creatures`,
      data: creature,
    })
    return response.data
  },
)

export const updateLand = createAsyncThunk(
  "cards/updateLandStatus",
  async (land: Land) => {
    const response = await instance({
      method: "put",
      url: `/cards/lands/${land.id}`,
      data: land,
    })
    return response.data
  },
)

export const updateSpell = createAsyncThunk(
  "cards/updateSpellStatus",
  async (spell: Spell) => {
    const response = await instance({
      method: "put",
      url: `/cards/spells/${spell.id}`,
      data: spell,
    })
    return response.data
  },
)

export const updateCreature = createAsyncThunk(
  "cards/updateCreatureStatus",
  async (creature: Creature) => {
    const response = await instance({
      method: "put",
      url: `/cards/creatures/${creature.id}`,
      data: creature,
    })
    return response.data
  },
)

export const deleteCard = createAsyncThunk(
  "cards/deleteCardStatus",
  async (card_id: number) => {
    const response = await instance({
      method: "delete",
      url: `/cards/${card_id}`,
    })
    return response.data
  },
)

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setCard: (state, action: PayloadAction<Card>) => {
      state.value.id = action.payload.id
      state.value.name = action.payload.name
      state.value.abilities = action.payload.abilities
      if (isLand(action.payload)) {
        const land = state.value as Land
        land.colors = action.payload.colors
      }
      if (isSpell(action.payload)) {
        const spell = state.value as Spell
        spell.manaCost = action.payload.manaCost
        spell.type = action.payload.type
        if (isCreature(action.payload)) {
          const creature = state.value as Creature
          creature.power = action.payload.power
          creature.toughness = action.payload.toughness
          creature.attributes = action.payload.attributes
        }
      }
    },
    setNewCard: (state, action) => {
      state.value = action.payload
    },
    updateName: (state, action) => {
      state.value.name = action.payload
    },
    updateAbilities: (state, action) => {
      state.value.abilities = action.payload
    },
    updateColors: (state, action) => {
      if (!isLand(state.value)) {
        return
      }
      const land = state.value as Land
      land.colors = action.payload
    },
    updateManaCost: (state, action) => {
      if (!isSpell(state.value)) {
        return
      }
      const spell = state.value as Spell
      spell.manaCost = action.payload
    },
    updateType: (state, action) => {
      if (!isSpell(state.value)) {
        return
      }
      const spell = state.value as Spell
      spell.type = action.payload
    },
    updatePower: (state, action) => {
      if (!isCreature(state.value)) {
        return
      }
      const creature = state.value as Creature
      creature.power = action.payload
    },
    updateToughness: (state, action) => {
      if (!isCreature(state.value)) {
        return
      }
      const creature = state.value as Creature
      creature.toughness = action.payload
    },
    updateAttributes: (state, action) => {
      if (!isCreature(state.value)) {
        return
      }
      const creature = state.value as Creature
      creature.attributes = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCardById.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getCardById.fulfilled, (state, action) => {
        state.status = "idle"
        cardSlice.caseReducers.setCard(state, action)
      })
      .addCase(getCardById.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(createNewLand.pending, (state) => {
        state.status = "loading"
      })
      .addCase(createNewLand.fulfilled, (state, action) => {
        state.status = "idle"
        cardSlice.caseReducers.setCard(state, action)
      })
      .addCase(createNewLand.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(createNewSpell.pending, (state) => {
        state.status = "loading"
      })
      .addCase(createNewSpell.fulfilled, (state, action) => {
        state.status = "idle"
        cardSlice.caseReducers.setCard(state, action)
      })
      .addCase(createNewSpell.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(createNewCreature.pending, (state) => {
        state.status = "loading"
      })
      .addCase(createNewCreature.fulfilled, (state, action) => {
        state.status = "idle"
        cardSlice.caseReducers.setCard(state, action)
      })
      .addCase(createNewCreature.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(updateLand.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateLand.fulfilled, (state, action) => {
        state.status = "idle"
        cardSlice.caseReducers.setCard(state, action)
      })
      .addCase(updateLand.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(updateSpell.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateSpell.fulfilled, (state, action) => {
        state.status = "idle"
        cardSlice.caseReducers.setCard(state, action)
      })
      .addCase(updateSpell.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(updateCreature.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateCreature.fulfilled, (state, action) => {
        state.status = "idle"
        cardSlice.caseReducers.setCard(state, action)
      })
      .addCase(updateCreature.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(deleteCard.pending, (state) => {
        state.status = "loading"
      })
      .addCase(deleteCard.fulfilled, (state) => {
        state.status = "idle"
      })
      .addCase(deleteCard.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const {
  setCard,
  setNewCard,
  updateName,
  updateAbilities,
  updateColors,
  updateAttributes,
  updateManaCost,
  updatePower,
  updateToughness,
  updateType,
} = cardSlice.actions

export const selectCard = (state: RootState) => state.card.value

export default cardSlice.reducer

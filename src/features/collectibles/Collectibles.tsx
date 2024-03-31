import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectCollectibles, getCollectiblesByCard } from "./collectiblesSlice"
import { Grid } from "@mui/material"
import { DisplayCard } from "../../components/displayCard"
import { PageHeader } from "../../components/pageHeader"
import Search from "../search/Search"

export function Collectibles() {
  const collectibles = useAppSelector(selectCollectibles)
  const dispatch = useAppDispatch()

  return (
    <Grid container width="100%">
      <PageHeader
        title="Collectibles"
        buttonTitle="Remove this button"
        buttonOnClick={() => {}}
      />
      <Search
        displayResults={true}
        onResultClick={(card_id: number) =>
          dispatch(getCollectiblesByCard(card_id))
        }
      />
      <Grid container sx={{ margin: 5 }}>
        {collectibles.map((collectible) => {
          return (
            <DisplayCard
              key={collectible.id}
              card={collectible}
              page="collectible"
            />
          )
        })}
      </Grid>
    </Grid>
  )
}

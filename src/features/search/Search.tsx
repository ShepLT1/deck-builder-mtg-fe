import { useEffect } from "react"
import { Grid, TextField } from "@mui/material"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  selectSearch,
  updateSearchInput,
  getCardsByNameContains,
} from "./searchSlice"

export default function Search() {
  const search = useAppSelector(selectSearch)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.input === "") {
        return
      }
      dispatch(getCardsByNameContains(search.input))
    }, 2000)

    return () => clearTimeout(delayDebounceFn)
  }, [search.input])

  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          id="search-input"
          label="Search (name)"
          variant="outlined"
          value={search.input}
          onChange={(e) => dispatch(updateSearchInput(e.target.value))}
        />
      </Grid>
    </Grid>
  )
}

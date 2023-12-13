import { useState, useEffect } from "react"
import {
  Grid,
  TextField,
  Popover,
  ButtonGroup,
  Button,
  Typography,
} from "@mui/material"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  selectSearch,
  updateSearchInput,
  getCardsByNameContains,
} from "./searchSlice"
import { updateCards, getCardsByPage } from "../cards/cardsSlice"

interface SearchProps {
  displayResults: boolean
  onResultClick: null | ((card_id: number) => void)
}

export default function Search(props: SearchProps) {
  const search = useAppSelector(selectSearch)
  const dispatch = useAppDispatch()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (search.input === "") {
        if (!props.displayResults) {
          dispatch(getCardsByPage(0))
        }
        if (anchorEl) setAnchorEl(null)
        return
      }
      const response = await dispatch(getCardsByNameContains(search.input))
      if (!props.displayResults) {
        if (response.meta.requestStatus === "fulfilled") {
          dispatch(updateCards(response.payload))
        }
        return
      }
      setAnchorEl(anchorEl ? null : document.getElementById("search-input"))
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [search.input])

  useEffect(() => {
    if (props.displayResults && search.input !== "" && !anchorEl) {
      setAnchorEl(document.getElementById("search-input"))
    }
  }, [search.results])

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <Grid container marginLeft={6}>
      <Grid item xs={12} display="flex" justifyContent="start">
        <TextField
          id="search-input"
          label="Search (name)"
          variant="outlined"
          value={search.input}
          onChange={(e) => dispatch(updateSearchInput(e.target.value))}
        />
      </Grid>
      {props.displayResults ? (
        <Grid item xs={12}>
          <Popover
            id="search-results-popover"
            open={open}
            anchorEl={document.getElementById("search-input")}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            {search.results.length > 0 ? (
              <ButtonGroup
                orientation="vertical"
                aria-label="vertical contained button group"
                variant="text"
              >
                {search.results.map((result) => {
                  return (
                    <Button
                      key={result.id}
                      onClick={() => {
                        props.onResultClick && props.onResultClick(result.id)
                      }}
                    >
                      {result.name}
                    </Button>
                  )
                })}
              </ButtonGroup>
            ) : (
              <Typography sx={{ marginTop: 2 }}>No results found</Typography>
            )}
          </Popover>
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  )
}

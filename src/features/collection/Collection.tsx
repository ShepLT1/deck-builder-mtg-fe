import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  selectCollection,
  selectTotalPages,
  getCollectionByPage,
} from "./collectionSlice"
import { Grid, Pagination } from "@mui/material"
import { DisplayCard } from "../../components/displayCard"
import { PageHeader } from "../../components/pageHeader"
import Search from "../search/Search"

export function Collection() {
  const collection = useAppSelector(selectCollection)
  const totalPages = useAppSelector(selectTotalPages)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getCollectionByPage(0))
  }, [])

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    await dispatch(getCollectionByPage(value - 1))
  }

  const handleAddCollectiblesClick = () => {
    navigate("/collectibles")
  }

  return (
    <Grid container width="100%">
      <PageHeader
        title="Collection"
        buttonTitle="Add Collectibles"
        buttonOnClick={() => handleAddCollectiblesClick()}
      />
      <Search displayResults={false} onResultClick={null} />
      <Grid container sx={{ margin: 5 }}>
        {collection.map((collectible) => {
          return (
            <DisplayCard
              key={collectible.id}
              card={collectible}
              page="collection"
            />
          )
        })}
      </Grid>
      <Grid container justifyContent="center">
        <Pagination
          count={totalPages}
          color="primary"
          onChange={handlePageChange}
        />
      </Grid>
    </Grid>
  )
}

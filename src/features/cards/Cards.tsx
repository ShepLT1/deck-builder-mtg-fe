import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectCards, selectTotalPages, getCardsByPage } from "./cardsSlice"
import { Grid, Pagination } from "@mui/material"
import { setCard, Card } from "../card/cardSlice"
import BaseModal from "../baseModal/BaseModal"
import { CardForm } from "../card/CardForm"
import { updateBaseModal } from "../baseModal/baseModalSlice"
import { DisplayCard } from "../../components/displayCard"
import { PageHeader } from "../../components/pageHeader"
import Search from "../search/Search"

export function Cards() {
  const cards = useAppSelector(selectCards)
  const totalPages = useAppSelector(selectTotalPages)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCardsByPage(0))
  }, [])

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    await dispatch(getCardsByPage(value - 1))
  }

  const handleCreateNewCardClick = () => {
    dispatch(setCard({ id: 0, name: "", abilities: [], count: 0 } as Card))
    dispatch(updateBaseModal(true))
  }

  return (
    <Grid container width="100%">
      <PageHeader
        title="Cards"
        buttonTitle="Create New Card"
        buttonOnClick={() => handleCreateNewCardClick()}
      />
      <Search displayResults={false} onResultClick={null} />
      <Grid container sx={{ margin: 5 }}>
        {cards.map((card) => {
          return <DisplayCard key={card.id} card={card} page="card" />
        })}
      </Grid>
      <Grid container justifyContent="center">
        <Pagination
          count={totalPages}
          color="primary"
          onChange={handlePageChange}
        />
      </Grid>
      <BaseModal children={<CardForm />} />
    </Grid>
  )
}

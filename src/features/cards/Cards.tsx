import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectCards, selectTotalPages, getCardsByPage } from "./cardsSlice"
import { Grid, Pagination } from "@mui/material"
import { setCard, Card } from "../card/cardSlice"
import BaseModal from "../baseModal/BaseModal"
import { updateBaseModal } from "../baseModal/baseModalSlice"
import { DisplayCard } from "../../components/displayCard"
import { PageHeader } from "../../components/pageHeader"
import Search from "../search/Search"
import { instance } from "../../utils/api/axios.config"

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
    // dispatch(setCard({ id: 0, name: "", abilities: [], count: 0 } as Card))
    // dispatch(updateBaseModal(true))
  }

  const test = async () => {
    const response = await instance({
      method: "post",
      url: `/cards/planeswalkers`,
      data: {
        name: "Nicol Bolas, Planeswalker",
        abilities: [
          "+3: Destroy target noncreature permanent.",
          "-2: Gain control of target creature.",
          "-9: Nicol Bolas, Dragon-God deals 7 damage to any target. You draw seven cards.",
        ],
        manaCost: [16, 2, 3, 3, 4],
        loyalty: 5,
      },
    })
    console.log(response)
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
      <button onClick={test}>Test</button>
      {/* <BaseModal children={<CardForm />} /> */}
    </Grid>
  )
}

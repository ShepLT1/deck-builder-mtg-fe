import { Card } from "../card/cardSlice"
import { CardSection } from "./deckSlice"
import { isLand, isSpell, isCreature } from "../card/cardSlice"

export const convertCardList = (cardList: Card[]) => {
  sortCardsByType(cardList)
  const cardSectionList: CardSection[] = []
  let cardSection: CardSection = { title: "", cards: [] }
  cardList.forEach((card) => {
    if (
      cardSection.title === "" ||
      (cardSection.title === "Lands" && !isLand(card)) ||
      (isLand(card) && cardSection.title !== "Lands") ||
      (isSpell(card) &&
        cardSection.title.toLowerCase() !== card.type.toLowerCase() + "s")
    ) {
      if (cardSection.cards.length > 0) {
        cardSectionList.push(cardSection)
        cardSection = { title: "", cards: [] }
      }
      if (isLand(card)) {
        cardSection.title = "Lands"
      } else if (isSpell(card)) {
        cardSection.title =
          card.type.charAt(0).toUpperCase() +
          card.type.slice(1, card.type.length).toLowerCase() +
          "s"
      }
    }
    const mappedCards = cardSection.cards.map((card) => card.id)
    const existingCardIndex = mappedCards.indexOf(card.id)
    if (existingCardIndex > -1) {
      cardSection.cards[existingCardIndex].count++
    } else {
      cardSection.cards.push({ ...card, count: 1 })
    }
  })
  cardSectionList.push(cardSection)
  return cardSectionList
}

export const sortCardsByType = (cardList: Card[]) => {
  cardList.sort((a, b) => {
    if ((isLand(a) && !isLand(b)) || (isSpell(a) && isCreature(b))) {
      return -1
    }
    if (isCreature(a) && (isLand(b) || isSpell(b))) {
      return 1
    }
    if (isSpell(a) && isSpell(b)) {
      if (a.type < b.type) {
        return -1
      }
      if (a.type > b.type) {
        return 1
      }
    }
    return 0
  })
}

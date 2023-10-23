export const constructNewManaCost = (manaCostObj: {
  white: string
  blue: string
  black: string
  red: string
  green: string
  colorless: string
  any: string
}) => {
  const newManaCost = []
  for (const [key, value] of Object.entries(manaCostObj)) {
    const numberVal = value as unknown as number
    for (let i = 0; i < numberVal; i++) {
      newManaCost.push(key.toUpperCase())
    }
  }
  return newManaCost
}

export const deconstructManaCost = (manaCost: string[]) => {
  const manaCostObj = {
    white: 0,
    blue: 0,
    black: 0,
    red: 0,
    green: 0,
    colorless: 0,
    any: 0,
  }
  manaCost.forEach((mana) => {
    const key = mana.toLowerCase() as keyof typeof manaCostObj
    manaCostObj[key]++
  })
  return manaCostObj
}

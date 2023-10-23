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

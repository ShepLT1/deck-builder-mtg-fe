export const constructNewManaCost = (manaCostObj: {
  white: number
  blue: number
  black: number
  red: number
  green: number
  colorless: number
  any: number
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

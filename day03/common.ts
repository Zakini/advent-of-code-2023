import { splitIntoLines } from '../helpers'

export type Coordinates = { x: number, y: number }
export type SchematicNumber = {
  num: number,
  coordinates: Coordinates,
  numLength: number,
}

export const findSchematicNumbers = (input: string): SchematicNumber[] => {
  const lines = splitIntoLines(input)

  const schematicNumbers: SchematicNumber[] = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const regex = /\d+/g

    let match = regex.exec(line)
    while (match !== null) {
      schematicNumbers.push({
        num: Number(match[0]),
        coordinates: { x: match.index, y: i },
        numLength: match[0].length,
      })

      match = regex.exec(line)
    }
  }

  return schematicNumbers
}

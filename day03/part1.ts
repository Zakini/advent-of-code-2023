import path from 'node:path'
import { loadFileContents, splitIntoLines, sumReducer } from '../helpers'
import { findSchematicNumbers } from './common'

const solve = (input: string): number => {
  const lines = splitIntoLines(input)
  const schematicNumbers = findSchematicNumbers(input)

  const partNumbers: number[] = []
  for (const num of schematicNumbers) {
    let isPartNumber = false

    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const y = num.coordinates.y + yOffset

      if (yOffset === 0) {
        const leftChar = lines[y]?.charAt(num.coordinates.x - 1) || null
        const rightChar = lines[y]?.charAt(num.coordinates.x + num.numLength) || null

        isPartNumber = (leftChar !== null && /[^0-9.]/.test(leftChar))
          || (rightChar !== null && /[^0-9.]/.test(rightChar))
      } else {
        for (let xOffset = -1; xOffset <= num.numLength; xOffset++) {
          const x = num.coordinates.x + xOffset
          const char = lines[y]?.charAt(x) || null

          isPartNumber = char !== null && /[^0-9.]/.test(char)
          if (isPartNumber) break
        }
      }

      if (isPartNumber) break
    }

    if (isPartNumber) partNumbers.push(num.num)
  }

  return partNumbers.reduce(sumReducer)
}

const solveFile = async (fileName: string): Promise<void> => {
  const filePath = path.join(import.meta.dir, fileName)
  const solution = solve(await loadFileContents(filePath))
  console.log(`${fileName}: ${solution}`)
}

await solveFile('example.txt')
await solveFile('input.txt')

import path from 'node:path'
import { loadFileContents, sumReducer } from '../helpers'
import { countScratchCardMatches, parseScratchCards } from './common'

const solve = (input: string): number => parseScratchCards(input)
  .map(countScratchCardMatches)
  // Calculate points for each card
  .map(n => n <= 0 ? 0 : 2 ** (n - 1))
  // Sum points up
  .reduce(sumReducer)

const solveFile = async (fileName: string): Promise<void> => {
  const filePath = path.join(import.meta.dir, fileName)
  const solution = solve(await loadFileContents(filePath))
  console.log(`${fileName}: ${solution}`)
}

await solveFile('example.txt')
await solveFile('input.txt')

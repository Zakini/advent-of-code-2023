import { fileSolverFactory, sumReducer } from '../helpers'
import { countScratchCardMatches, parseScratchCards } from './common'

const solve = (input: string): number => parseScratchCards(input)
  .map(countScratchCardMatches)
  // Calculate points for each card
  .map(n => n <= 0 ? 0 : 2 ** (n - 1))
  // Sum points up
  .reduce(sumReducer)

const solveFile = fileSolverFactory(import.meta.dir, solve)

await solveFile('example.txt')
await solveFile('input.txt')

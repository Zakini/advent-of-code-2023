import { fileSolverFactory, splitIntoLines, sumReducer } from '../helpers'
import { parseGame } from './common'

const solve = (input: string): number =>
  splitIntoLines(input)
    .map(parseGame)
    // Find the minimum cube set possible for each game
    .map(
      g => g.cubeSets.reduce(
        (a, v) => ({
          red: Math.max(a.red ?? 0, v.red ?? 0),
          green: Math.max(a.green ?? 0, v.green ?? 0),
          blue: Math.max(a.blue ?? 0, v.blue ?? 0)
        })
      )
    )
    // Calculate the 'power' of each cube set
    .map(s => (s.red ?? 1) * (s.green ?? 1) * (s.blue ?? 1))
    // Sum together the cube set powers
    .reduce(sumReducer)

const solveFile = fileSolverFactory(import.meta.dir, solve)

await solveFile('example.txt')
await solveFile('input.txt')

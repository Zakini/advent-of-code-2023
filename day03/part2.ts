import { fileSolverFactory, splitIntoLines, sumReducer } from '../helpers'
import { Coordinates, findSchematicNumbers } from './common'

const solve = (input: string): number => {
  const schematicNumbers = findSchematicNumbers(input)

  return splitIntoLines(input)
    // Find possible gears
    .map(
      (l: string, i: number): Coordinates[] => [...l.matchAll(/\*/g)].map(
        m => {
          if (m.index === undefined) throw new Error('huh?')
          return ({ x: m.index, y: i })
        }
      )
    )
    // Flatten array
    .reduce((a, g) => [...a, ...g])
    // Find part numbers next to possible gears
    .map(g => schematicNumbers.filter(num => {
      const left = num.coordinates.x - 1
      const right = num.coordinates.x + num.numLength
      const top = num.coordinates.y - 1
      const bottom = num.coordinates.y + 1

      return left <= g.x && g.x <= right
        && top <= g.y && g.y <= bottom
    }))
    // Filter out invalid gear
    .filter(n => n.length === 2)
    // Calculate gear ratio
    .map(n => n[0].num * n[1].num)
    // Sum the gear ratios together
    .reduce(sumReducer)
}

const solveFile = fileSolverFactory(import.meta.dir, solve)

await solveFile('example.txt')
await solveFile('input.txt')

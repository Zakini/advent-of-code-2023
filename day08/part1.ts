import { fileSolverFactory } from '../helpers'
import { parseDirectionsAndMap } from './common'

const solve = (input: string): number => {
  const [directions, map] = parseDirectionsAndMap(input)

  let currentPosition = 'AAA'
  let directionsIndex = 0
  let stepCount = 0
  while (currentPosition !== 'ZZZ') {
    const options = map[currentPosition] ?? null
    if (options === null) throw new Error(`Could not find position ${currentPosition} in map`)
    currentPosition = options[directions[directionsIndex]]
    directionsIndex = (directionsIndex + 1) % directions.length
    stepCount += 1
  }

  return stepCount
}

const solveFile = fileSolverFactory(import.meta.dir, solve)

await solveFile('example-part1-a.txt')
await solveFile('example-part1-b.txt')
await solveFile('input.txt')

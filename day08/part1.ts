import { fileSolverFactory, objectCombineReducer, splitIntoChunks, splitIntoLines } from '../helpers'

const possibleDirections = ['L', 'R'] as const
type Direction = typeof possibleDirections[number]

type DesertMap = Partial<Record<string, Record<Direction, string>>>

const isDirection = (v: string): v is Direction => possibleDirections.includes(v as Direction)

const solve = (input: string): number => {
  const [rawDirections, rawMap, ...excess] = splitIntoChunks(input)
  if (excess.length > 0) throw new Error(`Excess chunks found: ${excess}`)

  const directions: Direction[] = rawDirections.split('').map(char => {
    if (!isDirection(char)) throw new Error(`Found invalid direction: ${char}`)
    return char
  })

  const map: DesertMap = splitIntoLines(rawMap)
    .map(line => {
      const match = line.match(/^(\w+) = \((\w+), (\w+)\)$/)
      if (match === null) throw new Error(`Invalid map line: ${line}`)

      return { [match[1]]: { L: match[2], R: match[3] } }
    })
    .reduce(objectCombineReducer)

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

await solveFile('example1.txt')
await solveFile('example2.txt')
await solveFile('input.txt')

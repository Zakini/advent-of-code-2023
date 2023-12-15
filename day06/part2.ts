import { fileSolverFactory, sortNum, splitIntoLines } from '../helpers'

type RaceResult = { time: number, distance: number }
// ax² + bx + c = 0
type Quadratic = {
  a: number,
  b: number,
  c: number
}

const parseLine = (line: string): number => {
  const match = line.match(/^\w+: +(\d+(?: +\d+)*)/)
  if (match === null) throw new Error(`Failed to parsed line: ${line}`)
  return Number(match[1].replaceAll(' ', ''))
}

const parseRaceResults = (input: string): RaceResult => {
  const [rawTime, rawDistance, ...excess] = splitIntoLines(input)
  if (excess.length > 0) throw new Error(`Excess lines found: ${excess}`)

  return {
    time: parseLine(rawTime),
    distance: parseLine(rawDistance),
  }
}

// See: https://www.desmos.com/calculator/g6ibauc0ei
const quadraticify = (race: RaceResult): Quadratic => ({
  a: -1,
  b: race.time,
  c: -race.distance,
})

// Use the quadratic equation to find the roots
const solveQuadratic = ({ a, b, c }: Quadratic): [number, number]|null => {
  const discriminant = (b ** 2) - (4 * a * c)

  if (discriminant < 0) return null

  return [
    (-b + Math.sqrt(discriminant)) / (2 * a),
    (-b - Math.sqrt(discriminant)) / (2 * a),
  ]
}

const solve = (input: string): number => {
  const roots = solveQuadratic(quadraticify(parseRaceResults(input)))
  if (!roots) throw new Error('Could not find roots for this equation')

  const [lowRoot, highRoot] = roots.sort(sortNum)

  return Math.floor(highRoot) - Math.ceil(lowRoot) + 1
}

const solveFile = fileSolverFactory(import.meta.dir, solve)

await solveFile('example.txt')
await solveFile('input.txt')

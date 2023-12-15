import { fileSolverFactory, splitIntoLines } from '../helpers'

type RaceResult = { time: number, distance: number }
type Equation = (v: number) => number

const parseLine = (line: string): number[] => {
  const match = line.match(/^\w+: +(\d+(?: +\d+)*)/)
  if (match === null) throw new Error(`Failed to parsed line: ${line}`)
  return match[1].split(' ').filter(v => v !== '').map(Number)
}

const parseRaceResults = (input: string): RaceResult[] => {
  const [rawTimes, rawDistances, ...excess] = splitIntoLines(input)
  if (excess.length > 0) throw new Error(`Excess lines found: ${excess}`)

  const times = parseLine(rawTimes)
  const distances = parseLine(rawDistances)
  if (times.length !== distances.length) {
    throw new Error(
      `Got mismatched time and distance counts. ${times.length} times, ${distances.length} distances`
    )
  }

  return times.map((time, i) => ({ time, distance: distances[i] }))
}

// See: https://www.desmos.com/calculator/g6ibauc0ei
const equationify = (race: RaceResult): Equation =>
  v => (v * (race.time - v)) - race.distance

const range = (l: number): number[] => Array.from(Array(l).keys())

const solve = (input: string): number => parseRaceResults(input)
  .map(r => range(r.time)
    .map(equationify(r))
    .filter(v => v > 0)
    .length
  )
  .reduce((a, v) => a * v)

const solveFile = fileSolverFactory(import.meta.dir, solve)

await solveFile('example.txt')
await solveFile('input.txt')

import { fileSolverFactory } from '../helpers'
import { applyMap, parseMaps } from './common'

type SeedRange = { from: number, rangeLength: number }

const range = (from: number, length: number): number[] =>
  Array.from(Array(length)).map((_, i) => from + i)

const parseSeeds = (rawSeeds: string): number[] => {
  const seedsMatch = rawSeeds.match(/^seeds:((?: \d+)+)/)
  if (seedsMatch === null) throw new Error(`Failed to parse seeds. Raw seeds: ${rawSeeds}`)

  const values = seedsMatch[1].trim().split(' ').map(Number)
  if (values.length % 2 !== 0) {
    throw new Error(
      `Got odd number of seed range values. Values: ${values}, Raw seeds: ${rawSeeds}`
    )
  }

  const seedRanges: SeedRange[] = []
  for (let i = 0; i < values.length; i += 2) {
    seedRanges.push({ from: values[i], rangeLength: values[i + 1] })
  }

  console.log(
    seedRanges.map(r => ({ ...r, to: r.from + r.rangeLength - 1 }))
      .sort((a, b) => a.from - b.from)
      .map((r, i, arr) => ({ ...r, overlapsNext: r.to >= arr[i + 1]?.from ?? Infinity }))
  )

  return []
  // This produces _massive_ arrays
  // TODO don't... somehow
  return seedRanges.flatMap(({ from, rangeLength }) => range(from, rangeLength))
}

const solve = (input: string): number => {
  const [rawSeeds, ...rawMaps] = input.split('\n\n').map(v => v.trim())
  const seeds = parseSeeds(rawSeeds)
  const maps = parseMaps(rawMaps)

  return seeds.map(s => maps.reduce((a, m) => applyMap(a, m), s))
    .reduce((m, v) => Math.min(m, v))
}

const solveFile = fileSolverFactory(import.meta.dir, solve)

await solveFile('example.txt')
await solveFile('input.txt')

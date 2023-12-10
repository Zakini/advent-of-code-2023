import { fileSolverFactory } from '../helpers'
import { applyMap, parseMaps } from './common'

const parseSeeds = (rawSeeds: string): number[] => {
  const seedsMatch = rawSeeds.match(/^seeds:((?: \d+)+)/)
  if (seedsMatch === null) throw new Error(`Failed to parse seeds. Raw seeds: ${rawSeeds}`)

  return seedsMatch[1].trim().split(' ').map(Number)
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

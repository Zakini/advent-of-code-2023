import { fileSolverFactory, minReducer, splitIntoChunks, splitIntoLines } from '../helpers'

type AlmanacMapSegment = {
  sourceStart: number,
  destStart: number,
  rangeLength: number,
}
type AlmanacMap = AlmanacMapSegment[]

const parseSeeds = (rawSeeds: string): number[] => {
  const seedsMatch = rawSeeds.match(/^seeds:((?: \d+)+)/)
  if (seedsMatch === null) throw new Error(`Failed to parse seeds. Raw seeds: ${rawSeeds}`)

  return seedsMatch[1].trim().split(' ').map(Number)
}

const parseMaps = (rawMaps: string[]): AlmanacMap[] => rawMaps.map(rawMap => {
  // Discard first line that just describes the map
  const [_, ...lines] = splitIntoLines(rawMap)

  return lines.map(line => {
    const [destStart, sourceStart, rangeLength] = line.split(' ').map(Number)
    return { sourceStart, destStart, rangeLength }
  })
})

const applyMap = (value: number, map: AlmanacMap): number => {
  const segments = map.filter(s => s.sourceStart <= value && value <= (s.sourceStart + s.rangeLength - 1))
  if (segments.length > 1) throw new Error(`Found multiple valid segments. Value: ${value}, map: ${map}`)

  if (segments.length < 1) return value

  const segment = segments[0]
  const diff = value - segment.sourceStart
  return segment.destStart + diff
}

const solve = (input: string): number => {
  const [rawSeeds, ...rawMaps] = splitIntoChunks(input)
  const seeds = parseSeeds(rawSeeds)
  const maps = parseMaps(rawMaps)

  return seeds.map(s => maps.reduce((a, m) => applyMap(a, m), s))
    .reduce(minReducer)
}

const solveFile = fileSolverFactory(import.meta.dir, solve)

await solveFile('example.txt')
await solveFile('input.txt')

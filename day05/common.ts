import { splitIntoLines } from '../helpers'

type AlmanacMapSegment = {
  sourceStart: number,
  destStart: number,
  rangeLength: number,
}
type AlmanacMap = AlmanacMapSegment[]

export const parseMaps = (rawMaps: string[]): AlmanacMap[] => rawMaps.map(rawMap => {
  // Discard first line that just describes the map
  const [_, ...lines] = splitIntoLines(rawMap)

  return lines.map(line => {
    const [destStart, sourceStart, rangeLength] = line.split(' ').map(Number)
    return { sourceStart, destStart, rangeLength }
  })
})

export const applyMap = (value: number, map: AlmanacMap): number => {
  const segments = map.filter(s => s.sourceStart <= value && value <= (s.sourceStart + s.rangeLength - 1))
  if (segments.length > 1) throw new Error(`Found multiple valid segments. Value: ${value}, map: ${map}`)

  if (segments.length < 1) return value

  const segment = segments[0]
  const diff = value - segment.sourceStart
  return segment.destStart + diff
}

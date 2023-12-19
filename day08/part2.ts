import { fileSolverFactory, maxReducer, minReducer } from '../helpers'
import { parseDirectionsAndMap } from './common'

const solve = (input: string): number => {
  const [directions, map] = parseDirectionsAndMap(input)

  const pathsWithRawOffsets = Object.keys(map)
    .filter(s => s.endsWith('A'))
    .map(startingPosition => {
      const path = [startingPosition]
      let directionsIndex = 0

      while (true) {
        const currentPosition = path[path.length - 1]

        const options = map[currentPosition] ?? null
        if (options === null) throw new Error(`Could not find position ${currentPosition} in map`)

        const newPosition = options[directions[directionsIndex]]
        if (path.includes(newPosition)) {
          path.push(newPosition)
          break
        }
        path.push(newPosition)
        directionsIndex = (directionsIndex + 1) % directions.length
      }

      return path
    })
    .map(path => {
      const offset = path.indexOf(path[path.length - 1]) + 1
      return {
        offset,
        path: path.slice(offset),
      }
    })

  const largestOffset = pathsWithRawOffsets.map(p => p.offset).reduce(maxReducer)
  const pathsWithOffsets = pathsWithRawOffsets.map(p => ({
    path: p.path,
    offset: largestOffset - p.offset,
  }))

  console.log(pathsWithOffsets)

  // TODO do something skip over the initial few steps of each path so we just have the loop part
  // TODO do something to find when each of the loops sync up on nodes ending with Z
  // let i = 0
  // while (pathsWithOffsets.map(p => !p.path[(p.offset + i) % p.path.length].endsWith('Z')).length > 0) {

  // }

  return 0
}

const solveFile = fileSolverFactory(import.meta.dir, solve)

await solveFile('example-part2.txt')
// await solveFile('input.txt')

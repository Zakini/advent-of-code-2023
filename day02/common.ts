import { objectCombineReducer } from '../helpers'

const cubeColours = ['red', 'green', 'blue'] as const

export type CubeColour = typeof cubeColours[number]

const isCubeColour = (v: string): v is CubeColour => cubeColours.includes(v as CubeColour)

export type CubeSet = {
  [C in CubeColour]?: number
}

export type Game = {
  id: number,
  cubeSets: CubeSet[],
}

export const parseGame = (input: string): Game => {
  let [gameString, cubeSetsString] = input.split(':')

  const match = gameString.match(/^Game (\d+)$/)
  if (match === null) throw new Error(`Parse error: no game ID found. Input: ${input}`)
  const id = Number(match[1])

  const cubeSets = cubeSetsString.split(';')
    .map(
      s => s.split(',')
        .map(cubes => {
          const [count, colour] = cubes.trim().split(' ')
          if (!isCubeColour(colour)) {
            throw new Error(`Parse error: invalid cube colour ${colour}. Input: ${input}`)
          }
          return { [colour]: Number(count) }
        })
        .reduce(objectCombineReducer)
    )

  return { id, cubeSets }
}

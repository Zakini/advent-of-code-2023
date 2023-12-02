import path from 'node:path'
import { loadFileContents, splitIntoLines } from '../helpers'

const cubeColours = ['red', 'green', 'blue'] as const

type CubeColour = typeof cubeColours[number]

const isCubeColour = (v: string): v is CubeColour => cubeColours.includes(v as CubeColour)

type CubeSet = {
  [C in CubeColour]?: number
}

type Game = {
  id: number,
  cubeSets: CubeSet[],
}

const parseGame = (input: string): Game => {
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
        .reduce((a, v) => ({ ...a, ...v }))
    )

  return { id, cubeSets }
}

const solve = (input: string, target: CubeSet): number =>
  splitIntoLines(input)
    .map(parseGame)
    .filter(g => g.cubeSets.every(
      s => (s.red ?? 0) <= (target.red ?? 0)
        && (s.green ?? 0) <= (target.green ?? 0)
        && (s.blue ?? 0) <= (target.blue ?? 0)
    ))
    .reduce((a, g) => a + g.id, 0)

const solveFile = async (fileName: string, targetCubeSet: CubeSet): Promise<void> => {
  const filePath = path.join(import.meta.dir, fileName)
  const solution = solve(await loadFileContents(filePath), targetCubeSet)
  console.log(`${fileName}: ${solution}`)
}

const targetCubeSet = { red: 12, green: 13, blue: 14 }
await solveFile('example.txt', targetCubeSet)
await solveFile('input.txt', targetCubeSet)

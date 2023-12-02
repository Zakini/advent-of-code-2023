import path from 'node:path'
import { loadFileContents, splitIntoLines, sumReducer } from '../helpers'
import { CubeSet, parseGame } from './common'

const solve = (input: string, target: CubeSet): number =>
  splitIntoLines(input)
    .map(parseGame)
    // Filter out games that are impossible for the target cube set
    .filter(g => g.cubeSets.every(
      s => (s.red ?? 0) <= (target.red ?? 0)
        && (s.green ?? 0) <= (target.green ?? 0)
        && (s.blue ?? 0) <= (target.blue ?? 0)
    ))
    // Grab just the game IDs
    .map(g => g.id)
    // Sum game IDs together
    .reduce(sumReducer)

const solveFile = async (fileName: string, targetCubeSet: CubeSet): Promise<void> => {
  const filePath = path.join(import.meta.dir, fileName)
  const solution = solve(await loadFileContents(filePath), targetCubeSet)
  console.log(`${fileName}: ${solution}`)
}

const targetCubeSet = { red: 12, green: 13, blue: 14 }
await solveFile('example.txt', targetCubeSet)
await solveFile('input.txt', targetCubeSet)

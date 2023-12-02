import path from 'node:path'
import { loadFileContents, splitIntoLines, sumReducer } from '../helpers'

const solve = (input: string): number =>
  splitIntoLines(input)
    // Find digits
    .map(l => l.split('').filter(c => !Number.isNaN(Number(c))))
    // Find calibration values
    .map(l => Number(`${l[0]}${l[l.length - 1]}`))
    // Sum everything up
    .reduce(sumReducer)

const solveFile = async (fileName: string): Promise<void> => {
  const filePath = path.join(import.meta.dir, fileName)
  const solution = solve(await loadFileContents(filePath))
  console.log(`${fileName}: ${solution}`)
}

await solveFile('examplePart1.txt')
await solveFile('input.txt')

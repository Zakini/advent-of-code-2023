import { fileSolverFactory, splitIntoLines, sumReducer } from '../helpers'

const solve = (input: string): number =>
  splitIntoLines(input)
    // Find digits
    .map(l => l.split('').filter(c => !Number.isNaN(Number(c))))
    // Find calibration values
    .map(l => Number(`${l[0]}${l[l.length - 1]}`))
    // Sum everything up
    .reduce(sumReducer)

const solveFile = fileSolverFactory(import.meta.dir, solve)

await solveFile('example-part1.txt')
await solveFile('input.txt')
